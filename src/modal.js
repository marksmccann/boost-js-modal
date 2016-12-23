/**
 * Boost JS Modal
 * A style-free modal plugin for jQuery and Boost JS
 * @author Mark McCann (www.markmccann.me)
 * @license MIT
 * @version 0.1.1
 * @requires jQuery, boost-js
 */

(function(){

    var Modal = function() {
        // local instance
        var inst = this;
        // the last trigger used to open the modal
        inst.lastOpenedBy = null;
        // wrap the source element with the inner container
        inst.source.wrap( $(document.createElement('div'))
            .addClass( inst.settings.wrapClass )
            .attr('role','document')[0]
        );
        // wrap the inner container with the outer container
        inst.source.parent().wrap( $(document.createElement('div'))
            .addClass( inst.settings.maskClass )
            .attr('role','dialog')
            .attr('aria-hidden','true')[0]
        );
        // save the outermost container to instance
        inst.container = inst.source.parent().parent();
        // if there is a heading element
        // add aria-labelledby="[headingID]" to source element
        // if heading does not have an id, create a new one and add it
        if( inst.roles.hasOwnProperty('heading') ) {
            var id = inst.roles.heading.attr('id');
            id = id ? id : inst.id+'-heading';
            inst.container.attr('aria-labelledby',id);
            inst.roles.heading.first().attr('id', id);
        }
        // if effect setting is set, add the class to inner container
        if( typeof inst.settings.effect === 'string' ) {
            inst.container.children().first().addClass( inst.settings.effect );
        }
        // if modal hidden from style attribute, make visible
        if( inst.source[0].style.getPropertyValue('display') == 'none' ) {
            inst.source[0].style.removeProperty('display');
        }
        // triggers that open the modal
        if( inst.roles.hasOwnProperty('toggle') ) {
            inst.roles.toggle.on('click', function(e){
                e.preventDefault();
                if( !inst.isOpen() ) {
                    inst.lastOpenedBy = this;
                }
                inst.toggle();
            });
        }
        // triggers that open the modal
        if( inst.roles.hasOwnProperty('open') ) {
            inst.roles.open.on('click', function(e){
                e.preventDefault();
                inst.lastOpenedBy = this;
                inst.open();
            });
        }
        // triggers that close the modal
        if( inst.roles.hasOwnProperty('close') ) {
            inst.roles.close.on('click', function(e){
                e.preventDefault();
                inst.close();
            });
        }
        // close modal if users clicks anywhere off of it
        inst.container.on( 'click', function(e){
            if( inst.settings.closeOnClickOff ) {
                if( e.target == this ) inst.close();
            }
        });
        // close modal with 'esc' key
        $('body').on( 'keyup', function(e){
            if( inst.settings.closeOnEsc ) {
                if(!e.keyCode || e.keyCode === 27) inst.close();
            }
        });
        // throw focus back to source on blur of end element
        if( inst.roles.hasOwnProperty('end') ) {
            inst.roles.end.on('blur',function(){
                inst.source[0].focus();
            });
        }
        // throw focus back to source if the user
        // focuses on any element not in the modal
        $('body').on( 'keyup', function(e){
            if( inst.isOpen() && !inst.container[0].contains(document.activeElement) ) {
                e.stopPropagation(); inst.source[0].focus();
            }
        });
        // move element to top of document for accessibility
        document.body.insertBefore( inst.container[0], document.body.firstChild );
        // open modal if set to true
        if( inst.settings.openOnLoad ) inst.open();
        // run the onInit callback
        if( $.isFunction(inst.settings.onInit) ) inst.settings.onInit.call(inst);
    }

    Modal.prototype = {
        /**
         * opens the modal
         * @param  {function} callback
         * @return {instance}
         */
        open: function ( callback ) {
            var inst = this;
            // prevent body from scrolling on mobile devices
            $('body').css('overflow','hidden');
            // show the modal
            inst.container.addClass( inst.settings.activeClass );
            inst.container.attr( 'aria-hidden', 'false' );
            // for accessibility, add tab-index and set focus on modal
            inst.source.attr( 'tabindex', '0' );
            setTimeout( function(){ inst.source[0].focus(); }, 25 );
            // run the callbacks
            if( $.isFunction(callback) ) callback.call(inst);
            if( $.isFunction(inst.settings.onOpen) ) inst.settings.onOpen.call(inst);
            // return instance
            return inst;
        },
        /**
         * closes the modal
         * @param  {function} callback
         * @return {instance}
         */
        close: function ( callback ) {
            var inst = this;
            // remove overflow style from body
            document.body.style.removeProperty('overflow');
            // hide the modal
            inst.container.removeClass( inst.settings.activeClass );
            inst.container.attr( 'aria-hidden', 'true' );
            // for accessiblity, change tab-index and return focus to trigger
            inst.source.attr( 'tabindex', '-1' );
            if( inst.lastOpenedBy !== null ) {
                inst.lastOpenedBy.focus();
                inst.lastOpenedBy = null;
            }
            // run the callbacks
            if( $.isFunction(callback) ) callback.call(inst);
            if( $.isFunction(inst.settings.onClose) ) inst.settings.onClose.call(inst);
            // return instance
            return inst;
        },
        /**
         * toggles the modal
         * @param  {function} callback
         * @return {instance}
         */
        toggle: function ( callback ) {
            return this.isOpen() ? this.close( callback ) : this.open( callback );
        },
        /**
         * determines if the modal is open or not
         * @return {Boolean}
         */
        isOpen: function () {
            return this.container.hasClass( this.settings.activeClass );
        }
    }

    var plugin = {
        plugin: Modal,
        defaults: {
            activeClass: 'is-open',
            wrapClass: 'modal-wrap',
            maskClass: 'modal-mask',
            effect: null,
            closeOnClickOff: true,
            closeOnEsc: true,
            openOnLoad: false,
            onInit: null,
            onOpen: null,
            onClose: null
        }
    }

    // if node, return via module.exports
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = plugin;
    // otherwise, save object to jquery globally
    } else if( typeof window !== 'undefined' && typeof window.$ !== 'undefined' && typeof window.$.fn.boost !== 'undefined' ) {
        window.$.fn.boost.modal = plugin;
    }

})();
