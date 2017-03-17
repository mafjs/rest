module.exports = function (logger, config, app, method) {

    return new Promise((resolve) => {

        var middlewares = [];

        var httpMethod = method.http.method.toLowerCase();
        var httpPath = method.http.path;

        logger.debug(`add http method`, httpMethod, httpPath);

        app[httpMethod](httpPath, middlewares, method.handler);

        resolve(httpMethod);

    });

};
