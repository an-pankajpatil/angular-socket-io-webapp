'use strict';

angular.module('webappApp')
.factory('socket', function (socketFactory) {
   // var myIoSocket = io.connect('http://173.236.140.135:9000/chat');

    return socketFactory({
        ioSocket: io.connect('http://localhost:5000/')
    });
});