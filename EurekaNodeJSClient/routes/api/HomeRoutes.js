module.exports = function (router) {
    router.get('/home', function (req, res) {
        // throw "error";
        // console.log("/home", test);
        res.json({ message: 'Express is up!' });
    })
};
