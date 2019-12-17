const _ = require('lodash');
const debug = require('debug')('lib:params');

function getInt(req, what, def) {
    var rv = _.parseInt(_.get(req.params, what));
    if(_.isNaN(rv)) {
        if(!_.isUndefined(def))
            rv  = def;
        else  {
            debug("getInt: Error with parameter [%s] in %j", what, req.params);
            rv = 0;
        }
    }
    return rv;
}

function getString(req, what) {
    var rv = _.get(req.params, what);
    if(_.isUndefined(rv)) {
        debug("getString: Missing parameter [%s] in %j", what, req.params);
        return "";
    }
    return rv;
}

function optionParsing(amountString, max) {
    const MAXOBJS = max ? max : 200;
    try {
        const amount = _.parseInt(_.first(amountString.split('-')));
        const skip = _.parseInt(_.last(amountString.split('-')));
        if(!(_.isNaN(amount) && _.isNaN(skip))) {
            return {
                amount,
                skip
            };
        }
    } catch(error) {}
    return {
        amount: MAXOBJS,
        skip: 0
    };
};

function getDate(req, what, def) {
    debug("Received %s, imported %s", _.get(req.params, what),  _.get(req.params, what, new Date(def)));
    const d = _.get(req.params, what, new Date(def));
    return _.isString(d) ? new Date(d) : d;
}

module.exports = {
    getInt: getInt,
    getString: getString,
    optionParsing: optionParsing,
    getDate,
};