var mongoose = require('mongoose');
var WorkflowHandler = require('./workflow');
var RESPONSES = require('../constants/responses');
var CONSTANTS = require('../constants/mainConstants');
var oxr = require('open-exchange-rates');
var fx = require('money');
var moment = require('../public/js/libs/moment/moment');

var Proforma = function (models) {
    'use strict';

    var async = require('async');

    var ProformaSchema = mongoose.Schemas.Proforma;
    var QuotationSchema = mongoose.Schemas.Quotation;
    var objectId = mongoose.Types.ObjectId;

    var workflowHandler = new WorkflowHandler(models);

    var JournalEntryHandler = require('./journalEntry');
    var _journalEntryHandler = new JournalEntryHandler(models);

    oxr.set({app_id: process.env.OXR_APP_ID});

    this.create = function (req, res, next) {
        var dbIndex = req.session.lastDb;
        var id = req.body.quotationId;
        var Proforma = models.get(dbIndex, 'Proforma', ProformaSchema);
        var Quotation = models.get(dbIndex, 'Quotation', QuotationSchema);
        var request;
        var date = moment().format('YYYY-MM-DD');
        var parallelTasks;
        var waterFallTasks;

        function getRates(callback) {
            oxr.historical(date, function () {
                fx.rates = oxr.rates;
                fx.base = oxr.base;
                callback();
            });
        }

        function fetchFirstWorkflow(callback) {
            request = {
                query: {
                    wId: 'Proforma'
                },

                session: req.session
            };
            workflowHandler.getFirstForConvert(request, callback);
        }

        function findQuotation(callback) {

            Quotation.aggregate([{
                $match: {
                    _id: objectId(id)
                }
            }, {
                $unwind: '$Produits'
            }, {
                $lookup: {
                    from        : 'Produits',
                    localField  : 'Produits.product',
                    foreignField: '_id',
                    as          : 'Produits.product'
                }
            }, {
                $lookup: {
                    from        : 'jobs',
                    localField  : 'Produits.jobs',
                    foreignField: '_id',
                    as          : 'Produits.jobs'
                }
            }, {
                $lookup: {
                    from        : 'Project',
                    localField  : 'project',
                    foreignField: '_id',
                    as          : 'project'
                }
            }, {
                $lookup: {
                    from        : 'currency',
                    localField  : 'currency._id',
                    foreignField: '_id',
                    as          : 'currency.obj'
                }
            }, {
                $lookup: {
                    from        : 'Customers',
                    localField  : 'supplier',
                    foreignField: '_id',
                    as          : 'supplier'
                }
            }, {
                $project: {
                    'Produits.product'    : {$arrayElemAt: ['$Produits.product', 0]},
                    'Produits.jobs'       : {$arrayElemAt: ['$Produits.jobs', 0]},
                    'currency.obj'        : {$arrayElemAt: ['$currency.obj', 0]},
                    project               : {$arrayElemAt: ['$project', 0]},
                    supplier              : {$arrayElemAt: ['$supplier', 0]},
                    'Produits.subTotal'   : 1,
                    'Produits.unitPrice'  : 1,
                    'Produits.taxes'      : 1,
                    'Produits.description': 1,
                    'Produits.quantity'   : 1,
                    'currency._id'        : 1,
                    forSales              : 1,
                    type                  : 1,
                    isOrder               : 1,
                    deliverTo             : 1,
                    orderDate             : 1,
                    expectedDate          : 1,
                    name                  : 1,
                    destination           : 1,
                    incoterm              : 1,
                    invoiceControl        : 1,
                    invoiceRecived        : 1,
                    paymentTerm           : 1,
                    paymentInfo           : 1,
                    workflow              : 1,
                    whoCanRW              : 1,
                    groups                : 1,
                    creationDate          : 1,
                    createdBy             : 1,
                    editedBy              : 1,
                    attachments           : 1
                }
            }, {
                $project: {
                    'Produits.product'    : 1,
                    'Produits.jobs'       : 1,
                    'currency.obj'        : 1,
                    project               : 1,
                    supplier              : 1,
                    'Produits.subTotal'   : 1,
                    'Produits.unitPrice'  : 1,
                    'Produits.taxes'      : 1,
                    'Produits.description': 1,
                    'Produits.quantity'   : 1,
                    'currency._id'        : 1,
                    salesPerson           : '$supplier.salesPurchases.salesPerson',
                    forSales              : 1,
                    type                  : 1,
                    isOrder               : 1,
                    deliverTo             : 1,
                    orderDate             : 1,
                    expectedDate          : 1,
                    name                  : 1,
                    destination           : 1,
                    incoterm              : 1,
                    invoiceControl        : 1,
                    invoiceRecived        : 1,
                    paymentTerm           : 1,
                    paymentInfo           : 1,
                    workflow              : 1,
                    whoCanRW              : 1,
                    groups                : 1,
                    creationDate          : 1,
                    createdBy             : 1,
                    editedBy              : 1,
                    attachments           : 1
                }
            }, {
                $group: {
                    _id           : '$_id',
                    Produits      : {$push: '$Produits'},
                    project       : {$first: '$project'},
                    currency      : {$first: '$currency'},
                    forSales      : {$first: '$forSales'},
                    type          : {$first: '$forSales'},
                    isOrder       : {$first: '$isOrder'},
                    supplier      : {$first: '$supplier'},
                    deliverTo     : {$first: '$deliverTo'},
                    orderDate     : {$first: '$orderDate'},
                    expectedDate  : {$first: '$expectedDate'},
                    name          : {$first: '$name'},
                    destination   : {$first: '$destination'},
                    salesPerson   : {$first: '$salesPerson'},
                    incoterm      : {$first: '$incoterm'},
                    invoiceControl: {$first: '$invoiceControl'},
                    invoiceRecived: {$first: '$invoiceRecived'},
                    paymentTerm   : {$first: '$paymentTerm'},
                    paymentInfo   : {$first: '$paymentInfo'},
                    workflow      : {$first: '$workflow'},
                    whoCanRW      : {$first: '$whoCanRW'},
                    groups        : {$first: '$groups'},
                    creationDate  : {$first: '$creationDate'},
                    createdBy     : {$first: '$createdBy'},
                    editedBy      : {$first: '$editedBy'},
                    attachments   : {$first: '$attachments'}
                }
            }], function (err, quotation) {
                if (err) {
                    return next(err);
                }

                Quotation.update({_id: objectId(id)}, {$inc: {proformaCounter: 1}}, {new: true}, function (err) {
                    if (err) {
                        return next(err);
                    }
                    callback(err, quotation[0]);
                });
            });
        }

        function parallel(callback) {
            async.parallel(parallelTasks, callback);
        }

        function createProforma(parallelResponse, callback) {
            var quotation;
            var workflow;
            var err;
            var proforma;

            if (parallelResponse && parallelResponse.length) {
                quotation = parallelResponse[0];
                workflow = parallelResponse[1];
            } else {
                err = new Error(RESPONSES.BAD_REQUEST);
                err.status = 400;

                return callback(err);
            }

            delete quotation._id;

            quotation.attachments && delete quotation.attachments;

            proforma = new Proforma(quotation);

            if (req.session.uId) {
                proforma.createdBy.user = req.session.uId;
                proforma.editedBy.user = req.session.uId;
            }

            proforma.sourceDocument = id;
            proforma.paymentReference = quotation.name;
            proforma.workflow = workflow._id;
            proforma.paymentInfo.balance = quotation.paymentInfo.total;
            proforma.journal = CONSTANTS.PROFORMA_JOURNAL;
            proforma.invoiceDate = new Date(quotation.orderDate);

            proforma.currency.rate = oxr.rates[quotation.currency.obj.name];
            proforma.currency._id = quotation.currency._id;

            if (!proforma.project) {
                proforma.project = quotation.project ? quotation.project._id : null;
            }

            proforma.supplier = quotation.supplier;
            proforma.salesPerson = quotation.project ? quotation.project.projectmanager : quotation.salesPerson;

            proforma.save(function (err, result) {
                if (err) {
                    return callback(err);
                }

                callback(null, result);
            });
        }

        parallelTasks = [findQuotation, fetchFirstWorkflow, getRates];
        waterFallTasks = [parallel, createProforma];

        async.waterfall(waterFallTasks, function (err, result) {

            if (err) {
                return next(err);
            }

            res.status(201).send(result);
        });
    };
};

module.exports = Proforma;
