/*jslint node: true, vars: true */

//
// Test JSONLD utils
//
var assert = require('assert'),
    should = require('should'),
    PPN_OCTX = require('data-models/lib/PrivacyPNDataModel').OCTX,
    privacyUtils = require('../lib/privacyUtils'),
    util = require('util');

describe('privacy utils tests', function() {
  'use strict';

  describe('1 create privacy value tests', function() {

    it('1.1 create with octx an array', function() {
      var props, pv;

      props = {};
      props.evalue = '23';
      props.octx = [PPN_OCTX.AETNA_POC1];
      pv = privacyUtils.createValue(props);
      assert(pv, util.format('no privacy value returned for props:%j', props));

      pv.should.have.property('@value', props.evalue);
      pv.should.have.property('@type');
      assert((pv['@type'].length === 1), util.format('expected type length of 1 got:%s pv is:%j', pv['@type'].length, pv));
      pv['@type'][0].should.be.equal(PPN_OCTX.AETNA_POC1);
      assert(privacyUtils.isObfuscated(pv), util.format('value is not isObfuscted:%j', pv));
    });

    it('1.2 create with octx and instance', function() {
      var props, pv;

      props = {};
      props.evalue = '56';
      props.octx = PPN_OCTX.AETNA_POC1;
      pv = privacyUtils.createValue(props);
      assert(pv, util.format('no privacy value returned for props:%j', props));

      pv.should.have.property('@value', props.evalue);
      pv.should.have.property('@type', PPN_OCTX.AETNA_POC1);
      assert(privacyUtils.isObfuscated(pv), util.format('value is not isObfuscted:%j', pv));
    });

  }); // describe 1

});
