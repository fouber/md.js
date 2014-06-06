# Usage

## index.html

```html
<script src="amd.js"></script>

<script>
//define a module
define('sayHi', function(require, exports, module){
    //export a function
    module.exports = function(msg){
        console.log('hi, %s', msg);
    };
});
</script>

<script>
define(function(require){
    //require module
    var hi = require('sayHi');
    hi('fouber'); // hi, fouber
});
</script>
```
