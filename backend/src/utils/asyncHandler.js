const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Automatically resolves the function and passes any errors to the 'next' middleware
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };