angular.module("Site")
.controller("AssetController", function($scope, $http, $window) {

    $scope.assets = [];
    $scope.amountAssets = 0;
    $scope.assetFilterParameter = {};

    $scope.updateAssetList = function() {

        $http({
            'method': "GET",
            'url': "http://localhost:3000/asset"
        }).then(function(result) {
    
            if(result.statusText == "OK") {
                $scope.assets = result.data.assets;
    
                for(let i = 0; i < $scope.assets.length; i++) {
                    $scope.assets[i].linked = $scope.assets[i].idAssetReference ? "Sim" : "Não";
                }
    
                $scope.amountAssets = $scope.assets.length;
            }else {
                alert("Something wrong happened!");
            }
        }, function(error) {
    
            console.log(error);
            alert("Something wrong happened, look at the bug in the console.");
        });
    };

    $scope.openModalFilterAssetList = function() {

        $("#modalFilterAssetList").modal('toggle');
    };

    $scope.filterAssetList = function() {

        $http({
            'method': "POST",
            'url': "http://localhost:3000/asset/filter",
            'data': {
                'assetFilterParameter': $scope.assetFilterParameter
            }
        }).then(function(result) {

            console.log(result);
            $scope.assets = result.data.assets;
            $("#modalFilterAssetList").modal('hide');
        }, function(error) {
    
            console.log(error);
            alert("Something wrong happened, look at the bug in the console.");
        });
    };

    $scope.updateAssetList();
});