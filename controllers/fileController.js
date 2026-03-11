async function uploadFile(req, res, next) {
    try {
        console.log(req.file, req.body);
        res.status(200).json({
            message: "File received",
            file: req.file,
            body: req.body,
        });
    } catch (err) {
        next(err)
    }
}
    

module.exports = {uploadFile};