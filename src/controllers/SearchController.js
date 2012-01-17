var Epg = require('../lib/Epg');
var actors = mongoose.model('Actor');
var async = require('async');

io.sockets.on('connection', function (socket) {
    socket.on('Searchresult:read', function (data, callback) {
        if (!socket.handshake.session.loggedIn) {
            return false;
        }

        var result = {
            events: {},
            actors: {}
        };

        log.dbg('Search for: ' + data.query);

        async.parallel([
            function (callback) {
                var epg = new Epg();
                epg.searchEvents(data.query, 10, function (docs) {
                    console.log(docs);

                    docs.forEach(function (doc) {
                        if (result.events[doc.title] === undefined) {
                            result.events[doc.title] = doc;
                        }
                    });

                    callback(null, null);
                });
            }, function (callback) {
                var i = 0;
                var query = actors.find();

                query.or([{name: new RegExp(data.query, "ig")}, {character: new RegExp(data.query, "ig")}]);
                query.populate('tmdbId');
                query.limit(10);

                query.exec(function (err, docs) {
                    console.log(arguments);

                    docs.forEach(function (doc) {
                        if (result.actors[doc.name] === undefined) {
                            result.actors[doc.name] = doc;
                            i++;
                        }
                    });

                    callback(null, null);
                });
            }
        ], function(err, results){
            callback(result);
        });
    });
});