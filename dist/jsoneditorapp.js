var container = document.getElementById('jsoneditor');
  var options = {
    mode: 'code',
    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function (err) {
      alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode);
    }
  };
  var json = {
  };
  var editor = new JSONEditor(container, options, json);

