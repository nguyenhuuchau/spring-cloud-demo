'use strict';
module.exports = function(data, success=true, message='') {
    return {
        message: message,
        data: data,
        success: success,
        timestamp: new Date()
    }
};
