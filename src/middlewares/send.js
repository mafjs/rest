module.exports = function (req, res) {

    if (!res.httpContext) {

        return res.status(404).json({
            error: {
                message: 'resource not found',
                code: 'RESOURCE_NOT_FOUND'
            }
        });

    }

    res.requestEnd();

    var context = res.httpContext;

    if (req.debug) {
        context.body.debug = {
            requestId: req.id,
            time: res.httpContext.time
        };
    }

    res.json(context.body);
};
