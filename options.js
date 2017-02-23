function saveOptions() {
  var delimiter = document.getElementById('delimiter').value;
  
  chrome.storage.sync.set({
    defaultDelimiter: delimiter
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

document.getElementById('save').addEventListener('click',saveOptions);


 chrome.storage.sync.get('defaultDelimiter', function (result) {
        document.getElementById('delimiter').value =result.defaultDelimiter || '&';
  });