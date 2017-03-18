# usage planning

<!-- toc -->
<!-- tocstop -->


# base


```js

var Rest = require('maf-rest');

var rest = new Rest(logger, config);

rest.helpers.request = {

};

rest.helpers.response = {
    result: function (result, metadata) {

    },

    serverError: function () {

        req.di.logger.error(error);

        res.status(500).json({
            error: {
                message: 'Server Error',
                code: 'SERVER_ERROR'
            }
        });

    },
    badRequest: function () {

    },
    notFound: function () {

    },

};

rest.addMethods({
    'GET /tasks/:id': {
        handler: function (req, res) {
            var tasksApi = req.di.api.get('tasks');

            tasksApi.exists(req.params.id)
                .then((task) => {
                    res.result(task);
                })
                .catch(function (error) {
                    error.getCheckChain()
                        .ifCode('INVALID_DATA', res.badRequest)
                        .else(res.serverError)
                        .end();
                });
        }
    },
    'POST /tasks': {
        handler: function (req, res) {

        }
    },
    'GET /test': function (req, res) {
        res.result({});
    }
})

```
