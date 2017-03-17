var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../package';

t.test('should return object if value object', function (t) {

    var fn = proxyquire(root + '/methods/validateHttpParam/prepare', {});

    var obj = {
        a: 1
    };

    t.same(fn(obj), obj);
    t.end();

});

t.test('should return httpParam object if value string', function (t) {

    var fn = proxyquire(root + '/methods/validateHttpParam/prepare', {});

    t.same(fn('GET /test/:id'), {
        method: 'GET',
        path: '/test/:id'
    });
    t.end();

});


t.test('should split string only by first space', function (t) {

    var fn = proxyquire(root + '/methods/validateHttpParam/prepare', {});

    t.same(fn('GET /test /:id'), {
        method: 'GET',
        path: '/test /:id'
    });

    t.same(fn('GET /test /   :id'), {
        method: 'GET',
        path: '/test /   :id'
    });

    t.same(fn('GET a b c'), {
        method: 'GET',
        path: 'a b c'
    });

    t.end();

});
