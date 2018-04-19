define([
    'Backbone',
    'Underscore',
    'constants',
    'moment'
], function (Backbone, _, CONSTANTS, moment) {
    'use strict';

    var OptionsValuesModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            value: ''
        },

        urlRoot: function () {
            return CONSTANTS.URLS.SETTINGS_Produits_VALUES;
        }
    });
    return OptionsValuesModel;
});
