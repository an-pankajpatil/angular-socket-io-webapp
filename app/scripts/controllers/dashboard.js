'use strict';

/**
 * @ngdoc function
 * @name involvedMembersApp.controller:OrgCtrl
 * @description
 * # OrgCtrl
 * Controller of the involvedMembersApp
 */
angular.module('webappApp')
.controller('DashboardCtrl', function ($scope, $routeParams, $rootScope, $timeout, $location, $window, Config, Storage, socket, chatDetails) {
    //get admin id from localStorage
    $scope.adminid = Storage.getAdminId();
    console.log($scope.adminid);
   //check if any parameter
    $scope.ChatMem = [];
    var stream_id  = '';
    
    socket.on('message:received', function (ev, data) {
        if((ev.receipient_mem.id == $scope.adminid) || (ev.from_mem_id == $scope.adminid)) {
            chatDetails.chatdetails.get('get', {'memId': $scope.adminid}).then(function(data) {
                console.log(data);
                $scope.msgList = data;
            });
        }
        //$scope.theData = data;
    });
    
    $scope.sendmessage = function(data) {
        console.log(data);
        var fname  = Storage.getAdminUsername();
        socket.emit('message:send', { msg: data, id: $scope.adminid, msg_type: 'A', from_name: fname, receipient: $scope.ChatMem, stream_id: stream_id });
    }
    
  });
