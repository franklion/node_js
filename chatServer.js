/* require modules */
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var fs      = require('fs');
var _       = require('lodash');

/* config */
var port = 3000;
app.use(express.static('public'));


/* http listen */
  http.listen(port, function () {
    var host = http.address().address;
    var port = http.address().port;
    console.log('ChatRoom Server Listening at http://%s:%s', host, port);
  });

/* read file */
  app.get('/', function (req, res) {
    fs.readFile(__dirname + '/public/chat.html', function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading chat.html');
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  });

/* connect event */

  var personsList = [];
  io.sockets.on('connect', function (socket) {

    /* login check */
    socket.on('loginCheck', function (userName) {
      var  authStatus = checkPersonsList(userName);
      if (authStatus) {
        loginSuccess(userName, socket);
      } else {
        loginFail(userName, socket);
      }
    });

    /* login success */
    function loginSuccess(userName) {
      addPersonsList(userName);
      socket.userName = userName;
      socket.emit('LogInOutMessages', 'SERVER', 'You have connected');
      socket.emit('statusName', userName);
      io.sockets.emit('statusCount', calculatePersonAmount());
      socket.broadcast.emit('LogInOutMessages', 'SERVER', userName + ' join the room');
      socket.emit('loginStatus', true);
      io.sockets.emit('statusList', personsList);
    }

    /* login fail */
    function loginFail(userName) {
      socket.emit('loginStatus', false);
    }

    /* sends global messages */
    var fontColor = randomColorCode();
    socket.on('sendchat', function (data) {
      io.sockets.emit('globalMessages', socket.userName, data);
      io.sockets.emit('setFontColor', fontColor);
    });

    /* disconnect with client */
    socket.on('disconnect', function () {
      deletePersonsList(socket.userName);
      io.sockets.emit('LogInOutMessages', 'SERVER', socket.userName + ' exit');
      io.sockets.emit('statusCount', calculatePersonAmount());
      io.sockets.emit('statusList', personsList);
    });

  });

/* check persons list */
  function checkPersonsList(userName) {
    if (personsList.indexOf(userName) === -1 ) {
      return true;
    } else {
      return false;
    }
  }

/* add person */
  function addPersonsList(userName) {
      personsList.push(userName);
  }

/* delete person */
  function deletePersonsList(userName) {
    if (personsList.indexOf(userName) !== -1) {
      var index = personsList.indexOf(userName);
      personsList.splice(index,1);
    }
  }

/* calculate person amount */
  function calculatePersonAmount() {
    return personsList.length;
  }

/* generate random color code */
  function randomColorCode() {
    var colorCode = [
      'FFEBFF','FFEBF5','FFEBEB','FFF5EB','FFFFEB','F5FFEB','EBFFEB','EBFFF5','EBFFFF','EBF5FF','EBEBFF','F5EBFF',
      'FFCDFE','FFCDE5','FFCECD','FFE7CD','FEFFCD','E5FFCD','CDFFCE','CDFFE7','CDFEFF','CDE5FF','CECDFF','E7CDFF',
      'FFAFFE','FFAFD6','FFB0AF','FFD8AF','FEFFAF','D6FFAF','AFFFB0','AFFFD8','AFFEFF','AFD6FF','B0AFFF','D8AFFF',
      'FF91FE','FF91C7','FF9291','FFC991','FEFF91','C7FF91','91FF92','91FFC9','91FEFF','91C7FF','9291FF','C991FF',
      'FF73FD','FF73B7','FF7573','FFBB73','FDFF73','B7FF73','73FF75','73FFBB','73FDFF','73B7FF','7573FF','BB73FF',
      'FF55FD','FF55A8','FF5755','FFAC55','FDFF55','A8FF55','55FF57','55FFAC','55FDFF','55A8FF','5755FF','AC55FF',
      'FF37FD','FF3799','FF3937','FF9D37','FDFF37','99FF37','37FF39','37FF9D','37FDFF','3799FF','3937FF','9D37FF',
      'FF19FC','FF1989','FF1C19','FF8F19','FCFF19','89FF19','19FF1C','19FF8F','19FCFF','1989FF','1C19FF','8F19FF',
      'FA00F7','FA007A','FA0300','FA8000','F7FA00','7AFA00','00FA03','00FA80','00F7FA','007AFA','0300FA','8000FA',
      'DC00D9','DC006B','DC0300','DC7100','D9DC00','6BDC00','00DC03','00DC71','00D9DC','006BDC','0300DC','7100DC',
      'BE00BC','BE005D','BE0200','BE6100','BCBE00','5DBE00','00BE02','00BE61','00BCBE','005DBE','0200BE','6100BE',
      'A0009E','A0004E','A00200','A05200','9EA000','4EA000','00A002','00A052','009EA0','004EA0','0200A0','5200A0'
    ];
    _.shuffle(colorCode)
    var length = colorCode.length;
    var index =  Math.floor( Math.random() * length );
    return colorCode[index];
  }


  setInterval(function () {
    debug();
  },1500);

  function debug() {
    console.log('amount: ' + personsList.length);
    personsList.forEach(function (name) {
      console.log('userName: ' + name);
    });
  }


