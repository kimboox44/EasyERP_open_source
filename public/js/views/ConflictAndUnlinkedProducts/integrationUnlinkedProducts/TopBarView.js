define([
    'Underscore',
    'views/topBarViewBase',
    'text!templates/integrationUnlinkedProduits/TopBarTemplate.html',
    'constants'
], function (_, BaseView, ContentTopBarTemplate, CONSTANTS) {
    'use strict';

    var TopBarView = BaseView.extend({
        el           : '#unlinkedProduitsTopBar',
        contentHeader: 'Unlinked Produits',
        contentType  : CONSTANTS.RESOLVECONFLICTS,
        template     : _.template(ContentTopBarTemplate)
    });

    return TopBarView;
});
