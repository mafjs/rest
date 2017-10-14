const tap = require('tap');
const request = require('supertest');

const restService = require(`${__dirname}/rest-service`);

const createService = () => restService();

tap.test('should create service', (t) => {
    createService();
    t.done();
});

tap.test('should 200 GET /api/test', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/test')
            .query({test: 'query-test'})
            .expect(200)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {middlewares: [
                    'beforeInit',
                    'inited1',
                    'inited2',
                    'validated',
                    'handler'
                ]});
                t.done();
        });
    });
});

tap.test('should 200 GET /api/result', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/result')
            .expect(200)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {result: 'result'});
                t.done();
        });
    });
});

tap.test('should 200 POST /api/test', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .post('/api/test')
            .send({id: 100})
            .expect(200)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {result: {id: 100}});
                t.done();
        });
    });
});

tap.test('should 404 GET /api/unknown_resource', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/unknown_resource')
            .expect(404)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'RESOURCE_NOT_FOUND',
                    message: 'resource not found'
                }});
                t.done();
        });
    });
});


tap.test('should 400 GET /api/bad_request', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/bad_request')
            .expect(400)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'INVALID_DATA',
                    list: [{a: 1}],
                    message: 'invalid data'
                }});
                t.done();
        });
    });
});

tap.test('should 404 GET /api/not_found', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/not_found')
            .expect(404)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'NOT_FOUND',
                    entity: 'task',
                    list: [{a: 1}],
                    message: 'task not found'
                }});
                t.done();
        });
    });
});

tap.test('should 500 GET /api/server_error', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/server_error')
            .expect(500)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'SERVER_ERROR',
                    message: 'Server Error'
                }});
                t.done();
        });
    });
});

tap.test('should 403 GET /api/forbidden', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/forbidden')
            .expect(403)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'FORBIDDEN',
                    message: 'access forbidden'
                }});
                t.done();
        });
    });
});


tap.test('should 401 GET /api/unauthorized', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/unauthorized')
            .expect(401)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'UNAUTHORIZED',
                    message: 'auth required'
                }});
                t.done();
        });
    });
});


tap.test('should 409 GET /api/conflict', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/conflict')
            .expect(409)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'ALREADY_EXISTS',
                    message: 'conflict'
                }});
                t.done();
        });
    });
});

tap.test('should 500 GET /api/maf_error', (t) => {
    return createService()
        .then((app) => {
            return request(app)
            .get('/api/maf_error')
            .expect(500)
            .then((res) => {
                t.type(res.headers['x-request-id'], 'string');
                t.same(res.body, {error: {
                    code: 'SERVER_ERROR',
                    message: 'Server Error'
                }});
                t.done();
        });
    });
});
