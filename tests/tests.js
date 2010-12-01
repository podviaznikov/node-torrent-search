var torrent = require('../torrent.js').create();
var sys =require('sys');
exports.testFakeItem=function(assert)
{
    torrent.find({ihq:'dssadjaskdjaskjdksajdkasjdsajdkasdjaskdjkas'},function(data)
    {
        assert.equal(0,data.total_results);
    });
};

