function TraderCtrl($scope) {
  $scope.inventory = [];

  $scope.gold = /^\d*(\.\d{1,4})?$/;

  $scope.formData = function() {
    return {
      name: $scope.name,
      price: $scope.price,
      quantity: $scope.quantity
    }
  };

  $scope.addToInventory = function() {
    // TODO inventory should be "fills"
    // that have a quantity and price
    $scope.inventory.push($scope.formData());
    $scope.name = '';
    $scope.price = '';
    $scope.quantity = '';
  };
}
