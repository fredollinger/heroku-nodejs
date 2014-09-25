#!/usr/bin/rhino
// #!/opt/spidermonkey/bin/js17
//

load("../js/acvalidater.js");

//else if "/v2/json/follinge/atom" === uri.path){

//load("third-party/env.rhino.1.2.js");
//load("tasty-jason.js");
//db = "bookmarks.json";

//TastyJason.parse("http:follinge:jason@api.delicious.com/v2/follinge/aooo");
/*
TastyJason.auth("http:follinge:cupogold@api.delicious.com/v1/posts/add?url=http://www.google.com&description=Search Page&extended=What we search&tags=search&dt=19840901T14:21:31Z&replace=no&shared=yes", db );
*/

/*
TastyJason.auth("http:follinge:delany98@api.delicious.com/v1/posts/add?url=http://www.google.com&description=Search Page&extended=What we search&tags=search&dt=19840901T14:21:31Z&replace=no&shared=yes", db );

TastyJason.parse("https://api.delicious.com/v1/posts/add?url=http://www.google.com&description=Search Page&extended=What we search&tags=search&dt=19840901T14:21:31Z&replace=no&shared=yes", db );
*/

/*
// This is a nonsense cmd for testing...
//TastyJason.parse("https://api.delicious.com/v1/posts/search?url=http://www.google.com&description=Search Page&extended=What we search&tags=search&dt=1984—09—01T14:21:31Z&replace=no&shared=yes");
*/

/*  1. Create TastyJSON object.
		2. Add method to parse uri and test
	  3. Connect this to add method below


Add a post to Delicious.
ARGUMENTS

&url={URL}
(required) the url of the item.

&description={...}
(required) the description of the item.

&extended={...}
(optional) notes for the item.

&tags={...}
(optional) tags for the item (comma delimited).

&dt={CCYY—MM—DDThh:mm:ssZ}
(optional) datestamp of the item (format “CCYY—MM—DDThh:mm:ssZ”).
Requires a LITERAL “T” and “Z” like in ISO8601 at 
http://www.cl.cam.ac.uk/~mgk25/iso—time.html for Example: "1984—09—01T14:21:31Z"

&replace=no
(optional) don’t replace post if given url has already been posted.

&shared=no
(optional) make the item private
*/

//var rss = readFile('bookmarks.json');
//json = TAFFY(rss);
/* If they have this string plus a username, they are actually searching for a match with 
   the next line as a tag. That is:

  "/v2/json/username/tag_to_search_for_matches"

*/

/*
user="follinge";
cmd="/v2/json/follinge/atom"; // test command which searchs for atom rss links from user follinge
str="/v2/json/" + user;
if ( cmd.startsWith(str) ) {
  print("Match!!");
}
*/

//else if "/v2/json/follinge/atom" === uri.path){
//"a": "follinge", "d": "openoffice.org-3.3.0-20.10.fc14 | Build Info | koji", "n": "", "u": "http://koji.fedoraproject.org/koji/buildinfo?buildID=276232", "t": ["aooo"], "dt": "2013-03-30T02:54:00Z"
//var bk = json().select("t"); 
//print(JSON.stringify(bk));
/*
json.insert({"a": "follinge", "d": "bob", "n": "", "u": "http://koji.fedoraproject.org/tasty", "t": ["buddhism"], "dt": "2013-04-30T02:54:00Z"});
var bk = json().select("d"); 
print(JSON.stringify(bk));
json.store();
*/
