var torrent = require('../torrent.js').create();
exports.testFakeItem = function(assert)
{
    torrent.find({ihq:'dssadjaskdjaskjdksajdkasjdsajdkasdjaskdjkas'},function(data)
    {
        assert.equal(0,data.total_results);
    });
};
exports.testFindFirstMovieItem = function(assert)
{
    torrent.find({ihq:'Inception',rows:1},function(data)
    {
        assert.length(data.items.list,1);
        var movieItem = data.items.list[0];
        assert.match(movieItem.title,/Inception/)
    });
};