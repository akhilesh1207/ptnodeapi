var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET metabase page. */
router.get('/metabase', function (req, res, next) {
    var jwt = require("jsonwebtoken");

    var METABASE_SITE_URL = "http://localhost:3000";
    var METABASE_SECRET_KEY = "2e29d711e8de0656c4bc8e778ef2f262b9a5e44218b2b0f68d81eee315639f9d";

    var payload = {
        resource: { dashboard: 1 },
        params: {}
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);

    var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#theme=night&bordered=true&titled=true";

    res.render('metabase', { iframeUrl: iframeUrl });
});
  
module.exports = function (app) {
    app.use('/', router);
};