/*jslint node: true, vars: true */

var assert = require('assert'),
  jsonldUtils = require('jsonld-utils/lib/jldUtils'),
  PPNUtils = require('data-models/lib/PrivacyPNDataModel').utils,
  util = require('util');

// DEPRECATED - This obfuscation hides all information about the value, for example that it represents a SSN and the SSN value
//
// The obfuscated 'value' has the following properties
// 1. Contains encrypted representation of the node or value generated by an external obfuscation service - this contains all the information needed by the external service to decrypt
// 2. Contains an obfuscation context ID that can be use by the PN to decrypt the data. The context may contain privacy pipe info, categorization information, and other.
//
// The following is an example
//
//  {'@id': 'someId',
//   '@type': ['aetna_t:Subject'],
//   'atena_p:SSN': 'ssn_1'}
//
//  {'@id': 'someId',
//   '@type' ['atena_t:Subject'],
//   'atena_p:SSN': {
//      '@type' : [ 'http://privacy.pn.schema.webshield.io/octx#some_context_id]   // uuid identifies context needed by pn to de-crypt
//      '@value': 'encrypted value from external source'
//    }
//  }
//
// props.octx - the obfuscation context used to decrypt
// props.evalue - the encryted value - required
// DEPRECATED
function createValue(props) {
  'use strict';
  assert(props, util.format('privacyUtils.createValue - no props provided'));
  assert(props.evalue, util.format('privacyUtils.createValue no props.evalue provided:%j', props));
  assert(props.octx, util.format('privacyUtils.createValue no props.octx provided:%j', props));
  return jsonldUtils.createV({ value: props.evalue, type: props.octx });
}

//
// DEPRECATED use PrivacyPNDataModel - Check if obfuscated by seeing if @type contains a value with that has a
// substring of the obfuscation context (OLD)
// or has a substring of a privacy algorithm tag
//
// @typedValue - can be a singleton or an array with 1 instance
function isObfuscated(typedValue) {
  'use strict';
  return PPNUtils.isObfuscated(typedValue);
}

module.exports = {
  // DEPRECATED use PrivacyPNDataModel
  isObfuscated: isObfuscated,

  // DEPRECATED
  createValue: createValue
};
