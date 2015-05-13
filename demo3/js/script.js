document.addEventListener('DOMContentLoaded', function () {
  var inputBox = document.getElementById('inputBox');
  var sendButton = document.getElementsByTagName('button')[0];
  var messageBox = document.querySelector('#messageBox');
  var clearButton = document.getElementById('clear');
  var picButton = document.getElementById('pic');
  var username = document.getElementById('username').textContent;

  var host = '172.22.148.195';
  var port = '3000';
  var socket = new WebSocket('ws://' + host + ':' + port);

  window.addEventListener('beforeunload', function () {
    socket.close();
  });

  function logToDom (type, username, msg) {
    if (type === 'text') {
      var p = document.createElement('p');
      p.textContent = username + ': ' + msg;
      messageBox.insertBefore(p, messageBox.firstChild);
    } else if (type === 'pic') {
      var img = new Image();
      img.src = msg;
      img.width = 100;
      img.height = 100;
      messageBox.insertBefore(img, messageBox.firstChild);
      logToDom('text', username, '');
    }
  };

  function addMessage (type) {
    logToDom(type, username, inputBox.value);
    socket.send(JSON.stringify({
      content: inputBox.value,
      type: type,
      from: username,
    }));
    inputBox.value = '';
  };

  socket.onopen = function () {
    console.log('connected!');

    sendButton.addEventListener('click', function () {
      addMessage('text');
    });
    inputBox.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        addMessage('text');
      }
    });
    picButton.addEventListener('click', function () {
      addMessage('pic');
    });

    socket.onerror = function (e) { console.error(e); };
    socket.onclose = function () { console.log('disconnected'); };

    socket.onmessage = function (e) {
      console.log(e.data);
      try {
        var msg = JSON.parse(e.data);
        logToDom(msg.type, msg.from, msg.content);
      } catch (e) {
        console.error(e);
      }
    };
  };

  clearButton.addEventListener('click', function () {
    while (messageBox.childNodes.length) {
      messageBox.childNodes[0].remove();
    }
  });

});

