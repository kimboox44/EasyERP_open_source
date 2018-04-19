define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/listViewBase',
    'text!templates/Produitsettings/list/ListHeader.html',
    'text!templates/stages.html',
    'views/Produitsettings/CreateView',
    'views/Produitsettings/list/ListItemView',
    'views/Produitsettings/EditView',
    'models/OptionsModel',
    'collections/Produitsettings/filterCollection',
    'common',
    'constants'
], function (
             Backbone,
             $,
             _,
             listViewBase,
             listTemplate,
             stagesTemplate,
             CreateView,
             ListItemView,
             EditView,
             CurrentModel,
             contentCollection,
             common,
             CONSTANTS) {
    'use strict';

    var SettingsProduitsListView = listViewBase.extend({
        listTemplate     : listTemplate,
        ListItemView     : ListItemView,
        contentCollection: contentCollection,
        formUrl          : '#easyErp/Produitsettings/tform/',
        contentType      : CONSTANTS.Produits_SETTINGS,
        hasPagination    : false,

        events: {
            'click .stageSelect'         : 'showNewSelect',
            'click .newSelectList li'    : 'chooseOption'
            //'click #convertToOpportunity': 'openDialog'
        },

        initialize: function (options) {
            $(document).off('click');

            this.EditView = EditView;
            this.CreateView = CreateView;

            this.startTime = options.startTime;
            this.collection = options.collection;
            this.parrentContentId = options.collection.parrentContentId;
            this.sort = options.sort;
            this.filter = options.filter;
            this.page = options.collection.currentPage;
            this.contentCollection = contentCollection;
            this.stages = [];

            listViewBase.prototype.initialize.call(this, options);
        },

        chooseOption: function (e) {
            var self = this;
            var target$ = $(e.target);
            var targetElement = target$.parents('td');
            var id = targetElement.attr('id');
            var model = this.collection.get(id);

            model.save({workflow: target$.attr('id')}, {
                headers: {
                    mid: 24
                },
                patch  : true,
                success: function () {
                    self.showFilteredPage(self.filter, self);
                }
            });

            this.hideNewSelect();
            return false;
        },

        pushStages: function (stages) {
            this.stages = stages;
        },

        /*openDialog: function () {
            $('#dialog-form').dialog('open');
        },*/

        render: function () {
            var self = this;
            var $currentEl;
            var itemView;

            $('.ui-dialog ').remove();

            $currentEl = this.$el;

            $currentEl.html('');
            $currentEl.append(_.template(listTemplate));

            itemView = new this.ListItemView({
                collection : this.collection,
                page       : this.page,
                itemsNumber: this.collection.namberToShow
            });

            itemView.bind('incomingStages', this.pushStages, this);

            /*common.populateWorkflowsList('Leads', '.filter-check-list', '', '/Workflows', null, function (stages) {
                self.stages = (self.filter) ? self.filter.workflow : null;
                itemView.trigger('incomingStages', stages);
            });*/

            $currentEl.append(itemView.render());

            // this.renderFilter();

            // this.renderPagination($currentEl, this);

            // $currentEl.append("<div id='timeRecivingDataFromServer'>Created in " + (new Date() - this.startTime) + ' ms</div>');
        },

        hideNewSelect: function () {
            $('.newSelectList').remove();
        },

        showNewSelect: function (e) {
            if ($('.newSelectList').is(':visible')) {
                this.hideNewSelect();
                return false;
            }
            $(e.target).parent().append(_.template(stagesTemplate, {stagesCollection: this.stages}));
            return false;
        },

        gotoForm: function (e) {
            var id = $(e.target).closest('tr').data('id');
            var page = this.collection.currentPage;
            var countPerPage = this.collection.pageSize;
            var url = this.formUrl + id + '/p=' + page + '/c=' + countPerPage;

            if (this.filter) {
                url += '/filter=' + encodeURI(JSON.stringify(this.filter));
            }

            App.ownContentType = true;
            Backbone.history.navigate(url, {trigger: true});
        }
    });

    return SettingsProduitsListView;
});
