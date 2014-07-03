(function(global){
    var factorys = {};
    var modules = {};
    global.define = function(id, factory){
        switch (typeof id){
            case 'string':
                if(typeof factory === 'function'){
                    factorys[id] = factory;
                } else {
                    modules[id] = factory;
                }
                break;
            case 'function':
                id(require);
                break;
        }
    };
    var require = function(id){
        if(modules.hasOwnProperty(id)){
            return modules[id];
        } else if(factorys.hasOwnProperty(id)) {
            var module = {};
            var exports = module.exports = modules[id] = {};
            exports = factory(require, exports, module);
            return (modules[id] = (typeof exports === 'undefined') ? module.exports : exports);
        } else {
            throw 'undefined module [' + id + ']';
        }
    };
})(window);