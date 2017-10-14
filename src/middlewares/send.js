module.exports = function middlewareSend(error, req, res, next) {
    if (error === 'send') {
        res.requestEnd();
        const {ctx} = res;
        res.status(ctx.status);
        // TODO headers
        return res.json(ctx.body);
    }

    return next(error);
};
