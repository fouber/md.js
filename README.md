# Usage

## index.html

```html
<script src="amd.js"></script>

<script>

define('sayHi', function(require, exports, module){
    module.exports = function(msg){
        console.log('hi, %s', msg);
    };
});

</script>

<script>

define(function(require){
    
    var hi = require('sayHi');
    hi('fouber'); // hi, fouber
    
});

</script>
```
