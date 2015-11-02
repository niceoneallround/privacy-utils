/*jslint node: true, vars: true */

//
// Test JSONLD utils
//
var assert = require('assert'),
    jsonldUtils = require('jsonld-utils/lib/jldUtils'),
    should = require('should'),
    PPN_T =  require('data-models/lib/PrivacyPNDataModel').TYPE,
    PPN_TAG =  require('data-models/lib/PrivacyPNDataModel').TAG,
    privacyUtils = require('../lib/privacyUtils'),
    util = require('util');

describe('privacy utils tests', function() {
  'use strict';

  describe('1 create privacy value tests', function() {

    it('1.1 create with all props - tags an array', function() {
      var props, pv;

      props = {};
      props.evalue = '23';
      props.otype = 'http://myotype';
      props.tags = [PPN_TAG.OpaqueToken];
      pv = privacyUtils.createValue(props);
      assert(pv, util.format('no privacy value returned for props:%j', props));

      pv.should.have.property('@value', props.evalue);
      pv.should.have.property('@type');
      assert(jsonldUtils.isType(pv, PPN_T.Obfuscated), util.format('No PPN_TAG.Obfuscated:%j', pv));
      assert(jsonldUtils.isType(pv, PPN_TAG.OpaqueToken), util.format('No PPN_TAG.OpaqueToken:%j', pv));
      assert(jsonldUtils.isType(pv, props.otype), util.format('No props.otype:%j', pv));
    });

    it('1.2 create with all props - tags an object', function() {
      var props, pv;

      props = {};
      props.evalue = '23';
      props.otype = 'http://myotype';
      props.tags = PPN_TAG.OpaqueToken;
      pv = privacyUtils.createValue(props);
      assert(pv, util.format('no privacy value returned for props:%j', props));

      pv.should.have.property('@value', props.evalue);
      pv.should.have.property('@type');
      assert(jsonldUtils.isType(pv, PPN_T.Obfuscated), util.format('No PPN_TAG.Obfuscated:%j', pv));
      assert(jsonldUtils.isType(pv, PPN_TAG.OpaqueToken), util.format('No PPN_TAG.OpaqueToken:%j', pv));
      assert(jsonldUtils.isType(pv, props.otype), util.format('No props.otype:%j', pv));
    });

  }); // describe 1

});
