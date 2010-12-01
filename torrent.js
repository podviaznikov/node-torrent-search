var sys = require('sys'),
    http = require('http'),
    querystring = require('querystring');
/**
 * Class is just Node.js wrapper for the {@link http://isohunt.com/forum/viewtopic.php?t=150656 API}. 
 * If you want to use this soft please read terms and conditions of the original isohunt API. 
 * 
 * @author Anton Podviaznikov(podviaznikov@gmail.com)
 */
var Torrent = function()
{
    this.client = http.createClient(80, 'isohunt.com');
    this.headers = {'Host': this.client.host};
    this.path = '/js/json.php';
};
/**
 * Method for searching over torrent with provided parameters.
 * @param query - search parameters. The same as in the isohunt API.
 * @param callback - callback function for handling result. Takes data as JSON object.
 * @param errorCallback - optional callback function that accepts response error code.
 * 
 * Floowing parameters can be used in the query:
 * <ul>
 * <li>ihq - Takes url encoded value as requested search query.</li>
 * <li>start  - Optional. Starting row number in paging through results set. First page have start=1, not 0. Defaults to 1. </li>
 * <li>rows - Optional. Results to return, starting from parameter "start". Defaults to 100.</li>
 * <li>sort - Optional. Defaults to composite ranking (over all factors such as age, query relevance, seed/leechers counts and votes). Parameter takes only values of "seeds", "age" or "size", where seeds sorting is combination of seeds+leechers. Sort order defaults to descending.</li>
 * <li>order - Optional, can be either "asc" or "desc". Defaults to descending, in conjunction with sort parameter.</li>
 * </ul>
 */
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
	   if(response.statusCode=200)
       { 
		   var buffer = '';
		   response.setEncoding('utf8');
		   response.on('data', function (chunk) 
		   {
		       buffer += (chunk || '');
		   });
		   response.on('end', function() 
		   {
		       sys.log(buffer);
		       callback(JSON.parse(buffer));
		   });
       }
       else if(errorCallback)
       {
           errorCallback(response.statusCode);
       }
	});   
	request.end();
}
/**
 * Factory method for creating object instace that can send requests.
 */ 
exports.create=function()
{
    return new Torrent();
}