
  function enableSearch() {
    var entered=document.getElementById("searchtxt");
//   alert('i am called '+entered.value.length)
    if(entered.value.length>0)
    {
     document.getElementById("idbutton").style.visibility = "visible";

}
    if(entered.value.length==0)
    {
//	document.getElementById("searchtxt").disabled = true;
  document.getElementById("demo").innerHTML = ''
   //document.getElementById("searchtxt").style.visibility = "hidden";
    document.getElementById("idbutton").style.visibility = "hidden";
    }
  }
function myFunction() {
var obj=document.getElementById("searchtxt").value;
//console.log(JSON.parse(document.getElementById("searchtxt").value));
  //var searchvalue = JSON.parse(txt);
 // console.log(searchvalue)
 $(function() {
    var table="<table  id='results' style='width:50%'> <thead ><tr></thead><tbody></th><th>NAME</th> <th>VOTE </th><th>POPULARITY</th><th>LANGUAGE</th><th>RELEASE</th></tr><tr>";
    $.get("http://api.themoviedb.org/3/search/movie?query="+obj+"&api_key=f22e6ce68f5e5002e71c20bcba477e7d", function(data, status){

        var results=JSON.stringify(data);
		var firstResult=JSON.parse(results);
		var response=firstResult.results[0];
	table=table+'<td>'+response.title+'</td>'+'<td>'+response.vote_average+'</td>'+'<td>'+response.popularity+'</td>'
	+'<td>'+response.original_language+'</td>'+'<td>'+response.release_date+'</td></tr></table>'


	document.getElementById("demo").innerHTML = table;
})
})
;

  //document.getElementById("demo").innerHTML = obj;
}
