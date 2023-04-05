$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '/Trolley/GetNumberOfItemsIntrolley',
        success: function (response) {
            if (response > 0) {
                document.getElementById("trollerCount").textContent = response;
            }
            else {
                document.getElementById("trollerCount").textContent = 0;
            }

        },
        error: function (ex) {

        }
    });

})

//Remove item from the trolley
function removeTrolleyItem(Id) {
    Swal.fire({
        title: "Remove Trolley Item",
        text: "Are you sure you want to remove this item from the trolley?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: 'green',
        cancelButtonText: "Cancel",
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/Trolley/RemoveTrolleyItem',
                data: {
                    Id: Id
                },
                success: function (response) {
                    if (response == true) {
                        Swal.fire({
                            title: "Item Removed",
                            text: "Item Removed Successfully.",
                            icon: "success",
                            cancelButtonText: "Close",
                            cancelButtonColor: '#d33'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                var url = "/Trolley/GetAllItemsIntrolley";
                                window.location.href = url;
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Failed",
                            text: "Failed to remove Item, please try again",
                            icon: 'error'
                        })
                    }

                },
                error: function (ex) {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to remove Item, please try again",
                        icon: 'error'
                    })
                }
            });
        }
        else if (result.isDenied) {

        }
    })
}

//Place an order function
function PlaceOrder() {
    Swal.fire({
        title: "Order Confirmation",
        text: "Are you sure you want to place an order?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: 'green',
        cancelButtonText: "Cancel",
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/Order/PlaceAnOrder',
                success: function (response) {                   
                    if (response == true) {
                        Swal.fire({
                            title: "Order Received",
                            text: "Order Received Successfully.",
                            icon: "success",
                            cancelButtonText: "Close",
                            cancelButtonColor: '#d33'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                var url = "/Order/MyOrders";
                                window.location.href = url;
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Failed",
                            text: "Failed to place an order, please try again",
                            icon: 'error'
                        })
                    }

                },
                error: function (ex) {
                    alert(ex);
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to place an order, please try again last",
                        icon: 'error'
                    })
                }
            });
        }
        else if (result.isDenied) {

        }
    })
}