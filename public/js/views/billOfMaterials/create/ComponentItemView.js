define([
    'Backbone',
    'jQuery',
    'Underscore',
    'text!templates/billOfMaterials/components/ComponentItems.html',
    'text!templates/billOfMaterials/components/ComponentInputContent.html',
    '../../../populate',
    'dataService',
    'views/selectView/selectView',
    'helpers/keyValidator'
], function (Backbone,
             $,
             _,
             componentItemTemplate,
             componentInputContent,
             populate,
             dataService,
             SelectView,
             keyValidator) {
    'use strict';
    var ProductItemTemplate = Backbone.View.extend({

        events: {
            'click .addProductItem a'                                        : 'getComponents',
            'click .removeJob'                                               : 'deleteRow',
            'click .newSelectList li:not(.miniStylePagination, #createNewEl)': 'chooseOption',
            'click .current-selected.componentsDd'                           : 'showProduitsSelect',
            'keypress .forNum'                                               : 'keypressHandler'
        },

        template: _.template(componentItemTemplate),

        initialize: function (options) {
            this.responseObj = options.responseObj || {};
            this.Produits = options.Produits;

            this.context = options.context;
        },

        keypressHandler: function (e) {
            return keyValidator(e, false);
        },

        getComponents: function (e) {
            var target;
            var $parrent;
            var product = this.context.$el.find('#product').attr('data-id');

            if (!this.Produits.length && product) {
                this.Produits = [product];
            }

            if (!this.Produits.length) {
                return App.render({
                    type   : 'error',
                    message: 'Please choose product at first'
                });
            }

            target = $(e.target);
            $parrent = target.closest('#ComponentList');

            e.preventDefault();
            e.stopPropagation();

            $parrent.prepend(_.template(componentInputContent));

            $('.newSelectList').remove();

            return false;
        },

        deleteRow: function (e) {
            var target = $(e.target);
            var tr = target.closest('tr');
            var trNext = tr.next();
            var jobId = tr.attr('data-id');
            var exJob = _.findWhere(this.responseObj['#jobs'], {_id: jobId});

            e.stopPropagation();
            e.preventDefault();

            if (this.responseObj['#jobs']) {
                this.responseObj['#jobs'].splice(_.indexOf(this.responseObj['#jobs'], exJob), 1);
            }

            tr.remove();
            trNext.remove();
        },

        chooseOption: function (e) {
            var $target = $(e.target);
            var id = $target.closest('a').attr('id');
            var $targetId = $target.attr('id');
            var dataId = $target.closest('a').attr('data-id');

            if (this.Produits.indexOf($targetId) > -1) {
                return App.render({
                    type   : 'error',
                    message: 'Please choose another component'
                });
            }

            this.Produits.push($targetId);
            if (this.Produits.indexOf(dataId) > -1) {
                this.Produits.splice(this.Produits.indexOf(dataId), 1);
            }

            $target.parents('ul').closest('.current-selected').text($target.text()).attr('data-id', $targetId);

            this.hideNewSelect();

            return false;
        },

        closeSelect: function (e) {
            $('.newSelectList').remove();
        },

        showProduitsSelect: function (e) {
            var $target = $(e.target);
            var self = this;

            e.stopPropagation();

            if (this.selectView) {
                this.selectView.remove();
            }

            self.selectView = new SelectView({
                e          : e,
                responseObj: self.responseObj
            });

            $target.append(self.selectView.render().el);

            return false;
        },

        hideNewSelect: function () {
            if (this.selectView) {
                this.selectView.remove();
            }
        },

        render: function (options) {
            var $thisEl = this.$el;

            $thisEl.html(this.template());

            return this;
        }
    });

    return ProductItemTemplate;
});
