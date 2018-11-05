

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
        url: url,
        transform: function(response) {  
        //    var totalTime = new Date().getTime()-ajaxTime;
             // console.log('took:'+totalTime);
          // Map the remote source JSON array to a JavaScript object array
         //  console.log(JSON.stringify(response));
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

