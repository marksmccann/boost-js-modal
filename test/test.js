var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

var template = {
    default: '<div id="modal" style="display:none;">'+
        '<h2 data-bind="#modal" data-role="heading"></h2>'+
        '<button data-bind="#modal" data-role="close">Close</button>'+
    '</div>'+
    '<button data-bind="#modal" data-role="open">Open</button>',
    headingID: '<div id="modal" style="display:none;">'+
        '<h2 id="some-id" data-bind="#modal" data-role="heading"></h2>'+
    '</div>',
    toTop: '<h1></h1><p></p><div></div><div id="modal" style="display:none;"></div>',
    activeClass: '<div id="modal" data-active-class="foo-bar"></div>',
    maskClass: '<div id="modal" data-mask-class="foo-bar"></div>',
    wrapClass: '<div id="modal" data-wrap-class="foo-bar"></div>',
    effect: '<div id="modal" data-effect="slide-up"></div>',
    closeOnClickOff: '<div id="modal" data-close-on-click-off="false"></div>',
    closeOnEsc: '<div id="modal" data-close-on-esc="false"></div>',
    openOnLoad: '<div id="modal" data-open-on-load="true"></div>',
    endElement: '<div id="modal" style="display:none;">'+
        '<button data-bind="#modal" data-role="close|end">Close</button>'+
    '</div>'
}

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

        it('should have added plugin to jQuery\'s prototype', function () {
            assert.isDefined( $.fn.modal );
        });

    });

    describe('instantiation', function () {

        var inst;

        before(function ( done ) {
            document.body.innerHTML = template.default;
            inst = $('#modal').modal();
            done();
        });

        it('should wrap source in \'div\' with a class and role attributes', function () {
            var parent = inst.source.parent()[0];
            assert.match( parent.className, /modal-wrap/ );
            assert.match( parent.getAttribute('role'), /document/ );
        });

        it('should wrap source\'s wrap in \'div\' with a class, role and aria-hidden attributes', function () {
            var parent = inst.source.parent().parent()[0];
            assert.match( parent.className, /modal-mask/ );
            assert.match( parent.getAttribute('role'), /dialog/ );
            assert.match( parent.getAttribute('aria-hidden'), /true/ );
        });

        it('should add reference to heading in aria-labelledby on source element', function () {
            assert.match( document.querySelector('h2').id, /modal-heading/ );
            assert.match( inst.container[0].getAttribute('aria-labelledby'), /modal-heading/ );
        });

        it('should remove style attribute from source if exists', function () {
            assert.lengthOf( inst.source[0].style.getPropertyValue('display'), 0 );
        });

        it('should add use id of heading as reference in aria-labelledby if exists', function () {
            document.body.innerHTML = template.headingID;
            inst = $('#modal').modal();
            assert.match( document.querySelector('h2').id, /some-id/ );
            assert.match( inst.container[0].getAttribute('aria-labelledby'), /some-id/ );
        });

        it('should move modal to the top of the document for accessibility', function () {
            document.body.innerHTML = template.toTop;
            inst = $('#modal').modal();
            assert.equal( document.body.firstChild, inst.container[0] );
        });

    });

    describe('settings', function () {

        it('should be able to update \'activeClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({activeClass:'foo-bar'}).open();
            assert.match( inst.container[0].className, /foo-bar$/ );
        });

        it('should be able to update \'activeClass\' setting from html', function () {
            document.body.innerHTML = template.activeClass;
            var inst = $('#modal').modal().open();
            assert.match( inst.container[0].className, /foo-bar$/ );
        });

        it('should be able to update \'maskClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({maskClass:'foo-bar'});
            assert.match( inst.container[0].className, /^foo-bar/ );
        });

        it('should be able to update \'maskClass\' setting from html', function () {
            document.body.innerHTML = template.maskClass;
            var inst = $('#modal').modal();
            assert.match( inst.container[0].className, /^foo-bar/ );
        });

        it('should be able to update \'wrapClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({wrapClass:'foo-bar'});
            assert.match( inst.container[0].children[0].className, /^foo-bar/ );
        });

        it('should be able to update \'wrapClass\' setting from html', function () {
            document.body.innerHTML = template.wrapClass;
            var inst = $('#modal').modal();
            assert.match( inst.container[0].children[0].className, /^foo-bar/ );
        });

        it('should be able to update \'effect\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({effect:'slide-up'});
            assert.match( inst.container[0].children[0].className, /slide-up$/ );
        });

        it('should be able to update \'effect\' setting from html', function () {
            document.body.innerHTML = template.effect;
            var inst = $('#modal').modal();
            assert.match( inst.container[0].children[0].className, /slide-up$/ );
        });

        it('should close modal when mask is clicked and \'closeOnClickOff\' is true', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal()
            assert.isFalse( inst.container.hasClass('is-open') );
            inst.open();
            assert.isTrue( inst.container.hasClass('is-open') );
            inst.container.trigger( 'click' );
            assert.isFalse( inst.container.hasClass('is-open') );
        });

        it('should NOT close modal when mask is clicked and \'closeOnClickOff\' is false', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({closeOnClickOff:false})
            assert.isFalse( inst.container.hasClass('is-open') );
            inst.open();
            assert.isTrue( inst.container.hasClass('is-open') );
            inst.container.trigger( 'click' );
            assert.isTrue( inst.container.hasClass('is-open') );
        });

        it('should be able to update \'closeOnClickOff\' setting from html', function () {
            document.body.innerHTML = template.closeOnClickOff;
            var inst = $('#modal').modal();
            assert.isFalse( inst.settings.closeOnClickOff );
        });

        it('should close modal when the esc key is pressed and \'closeOnEsc\' is true', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal();
            assert.isFalse( inst.container.hasClass('is-open') );
            inst.open();
            assert.isTrue( inst.container.hasClass('is-open') );
            $("body").trigger($.Event("keyup", { keyCode: 27 }));
            assert.isFalse( inst.container.hasClass('is-open') );
        });

        it('should NOT close modal when the esc key is pressed and \'closeOnEsc\' is false', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({closeOnEsc:false});
            assert.isFalse( inst.container.hasClass('is-open') );
            inst.open();
            assert.isTrue( inst.container.hasClass('is-open') );
            $("body").trigger($.Event("keyup", { keyCode: 27 }));
            assert.isTrue( inst.container.hasClass('is-open') );
        });

        it('should be able to update \'closeOnEsc\' setting from html', function () {
            document.body.innerHTML = template.closeOnEsc;
            var inst = $('#modal').modal();
            assert.isFalse( inst.settings.closeOnEsc );
        });

        it('should open modal on load when \'openOnLoad\' is true', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({openOnLoad:true});
            assert.isTrue( inst.container.hasClass('is-open') );
        });

        it('should be able to update \'closeOnEsc\' setting from html', function () {
            document.body.innerHTML = template.openOnLoad;
            var inst = $('#modal').modal();
            assert.isTrue( inst.settings.openOnLoad );
        });

        it('should be able to add function to \'onInit\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({
                onInit: function() {
                    this.test = "foo";
                }
            });
            assert.match( inst.test, /foo/ );
        });

        it('should be able to add function to \'onOpen\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({
                onOpen: function() {
                    this.test = "bar";
                }
            });
            inst.open();
            assert.match( inst.test, /bar/ );
        });

        it('should be able to add function to \'onClose\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal({
                onClose: function() {
                    this.test = "bar";
                }
            });
            inst.close();
            assert.match( inst.test, /bar/ );
        });

    });

    describe('open()', function () {

        it('should add overflow:hidden style to body', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.match( document.body.style.getPropertyValue('overflow'), /hidden/ );
        });

        it('should add active class and update aria-hidden on mask', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.match( inst.container.attr('aria-hidden'), /false/ );
            assert.isTrue( inst.container.hasClass('is-open') );
        });

        it('should update tabindex and focus on source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.match( inst.source.attr('tabindex'), /0/ );
            assert.notStrictEqual( inst.source[0], document.activeElement );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal();
            inst.open( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('close()', function () {

        it('should remove overflow:hidden style from body', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.match( document.body.style.getPropertyValue('overflow'), /hidden/ );
            inst.close();
            assert.lengthOf( document.body.style.getPropertyValue('overflow'), 0 );
        });

        it('should remove active class and update aria-hidden on mask', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.match( inst.container.attr('aria-hidden'), /false/ );
            assert.isTrue( inst.container.hasClass('is-open') );
            inst.close();
            assert.match( inst.container.attr('aria-hidden'), /true/ );
            assert.isFalse( inst.container.hasClass('is-open') );
        });

        it('should update tabindex and focus on trigger element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open().close();
            assert.match( inst.source.attr('tabindex'), /-1/ );
            assert.notStrictEqual( document.querySelector('[data-role="open"]'), document.activeElement );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal();
            inst.close( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('toggle()', function () {

        it('should open modal if it is closed', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal();
            assert.isFalse( inst.container.hasClass('is-open') );
            inst.toggle();
            assert.isTrue( inst.container.hasClass('is-open') );
        });

        it('should close modal if it is open', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.isTrue( inst.container.hasClass('is-open') );
            inst.toggle();
            assert.isFalse( inst.container.hasClass('is-open') );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal();
            inst.toggle( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('isOpen()', function () {

        it('should return true if modal is open', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal().open();
            assert.isTrue( inst.isOpen() );
        });

        it('should return false if modal is closed', function () {
            document.body.innerHTML = template.default;
            var inst = $('#modal').modal();
            assert.isFalse( inst.isOpen() );
        });

    });

});
