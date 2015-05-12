document.addEventListener('DOMContentLoaded', function () {
  var inputBox = document.getElementById('inputBox');
  var sendButton = document.getElementsByTagName('button')[0];
  var messageBox = document.querySelector('#messageBox');
  var clearButton = document.getElementById('clear');

  function addMessage () {
    var p = document.createElement('p');
    p.textContent = inputBox.value;
    messageBox.appendChild(p);
    inputBox.value = '';
  };

  sendButton.addEventListener('click', addMessage);

  clearButton.addEventListener('click', function () {
    while (messageBox.childNodes.length) {
      messageBox.childNodes[0].remove();
    }
  });

  inputBox.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      addMessage();
    }
  });
});
