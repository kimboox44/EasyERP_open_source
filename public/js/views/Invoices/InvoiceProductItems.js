define([
    'Backbone',
    'jQuery',
    'Underscore',
    'text!templates/Invoices/InvoiceProductItems.html',
    'text!templates/Invoices/InvoiceProductInputContent.html',
    'text!templates/Invoices/EditInvoiceProductInputContent.html',
    'text!templates/Produits/InvoiceOrder/TotalAmount.html',
    'collections/Produits/Produits',
    'populate',
    'helpers',
    'helpers/keyValidator'
], function (Backbone, $, _, productItemTemplate, ProductInputContent, ProductItemsEditList, totalAmount, ProductCollection, populate, helpers, keyValidator) {
    'use strict';

    var ProductItemTemplate = Backbone.View.extend({
        el: '#invoiceItemsHolder',

        events: {
            'click .addProductItem'                                                   : 'getProduits',
            'click .newSelectList li:not(.miniStylePagination)'                       : 'chooseOption',
            'click .newSelectList li.miniStylePagination'                             : 'notHide',
            'click .newSelectList li.miniStylePagination .next:not(.disabled)'        : 'nextSelect',
            'click .newSelectList li.miniStylePagination .prev:not(.disabled)'        : 'prevSelect',
            'click .current-selected'                                                 : 'showProduitsSelect',
            'mouseenter .editable:not(.quickEdit), .editable .no-long:not(.quickEdit)': 'quickEdit',
            'mouseleave .editable'                                                    : 'removeEdit',
            'change #discount'                                                        : 'recalculateDiscount',
            'click #cancelSpan'                                                       : 'cancelClick',
            'click #saveSpan'                                                         : 'saveClick',
            'keyup .discountPercentage'                                               : 'discountChange',
            'keypress #discount'                                                      : 'keypressHandler',
            'click #editSpan'                                                         : 'editClick'
        },

        initialize: function (options) {
            var Produits;

            this.responseObj = {};
            this.taxesRate = 0;

            if (options) {
                this.visible = !!options.balanceVisible;
                this.discountVisible = !!options.discountVisible;
                this.isPaid = !!options.isPaid;
                this.notAddItem = !!options.notAddItem;
                this.writeOff = !!options.writeOff;
            }

            this.forSales = options.forSales;

            /* this.render();*/

            Produits = new ProductCollection(options);
            Produits.bind('reset', function () {
                this.Produits = Produits;
                this.filterProduitsForDD();
            }, this);
        },

        template: _.template(productItemTemplate),

        getProduits: function (e) {
            var target = $(e.target);
            var parrent = target.closest('tbody');
            var parrentRow = parrent.find('.productItem').last();
            var rowId = parrentRow.attr('data-id');
            var trEll = parrent.find('tr.productItem');

            e.preventDefault();
            e.stopPropagation();

            if (rowId === undefined || rowId !== 'false') {
                if (!trEll.length) {
                    return parrent.prepend(_.template(ProductInputContent));
                }
                $(trEll[trEll.length - 1]).after(_.template(ProductInputContent));
            }

            return false;
        },

        keypressHandler: function (e) {
            return keyValidator(e, true);
        },

        filterProduitsForDD: function () {
            var id = '.ProduitsDd';
            var Produits = this.Produits.toJSON();

            this.responseObj[id] = [];
            this.responseObj[id] = this.responseObj[id].concat(_.map(Produits, function (item) {
                return {_id: item._id, name: item.name, level: item.projectShortDesc || ''};
            }));

        },

        quickEdit: function (e) {
            var target = $(e.target);
            var trId = target.closest('tr');
            var tdId = target.closest('td');

            if (trId.find('#editSpan').length === 0) {
                tdId.append('<span id="editSpan" class=""><a href="javascript:;">e</a></span>');

                if (tdId.width() - 30 < tdId.find('.no-long').width()) {
                    tdId.find('.no-long').width(tdId.width() - 30);
                }
            }
        },

        removeEdit: function () {
            $('#editSpan').remove();
            $('td .no-long').css({width: 'auto'});
        },

        editClick: function (e) {
            var parent = $(e.target).closest('td');
            var maxlength = parent.find('.no-long').attr('data-maxlength') || 20;

            e.preventDefault();

            $('.quickEdit #editInput').remove();
            $('.quickEdit #cancelSpan').remove();
            $('.quickEdit #saveSpan').remove();

            if (this.prevQuickEdit) {
                if ($(this.prevQuickEdit).hasClass('quickEdit')) {
                    $('.quickEdit').text(this.text || '').removeClass('quickEdit');
                }
            }

            parent.addClass('quickEdit');

            $('#editSpan').remove();

            this.text = $.trim(parent.text());

            parent.text('');
            parent.append('<input id="editInput" maxlength="' + maxlength + '" type="text" />');
            $('#editInput').val(this.text);

            this.prevQuickEdit = parent;

            parent.append('<span id="saveSpan" class="productEdit"><i class="fa fa-check"></i></span>');
            parent.append('<span id="cancelSpan" class="productEdit"><i class="fa fa-times"></i></span>');
            parent.find("#editInput").width(parent.find("#editInput").width() - 50);
        },

        saveClick: function (e) {
            var targetEl = $(e.target);
            var parent = targetEl.closest('td');
            var inputEl = parent.find('input');
            var val = inputEl.val();

            e.preventDefault();

            parent.removeClass('quickEdit').html('<span>' + val + '</span>');

            if (inputEl.hasClass('datepicker')) {
                parent.find('span').addClass('datepicker');
            }

            this.recalculateTaxes(parent);
        },

        cancelClick: function (e) {
            var text = this.text || '';

            e.preventDefault();

            if (this.prevQuickEdit) {
                if ($(this.prevQuickEdit).hasClass('quickEdit')) {
                    $('.quickEdit').removeClass('quickEdit').html('<span>' + text + '</span>');
                }
            }
        },

        showProduitsSelect: function (e, prev, next) {
            populate.showProduitsSelect(e, prev, next, this);

            return false;
        },

        chooseOption: function (e) {
            var target = $(e.target);
            var parrent = target.parents('td');
            var trEl = target.parents('tr');
            var parrents = trEl.find('td');
            var _id = target.attr('id');
            var model = this.Produits.get(_id);
            var selectedProduct = model.toJSON();
            var taxes;
            var price;
            var amount;

            trEl.attr('data-id', model.id);

            parrent.find('.current-selected').text(target.text()).attr('data-id', _id);

            $(parrents[1]).attr('class', 'editable').find('span').text(selectedProduct.info.description || '');
            $(parrents[2]).attr('class', 'editable').find('span').text(1);

            price = selectedProduct.info.salePrice;
            $(parrents[3]).attr('class', 'editable').find('span').text(price);

            taxes = parseFloat(selectedProduct.info.salePrice) * this.taxesRate;
            amount = price + taxes;
            taxes = taxes.toFixed(2);

            $(parrents[4]).text(taxes);
            $(parrents[5]).text(amount.toFixed(2));

            $('.newSelectList').hide();

            this.calculateTotal();
        },

        recalculateTaxes: function (parent) {
            var parentTr = parent.closest('tr');
            var quantity = parseFloat(parentTr.find('[data-name="quantity"] span').text());
            var cost = parseFloat(parentTr.find('[data-name="price"] span').text());
            var taxes = quantity * cost * this.taxesRate;
            var amount = (quantity * cost) + taxes;
            taxes = taxes.toFixed(2);
            amount = amount.toFixed(2);

            parentTr.find('.taxes').text(taxes);
            parentTr.find('.amount').text(amount);

            this.calculateTotal();
        },

        recalculateDiscount: function (e) {
            var $target = $(e.target);
            var parentTr = $target.closest('tr');
            var quantity = parseFloat($target.val() / 100);
            var cost = parseFloat(helpers.spaceReplacer(this.$el.find('#totalUntaxes').text()));
            var discount = quantity * cost;
            discount = discount.toFixed(2);

            parentTr.find('#discountSum').text('-' + helpers.currencySplitter(discount));

            this.calculateTotal(discount);
        },

        discountChange: function (e) {
            var $targetEl = $(e.target);

            if ($targetEl.val() > 100) {
                $targetEl.val(100);
            }
        },

        calculateTotal: function (discount) {
            var thisEl = this.$el;

            var totalUntaxContainer = thisEl.find('#totalUntaxes');
            var taxesContainer = thisEl.find('#taxes');
            var totalContainer = thisEl.find('#totalAmount');
            var balanceContainer = thisEl.find('#balance');
            var resultForCalculate = thisEl.find('tr.productItem');
            var i;
            var taxes;
            var totalUntax = 0;
            var totalEls = resultForCalculate.length;
            var $currentEl;
            var quantity;
            var cost;
            var total;

            if (totalEls) {
                for (i = totalEls - 1; i >= 0; i--) {
                    $currentEl = $(resultForCalculate[i]);
                    quantity = $.trim($currentEl.find('[data-name="quantity"]').text());
                    cost = helpers.spaceReplacer($currentEl.find('[data-name="price"] .sum').text());
                    totalUntax += (quantity * cost);
                }
            }

            totalUntax = totalUntax.toFixed(2);
            totalUntaxContainer.text(helpers.currencySplitter(totalUntax));
            totalUntax = parseFloat(totalUntax);

            taxes = totalUntax * this.taxesRate;
            taxes = taxes.toFixed(2);
            taxesContainer.text(taxes);
            taxes = parseFloat(taxes);

            total = totalUntax + taxes;

            if (discount) {
                total = total - discount;
            }

            total = helpers.currencySplitter(total.toFixed(2));
            totalContainer.text(total);

            balanceContainer.text(total);

        },

        nextSelect: function (e) {
            this.showProduitsSelect(e, false, true);
        },

        prevSelect: function (e) {
            this.showProduitsSelect(e, true, false);
        },

        render: function (options) {
            var self = this;
            var ProduitsContainer;
            var totalAmountContainer;
            var thisEl = this.$el;
            var Produits;
            var currency;

            if (options && options.model) {
                Produits = options.model.Produits;
                currency = options.model.currency;

                thisEl.html(_.template(productItemTemplate, {
                    model     : options.model,
                    forSales  : self.forSales,
                    isPaid    : self.isPaid,
                    notAddItem: this.notAddItem,
                    writeOff  : self.writeOff
                }));

                if (Produits) {
                    ProduitsContainer = thisEl.find('#productList');
                    ProduitsContainer.prepend(_.template(ProductItemsEditList, {
                        Produits        : Produits,
                        forSales        : self.forSales,
                        isPaid          : self.isPaid,
                        notAddItem      : this.notAddItem,
                        currencySplitter: helpers.currencySplitter,
                        currencyClass   : helpers.currencyClass,
                        currency        : currency,
                        writeOff        : self.writeOff,
                        approved        : options.model.approved

                    }));
                    this.recalculateTaxes(this.$el.find('.listTable'));
                    totalAmountContainer = thisEl.find('#totalAmountContainer');
                    totalAmountContainer.append(_.template(totalAmount, {
                        model           : options.model,
                        balanceVisible  : this.visible,
                        discountVisible : this.discountVisible,
                        currencySplitter: helpers.currencySplitter,
                        currencyClass   : helpers.currencyClass
                    }));
                }
            } else {
                this.$el.html(this.template({
                    forSales  : self.forSales,
                    isPaid    : self.isPaid,
                    notAddItem: this.notAddItem,
                    writeOff  : self.writeOff
                }));
                totalAmountContainer = thisEl.find('#totalAmountContainer');
                totalAmountContainer.append(_.template(totalAmount, {
                    model           : null,
                    discountVisible : this.discountVisible,
                    balanceVisible  : this.visible,
                    currencySplitter: helpers.currencySplitter
                }));
            }

            return this;
        }
    });

    return ProductItemTemplate;
});
