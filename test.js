global.window = global;
var assert = require('assert');
require('./md.js');

describe('define', function(){
    it('exports', function(){
        define('a', function(require, exports){
            exports.name = 'hello';
        });
        define(function(require){
            var a = require('a');
            assert.equal('hello', a.name);
        });
    });
    it('module.exports', function(){
        define('b', function(require, exports, module){
            exports.name = 'hello';
            module.exports = {};
            module.exports.name = 'world';
        });
        define(function(require){
            var b = require('b');
            assert.equal('world', b.name);
        });
    });
    it('without factory', function(){
        define('c', '123');
        define('d', 123);
        define('e', [1,2,3]);
        define(function(require){
            assert.strictEqual('123', require('c'));
            assert.strictEqual(123, require('d'));
            assert.deepEqual([1,2,3], require('e'));
        });
    });
    it('cyclic module dependencies', function(){
        define('f', function(require, exports){
            exports.name = 'f';
            var g = require('g');
            assert.strictEqual('g+', g.name);
            assert.strictEqual('f', g.getName());
            exports.name = 'f+';
            assert.strictEqual('f+', g.getName());
        });
        define('g', function(require, exports){
            exports.name = 'g';
            var f = require('f');
            assert.strictEqual('f', f.name);
            exports.name = 'g+';
            exports.getName = function(){
                return f.name;
            };
        });
        define(function(require){
            var f = require('f');
            var g = require('g');
            assert.strictEqual('f+', f.name);
            assert.strictEqual('g+', g.name);
        });
    });
    it('redeclare module', function(){
        assert.throws(function(){
            define('a', 123);
        }, Error);
    });
    it('require undefined module', function(){
        define(function(require){
            assert.throws(function(){
                require('z');
            }, Error);
        });
    });
});