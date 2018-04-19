define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/tformViewBase',
    'text!templates/Produitsettings/form/ContentTemplate.html',
    'text!templates/Produitsettings/form/ListItemTemplate.html',
    'models/OptionsModel',
    'views/Produitsettings/form/FormView',
    'views/Produitsettings/CreateView',
    'views/Produitsettings/list/ListItemView',
    'views/Filter/filterView',
    'common',
    'constants'
], function (Backbone, $, _, TFormBaseView, ContentTemplate, ListItemTemplate, OptionsModel, FormView, CreateView, ListItemView, FilterView, common, CONSTANTS) {
    'use strict';

    var ProductOptionsView = TFormBaseView.extend({
        listTemplate   : _.template(ListItemTemplate),
        contentTemplate: _.template(ContentTemplate),
        CreateView     : CreateView,
        ListItemView   : ListItemView,
        listUrl        : 'easyErp/Produitsettings/list/',
        contentType    : CONSTANTS.Produits_SETTINGS,
        viewType       : 'tform',
        hasPagination  : true,
        hasAlphabet    : false,
        formView       : null,
        selectedId     : null,
        ContentModel   : OptionsModel,
        FormView       : FormView,

        renderList: function(options){
            var $thisEl = this.$el;
            var $listHolder = $thisEl.find('#listContent');

            $listHolder.append(this.listTemplate({
                options: options
            }));
        }
    });

    return ProductOptionsView;
});