function TraderCtrl($scope) {
  $scope.buyOrders = [];
  $scope.sellOrders = [];
  $scope.gold = /^\d*(\.\d{1,4})?$/;

  $('.typeahead').typeahead({
    source: function (){
      var names = []
      angular.forEach($scope.orders, function(order) {
        names.push(order.item);
      });
      return names;
    }
  });

  $scope.resetBSForm = function() {
    $scope.item = '';
    $scope.price = '';
    $scope.quantity = '';
  };

  $scope.formData = function() {
    return {
      name: $scope.item,
      price: $scope.price,
      quantity: $scope.quantity,
      fills: 0,
      locked: false
    }
  };

  $scope.placeBuyOrder = function() {
    $scope.buyOrders.push($scope.formData());
    $scope.resetBSForm();
  };

  $scope.placeSellOrder = function() {
    $scope.sellOrders.push($scope.formData())
    $scope.resetBSForm();
  };

  $scope.hasInventory = function(item, quantity) {
    var purchasedQuantity = 0;
    var sellOrderQuantity = 0;
    var onHandInventory = 0;

    angular.forEach($scope.buyOrders, function(order){
      if (order.name === item) {
        purchasedQuantity += order.fills;
      }
    });
    angular.forEach($scope.sellOrders, function(order){
      if (order.name === item) {
        sellOrderQuantity += order.quantity;
      }
    });

    onHandInventory = purchasedQuantity - sellOrderQuantity;

    return onHandInventory >= quantity;
  };

  $scope.deleteOrder = function(order) {
    if ($.inArray(order, $scope.buyOrders)) {
      $scope.buyOrders.splice($.inArray(order, $scope.buyOrders),1);
    } else {
      $scope.sellOrders.splice($.inArray(order, $scope.sellOrders),1);
    }
  };

  $scope.lock = function(order){
    order.locked = !order.locked;
    return order.locked;
  };

  $scope.buyOrderValue = function(order){
    var total = 0;
    if (order) {
      return (order.quantity - order.fills) * order.amount;
    }
    angular.forEach($scope.buyOrders, function(order){
      total += (order.quantity - order.fills) * order.amount;
    });
    return total;
  };

  $scope.inventoryValue = function(order){
    var total = 0;
    return total;
  };

  $scope.status = function(order) {
    if (order.fills === order.quantity) {
      return 'success'
    } else {
      return 'info';
    }
  };
}
