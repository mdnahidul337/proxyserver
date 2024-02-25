function copyText(button) {
  var textBoxContainer = button.parentNode;
  var sourceText = textBoxContainer.querySelector('input[type="text"]:nth-child(odd)');
  var targetText = textBoxContainer.querySelector('input[type="text"]:nth-child(even)');


  sourceText.select();
  document.execCommand("copy");
  sourceText.setSelectionRange(0, 0);
  targetText.focus();
}

function addTextBox() {
  var container = document.querySelector('.container');
  var textboxContainer = document.createElement('div');
  textboxContainer.classList.add('textbox-container');

  var input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('placeholder', 'Type or paste text here');

  var button = document.createElement('button');
  button.textContent = 'Copy to Clipboard';
  button.setAttribute('onclick', 'copyText(this)');

  var input2 = document.createElement('input');
  input2.setAttribute('type', 'text');
  input2.setAttribute('placeholder', 'Paste here');

  textboxContainer.appendChild(input1);
  textboxContainer.appendChild(button);
  textboxContainer.appendChild(input2);

  container.insertBefore(textboxContainer, container.lastElementChild);
}

function exportData() {
  var textArray = [];
  var inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(function(input) {
    textArray.push(input.value);
  });
  var textToSave = textArray.join('\n');

  var blob = new Blob([textToSave], { type: 'text/plain' });
  var a = document.createElement('a');
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'data.txt';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

function importData(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var importedText = event.target.result;
    var textArray = importedText.split('\n');
    var inputs = document.querySelectorAll('input[type="text"]');
    textArray.forEach(function(text, index) {
      if (inputs[index]) {
        inputs[index].value = text;
      } else {
        addTextBox();
        inputs = document.querySelectorAll('input[type="text"]');
        inputs[index].value = text;
      }
    });
  };
  reader.readAsText(file);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}