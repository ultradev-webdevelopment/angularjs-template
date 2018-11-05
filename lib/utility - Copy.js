function getResultObject(result)
{
    
    return getCompanyResultObject(result);
}

function getCompanyResultObject(result)
{
    return{
        
         value: {title:result.name,popularity:result.domain,logo:result.logo }
    }
    
    
}
// display object
function emptyTemplate()
{
    
 var template='<div class="empty-message"><strong>Result not found</strong></div>';
return template;
}

function loading()
{
    return  '<div><font size=3><strong>Loading..</strong></font></div><br><br>' ;

}

function getHeader()
{
    
    	return '<div align="left" style="background-color:lightgrey; padding-bottom: 10px;border: 1px;"><font size=3.0><table style="width:100%;padding-top: 10px;"><tr><td><span class="suggestion-dropdown"><font color="green">&nbsp;&nbsp;Organization</font></td><td align="right"><font class="suggestion-dropdown"><font color="green">Domain&nbsp;&nbsp;&nbsp;</font></font></td> </tr></table></div>'
}
function getFooter()
{
    return '<hr><div align="right" class="block"><font size=1.5 color=red><table style="width:100%"><tr><td>&nbsp;</td><td align="right">powered by ultradev&nbsp;</td> </tr></table>'
}

function buildSuggestions(result)
{
    var results=JSON.parse(JSON.stringify(result));
     //	console.log(value.value.logo);
    var chkresult= '<div align="left" class="block"><font size=2.5><table style="width:100%"><tr><td>'+'<img src='+results.value.logo+ ' width="40" height="35" style="border-radius:50%">&nbsp;&nbsp;'+results.value.title+'</td><td align="right"><span >'+'<a  target="blank" href=http://'+results.value.popularity+'>'+results.value.popularity+'</a>'+'</span></td> </tr></table>';
        
    return chkresult;
   // alert(JSON.stringify(chkresult));
}

function getSearchTag(result)
{
     var results=JSON.parse(JSON.stringify(result));
    return results.value.title;
    
}