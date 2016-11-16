var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

var template = {}

describe('Boost JS Modal', function () {

    jsdom()

    before(function ( done ) {
        $ = require('jquery')
        boost = require('boost-js')
        modal = require('../dist/modal.min.js')
        $.fn.modal = boost( modal.plugin, modal.defaults );
        done();
    });

    describe('creation', function () {

    });

    describe('instantiation', function () {

    });

    describe('settings', function () {

    });

});
