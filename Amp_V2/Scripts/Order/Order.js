function ViewOrderItems(orderId)
{
    $.ajax({
        type: 'POST',
        url: '/Order/GetOrderItemByOrderId',
        data: {
            OrderId: orderId
        },
        success: function (response) {
            if (response != null)
            {
                DeleteRow();
                $('#OrderItemsModal').modal('show');
                var table = document.getElementById("orderItemsModalTable");
                let count = 1;
                $.each(response, function (index, item) {
                    var row = table.insertRow(count);
                    row.insertCell(0).innerHTML = item.ProductName;
                    row.insertCell(1).innerHTML = item.ProductDescription;
                    row.insertCell(2).innerHTML = item.Quantity;
                    row.insertCell(3).innerHTML = item.Price;
                    count++;
                });
               
            }
            else {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to retrieve order items, please try again",
                    icon: 'error'
                })
            }

        },
        error: function (ex) {
            Swal.fire({
                title: "Failed",
                text: "Failed to retrieve order items, please try again",
                icon: 'error'
            })
        }
    });
}

function DeleteRow() {
    let count = parseInt(document.getElementById("orderItemsModalTable").rows.length);

    for (let i = 1; i < count; i++) {
        document.getElementById("orderItemsModalTable").deleteRow(i);
    }
   
}
function CloseOrderItemsModal()
{
    let count = parseInt(document.getElementById("orderItemsModalTable").rows.length);

    for (let i = 1; i < count; i++) {
        document.getElementById("orderItemsModalTable").deleteRow(i);
    }
    //$('#OrderItemsModal').modal('hide');
}