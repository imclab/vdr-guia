var async = require('async');
var channels = mongoose.model('Channel');
var events = mongoose.model('Event');
var movies = mongoose.model('MovieDetail');
var actorSchema = mongoose.model('Actor');

function fetchActorDetails (actors, callback) {
    var result = new Array();
    async.map(actors, function (actor, callback) {
        var query = actorSchema.findOne({_id: actor});

        query.populate('tmdbId', ['profile']);
        query.run(function (err, doc) {
            if (doc != null) {
                result.push(doc);
                callback(null, null);
            } else {
                callback(null, null);
            }
        });
    }, function (err, actorsResult) {
        callback(result);
    });
}

function Epg () {

}

Epg.prototype.getPrimetimeEvent = function (channl_id, day, callback) {
    var date = new Date(day);
    var primetime = new Date(date.getFullYear() + '-' + ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth()) + 1) + '-' + ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()) + ' 20:13:00');
    primetime = primetime.getTime() / 1000;

    var primetimeQuery = events.findOne({});

    primetimeQuery.where('channel_id', channl_id);
    primetimeQuery.where('start').gte(primetime);
    primetimeQuery.sort('start', 1);

    primetimeQuery.populate('actors');
    primetimeQuery.populate('tmdbId');

    primetimeQuery.exec(function (err, doc) {
        callback(doc);
    });
};

Epg.prototype.getTodaysHighlight = function (channel_id) {
    var query = events.findOne({'tmdbId.rating': {$exists: true}});

    if (channel_id !== undefined) {
        query.where('channel_id', channel_id);
    }

    query.populate('tmdbId');

    //query.or([{'tmdbId.rating': {$exists: true}}]);
    query.sort('tmdbId.rating', -1);

    query.run(function (err, result) {
        console.log(arguments);
    });
};

Epg.prototype._buildEvent = function (doc, callback) {
    async.parallel([
        function (callback) {
            if (doc.get('type') == 'series') {
                events.find({
                    title: doc.get('title'),
                    channel_id: doc.get('channel_id').get('_id'),
                    start: {
                        $gt: parseInt(new Date().getTime() / 1000)
                    }
                }, null, {
                    skip: 1,
                    limit: 10,
                    sort: {
                        start: 1
                    }
                }, function (err, docs) {
                    doc.set({broadcastings: docs});
                    callback();
                });
            } else {
                callback();
            }
        }, function (callback) {
            if (doc.get('tmdbId')) {
                if (doc.get('tmdbId').get('translated') === true) {
                    doc.set({description: doc.get('tmdbId').get('overview')});
                }

                if (doc.get('tmdbId').get('rating') !== undefined) {
                    doc.set({
                        rating: doc.get('tmdbId').get('rating'),
                        votes: doc.get('tmdbId').get('votes')
                    });
                }

                if (doc.get('tmdbId').get('posters') !== undefined) {
                    if (doc.get('tmdbId').get('posters').length > 0) {
                        doc.get('tmdbId').get('posters').forEach(function (poster) {
                            if (poster.image.size == 'cover') {
                                doc.set({image: poster.image.url});
                                return;
                            }
                        });
                    }

                    doc.set({posters: doc.get('tmdbId').get('posters')});
                }

                if (doc.get('tmdbId').get('backdrops') !== undefined) {
                    doc.set({backdrops: doc.get('tmdbId').get('backdrops')});
                }

                if (doc.get('tmdbId').get('cast') !== undefined) {
                    doc.set({crew: doc.get('tmdbId').get('cast')});
                }

                doc.set({actors: doc.get('tmdbId').get('actors')});
            } else {
                if (doc.get('rating') != null) {
                    doc.set({rating: doc.get('rating') * 2})
                }
            }

            if (doc.get('actors') != null && doc.get('actors').length > 0) {
                fetchActorDetails(doc.get('actors'), function (actors) {
                    doc.set({actorsFetched: actors});
                    callback();
                });
            } else {
                callback();
            }
        }
    ], function () {
        callback(doc);
    });
};

Epg.prototype.getEvent = function (eventId, callback) {
    var self = this;

    var query = events.findOne();
    query.where('_id', eventId);

    query.populate('channel_id');
    query.populate('actors');
    query.populate('tmdbId');
    query.populate('tmdbId.actors');

    query.run(function (err, doc) {
        if (doc == null) {
            callback(null);
            return;
        }

        self._buildEvent(doc, callback);
    });
};

Epg.prototype.getEvents = function (channelId, start, limit, callback) {
    var self = this;
    var date = new Date();

    var query = events.find({});

    query.where('channel_id', channelId);
    query.$gt('stop', date.getTime() / 1000);
    query.sort('start', 1);
    query.skip(start);
    query.limit(limit);

    query.populate('channel_id');
    query.populate('actors');
    query.populate('tmdbId');
    query.populate('tmdbId.actors');

    query.exec(function (err, docs) {
        var result = new Array();

        docs.forEach(function (doc) {
            self._buildEvent(doc, function (event) {
                result.push(event);
            });
        });

        callback(result);
    });
};

Epg.prototype.searchEvents = function (q, limit, callback) {
    var self = this;

    var query = events.find({
        title: new RegExp(q, "ig"),
        start: {
            $gt: parseInt(new Date().getTime() / 1000)
        }
    });

    query.sort('start', 1);
    query.limit(limit);

    query.populate('channel_id');
    query.populate('actors');
    query.populate('tmdbId');
    query.populate('tmdbId.actors');

    query.exec(function (err, docs) {
        var result = new Array();

        async.map(docs, function (doc, callback) {
            self._buildEvent(doc, function (event) {
                result.push(event);
                callback(null, null);
            });
        }, function (err, results) {
            callback(result);
        });
    });
};

Epg.prototype.createTimer = function (eventId) {

};

Epg.prototype.deleteTimer = function (timerId) {

};

module.exports = Epg;