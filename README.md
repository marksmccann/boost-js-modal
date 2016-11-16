Boost JS Modal
==================================================
A style-free modal plugin for jQuery and [Boost JS](https://github.com/marksmccann/boost-js). While other plugins style and arrange your carousel for you, this plugin only handles the functionality, leaving the layout and styling up to you.


Installation
--------------------------------------
Install with npm:
```bash
npm install boost-js-modal
```
Install in browser:
```html
<script src="https://cdn.rawgit.com/marksmccann/boost-js-modal/master/dist/modal.min.js"></script>
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
```
*Note: `data-bind` is used to link the element to the instance, `data-role` is used to define the element's role in that instance. See [Boost JS](https://github.com/marksmccann/boost-js) for more details.*

### Instantiate Plugin
```javascript
$('#modal').modal();
```

Options
--------------------------------------
Name | Default | Description
--- | --- | ---
activeClass | `"is-open"` | the class added to handle and drawer when active
onInit | `null` | a callback function called when plugin is intialized
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
<div id="modal" data-="">...</div>
```

API
--------------------------------------
### method( ... )
some description
```javascript
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
