var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "IBM";
    $scope.lastName = "US";
});

app.controller('navbarctl', function($scope) {
    
	/// tabs
	$scope.firsttab = "Customer";
    $scope.secondtab = "Asset";
	$scope.thirdtab = "Organization";
	//// title
	$scope.title = "FREEDOM";
	$scope.subtitle = "SEARCH";
	$scope.version="Version:DT-(11.05.0001)";
	$scope.logo="image/ultradev.png";
    $scope.tabs=[
        "Customer",
        "Asset",
        "Organization"
    ];
    console.log($scope.tabs);
	
});

app.controller('footerctl', function($scope) {
    
	$scope.version="Version:DT-(11.05.0001)";
	$scope.copyright="Ultradev Intellectual Property";
	$scope.builtby="by $ha$hank ";
	
});