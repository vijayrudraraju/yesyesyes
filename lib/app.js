// lib/app.js
exports.shows = {
    homePage: function (doc,req) {
        var templates = require('duality/templates');

    },
    article: function (doc,req) {
        var templates = require('duality/templates');
        var formattedSections = [];
        for (var i=0;i<doc.sections.length;i++) {
            formattedSections[i] = doc.sections[i];
            if (doc.sections[i].text) {
                formattedSections[i].normText = formattedSections[i].text.replace(/\n/g, '<br/>');
            }
            if (doc.sections[i].image === '') {
                formattedSections[i].empty = true;
            }
        }
        //var formatted = doc.text.replace(/\n/g, '<br/>');
        //var context = {title:doc.title,author:doc.author,text:formatted};
        //var content = templates.render('article.html',req,context);
        var context = {sections:formattedSections,page_id:doc._id};
        //var html = templates.render('base.html',req,{content:content,title:doc.title,author:doc.author});
        var content = templates.render('article.html',req,context);
        var html = templates.render('base.html',req,{content:content,title:doc.title,author:doc.author});

        return html;
    },
    textArticle: function (doc,req) {
        var templates = require('duality/templates');
        var formatted = doc.text.replace(/\n/g, '</p><p>');
        var context = {title:doc.title,author:doc.author,text:formatted};
        var content = templates.render('textArticle.html',req,context);
        var html = templates.render('base.html',req,{content:content,title:doc.title,author:doc.author});

        return html;
    },
    imagesArticle: function (doc,req) {
        var templates = require('duality/templates');

        var context = {id:doc._id,title:doc.title,author:doc.author,filenames:doc.filenames,dbname:req.info.db_name};
        var content = templates.render('imagesArticle.html',req,context);
        var html = templates.render('base.html',req,{content:content,title:doc.title,author:doc.author});

        return html;
    },
    videosArticle: function (doc,req) {
        var templates = require('duality/templates');

        var context = {id:doc._id,title:doc.title,author:doc.author,videos:doc.videos,dbname:req.info.db_name};
        var content = templates.render('videosArticle.html',req,context);
        var html = templates.render('base.html',req,{content:content,title:doc.title,author:doc.author});

        return html;
    },
    musicArticle: function (doc,req) {
        var templates = require('duality/templates');

        var context = {id:doc._id,title:doc.title,author:doc.author,tracks:doc.tracks,dbname:req.info.db_name};
        var content = templates.render('musicArticle.html',req,context);
        var html = templates.render('base.html',req,{content:content,title:doc.title,author:doc.author});

        return html;
    }
};

exports.views = {
    all: {
        map: function(doc) {
            if (doc.collection && !doc.removed) {
                emit(doc.collection, doc);
            }
        }
    },
    texts: {
        map: function(doc) {
            if (doc.collection == 'pages' && doc.text) {
                emit(doc.collection, doc);
            }
        }
    },
    images: {
        map: function(doc) {
            if (doc.collection == 'pages' && doc.filenames) {
                emit(doc.collection, doc);
            }
        }
    },
    videos: {
        map: function(doc) {
            if (doc.collection == 'pages' && doc.videos) {
                emit(doc.collection, doc);
            }
        }
    },
    music: {
        map: function(doc) {
            if (doc.collection == 'pages' && doc.tracks) {
                emit(doc.collection, doc);
            }
        }
    }
};

exports.rewrites = [
    {from:'/yyy/_design/one/*',to:'*'},
    {from:'/yyy/*',to:'../../*'},
    {from:'',to:'index.html'},
    {from:'*',to:'*'}
];
