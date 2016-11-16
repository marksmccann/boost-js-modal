/**
 * Boost JS Modal
 * A style-free modal plugin for jQuery and Boost JS
 * @author Mark McCann (www.markmccann.me)
 * @license MIT
 * @version 0.0.1
 * @requires jQuery, boost-js
 */

(function(){

    var Modal = function() {
        // local instance
        var inst = this;
    }

    Modal.prototype = {
    }

    var plugin = {
        plugin: Modal,
        defaults: {
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
