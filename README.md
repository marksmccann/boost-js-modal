Boost JS Modal [![Build Status](https://travis-ci.org/marksmccann/boost-js-modal.svg?branch=master)](https://travis-ci.org/marksmccann/boost-js-modal)
==================================================
A style-free and accessible modal plugin for jQuery and [Boost JS](https://github.com/marksmccann/boost-js). This plugin only includes styles absolutely necessary for the modal to work properly, the rest is up to you.


Installation
--------------------------------------
Install with npm:
```bash
npm install boost-js-modal
```
Install in browser:
```html
<script src="https://cdn.rawgit.com/marksmccann/boost-js-modal/v0.1.0/dist/modal.min.js"></script>
```
___________

AND include styles:

```html
<link rel="stylesheet" href="https://cdn.rawgit.com/marksmccann/boost-js-modal/v0.1.0/dist/modal.min.css">
```

Usage
--------------------------------------

### Create Plugin
```javascript
var boost = require('boost-js');
// var boost = $.fn.boost; (browser install)

var modal = require('boost-js-modal');
// var modal = $.fn.boost.modal; (browser install)

$.fn.modal = boost( modal.plugin, modal.defaults );
```

### Markup Structure
```html
<div id="modal">
    <h2 data-bind="#modal" data-role="heading">Heading</h2>
    <button data-bind="#modal" data-role="close">Close</button>
</div>
<button data-bind="#modal" data-role="open">Open</button>
```
*Tip: Add `style="display:none;"` to your source element if your modal is momentarily visible before the app is able to hide it; the attribute will be removed after instantiation.*

*Note: `data-bind` is used to link the element to the instance, `data-role` is used to define the element's role in that instance. See [Boost JS](https://github.com/marksmccann/boost-js) for more details.*


### Instantiate Plugin
```javascript
$('#modal').modal();
```

Options
--------------------------------------
Name | Default | Description
--- | --- | ---
activeClass* | `"is-open"` | the class added to the outer container when active
wrapClass* | `"modal-wrap"` | the class added to the inner container of the modal
maskClass* | `"modal-mask"` | the class added to the mask/outer-most container of the modal
effect | `null` | an optional animation for modal, see below for details
closeOnClickOff | `true` | close the modal if user clicks anywhere off of it
closeOnEsc | `true` | close the modal when user presses the esc key
openOnLoad | `false` | open the modal at instantiation (page load)
onOpen | `null` | a callback function called when the modal is opened
onClose | `null` | a callback function called when modal is closed
onInit | `null` | a callback function called when modal is initialized
**Note: if you change any of the class names, you will have to update the same classes in the css as well.*
### Usage
```javascript
$('#modal').modal({
    onInit: function() {
        console.log( this.id ); // 'modal'
    }
});
```
\- or -
```html
<div id="modal" data-open-on-load="true">...</div>
```

Roles
--------------------------------------
Name | Element | Description
--- | --- | ---
open | `a`, `button` | defines a trigger that opens the modal
close | `a`, `button` | defines a trigger that closes the modal
toggle | `a`, `button` | defines a trigger that toggles the modal open and closed
heading | `h2` | used to define the modal with a `aria-labelledby` on container
end | `a`, `button` | defines the lest focusable element in modal for blur event
### Usage
```html
<button data-bind="[instance-id]" data-role="[role-name]">...</button>
```

Effects
--------------------------------------
1. scale-up
2. scale-down
3. slide-left
4. slide-right
5. slide-up
6. slide-down
7. sticky-top
8. horizontal-flip
9. vertical-flip
10. spin-up
11. spin-down
12. fall-left
13. fall-right
14. swing-down
15. swing-up
16. swing-left
17. swing-right
18. front-flip
19. back-flip

### Usage
Include the effects stylesheet
```html
<link rel="stylesheet" href="https://cdn.rawgit.com/marksmccann/boost-js-modal/v0.1.0/dist/effects.min.css">
```
Then update the setting
```html
<div id="modal" data-effect="scale-up">...</div>
```

API
--------------------------------------
### open( fn )
Opens the modal. `fn`: optional callback function called after opening.
```javascript
instance.open();
```
### close( fn )
Closes the modal. `fn`: optional callback function called after opening.
```javascript
instance.close();
```
### toggle( fn )
Closes the modal if it is open and opens the modal if it is closed. `fn`: optional callback function called after opening.
```javascript
instance.toggle();
```
### isOpen()
Determines if modal is open or not, returns a boolean.
```javascript
instance.isOpen();
```
### lastOpenedBy
The element last triggered to open this modal. After the modal is closed, this value returns to `null`.
```javascript
instance.lastOpenedBy;
```
### container
The outer-most containing element for the modal.
```javascript
instance.container;
```

Running Tests
--------------------------------------

```bash
$ npm install && npm test
```


License
--------------------------------------

Copyright © 2016, [Mark McCann](https://github.com/marksmccann).
Released under the [MIT license](LICENSE).
