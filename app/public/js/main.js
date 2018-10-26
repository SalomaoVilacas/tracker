angular.module("Site", ["ngRoute"])
.config(function($routeProvider) {

	$routeProvider.when("/", {
		templateUrl: "partials/main.html"
	})

    .when("/asset", {
    	templateUrl: "partials/asset.html",
    	controller: "AssetController"
    })

    .otherwise({redirectTo: "/"});
});