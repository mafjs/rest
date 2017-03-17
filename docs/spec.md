# maf-rest 0.x spec

based on express for http requests processing

joi used for resource object validation

## config

```js
// config should be an object or maf-config instance
{
    strictResourceValidation: false, // if true joi.unknown(false) in resource schema
    strictMethodValidation: false,   // if true joi.unknown(false) in method schema
}
```

## REST API resource

```
[HTTP method] /[endpoint]/[path]?[query]
[headers]
[body]
```

# resource object specification

every resource described as object

```js
module.exports = {

    path: '[path]', // url path without endpoint

    title: '', // short resource title, what resource do

    description: '', // markdown description of resource

    // HTTP methods of resource
    // every method chain of express middlewares for read, parse, validate and convert http request data
    methods: {
        GET: { // key of object is HTTP method

            title: '' //short resource method title

            description: '', // markdown description of resource method

            schema: { // joi schema validate and convert all part of express request object
                path: joi.object().keys({}),    // req.params
                query: joi.object().keys({}),   // req.query
                headers: joi.object().keys({}), // req.headers
                body: joi.object().keys({})     // req.body
                cookies: joi.object().keys({})  // req.cookies
            },

            handler: function (req, res) {} // handler function
        },
        POST: {
            // ...
        },
        PATCH: {
            // ...
        },
        PUT: {
            // ...
        },
        DELETE: {
            // ...
        },
        OPTIONS: {
            // ...
        }
    }
};
```

# resource prepare process

prepare resource object before creation

```js

var rawResource = {
    // here your object created by resource object specification
};

// validate rawResource object with joi schema without convertation any values
// if validation fails throw RestError code = INVALID_RESOURCE_OBJECT
var resourceSchema = joi.object()
    .required()
    .unknown(false) // this option can be changed with config.strictResourceValidation = true
    .keys({
        path: joi.string().required(), // TODO validate uri path
        title: joi.string(),
        description: joi.string(),
        methods: joi.object()
            .required()
            .unknown(false) // this option can be changed with config.strictResourceValidation = true
            .min(1)
            .keys({
                GET: joi.object().keys({ /* method schema */}),
                POST: joi.object().keys({ /* method schema */}),
                PATCH: joi.object().keys({ /* method schema */}),
                PUT: joi.object().keys({ /* method schema */}),
                DELETE: joi.object().keys({ /* method schema */}),
                OPTIONS: joi.object().keys({ /* method schema */}),
            })
    });

// on server startup maf-rest creates blank resource object with format

var resource = {

    path: null,
    title: null,
    description: null,
    methods: {}

};

// get path, title, description from rawResource

// next prepare resource methods

// iterate rawResource.methods
// validate every method by joi schema without convertation

var methodSchema = joi.object()
    .required()
    .unknown(false) // this option can be changed with config.strictMethodValidation = true
    .keys({
        title: joi.string(),
        description: joi.string(),
        schema: joi.object()
            .unknown(false) // this option can be changed with config.strictMethodValidation = true
            .keys({
                path: joi.object(),             // every object here should be a joi schema object
                query: joi.object().keys({}),   // req.query
                headers: joi.object().keys({}), // req.headers
                body: joi.object().keys({})     // req.body
                cookies: joi.object().keys({})  // req.cookies
            }),
        handler: joi.func().required()
    });




```
