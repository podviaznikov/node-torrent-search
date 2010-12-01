var sys = require('sys'),
    http = require('http'),
    querystring = require('querystring');
var Torrent = function()
{
    this.client = http.createClient(80, 'isohunt.com');
    this.headers = {'Host': this.client.host};
    this.path = '/js/json.php';
};
Torrent.prototype.find=function(query,callback,errorCallback)
{
    var path=this.path;
    if(query)
    {
        path=this.path+'?'+querystring.stringify(query);
    }
    var request = this.client.request('GET', path, this.headers);
	request.on('response', function (response) 
	{
	   var buffer = '';
	   sys.log('STATUS: ' + response.statusCode);
	   response.setEncoding('utf8');
	   response.on('data', function (chunk) 
	   {
	       buffer += (chunk || '');
	   });
	   response.on('end', function() 
	   {
	       callback(buffer);
	   });
	});   
	request.end();
}
exports.create=function()
{
    return new Torrent();
}