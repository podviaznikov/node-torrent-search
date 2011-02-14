var torrent = require('../torrent.js').create(),
    assert = require('assert');
exports.testFakeItem = function()
{
    torrent.find({ihq:'dssadjaskdjaskjdksajdkasjdsajdkasdjaskdjkas'},function(data)
    {
        assert.equal(0,data.total_results);
    });
};
exports.testFindFirstMovieItem = function()
{
    torrent.find({ihq:'Inception',rows:1},function(data)
    {
        assert.equal(data.items.list.length,1);
        var movieItem = data.items.list[0];
        assert.match(movieItem.title,/Inception/)
    });
};
