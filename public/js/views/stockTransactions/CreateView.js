define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/dialogViewBase',
    'text!templates/stockTransactions/CreateTemplate.html',
    'text!templates/stockTransactions/ProductItems.html',
    'text!templates/stockTransactions/ProductItem.html',
    'models/stockTransactionModel',
    'views/Notes/AttachView',
    'common',
    'populate',
    'constants',
    'helpers/keyValidator',
    'dataService'
], function (Backbone, $, _, ParentView, CreateTemplate, ProductItems, ProductItem, CorrectionModel, AttachView, common, populate, CONSTANTS, keyValidator, dataService) {

    var CreateView = ParentView.extend({
        el         : '#content-holder',
        //contentType: 'Tasks',
        contentType: 'stockTransactions',
        template   : _.template(CreateTemplate),
        responseObj: {},

        initialize: function () {
            _.bindAll(this, 'saveItem', 'render');
            this.model = new CorrectionModel();
            this.render();
            this.productData = {};
            this.responseObj = {};
            this.changedQuantity = _.debounce(this.changedQuantity, 250);
        },

        events: {
            'click .addProductItem a': 'getProduits',
            'click .removeJob'       : 'deleteRow',
            'keypress  .quantity'    : 'keypressHandler',
            'keyup  input.quantity'  : 'changedQuantity',
            'click .icon-attach'     : 'clickInput'
        },

        getProduits: function (e) {
            this.$el.find('#tbodyProduits').prepend(_.template(ProductItem, {elem: {}}));
        },

        keypressHandler: function (e) {
            return keyValidator(e, true, true);
        },

        clickInput: function () {
            this.$el.find('.input-file .inputAttach').click();
        },

        changedQuantity: function (e) {
            var $targetEl = $(e.target);
            var $parent = $targetEl.closest('tr');
            var inputEl = $targetEl.closest('input');
            var $after = $parent.find('#after');
            var id = $targetEl.attr('data-product');
            var destination = this.productData[id].destination; //parseInt($parent.find('#destination').val());
            //var $quantity = $parent.find('#quantity');
            var available = this.productData[id].onHand; //parseInt($parent.find('#onHand').val());
            var $onHand = $parent.find('#onHand');
            var val;

            if (!inputEl.length) {
                inputEl = $parent.find('textarea');
            }
            val = parseInt(inputEl.val());

            if (!val) {
                val = 0;
            }

            e.preventDefault();

            if (val >= available) {
                val = available;
                inputEl.val(val);
            }

            $after.val(val + destination);
            $onHand.val(available - val);
        },

        saveItem: function () {
            var self = this;
            var $thisEl = this.$el;
            var warehouseFrom = $thisEl.find('#warehouseFrom').attr('data-id');
            var warehouseTo = $thisEl.find('#warehouseTo').attr('data-id');
            var description = $.trim($thisEl.find('#description').val());
            var selectedProduits = $thisEl.find('.productItem');
            var saveObject;
            var selectedLength = selectedProduits.length;
            var targetEl;
            var productId;
            var quantity;
            var onHand;
            var Produits = [];
            var i;

            if (!selectedLength) {
                return App.render({
                    type   : 'error',
                    message: "Produits can't be empty."
                });
            }

            if (warehouseFrom === warehouseTo) {
                return App.render({
                    type   : 'error',
                    message: "Warehouses can't be equal"
                });
            }

            for (i = selectedLength - 1; i >= 0; i--) {
                targetEl = $(selectedProduits[i]);
                productId = targetEl.find('#ProduitsDd').attr('data-id');

                if (!productId) {
                    return App.render({
                        type   : 'error',
                        message: "Produits can't be empty."
                    });
                }

                quantity = parseFloat(targetEl.find('#quantity').val());
                onHand = parseFloat(targetEl.find('#newOnHand').val());

                if (onHand < 0) {
                    return App.render({
                        type   : 'error',
                        message: 'Available Produits value can\'t be negative'
                    });
                }

                if (quantity > onHand) {
                    quantity = onHand;
                }

                if (!quantity) {
                    return App.render({
                        type   : 'error',
                        message: 'Corrections not found in Produits'
                    });
                }

                Produits.push({
                    product : productId,
                    quantity: quantity
                });
            }

            saveObject = {
                warehouse  : warehouseFrom,
                warehouseTo: warehouseTo,
                orderRows  : Produits,
                description: description
            };

            this.model.save(saveObject, {
                wait   : true,
                success: function (model) {
                    var currentModel = model.changed;

                    self.attachView.sendToServer(null, currentModel);
                    /*self.hideDialog();
                     Backbone.history.fragment = '';
                     Backbone.history.navigate(window.location.hash, {trigger: true});*/
                },

                error: function (model, xhr) {
                    self.errorNotification(xhr);
                }

            });
        },

        deleteRow: function (e) {
            var target = $(e.target);
            var tr = target.closest('tr');
            var jobId = tr.find('#ProduitsDd').attr('data-id');
            var product = _.findWhere(this.responseObj['#ProduitsDd'], {_id: jobId});
            if (product) {
                product.selectedElement = false;
            }

            e.stopPropagation();
            e.preventDefault();

            tr.remove();
        },

        chooseOption: function (e) {
            var $target = $(e.target).closest('li');
            var id = $target.attr('id');
            var $thisEl = this.$el;
            var self = this;
            var type = $target.closest('a').attr('id');
            var warehouseFrom = $thisEl.find('#warehouseFrom').attr('data-id');
            var warehouseTo = $thisEl.find('#warehouseTo').attr('data-id');
            var location = $thisEl.find('#locationDd').attr('data-id');
            var $row = $target.closest('.productItem,deleteItem');
            var prevProduct = $row.find('#ProduitsDd').attr('data-id');
            var product;

            if (type === 'warehouseFrom') {    // added condition for project with no data-level empty
                $thisEl.find('#tbodyProduits').html('');
                $thisEl.find('#locationDd').text('Select').attr('data-id', '');
                self.responseObj['#ProduitsDd'].forEach(function (el) {
                    delete el.selectedElement;
                });
                if (warehouseTo) {
                    $thisEl.find('#newItem').removeClass('hidden');
                }
            }

            if (type === 'warehouseTo') {    // added condition for project with no data-level empty
                populate.get('#locationDd', 'warehouse/location/getForDd', {warehouse: id}, 'name', this, false);
                $thisEl.find('#tbodyProduits').html('');
                self.responseObj['#ProduitsDd'].forEach(function (el) {
                    delete el.selectedElement;
                });

                if (warehouseFrom) {
                    $thisEl.find('#newItem').removeClass('hidden');
                }
            }

            if (type === 'ProduitsDd') {
                dataService.getData('warehouse/getAvailability', {
                    warehouse  : warehouseFrom,
                    warehouseTo: warehouseTo,
                    product    : id
                }, function (data) {
                    var dataId;
                    var onHand;
                    var destination;

                    product = _.findWhere(self.responseObj['#ProduitsDd'], {_id: id});

                    if (prevProduct) {
                        prevProduct = _.findWhere(self.responseObj['#ProduitsDd'], {_id: prevProduct});
                        delete prevProduct.selectedElement;
                    }

                    product.selectedElement = true;
                    $row.find('.productDescr').val(product.info.description);
                    if (data) {
                        dataId = product._id;
                        onHand = data.onHand || 0;
                        destination = data.destination || 0;

                        $row.attr('id', dataId);
                        $row.find('#onHand').val(onHand);
                        $row.find('#quantity').val(0).attr('data-product', dataId);
                        $row.find('#destination').val(destination);
                        self.productData[dataId] = {
                            onHand     : onHand || 0,
                            destination: destination || 0
                        };
                        /*$row.find('.receiveLocation').removeClass('hidden');*/
                    } else {
                        $row.find('.statusInfo').each(function () {
                            $(this).val(0);
                        });
                    }
                });
            }

            $target.closest('.current-selected').text($target.text()).attr('data-id', $target.attr('id'));

            this.hideNewSelect();

            return false;
        },

        render: function () {
            //var $thisEl = this.$el;
            var formString = this.template();
            var self = this;
            var notDiv;
            var $thisEl;
            var Produits;

            this.$el = $(formString).dialog({
                dialogClass: 'edit-dialog',
                width      : 750,
                title      : 'Create Transaction',
                buttons    : {
                    save: {
                        text : 'Create',
                        class: 'btn blue',
                        click: function () {
                            self.saveItem();
                            self.gaTrackingConfirmEvents();
                        }
                    },

                    cancel: {
                        text : 'Cancel',
                        class: 'btn',
                        click: self.hideDialog
                    }
                }
            });

            $thisEl = this.$el;

            notDiv = $thisEl.find('.attach-container');

            this.attachView = new AttachView({
                model      : this.model,
                contentType: self.contentType,
                isCreate   : true
            });

            notDiv.append(this.attachView.render().el);

            populate.get('#warehouseFrom', 'warehouse/getForDD', {}, 'name', this, false);
            populate.get('#warehouseTo', 'warehouse/getForDD', {}, 'name', this, false);

            dataService.getData('Produits/', {doNotGetImage: true}, function (data) {
                /*if (data.success && data.success.length > 0) {
                    Produits = _.filter(data.success, function (product) {
                        return product.get('source') > 0;
                    });
                }*/

                self.responseObj['#ProduitsDd'] = data.success;
            });

            this.delegateEvents(this.events);

            $thisEl.find('#productItemsHolder').html(_.template(ProductItems));

            return this;
        }

    });

    return CreateView;
});
