// lib/app.js
exports.shows = {
    article: function(doc,req) {
        var handlebars = require('handlebars');

        var context = {body:doc.body};
        var html = handlebars.templates['article.html'](context);

        return html;
    }
};
