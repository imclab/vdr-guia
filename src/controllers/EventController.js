var events = mongoose.model('Event');

io.sockets.on('connection', function (socket) {
    socket.on('EventCollection:read', function (data, callback) {
        data = data.data;
        var start = (data.page - 1) * 20;
<<<<<<< HEAD
        var date = new Date();

        var query = events.find({});

        query.where('channel_id', data.channel_id);
        query.$gt('stop', date.getTime() / 1000);
        query.sort('start', 1);
        query.skip(start);
        query.limit(20);

        query.exec(function (err, doc) {
            callback(doc);
=======
        
        rest.get(vdr.restful + '/events/' + data.channel_id + '.json?timespan=0&start=' + start + '&limit=' + 20).on('success',  function (epg) {
            callback(epg.events);
        }).on('error', function (e) {
            callback({error: 'No events found'});
            log.dbg(vdr.restful + '/events/' + data.channel_id + '.json?timespan=0&start=' + start + '&limit=' + 20);
>>>>>>> ade30b4de1a72ef0b93ef2a140099b6a82e19a33
        });
    });

    socket.on('EventModel:read', function (data, callback) {
        events.findOne({_id: data.data._id}, function (err, doc) {
            callback(doc);
        });
    });

    socket.on('Event:readOne', function (data, callback) {
        rest.get(vdr.restful + '/events/' + data.channel_id + '/' +  + data.event_id + '.json').on('success', function (data) {
            callback(data.events[0]);
        }).on('error', function () {
        }).on('403', function () {
        });
    });

    socket.on('Event:record', function (data, callback) {
        rest.post(vdr.restful + '/timers', {
            data: {
                channel: data.channel_id,
                eventid: data.event_id,
                minpre: 5,
                minpost: 15
            }
        }).on('success', function (data) {
            callback(data.timers[0]);
        }).on('error', function () {
        }).on('403', function () {
        });
    });

    socket.on('Event:deleteTimer', function (data, callback) {
        rest.del(vdr.restful + '/timers/' + data.timer_id).on('success', function (data) {
            callback();
        }).on('error', function () {
        }).on('403', function (e) {
        });
    });
});