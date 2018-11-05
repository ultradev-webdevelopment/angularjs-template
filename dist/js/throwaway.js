var codeMirrorOptionsInput =
{
    "mode": "application/json",  // Treat input as Json
    "theme" : "eclipse",
    "gutters": ["CodeMirror-lint-markers"],
    "tabSize" : 2,
    "indentUnit" : 2,
    "smartIndent" : true,
    "lineNumbers" : true,
    "lint" : true,
    "matchBrackets": true
};

var codeMirrorOptionsSpec =
{
    "mode": "javascript",  // Treat spec as JavaScript.  Slightly worse linting, but able to have comments.
    "theme" : "eclipse",
    "gutters": ["CodeMirror-lint-markers"],
    "tabSize" : 2,
    "indentUnit" : 2,
    "smartIndent" : true,
    "lineNumbers" : true,
    "lint" : true,
    "matchBrackets": true
};

var codeMirrorOptionsResults =
{
    "mode": "application/json",  // Treat the output as Json
    "theme" : "eclipse",
    "tabSize" : 2,
    "indentUnit" : 2,
    "smartIndent" : true,
    "lineNumbers" : true,
    "lint" : true,
    "matchBrackets": true
};

// #input finds an html element by Id, then [0] gets the first thing in the returned list
var inputCodeMirror   = CodeMirror.fromTextArea( $( "#input" )[0],      codeMirrorOptionsInput );
var specCodeMirror    = CodeMirror.fromTextArea( $( "#spec" )[0],       codeMirrorOptionsSpec );
var outputCodeMirror  = CodeMirror.fromTextArea( $( "#outputJson" )[0], codeMirrorOptionsResults );

// this is awesome, makes it so the textAreas auto size their height
// the width is 100% which allows it to be controlled by the BootStrap logic
inputCodeMirror.setSize( "100%", "auto");
specCodeMirror.setSize( "100%", "auto");
outputCodeMirror.setSize( "100%", "auto");


// Poor man's Json Validation
function parseJson( json, commentsAllowed ) {
    try {

        var theJson;
        if ( commentsAllowed ) {
            theJson = nodeJsonParser.parse(json, null, true);
        }
        else {
            theJson = jQuery.parseJSON(json);
        }
        return theJson;
    }
    catch (e) {
        return false;
    }
}

function validateInput() {

    var inputPanel = $("#inputPanel");
    var theJson = parseJson( inputCodeMirror.getValue(), false );
    if ( theJson ) {
        inputPanel.toggleClass("panel-danger", false);
        inputCodeMirror.setValue( JSON.stringify( theJson, null, '  ' ) );
        return true;
    }
    else {
        inputPanel.toggleClass("panel-danger", true);
        return false;
    }
}

$("#inputValidateButton").click( validateInput );

function validateSpec() {

    var specPanel = $("#specPanel");

    if ( parseJson( specCodeMirror.getValue(), true ) ) {
        var theSpec = specCodeMirror.getValue();

        specPanel.toggleClass("panel-danger", false);
        specCodeMirror.setValue( js_beautify( theSpec, js_beautifyOptions ) );
        return true;
    }
    else {
        specPanel.toggleClass("panel-danger", true);
    }
    return false;
}

$("#specValidateButton").click( validateSpec );

var js_beautifyOptions =
{
    "indent_size": 2,
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": false,
    "max_preserve_newlines": 0,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse-preserve-inline",  // [collapse-preserve-inline|collapse|expand|end-expand|none]
    "keep_array_indentation": true,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": true
};

/*
 * Attach a submit handler to the form.
 * The form should still theoretically work even w/out JavaScript.
 */
$("#transformForm").submit(function(event) {

    var inputValid = validateInput();
    var specValid = validateSpec();
    if ( ! inputValid || ! specValid ) {
        outputCodeMirror.setValue( "Problem with input or spec JSON." );

        // return false so that we prevent the standard form submit behavior from happening
        return false;
    }

    // get some values from elements on the page:
    var $form = $( this ),
        input = inputCodeMirror.getValue(),
        spec  = specCodeMirror.getValue(),
        sort  = $("#sort").is(":checked"),
        url   = $form.attr( 'action' );

    outputCodeMirror.setValue( "Sending 'input' and 'spec' to the server.\n\nIt is a free tier on Google App Engine,\nso it may be asleep." );

    // Send the data using post
    var posting = $.post( url, { input : input, spec : spec, sort : sort } );

    // Put the results in a div
    posting.done(function( data ) {
        var content = data ;
        outputCodeMirror.setValue( content );
    });

    // return false so that we prevent the standard form submit behavior from happening
    return false;
});

function loadExample( exampleName ) {

    // update browser address bar URL when someone clicks an example
    location.hash = exampleName;

    $.ajax({
        url : "examples/" + exampleName + "-input.json",
        dataType: "text",
        success : function (data) {
            inputCodeMirror.setValue( data );
        }
    });

    $.ajax({
        url : "examples/" + exampleName + "-spec.json",
        dataType: "text",
        success : function (data) {
            specCodeMirror.setValue( data );
        }
    });

    outputCodeMirror.setValue( "" );
}

// Make it so that Jolt examples are something you can grab out of the URL bar and send to other ppl.
var hashParam = document.URL.split('#')[1];
if ( hashParam ) {
    loadExample( hashParam );
}
else {
    // If no example was specified, default to the inception example.
    loadExample( "inception" );
}



ga('create', 'UA-60029024-1', 'auto');
ga('send', 'pageview');