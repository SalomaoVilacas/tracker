module.exports = function(app) {

    let testDAO = app.dao.testDAO;

    app.post('/test', function(req, res) {

        res.status(200).json();
    });
};