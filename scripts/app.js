(function(){

  var ng = angular;
  var app = ng.module("app", ['ngRoute']);
 
  app.controller('MainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
  });
  
  // CONFIGURE our ROUTES
  app.config(function($routeProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
      })

      // route for the about page
      .when('/data', {
        templateUrl : 'pages/data.html',
        controller  : 'dataController'
      })

      // route for the contact page
      .when('/risks', {
        templateUrl : 'pages/risks.html',
        controller  : 'risksController'
      })
      
      .when('/pickup', {
        templateUrl : 'pages/pickup.html',
        controller  : 'pickupController'
      })
      
      .when('/demand', {
        templateUrl : 'pages/demand.html',
        controller  : 'demandController'
      });
  });

  // create the controller and inject Angular's $scope
  app.controller('mainController', function($scope) {
      // create a message to display in our view
    $scope.message = 'Pagrindinis puslapis';
  });

  app.controller('dataController', function($scope) {
    $scope.message = 'Pagrindiniai duomenys';
  });

  app.controller('risksController', function($scope) {
    $scope.message = 'Įvertinkite audito visumos riziką';
  });
  
  app.controller('pickupController', function($scope) {
    $scope.message = 'Atlikite audituotinų subjektų atranką';
  });
  
  app.controller('demandController', function($scope) {
    $scope.message = 'Apskaičiuokite VAT poreikį';
  });
 
  app.controller("GetTableJsonCtrl", function($scope, $http) {
  // get TABLE HEADER and SUBHEADER 
    var vm = this;
    // var ng = angular;
    $http.get('data/risktable.json')
      .then(function(res){
        // subArray gets SUBHEADERS values
        vm.subArray = [];
        // get HEADER values
        $scope.cells = res.data;
        ng.forEach($scope.cells, function(header){
          ng.forEach(header.subheaders, function(subheader){
            vm.subArray.push(subheader);
          });
        });
      });
    });
  
  app.controller("GetRiskJsonCtrl", function($scope, $http) {
  // get TABLE DATA from json controller
    $http.get('data/risks.json')
      .then(function(res){
        $scope.elements = res.data;
      });
    var vm = this;
  //  register SUM functions
    vm.calculate = calculate; 
    vm.average = average;
    vm.levels = levels;
  });

  // table VALUES
  var riskValues = ["Didelė", "Vidutinė", "Maža"];

  /* calculate SUM of TABLE DATA  */
  var calculate = function(array){ 
    var sum = 0; 
    for(var i = 0; i < array.length; i++){
      sum += parseInt(array[i], 10); 
      }
    return sum; 
  };
   /* calculate AVERAGE of TABLE DATA */
  var average = function(array){ 
    var ave = calculate(array) / array.length;
    return ave;
  };
  /* get RISK LEVELS from AVERAGE */
  var levels = function(value){
    if (value > 2.34) { return riskValues[0] }
    else if (value > 1.34) { return riskValues[1] }
    else { return riskValues[2]}
  };

})();