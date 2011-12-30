var events =  mongoose.model('Event');
var movieDetails =  mongoose.model('MovieDetail');
var async = require('async');

var tmdb = require('../Media/Scraper/Tmdb').init({
    apikey:'5a6a0d5a56395c2e497ebc7c889ca88d'
});

function Movie () {
}

Movie.prototype.fetchInformation = function (movie, callback) {
    movieDetails.findOne({'epg_name': movie.title}, function (err, doc) {
        if (doc == null) {
            log.dbg('Fetching informations for: ' + movie.title);

            tmdb.Movie.search({
                //query: movie.title + ((movie.year !== undefined) ? ' ' + movie.year : ''),
                query: movie.title,
                lang: 'de'
            }, function (err, res) {
                if(typeof(err) != 'undefined') {
                    callback.call();
                    return;
                }

                async.map(res, function (tmdbMovie, callback) {
                    if (tmdbMovie == "Nothing found.") {
                        callback.call();
                        return;
                    }

                    tmdb.Movie.getInfo({
                        query: tmdbMovie.id.toString(),
                        lang: 'de'
                    }, function (err, res) {
                        if(typeof(err) != 'undefined') {
                            callback(null, null);
                            return;
                        }

                        res = res[0];

                        log.dbg('Found movie with name: ' + res.name);

                        if (res.name == movie.title) {
                            res.tmdbId = tmdbMovie.id;

                            var movieDetailsSchema = new movieDetails(res);
                            movieDetailsSchema.save(function () {
                                movie.set({tmdbId: movieDetailsSchema._id});
                                movie.save(function () {
                                    log.dbg('Movie details saved .. ');
                                    callback('fin', null);
                                });
                            });
                        } else {
                            callback(null, null);
                        }
                    });
                }, function (err, results) {
                    callback.call();
                });
            });
        } else {
            callback.call();
        }
    });
};

Movie.prototype.fetchAll = function () {
    var self = this;
    var query = events.find({tmdbId: {$exists: false}});

    query.where('category', new RegExp('film', 'ig'));

    query.each(function (err, movie, next) {
        if (movie == null) {
            log.dbg('Fetching movies finished ..');
            return;
        }

        if (movie.title === undefined) {
            next();
            return;
        }

        self.fetchInformation(movie, next);
    });
};

module.exports = Movie;