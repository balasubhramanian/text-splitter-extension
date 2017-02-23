var selectedText;

function filter() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filterTxt");
  filter = input.value.toUpperCase();
  table = document.getElementById("data");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}


function splitText(selection) {
  selectedText = selection;

  if(!selectedText || selectedText.length==0){
    document.getElementById('options').style = 'display:none';
    document.getElementById('output').innerHTML = '<h2>Please select the text to be splitted first</h2>';
    return;
  }

  var resultHtml='<table id="data">';
  var delimiter  = document.getElementById('delimiter').value;
  var data = selectedText.split(delimiter);
  
  
  for (var i = 0 ; i < data.length ; i++) {
    resultHtml += '<tr><td>'+data[i]+'</td></tr>';
  }

  resultHtml += '</table>'
  document.getElementById('output').innerHTML = resultHtml;
}

document.addEventListener('DOMContentLoaded', function() {

  //Fetching default delimiter
  chrome.storage.sync.get('defaultDelimiter', function (result) {
        
    document.getElementById('delimiter').value = result.defaultDelimiter || '&';
    
    //Splitting the selected text
    chrome.tabs.executeScript({
      code: "window.getSelection().toString();"
    },
    function(selection){
      splitText(selection[0])
    });

  });

  document.getElementById('splitBtn').onclick = function(){
      splitText(selectedText);
  }

  document.getElementById("filterTxt").onkeyup = filter;


});

