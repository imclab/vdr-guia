var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();
    
tfidf.addDocument('Seitdem der mäßig erfolgreiche Drehbuchautor Henry seine Freundin Katharina rausgeschmissen hat, befindet er sich an einem persönlichen und kreativen Tiefpunkt. Unerwartet bekommt er die Chance, an der Adaption eines Bestseller-Romans mitzuarbeiten. Allerdings ist die Autorin, mit der er das Drehbuch erarbeiten soll, seine Ex-Freundin Katharina. Als er gerade wieder Gefühle für Katharina entwickelt, steht plötzlich die achtjährige Magdalena vor der Tür mit einem Brief in der Hand, in dem steht, dass er ihr Vater sei und gebeten werde, sie vorübergehend bei sich aufzunehmen, weil ihre Mutter Charlotte einen wichtigen Gerichtstermin wahrnehmen müsse. Dies stürzt ihn in ein Gefühlschaos: Katharina erfährt von dem Mädchen und beendet die Zusammenarbeit mit Henry, Charlotte übt auf ihn wieder eine Anziehungskraft aus und deren Partner Tristan, der anfangs abgeneigt war, Magdalena, die er bisher für seine leibliche Tochter hielt, bei sich aufzunehmen, will sie zurück haben. Und dies zu einem Zeitpunkt, als Henry merkte, dass ihm Magdalena ans Herz gewachsen ist. Er macht sich daran, mithilfe eines Drehbuches, welches er „Kokowääh“ nennt, dieser Situation Herr zu werden');
tfidf.addDocument('The fight must go on! Die Apokalypse, ausgelöst von der Umbrella Corporation, hat fast die gesamte Menschheit mit ihrem Virus infiziert und in mörderische Untote verwandelt. Alice, die auf der Suche nach weiteren Überlebenden ist, macht sich bereit, den skrupellosen Konzern endgültig zu vernichten. Sie begibt sich nach Los Angeles in der Hoffnung, dort für die letzten verbliebenen Menschen eine Oase des Friedens vorzufinden. Doch es ist zu spät! Auch hier haben sich bereits tausende Infizierte ausgebreitet und Alice und ihre Begleiter finden sich in einer scheinbar ausweglosen und tödlichen Falle wieder.');
tfidf.addDocument('Auf den ersten Blick sind Louise, Spencer und Victor ganz normale Nachbarn, die sich angefreundet haben. Man ratscht morgens im Flur, kommt abends mal auf einen Drink vorbei und isst gelegentlich zusammen. Aber ist Spencers breites Lächeln nicht zu strahlend und Louise intensive Beziehung zu ihren Katzen nicht ziemlich ungewöhnlich? Und der neu eingezogene Victor ist doch übertrieben hilfsbereit und freundlich. Man beobachtet sich genauer, stolpert über Ungereimtheiten und kommt Geheimnissen auf die Spur. Das Misstrauen wächst. Eine Mord- und Vergewaltigungsserie in der Umgebung bringt das nachbarschaftliche Gleichgewicht schliesslich vollends zum Kippen.');
tfidf.addDocument('Supermacho Tank verdient sich ein stattliches Zubrot, in dem er im Auftrag von deren Boyfriends junge Damen zu Dates ausführt und sich dort dann so dermassen daneben benimmt, bis jene weinend und reumütig in die Arme ihres Lovers zurückkehren. Tanks neuster Kunde ist sein bester Kumpel und Mitbewohner Dustin, der eine Nummer zu sensibel wirkt für seine neue Freundin, die heisse Alexis. Ohne jede Rücksicht präsentiert ihr Tank sein volles Programm, nur um zu erleben, wie Alexis voll darauf abfährt und sich zielgerichtet in das Schwein verliebt.');

console.log('das --------------------------------');
tfidf.tfidfs('das', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

console.log('Kokowääh --------------------------------');
tfidf.tfidfs('Kokowääh', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

// [ 'your', 'dog', 'has', 'flees' ]
// http://192.168.0.5:8008/recstream.html?recid=recording_e12420a2e7faf6bb3f1e6bb0d2cb2371

/*var proc = new ffmpeg('http://192.168.0.5:3000/S19.2E-1-1017-61301.ts')
    .withSize('150x100')
    .takeScreenshots({
        count: 1,
        timemarks: [ '0.5' ]
    }, '/tmp/', function(err) {
        console.log(arguments);
        console.log('screenshots were saved')
    });


var ffmpegmeta = require('fluent-ffmpeg').Metadata;

// make sure you set the correct path to your video file
ffmpegmeta.get('http://192.168.0.5:3000/S19.2E-1-1017-61301.ts', function(metadata) {
    console.log(arguments);
});*/
/*var utils = require('util');
var dnode = require('dnode');

dnode.connect('guia-server.yavdr.tv', 7007, function (remote, connection) {
    remote.register('kersten', 'peter', 'kerstenk@gmail.com', function (data) {
        console.log(data);
    });

    /*remote.authenticate('kersten', 'peter', '$2a$10$Y/kHr9RLqMuf39ab5Jcq6e', function (session) {
        if (session) {
            session.getRating('X-Men', function (result) {
                console.log(result);
            });
        }
    });
});*/

/* var trakt = require('trakt').Client;
var user = require('trakt/user');
var search = require('trakt/search');

var client = new trakt('08792ab79fda9119a2d18dcefeaa594f');

//client.extend('user', new user());
client.extend('search', new search());

utils.debug(utils.inspect(client.search,true, null));

/*client.user.shows({username: 'GOTTMODUS'}, function (data) {
    console.log(data);
});

client.search.shows({query: 'How+I+Met+Your+Mother'}, function (data) {
    console.log(data);
});

client.search.users({query: 'How+I+Met+Your+Mother'}, function (data) {
    console.log(data);
}); */

/*var Thetvdb = require('./src/lib/Media/Scraper/Thetvdb');

var tvdb = new Thetvdb('3258B04D58376067', 'de');
tvdb.getSeries('Dexter', function (result) {
    console.log(result);
});*/

/*global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;

require('./src/schemas/ChannelSchema');
require('./src/schemas/EventSchema');
require('./src/schemas/ActorSchema');
require('./src/schemas/ActorDetailSchema');
require('./src/schemas/MovieDetailSchema');

console.log('Connect to database ..');
mongoose.connect('mongodb://127.0.0.1/GUIA');
mongoose.connection.on('error', function (e) {
    throw e;
});

var Epg = require('./src/lib/Epg');
var epg = new Epg();

epg.getTodaysHighlight();*/
//process.exit();

/*var date = new Date();
date.setHours(0, 0, 0);

var start = parseInt(date.getTime() / 1000);

date.setHours(23, 59, 59);

var stop = parseInt(date.getTime() / 1000);

events.find({tip: {$exists: true}, start: {$gt: start, $lt: stop}}, function (err, docs) {
    console.log(docs);
    console.log(start, stop);
    process.exit();
});*/
