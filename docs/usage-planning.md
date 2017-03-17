# usage planning


# base usage

```js
var Rest = require('maf-rest');

var config = {
    strictResourceValidation: false,
    strictMethodValidation: false
};

var rest = new Rest(logger, config);

rest.setEndpoint({
    title: '',
    description: '',
    endpoint: '/api/v1'
});

// OR

rest.setEndpoint('/api/v1');

rest.addResource({

    name: 'tasksById',

    path: '/tasks/:id',

    methods: {
        GET: {
            handler: function (req, res) {
                res.json(req.params.id);
            }
        },

        POST: {
            // ...
        }
    }

});

var express = require('express');

var app = express();

app.use(require('body-parser').json());

rest.init(app);

app.use(function (req, res) {
    // your middlewares after rest middlewares
});

app.listen(8080);

```


# adding methods

```js

var rest = new Rest();


rest.addMethod('GET /tasks/:id', {
    // method object
});

rest.addMethod('POST /tasks/:id', {
    // method object
});

rest.addMethod(
    {
        method: 'POST',
        path: '/tasks/:id'
    },
    {
        
    }
);

rest.addMethods({
    'GET /tasks/:id': {},
    'POST /tasks/:id': {}
});

```
