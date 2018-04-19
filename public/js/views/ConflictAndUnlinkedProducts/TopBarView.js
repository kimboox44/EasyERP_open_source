define([
    'Underscore',
    'views/topBarViewBase',
    'text!templates/ConflictAndUnlinkedProduits/TopBarTemplate.html'
], function (_, BaseView, ContentTopBarTemplate) {
    'use strict';

    var topBarView = BaseView.extend({
        el           : '#top-bar',
        contentHeader: 'Resolve Conflicts and Unlinked Produits',
        template     : _.template(ContentTopBarTemplate)
    });

    return topBarView;
});
