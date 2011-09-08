var parseCookie = require('express/node_modules/connect').utils.parseCookie;

io.set('authorization', function (data, accept) {
    if (data.headers.cookie) {
        data.cookie = parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['VDRManager.id'];
        // save the session store to the data object
        // (as required by the Session constructor)
        
        console.log(data);
        
        data.sessionStore = redis;
        redis.get(data.sessionID, function (err, session) {
            if (err) {
                console.log(session);
                accept(err.message, false);
            } else {
                // create a session object, passing data as request and our
                // just acquired session data
                data.session = new Session(data, session);
                accept(null, true);
            }
        });
    } else {
        return accept('No cookie transmitted.', false);
    }
});

io.sockets.on('connection', function (socket) {
    var hs = socket.handshake;
    
    console.log(hs);
    
    socket.on('checksession', function () {
        //if (hs.loggedIn)
    });
    
    socket.on('disconnect', function () {
        console.log('A socket with sessionID ' + hs.sessionID 
            + ' disconnected!');
        // clear the socket interval to stop refreshing the session
    });
});

module.exports = {
    index: function (req, res) {
        if (typeof(req.session.loggedIn) == 'undefined' || !req.session.loggedIn) {
            req.session.loggedIn = false;
        } else {
            res.redirect('/');
            return;
        }

        res.render('authenticate', {
            layout: false,
            global: {
                title: 'Login',
                loggedIn: req.session.loggedIn
            }
        });
    },
    login: function (req, res) {
        var username = req.param("username");
        var password = req.param("password");

        console.log('endlich');

        if (username == config.app.username && password == config.app.password) {
            req.session.loggedIn = true;
            res.redirect('/');
        } else {
            res.writeHead(403);
            res.end();
        }
    },
    logout: function (req, res) {
        if (typeof(req.session.loggedIn) != 'undefined' && req.session.loggedIn) {
            req.session.loggedIn = false;
            res.render('authenticate', {
                layout: false
            });
        } else {
            res.render('authenticate', {
                layout: false
            });
        }
    }
};