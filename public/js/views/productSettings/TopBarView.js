define([
    'jQuery',
    'Underscore',
    'views/topBarViewBase',
    'text!templates/Produitsettings/TopBarTemplate.html',
    'constants'
], function ($, _, TopBarBase, ContentTopBarTemplate, CONSTANTS) {
    var TopBarView = TopBarBase.extend({
        el           : '#top-bar',
        contentType  : CONSTANTS.Produits_SETTINGS,
        contentHeader: 'Product Options',
        template     : _.template(ContentTopBarTemplate)
    });

    return TopBarView;
});
