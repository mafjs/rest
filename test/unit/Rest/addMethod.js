require('source-map-support').install();

var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../package';

var RestError = require(root + '/Error');

t.test('should call validateHttpParam', function (t) {

    var logger = {
        debug: function () {

        },
        trace: function () {

        }
    };

    var config = {
        a: 1
    };

    var httpParam = {method: 'GET', path: '/test'};

    var Rest = proxyquire(root + '/Rest', {
        './methods/validateHttpParam': function (_logger, _config, _httpParam) {
            t.same(_logger, logger);
            t.same(_config, config);
            t.same(_httpParam, httpParam);
            t.end();
        },
        './methods/validateMethod': function () {

            return new Promise((resolve) => {
                resolve({});
            });

        }
    });

    var rest = new Rest(logger, config);

    rest.addMethod(httpParam, {});

});


t.test('should call validateMethod', function (t) {

    var logger = {
        debug: function () {

        },
        trace: function () {

        }
    };

    var config = {
        a: 1
    };

    var httpMethod = {handler: function () {}};

    var Rest = proxyquire(root + '/Rest', {
        './methods/validateHttpParam': function () {

            return new Promise((resolve) => {
                resolve({method: 'GET', path: '/test'});
            });

        },
        './methods/validateMethod': function (_logger, _config, _httpParam, _httpMethod) {

            t.same(_logger, logger);
            t.same(_config, config);
            t.same(_httpParam, {method: 'GET', path: '/test'});
            t.same(_httpMethod, httpMethod);
            t.end();


            return new Promise((resolve, reject) => {
                resolve({});
            });

        }
    });

    var rest = new Rest(logger, config);

    rest.addMethod('httpParamStub', httpMethod);

});
