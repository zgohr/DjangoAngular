function TraderCtrl($scope) {
  $scope.orders = [];

  $scope.addOrder = function() {
    $scope.orders.push({
      item: $scope.orderItem,
      amount: $scope.orderAmount,
      quantity: $scope.orderQuantity,
      value: $scope.orderAmount * $scope.orderQuantity,
      fills: 0,
      inventory_value: 0,
      filled: false,
      cancelled: false
    });
    $scope.orderItem = '';
    $scope.orderAmount = '';
    $scope.orderQuantity = '';
  };

  $scope.deleteOrder = function(order) {
    $scope.orders.pop(order);
  };

  $scope.fills = function(order) {
    order.inventory_value = order.fills * order.amount;

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
