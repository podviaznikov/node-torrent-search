var torrent = require('./isohunt.js').create();
var sys =require('sys');
torrent.find({ihq:'Inception'},function(data)
{
    sys.log(data);
});