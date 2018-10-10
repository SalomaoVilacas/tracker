module.exports = function(app) {

    let testDAO = app.dao.testDAO;

    app.post('/test', function(req, res) {

        res.send("ok");
    });
};