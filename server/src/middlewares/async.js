const asyncHandle = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch()
}

module.exports = asyncHandle