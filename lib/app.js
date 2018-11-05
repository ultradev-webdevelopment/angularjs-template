

    $(document).ready(function(){

        // constants
        //var url='http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d'
        //var url='https://autocomplete.clearbit.com/v1/companies/suggest?query=%QUERY'
        var url=fetchgeturl;
        var minTriggerlength=mindatafetchlength;
        var hightlight=matchhighlighted;
        var maxresults=maximumallowedresult
        //var badgeclass='<span class="badge badge-warning">'
        //var badgeclass='<span class="badge badge-info">'
        // brown
        //var badgeclass='<span class="badge badge-default">'
        //blue
        //var badgeclass='<span class="badge badge-primary">'
        //green
        var badgeclass='<span class="badge badge-success">'
        //red
        //var badgeclass='<span class="badge badge-danger">'
        // Instantiate the Bloodhound suggestion engine
        var tag;
        var suggestion;
      var ajaxTime= new Date().getTime();    
    var results = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      
	  
	  remote: {
        wildcard: '%QUERY',
        url :url,
	   // url: "http://localhost:9200/customer_gdb_data/_search",
	   // doing all the magic 
	  /*
	  prepare: function (query, settings) {
                      settings.type = "GET";
                      settings.contentType = "application/json; charset=UTF-8";
                      var querydata='{"query": {"match_phrase": {"name":'+query+'}},"_source": ["name"] ,"size":15}'

					 // settings.data = querydata;
					  //console.log('request object '+JSON.stringify(querydata));
					  
	   },*/
		transform: function(response) {  
		 return $.map(response, function(result) {
              // change accordingly
			      return getResultObject(result)
			 
			 
          });
        }
      }
    });


    //added
    // Instantiate the Typeahead UI

    $('.typeahead').typeahead({
      minLength: minTriggerlength,
      highlight: hightlight
    }, {
        // build the json object in transform and use the value which you want to display here
        //refer utility.js for all display functions
     // display tag from the response
        display: function (value){
          return getSearchTag(value);
      },
     // name: 'data',
       source: results,
       limit:maxresults,
       templates: {
       // data not found 
           empty: emptyTemplate(),
        //load message
           pending	:loading(),
        header:getHeader(),
        // footer    
           footer:getFooter(),
        //suggestion drop down 
           suggestion: function (value) {
        return buildSuggestions(value);
        }
    }

    });

    });

