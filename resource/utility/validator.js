const validator = require('validator');

module.exports = {
    'currentObject': {},
    'setObject': function(object) {

        this.currentObject = object;
    },
    'currentVerification': "",
    'check': function(str) {

        this.currentVerification = str;

        return this;
    },
    'isString': function() {

        this.callValidator('isString');

        return this;
    },
    'isEmail': function() {
        
        this.callValidator('isEmail');

        return this;
    },
    'isURL': function() {
        
        this.callValidator('isURL');

        return this;
    },
    'isMACAddress': function() {
        
        this.callValidator('isMACAddress');

        return this;
    },
    'isIP': function() {
        
        this.callValidator('isIP');

        return this;
    },
    'isFQDN': function() {
        
        this.callValidator('isFQDN');

        return this;
    },
    'isBoolean': function() {
        
        this.callValidator('isBoolean');

        return this;
    },
    'isAlpha': function() {
        
        this.callValidator('isAlpha');

        return this;
    },
    'isAlphanumeric': function() {
        
        this.callValidator('isAlphanumeric');

        return this;
    },
    'isNumeric': function() {
        
        this.callValidator('isNumeric');

        return this;
    },
    'isPort': function() {
        
        this.callValidator('isPort');

        return this;
    },
    'isLowercase': function() {
 
        this.callValidator('isLowercase');

        return this;
    },
    'isUppercase': function() {
       
        this.callValidator('isUppercase');

        return this;
    },
    'isAscii': function() {
        
        this.callValidator('isAscii');

        return this;
    },
    'isFullWidth': function() {
        
        this.callValidator('isFullWidth');

        return this;
    },
    'isHalfWidth': function() {
        
        this.callValidator('isHalfWidth');

        return this;
    },
    'isVariableWidth': function() {
        
        this.callValidator('isVariableWidth');

        return this;
    },
    'isMultibyte': function() {
        
        this.callValidator('isMultibyte');

        return this;
    },
    'isSurrogatePair': function() {
        
        this.callValidator('isSurrogatePair');

        return this;
    },
    'isInt': function(object) {

        if(typeof object === 'undefined') {
            this.callValidator('isInt');
        }else {
            if(rangeValidation(object)) {
                if(!validator.isInt(this.currentObject[this.currentVerification]) ||
                this.currentObject[this.currentVerification] <= object.min ||
                this.currentObject[this.currentVerification] >= object.max) {
                    this.pushError();
                }
            }
        }

        return this;
    },
    'isFloat': function() {

        if(typeof object === 'undefined') {
            this.callValidator('isFloat');
        }else {
            if(rangeValidation(object)) {
                if(!validator.isFloat(this.currentObject[this.currentVerification]) ||
                this.currentObject[this.currentVerification] <= object.min ||
                this.currentObject[this.currentVerification] >= object.max) {
                    this.pushError();
                }
            }
        }

        return this;
    },
    'isDecimal': function() {
        
        this.callValidator('isDecimal');

        return this;
    },
    'isHexadecimal': function() {
        
        this.callValidator('isHexadecimal');

        return this;
    },
    'isDivisibleBy': function() {
        
        this.callValidator('isDivisibleBy');

        return this;
    },
    'isHexColor': function() {
        
        this.callValidator('isHexColor');

        return this;
    },
    'isISRC': function() {
        
        this.callValidator('isISRC');

        return this;
    },
    'isMD5': function() {
        
        this.callValidator('isMD5');

        return this;
    },
    'isHash': function() {
        
        this.callValidator('isHash');

        return this;
    },
    'isJSON': function() {
        
        this.callValidator('isJSON');

        return this;
    },
    'isEmpty': function() {
        
        this.callValidator('isEmpty');

        return this;
    },
    'isLength': function() {
        
        this.callValidator('isLength');

        return this;
    },
    'isByteLength': function() {
        
        this.callValidator('isByteLength');

        return this;
    },
    'isUUID': function() {
        
        this.callValidator('isUUID');

        return this;
    },
    'isMongoId': function() {
        
        this.callValidator('isMongoId');

        return this;
    },
    'isAfter': function() {
        
        this.callValidator('isAfter');

        return this;
    },
    'isBefore': function() {
        
        this.callValidator('isBefore');

        return this;
    },
    'isIn': function() {
        
        this.callValidator('isIn');

        return this;
    },
    'isCreditCard': function() {
        
        this.callValidator('isCreditCard');

        return this;
    },
    'isISIN': function() {
        
        this.callValidator('isISIN');

        return this;
    },
    'isISBN': function() {
        
        this.callValidator('isISBN');

        return this;
    },
    'isISSN': function() {
        
        this.callValidator('isISSN');

        return this;
    },
    'isMobilePhone': function() {
        
        this.callValidator('isMobilePhone');

        return this;
    },
    'isPostalCode': function() {

        this.callValidator('isPostalCode');

        return this;
    },
    'isCurrency': function() {

        this.callValidator('isCurrency');

        return this;
    },
    'isISO8601': function() {
    
        this.callValidator('isISO8601');

        return this;
    },
    'isISO31661Alpha2': function() {

        this.callValidator('isISO31661Alpha2');

        return this;
    },
    'isBase64': function() {

        this.callValidator('isBase64');

        return this;
    },
    'isDataURI': function() {

        this.callValidator('isDataURI');

        return this;
    },
    'isMimeType': function() {

        this.callValidator('isMimeType');

        return this;
    },
    'isLatLong': function() {

        this.callValidator('isLatLong');
       
        return this;
    },
    'isBiggerThan': function(number) {
        
        if(validator.isInt(number) && validator.isInt(this.currentObject[this.currentVerification])) {
            if(this.currentObject[this.currentVerification] <= number) {
                this.pushError();
            }
        }else {
            this.pushError();
        };
    },
    'callValidator': function(functionName) {

        if(!validator[functionName](this.currentObject[this.currentVerification])) {
            this.pushError();
        }
       
    },
    'validationErrors': function() {

        return this.errors;
    },
    'pushError': function() {
        
        this.errors.push({
            'param': this.currentVerification,
            'value': this.currentObject[this.currentVerification]
        });
    },
    'errors': []
};

function rangeValidation(object) {
    
    const allObjectKeys = [
        'min',
        'max'
    ];

    let objectKeys = Object.keys(object);   

    for(let i = 0; i < objectKeys.length; i++) {
        if(allObjectKeys.indexOf(objectKeys[i]) == -1) {
            return false;
        }
    }

    if(typeof object.min == 'undefined' || typeof object.max == 'undefined') {
        return false;
    }else {
        if(typeof object.min == 'number' && typeof object.max == 'number') {
            if(object.min <= object.max) {
                return true;
            }else {
                return false;
            }
        }else {
            return false;
        }  
    }  
};
