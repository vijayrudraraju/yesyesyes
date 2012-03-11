// lib/app.js
exports.shows = {
    article: function(doc,req) {
        var handlebars = require('handlebars');

        var context = {body:doc.body};
        var html = handlebars.templates['article.html'](context);

        return html;
    }
};

exports.rewrites = [
    {from:'/blawks/_design/one/*',to:'*'},
    {from:'/yyy/*',to:'../../*'},
    {from:'',to:'index.html'},
    {from:'*',to:'*'}
];
