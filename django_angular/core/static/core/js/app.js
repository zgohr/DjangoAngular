function TraderCtrl($scope) {
  $scope.orders = [];

  $scope.addOrder = function() {
    $scope.orders.push({
      item: $scope.orderItem,
      amount: $scope.orderAmount,
      quantity: $scope.orderQuantity,
      //value: $scope.orderAmount * $scope.orderQuantity,
      fills: 0,
      //inventory_value: 0,
      filled: false,
      complete: false
    });
    $scope.orderItem = '';
    $scope.orderAmount = '';
    $scope.orderQuantity = '';
  };

  $scope.deleteOrder = function(order) {
    $scope.orders.splice($.inArray(order, $scope.orders),1);
  };

  $scope.markComplete = function(order){
    order.complete = !order.complete;
    return order.complete;
  };

  $scope.orderValue = function(order){
    var total = 0;
    if (order) {
      return Math.abs((order.quantity - order.fills) * order.amount);
    }
    angular.forEach($scope.orders, function(order){
      total += (order.quantity - order.fills) * order.amount;
    });
    return Math.abs(total);
  };

  $scope.getAbsQuantity = function(order){
    return Math.abs(order.quantity)
  };

  $scope.inventoryValue = function(order){
    var total = 0;
    if (order) {
      return Math.abs(order.fills * order.amount);
    }
    angular.forEach($scope.orders, function(order){
      total += order.fills * order.amount;
    });
    return total;
  };

  $scope.fills = function(order) {
    if (order.fills === order.quantity) {
      order.filled = true;
    } else {
      order.filled = false;
    }
  };

  $scope.status = function(order) {
    if (order.filled) {
      return 'success'
    } else {
      return 'info';
    }
  };
}
