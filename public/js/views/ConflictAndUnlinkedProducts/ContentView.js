define([
    'jquery',
    'underscore',
    'Backbone',
    'text!templates/ConflictAndUnlinkedProduits/conflictAndUnlinkedTemplate.html',
    'views/ConflictAndUnlinkedProduits/resolveConflicts/ContentView',
    'views/ConflictAndUnlinkedProduits/integrationUnlinkedProduits/list/ListView',
    'views/ConflictAndUnlinkedProduits/resolveConflicts/TopBarView',
    'views/ConflictAndUnlinkedProduits/integrationUnlinkedProduits/TopBarView'
], function ($, _, Backbone, ConflictTemplate, ResolveConflictsView, UnlinkedProduitsView, ResolveTopBar, UnlinkedTopBar) {
    'use strict';
    var ContentView = Backbone.View.extend({
        el         : '#content-holder',
        contentType: 'ConflictAndUnlinked',
        template   : _.template(ConflictTemplate),

        initialize: function (options) {
            this.startTime = options.startTime;
            this.fliter = options.filter || {};
            this.fromIntegration = options.fromIntegration;

            this.render();
        },

        render: function () {
            var $thisEl = this.$el;

            $thisEl.html(this.template);
            $thisEl.find('#resolveConflicts').html(new ResolveConflictsView({
                startTime: this.startTime,
                filter   : this.fliter
            }));

            $thisEl.find('#unlinkedProduits').html(new UnlinkedProduitsView({
                startTime      : this.startTime,
                filter         : this.fliter,
                fromIntegration: this.fromIntegration
            }));
        }
    });
    return ContentView;
});
