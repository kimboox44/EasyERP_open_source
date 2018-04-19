'use strict';
define([], function () {
    var mappingFields = {
        Workflow: {
            'wId'     : 'Workflow ID',
            'wName'   : 'Workflow name',
            'status'  : 'Status',
            'name'    : 'Name',
            'sequence': 'Sequence',
            'visible' : 'Visible'
        },

        ProductCategory: {
            'name'          : 'Name',
            'fullName'      : 'Full name',
            'parent'        : 'Parent',
            'child'         : 'Child',
            'users'         : 'Users',
            'createdBy.date': 'Created by date',
            'editedBy.date' : 'Edited by date',
            'nestingLevel'  : 'Nesting level',
            'sequence'      : 'Sequence',
            'main'          : 'Main',
            'ProduitsCount' : 'Product count',
            'externalId'    : 'Import ID',
            ''              : '',
            'reason'        : 'Reason'
        },

        JobPosition: {
            'name'                    : 'Name',
            'expectedRecruitment'     : 'Expected recruitment',
            'interviewForm.id'        : 'Interview form ID',
            'interviewForm.name'      : 'Interview form name',
            'department'              : 'Department',
            'description'             : 'Description',
            'requirements'            : 'Requirements',
            'workflow'                : 'Workflow',
            'whoCanRW'                : 'Editor',
            'numberOfEmployees'       : 'Number of employees',
            'totalForecastedEmployees': 'Total forecasted employees',
            'createdBy.date'          : 'Created by date',
            'editedBy.date'           : 'Edited by date',
            'ID'                      : 'Id',
            'externalId'              : 'Import ID',
            ''                        : '',
            'reason'                  : 'Reason'
        },

        Produits: {
            'externalId'                  : 'Import ID',
            'wTrack'                      : 'W-Track',
            'canBeSold'                   : 'Can be sold',
            'canBeExpensed'               : 'Can be expensed',
            'eventSubscription'           : 'Event subscription',
            'canBePurchased'              : 'Can be purchased',
            'imageSrc'                    : 'Image src',
            'name'                        : 'Name',
            'info.productType'            : 'Product type',
            'info.SKU'                    : 'SKU',
            'inventory.weight'            : 'Weight',
            'info.salePrice'              : 'Sale price',
            'info.isActive'               : 'Is active',
            'info.barcode'                : 'Barcode',
            'info.description'            : 'Description',
            'accounting.category._id'     : 'Category ID',
            'accounting.category.name'    : 'Category name',
            'accounting.category.fullName': 'Category full name',
            'workflow'                    : 'Workflow',
            'whoCanRW'                    : 'Who can RW',
            'creationDate'                : 'Creation date',
            'createdBy.date'              : 'Created by date',
            'editedBy.date'               : 'Edited by user ID',
            'attachments'                 : 'Attachments',
            'ID'                          : 'Id',
            ''                            : '',
            'reason'                      : 'Reason',
        },

        Department: {
            'externalId'    : 'Import ID',
            'name'          : 'Name',
            'isDevelopment' : 'Is Development',
            'users'         : 'Users',
            'createdBy.date': 'Created by date',
            'editedBy.date' : 'Edited by user ID',
            'nestingLevel'  : 'Nesting level',
            'sequence'      : 'Sequence',
            'ID'            : 'ID',
            ''              : '',
            'reason'        : 'Reason'
        },

        PurchasePayments: {
            'externalId'   : 'Import ID',
            'invoice'      : 'Invoice',
            'forSale'      : 'For sale',
            'paymentRef'   : 'Payment ref',
            'supplier'     : 'Supplier',
            'paymentMethod': 'Payment Method',
            'period'       : 'Period',
            'bonus'        : 'Bonus',
            'workflow'     : 'Workflow ID',
            'currency._id' : 'Currency ID',
            'currency.rate': 'Currency rate',
            ''             : '',
            'reason'       : 'Reason'
        },

        InvoicePayments: {
            'externalId'   : 'Import ID',
            'invoice'      : 'Invoice',
            'forSale'      : 'For sale',
            'paymentRef'   : 'Payment ref',
            'supplier'     : 'Supplier',
            'paymentMethod': 'Payment Method',
            'period'       : 'Period',
            'workflow'     : 'Workflow ID',
            'bonus'        : 'Bonus',
            'currency._id' : 'Currency ID',
            'currency.rate': 'Currency rate',
            ''             : '',
            'reason'       : 'Reason'
        },

        Orders: {
            'externalId'         : 'Import ID',
            'currency._id'       : 'Currency ID',
            'currency.rate'      : 'Currency rate',
            'forSales'           : 'For sales',
            'type'               : 'Type',
            'isOrder'            : 'Is order',
            'supplier'           : 'Supplier',
            'project'            : 'Project name',
            'deliverTo'          : 'Deliver to',
            'orderDate'          : 'Order date',
            'expectedDate'       : 'Expected date',
            'name'               : 'Name',
            'destination'        : 'Destination',
            'incoterm'           : 'Incoterm',
            'invoiceControl'     : 'Invoice control',
            'invoiceRecived'     : 'Invoice recived',
            'paymentTerm'        : 'Payment term',
            'paymentInfo.id'     : 'Payment info ID',
            'paymentInfo.total'  : 'Payment info Total',
            'paymentInfo.unTaxed': 'Payment info unTaxed',
            'paymentInfo.taxes'  : 'Payment info Taxes',
            'Produits'           : 'Produits',
            'workflow'           : 'Workflow',
            'whoCanRW'           : 'Editor',
            'attachments'        : 'Attachments',
            'creationDate'       : 'Creation date',
            'createdBy.date'     : 'Created by date',
            'editedBy.date'      : 'Edited by user ID',
            'proformaCounter'    : 'Proforma counter',
            'reason'             : 'Reason',
            ''                   : ''
        },

        Quotation: {
            'externalId'         : 'Import ID',
            'currency._id'       : 'Currency ID',
            'currency.rate'      : 'Currency rate',
            'forSales'           : 'For sales',
            'type'               : 'Type',
            'isOrder'            : 'Is order',
            'supplier'           : 'Supplier ID',
            'project'            : 'Project name ID',
            'deliverTo'          : 'Deliver to ID',
            'orderDate'          : 'Order date',
            'expectedDate'       : 'Expected date',
            'name'               : 'Name',
            'destination'        : 'Destination ID',
            'incoterm'           : 'Incoterm ID',
            'invoiceControl'     : 'Invoice control ID',
            'invoiceRecived'     : 'Invoice recived',
            'paymentTerm'        : 'Payment term ID',
            'paymentInfo.id'     : 'Payment info ID',
            'paymentInfo.total'  : 'Payment info Total',
            'paymentInfo.unTaxed': 'Payment info unTaxed',
            'paymentInfo.taxes'  : 'Payment info Taxes',
            'Produits'           : 'Produits',
            'workflow'           : 'Workflow ID',
            'whoCanRW'           : 'Editor',
            'attachments'        : 'Attachments',
            'creationDate'       : 'Creation date',
            'createdBy.date'     : 'Created by date',
            'editedBy.date'      : 'Edited by user ID',
            'proformaCounter'    : 'Proforma counter',
            'reason'             : 'Reason',
            ''                   : ''
        },

        Invoice: {
            'externalId'            : 'Import ID',
            'ID'                    : 'Id',
            'forSales'              : 'ForSales',
            'supplier'              : 'Supplier ID',
            'sourceDocument'        : 'Source Document ID',
            'supplierInvoiceNumberr': 'Supplier Invoice Number',
            'paymentReference'      : 'Payment Reference',
            'invoiceDate'           : 'Invoice Date',
            'currency._id'          : 'Currency ID',
            'currency.rate'         : 'Currency Rate',
            'dueDate'               : 'Due Date',
            'paymentDate'           : 'Payment Date',
            'journal'               : 'Journal',
            'salesPerson'           : 'Salesperson ID',
            'paymentTerms'          : 'Payment Term ID',
            'paymentMethod'         : 'Payment Method ID',
            'payments'              : 'Payments ID',
            'paymentInfo._id'       : 'Payment Info ID',
            'paymentInfo.total'     : 'Payment Info Total',
            'paymentInfo.balance'   : 'Payment Info Balance',
            'paymentInfo.unTaxed'   : 'Payment Info unTaxed',
            'paymentInfo.taxes'     : 'Payment Info taxes',
            'Produits'              : 'Produits',
            'workflow'              : 'Workflow ID',
            'whoCanRW'              : 'Who Can RW',
            'creationDate'          : 'Creation Date',
            'createdBy.date'        : 'Created By Date',
            'editedBy.date'         : 'Edited By Date',
            'attachments'           : 'Attachments',
            'notes'                 : 'Notes',
            'invoiced'              : 'Invoiced',
            'removable'             : 'Removable',
            'approved'              : 'Approved',
            'emailed'               : 'Emailed',
            'project'               : 'Project ID',
            ''                      : '',
            'reason'                : 'Reason'
        },

        Persons: {
            'externalId'                    : 'Import ID',
            'type'                          : 'Type',
            'isOwn'                         : 'Is our own company',
            'isHidden'                      : 'Is Hidden',
            'name.first'                    : 'First name',
            'name.last'                     : 'Last name',
            'dateBirth'                     : 'Date of birth',
            'imageSrc'                      : 'Image BASE64',
            'email'                         : 'Email',
            'company'                       : 'Company name',
            'department'                    : 'Department',
            'timezone'                      : 'Time zone',
            'address.street'                : 'Street',
            'address.city'                  : 'City',
            'address.state'                 : 'State',
            'address.zip'                   : 'Zip code',
            'address.country'               : 'Country',
            'website'                       : 'Website',
            'jobPosition'                   : 'Job Position',
            'skype'                         : 'Skype',
            'phones.phone'                  : 'Phone',
            'phones.mobile'                 : 'Mobile phone',
            'phones.fax'                    : 'Fax',
            'contacts'                      : 'Contacts',
            'internalNotes'                 : 'Notes',
            'title'                         : 'Title',
            'salesPurchases.isCustomer'     : 'Customer',
            'salesPurchases.isSupplier'     : 'Supplier',
            'salesPurchases.salesPerson'    : 'Salesperson',
            'salesPurchases.salesTeam'      : 'Sales Team',
            'salesPurchases.implementedBy'  : 'Implemented by',
            'salesPurchases.active'         : 'Purchase active',
            'salesPurchases.reference'      : 'Purchase reference',
            'salesPurchases.language'       : 'Purchase language',
            'salesPurchases.receiveMessages': 'Messages',
            'relatedUser'                   : 'Related user',
            'color'                         : 'Color',
            'social.FB'                     : 'Facebook',
            'social.LI'                     : 'LinkedIn',
            'whoCanRW'                      : 'Editor',
            'notes'                         : 'Notes',
            'attachments'                   : 'Attachments',
            'history'                       : 'History',
            'createdBy.date'                : 'Created date',
            'editedBy.date'                 : 'Edited date',
            'companyInfo.size'              : 'Company size',
            'ID'                            : 'ID',
            'reason'                        : 'Reason',
            ''                              : ''
        },

        Companies: {
            'externalId'                    : 'Import ID',
            'type'                          : 'Type',
            'isOwn'                         : 'Is our own company',
            'isHidden'                      : 'Is Hidden',
            'name.first'                    : 'First name',
            'name.last'                     : 'Last name',
            'dateBirth'                     : 'Date of birth',
            'imageSrc'                      : 'Image BASE64',
            'email'                         : 'Email',
            'company'                       : 'Company name',
            'department'                    : 'Department',
            'timezone'                      : 'Time zone',
            'address.street'                : 'Street',
            'address.city'                  : 'City',
            'address.state'                 : 'State',
            'address.zip'                   : 'Zip code',
            'address.country'               : 'Country',
            'website'                       : 'Website',
            'jobPosition'                   : 'Job Position',
            'skype'                         : 'Skype',
            'phones.phone'                  : 'Phone',
            'phones.mobile'                 : 'Mobile phone',
            'phones.fax'                    : 'Fax',
            'contacts'                      : 'Contacts',
            'internalNotes'                 : 'Notes',
            'title'                         : 'Title',
            'salesPurchases.isCustomer'     : 'Customer',
            'salesPurchases.isSupplier'     : 'Supplier',
            'salesPurchases.salesPerson'    : 'Salesperson',
            'salesPurchases.salesTeam'      : 'Sales Team',
            'salesPurchases.implementedBy'  : 'Implemented by',
            'salesPurchases.active'         : 'Purchase active',
            'salesPurchases.reference'      : 'Purchase reference',
            'salesPurchases.language'       : 'Purchase language',
            'salesPurchases.receiveMessages': 'Messages',
            'relatedUser'                   : 'Related user',
            'color'                         : 'Color',
            'social.FB'                     : 'Facebook',
            'social.LI'                     : 'LinkedIn',
            'whoCanRW'                      : 'Editor',
            'notes'                         : 'Notes',
            'attachments'                   : 'Attachments',
            'history'                       : 'History',
            'createdBy.date'                : 'Created date',
            'editedBy.date'                 : 'Edited date',
            'companyInfo.size'              : 'Company size',
            'ID'                            : 'ID',
            'reason'                        : 'Reason',
            ''                              : ''
        },

        Employees: {
            'salary'             : 'Salary',
            'externalId'         : 'Import ID',
            'isEmployee'         : 'Employee',
            'imageSrc'           : 'Image',
            'subject'            : 'Subject',
            'name.first'         : 'First name',
            'name.last'          : 'Last name',
            'tags'               : 'Tags',
            'workAddress.street' : 'Work Street',
            'workAddress.city'   : 'Work City',
            'workAddress.state'  : 'Work State',
            'workAddress.zip'    : 'Work Zip code',
            'workAddress.country': 'Work Country',
            'workEmail'          : 'Email corporate',
            'personalEmail'      : 'Email personal',
            'workPhones.mobile'  : 'Mobile phone',
            'workPhones.phone'   : 'Phone',
            'skype'              : 'Skype',
            'officeLocation'     : 'Location',
            'visibility'         : 'Visibility',
            'department'         : 'Department ID',
            'jobPosition'        : 'Job Position ID',
            'manager.name'       : 'Manager',
            'manager._id'        : 'Manager ID',
            'coach'              : 'Supervisor',
            'nationality'        : 'Nationality',
            'identNo'            : 'ID',
            'passportNo'         : 'Passport number',
            'bankAccountNo'      : 'Bank account',
            'otherId'            : 'Other ID',
            'homeAddress.street' : 'Home Street',
            'homeAddress.city'   : 'Home City',
            'homeAddress.state'  : 'Home State',
            'homeAddress.zip'    : 'Home Zip code',
            'homeAddress.country': 'Home country',
            'age'                : 'Age',
            'daysForBirth'       : 'Birth date',
            'nextAction'         : 'Next action',
            'source'             : 'Source',
            'referredBy'         : 'Reference',
            'workflow'           : 'Workflow',
            'whoCanRW'           : 'Editor',
            'otherInfo'          : 'Other Info',
            'expectedSalary'     : 'Salary Expected',
            'proposedSalary'     : 'Salary proposed',
            'color'              : 'Color',
            'creationDate'       : 'Creation date',
            'createdBy.date'     : 'Created date',
            'editedBy.date'      : 'Edited date',
            'attachments'        : 'Attachments',
            'marital'            : 'Family status',
            'gender'             : 'Gender',
            'jobType'            : 'Job',
            'sequence'           : 'Sequence',
            'isLead'             : 'Lead',
            'ID'                 : 'ID',
            'social.FB'          : 'Facebook',
            'social.LI'          : 'LinkedIn',
            'social.GP'          : 'Google Plus',
            'hire'               : 'Hired',
            'fire'               : 'Fired',
            'lastFire'           : 'Last fire dates',
            'transferred'        : 'Trannsferred',
            'reason'             : 'Reason',
            ''                   : ''
        },

        Leads: {
            'externalId'              : 'Import ID',
            'jobkey'                  : 'Job',
            'name'                    : 'Full Name',
            'expectedRevenue.value'   : 'Value',
            'expectedRevenue.progress': 'Progress',
            'expectedRevenue.currency': 'Currency',
            'creationDate'            : 'Creation date',
            'tempCompanyField'        : 'Company field',
            'company'                 : 'Company',
            'customer'                : 'Customer',
            'tags'                    : 'Tags',
            'address.street'          : 'Street',
            'address.city'            : 'City',
            'address.state'           : 'State',
            'address.zip'             : 'Zip code',
            'address.country'         : 'Country',
            'contacts'                : 'Contacts',
            'contactName.first'       : 'First Name',
            'contactName.last'        : 'Last Name',
            'email'                   : 'Email',
            'phones.mobile'           : 'Mobile phone',
            'phones.phone'            : 'Phone',
            'phones.fax'              : 'Fax',
            'func'                    : 'Position',
            'salesPerson'             : 'Salesperson',
            'salesTeam'               : 'Sales team',
            'internalNotes'           : 'Notes',
            'nextAction.desc'         : 'Next action',
            'nextAction.date'         : 'Next action date',
            'expectedClosing'         : 'Closing',
            'priority'                : 'Priority',
            'categories.id'           : 'Category ID',
            'categories.name'         : 'Category name',
            'color'                   : 'Color',
            'active'                  : 'Active',
            'optout'                  : 'Optout',
            'reffered'                : 'Reference',
            'workflow'                : 'Workflow',
            'whoCanRW'                : 'Editor',
            'sequence'                : 'Sequence',
            'createdBy.date'          : 'Created date',
            'editedBy.date'           : 'Edited date',
            'campaign'                : 'Campaign',
            'source'                  : 'Source',
            'isConverted'             : 'Converted',
            'convertedDate'           : 'Converted date',
            'notes.note'              : 'Note',
            'notes.title'             : 'Title',
            'notes.task'              : 'Note task',
            'notes.attachment'        : 'Note attachment',
            'notes.date'              : 'Note date',
            'notes.user._id'          : 'Note user ID',
            'notes.user.login'        : 'Note user',
            'attachments'             : 'Attachments',
            'projectType'             : 'Project type',
            'social.FB'               : 'Facebook',
            'social.LI'               : 'LinkedIn',
            'skype'                   : 'Skype',
            'reason'                  : 'Reason',
            ''                        : ''
        },

        Opportunities: {
            externalId                : 'Import ID',
            jobkey                    : 'Job',
            name                      : 'Name',
            'expectedRevenue.value'   : 'Value',
            'expectedRevenue.progress': 'Progress',
            'expectedRevenue.currency': 'Currency',
            'creationDate'            : 'Creation date',
            'tempCompanyField'        : 'Company field',
            'company'                 : 'Company',
            'customer'                : 'Customer',
            'tags'                    : 'Tags',
            'address.street'          : 'Street',
            'address.city'            : 'City',
            'address.state'           : 'State',
            'address.zip'             : 'Zip code',
            'address.country'         : 'Country',
            'contacts'                : 'Contacts',
            'contactName.first'       : 'First Name',
            'contactName.last'        : 'Last Name',
            'email'                   : 'Email',
            'phones.mobile'           : 'Mobile phone',
            'phones.phone'            : 'Phone',
            'phones.fax'              : 'Fax',
            'func'                    : 'Position',
            'salesPerson'             : 'Salesperson',
            'salesTeam'               : 'Sales team',
            'internalNotes'           : 'Notes',
            'nextAction.desc'         : 'Next action',
            'nextAction.date'         : 'Next action date',
            'expectedClosing'         : 'Closing',
            'priority'                : 'Priority',
            'categories.id'           : 'Category ID',
            'categories.name'         : 'Category name',
            'color'                   : 'Color',
            'active'                  : 'Active',
            'optout'                  : 'Optout',
            'reffered'                : 'Reference',
            'workflow'                : 'Workflow',
            'whoCanRW'                : 'Editor',
            'sequence'                : 'Sequence',
            'createdBy.date'          : 'Created date',
            'editedBy.date'           : 'Edited date',
            'campaign'                : 'Campaign',
            'source'                  : 'Source',
            'isConverted'             : 'Converted',
            'convertedDate'           : 'Converted date',
            'notes.note'              : 'Note',
            'notes.title'             : 'Title',
            'notes.task'              : 'Note task',
            'notes.attachment'        : 'Note attachment',
            'notes.date'              : 'Note date',
            'notes.user._id'          : 'Note user ID',
            'notes.user.login'        : 'Note user',
            'attachments'             : 'Attachments',
            'projectType'             : 'Project type',
            'social.FB'               : 'Facebook',
            'social.LI'               : 'LinkedIn',
            'skype'                   : 'Skype',
            'reason'                  : 'Reason',
            ''                        : ''
        }
    };

    return mappingFields;
});