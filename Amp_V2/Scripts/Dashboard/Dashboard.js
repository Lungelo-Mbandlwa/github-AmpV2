

function addProductQuantity(Id) {
    let count = parseInt(document.getElementById(Id).textContent);
    let Total = count + 1;

    document.getElementById(Id).textContent = Total;
}

function removeProductQuantity(Id) {

    let count = parseInt(document.getElementById(Id).textContent);
    let Total = count - 1;

    if (Total > 0) {
        document.getElementById(Id).textContent = Total;
    }
    else {
        document.getElementById(Id).textContent = 0;
    }   
}


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
function AddToTrollerCount() {
    let count = parseInt(document.getElementById("trollerCount").textContent);
    let Total = count + 1;

    document.getElementById("trollerCount").textContent = Total;
}

function addProductToTrolley(Id, QuantityId)
{
    var valid = true;
    let count = parseInt(document.getElementById(QuantityId).textContent);

    if (count == 0) {
        iziToast.warning({
            title: 'Quantity = 0',
            message: 'Please Select How Many Product You Want',
            position: 'topRight'
        });
        valid = false;
    }
    var TrolleyViewModel = {
        ProductId: Id,
        Quantity: count,
    };

    if (valid) {
        $.ajax({
            type: 'POST',
            url: '/Trolley/AddProductToTroller',
            data: {
                TrolleyViewModel: TrolleyViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Added To Trolley",
                        text: "Product Added To Trolley Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {                          
                            //var url = "/Home/Dashboard";
                            //window.location.href = url;
                            AddToTrollerCount();
                        }
                       
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to add product to trolley, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to add product to trolley, please try again",
                    icon: 'error'
                })
            }
        });
    }

}