$(function() {
    var _DBNAME = 'yyy';

    Backbone.couch_connector.config.db_name = _DBNAME;
    Backbone.couch_connector.config.ddoc_name = "one";

    window.PageModel= Backbone.Model.extend({
        url: '/pages'
    }); 
    window.PageCollection = Backbone.Collection.extend({ 
        model: PageModel,
        db: {
            view: "all" 
        }
    });

    window.Pages = new PageCollection;

    window.AllView = Backbone.View.extend({
        initialize: function() {
            Pages.on('reset', this.onReset, this);
            Pages.fetch({success: function() { console.log('all fetch success');}});

            $('li').live('mouseover',function() {
                $('.cell').each(function() {
                    $('.label',this).toggle(false);
                });
                $('.label',this).toggle(true);
            });
            $('li').live('mouseout',function() {
                $('.cell').each(function() {
                    $('.label',this).toggle(false);
                });
            });
        },
        onReset: function(coll,resp) {
            console.log('onReset all');

            $('.grid').html('');

            for (var i=Pages.length-1;i>=0;i--) {
                this.addOne(Pages.at(i));
            }

            $('.cell').each(function() {
                $('.label',this).toggle(false);
            });
            var rows = Math.ceil($('.cell').length/4);
            $('.homepage-section').height(rows*180);
        },
        addOne: function(model) {
            var linkText = '';
            if (model.get('text'))
                linkText = '_show/textArticle/'+model.id;
            else if (model.get('filenames'))
                linkText = '_show/imagesArticle/'+model.id;
            else if (model.get('videos'))
                linkText = '_show/videosArticle/'+model.id;
            else if (model.get('tracks'))
                linkText = '_show/musicArticle/'+model.id;

            $('.grid').append('<li class="cell"><img src="/'+_DBNAME+'/'+model.id+'/'+model.get('covername')[0]+'" class="thumbnail"></img><a class="link" href="'+linkText+'"><div class="label"><h3>'+model.get('author')+'</h3><h3>'+model.get('title')+'</h3></div></a></li>').find('.label').toggle(false);
        }
    });
    window.All = new AllView({ el: $('#all-section')  });

});

/*
var dbName = 'yyy';

var articlesDocName = 'articles';
var authorsDocName = 'authors';

var articlesDoc = {};
var authorsDoc = {};

var authorDocs = [];

function loadAuthors() {
    for (var i=0;i<authorsDoc.data.length;i++) {
        $.couch.db(dbName).openDoc(authorsDoc.data[i].docid, {
            success: function(data) {
                console.log(data);
                authorDocs.push(data);
            },
            error: function(data) {
                console.log(data);
            }
        });
    }

    $.couch.db(dbName).openDoc('articles', {
        success: function(data) {
            console.log('articles doc opened');
            console.log(data);
            console.log(authorsDoc);
            articlesDoc = data;
            updateGrid();
        },
        error: function(data) {
            console.log(data);
        }
    });
}
function clearAuthors() {
    authorDocs = [];
}

function updateGrid() {
    for (var i=articlesDoc.data.length-1;i>=0;i--) {
        console.log('updateGrid');
        $.couch.db(dbName).openDoc(articlesDoc.data[i].docid, {
            success: function(data) {
                console.log('article doc loaded');
                console.log(data.author);
                console.log(authorDocs);
                for (var j=0;j<authorDocs.length;j++) {
                    if (data.author === authorDocs[j].author) {
                        //$('#articles-grid').append('<li><a class=" href="_show/article/'+data._id+'"><img class="thumbnail" src="/'+dbName+'/'+authorDocs[j]._id+'/'+authorDocs[j].logo+'" alt=""></a></li>');
                        //$('.grid').append();
                        $('.grid').append('<li class="cell"><img src="/'+dbName+'/'+authorDocs[j]._id+'/'+authorDocs[j].logo+'" class="thumbnail"></img><a class="link" href="_show/article/'+data._id+'"><div class="label"><h3>'+data.title+'</h3><h3>'+data.author+'<h3></div></a></li>').find('.label').toggle(false);
                    }
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
    $('.cell').each(function() {
        $('.label',this).toggle(false);
    });
}
function clearGrid() {
    $('.grid').html('');
}


$(function(){
    clearGrid();

    $('li').live('mouseover',function() {
        $('.cell').each(function() {
            $('.label',this).toggle(false);
        });
        $('.label',this).toggle(true);
    });
    $('li').live('mouseout',function() {
        $('.cell').each(function() {
            $('.label',this).toggle(false);
        });
    });

    $.couch.db(dbName).openDoc('authors', {
        success: function(data) {
            console.log('authors doc opened');
            console.log(data);
            authorsDoc = data;
            clearAuthors();
            loadAuthors();
        },
        error: function(data) {
            console.log(data);
        }
    });

});
*/
