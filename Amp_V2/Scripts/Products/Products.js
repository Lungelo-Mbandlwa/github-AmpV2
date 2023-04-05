function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isNumberKeyDecimal(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode == 46) {
        var inputValue = $("#inputfield").val()
        if (inputValue.indexOf('.') < 1) {
            return true;
        }
        return false;
    }
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// removing a category from the list
function removeProduct(Id) {

    $.ajax({
        type: 'POST',
        url: '/Product/RemoveProduct',
        data: {
            Id: Id
        },
        success: function (response) {
            if (response == true) {
                Swal.fire({
                    title: "Product Removed",
                    text: "Product Removed Successfully.",
                    icon: "success",
                    cancelButtonText: "Close",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "/Product/GetAllProducts";
                        window.location.href = url;
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to remove product, please try again",
                    icon: 'error'
                })
            }

        },
        error: function (ex) {
            Swal.fire({
                title: "Failed",
                text: "Failed to remove product, please try again",
                icon: 'error'
            })
        }
    });
}


function UpdateProductById(Id) {
    var valid = true;
    var ProductName = document.getElementById("Name").value;
    var Description = document.getElementById("Description").value;
    var CategoryId = document.getElementById("CategoryId").value;

    var Quantity = document.getElementById("Quantity").value;
    var Price = document.getElementById("Price").value;


    if ($("#CategoryId").find(':selected').text() == "Select Category") {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Select Category !',
            position: 'topRight'
        });
        return false;
    }
    else if (ProductName == "") {
        iziToast.warning({
            title: 'Product Name Empty',
            message: 'Please Enter Product Name',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Description == "") {
        iziToast.warning({
            title: 'Description Empty',
            message: 'Please Enter Description',
            position: 'topRight'
        });
        valid = false;
    }

    else if (Quantity == "") {
        iziToast.warning({
            title: 'Quantity Empty',
            message: 'Please Enter Quantity',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Price == "") {
        iziToast.warning({
            title: 'Price Empty',
            message: 'Please Enter Price',
            position: 'topRight'
        });
        valid = false;
    }

    var ProductViewModel = {
        Id:Id,
        CategoryId: CategoryId,
        Name: ProductName,
        Quantity: Quantity,
        Price: Price,
        Description: Description,
    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Product/EditProduct',
            data: {
                ProductViewModel: ProductViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Product Updated",
                        text: "Product Updated Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Product/GetAllProducts";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to update product, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to update product, please try again",
                    icon: 'error'
                })
            }
        });
    }

}


function AddProduct() {
    var valid = true;

    var ProductName = document.getElementById("Name").value;
    var Description = document.getElementById("Description").value;
    var CategoryId = document.getElementById("CategoryId").value;

    var Quantity = document.getElementById("Quantity").value;
    var Price = document.getElementById("Price").value;


    if ($("#CategoryId").find(':selected').text() == "Select Category") {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Select Category !',
            position: 'topRight'
        });
        return false;
    }
    else if (ProductName == "") {
        iziToast.warning({
            title: 'Product Name Empty',
            message: 'Please Enter Product Name',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Description == "") {
        iziToast.warning({
            title: 'Description Empty',
            message: 'Please Enter Description',
            position: 'topRight'
        });
        valid = false;
    }
   
    else if (Quantity == "") {
        iziToast.warning({
            title: 'Quantity Empty',
            message: 'Please Enter Quantity',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Price == "") {
        iziToast.warning({
            title: 'Price Empty',
            message: 'Please Enter Price',
            position: 'topRight'
        });
        valid = false;
    }

    var ProductViewModel = {
        CategoryId: CategoryId,
        Name: ProductName,
        Quantity: Quantity,
        Price: Price,
        Description: Description,
    };

    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Product/AddProduct',
            data: {
                ProductViewModel: ProductViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Product Created",
                        text: "Product Created Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Product/GetAllProducts";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to create product, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to create product, please try again",
                    icon: 'error'
                })
            }
        });
    }

}