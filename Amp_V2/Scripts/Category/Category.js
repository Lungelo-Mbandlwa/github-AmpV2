function UpdateCategoryById(Id) {

    var valid = true;

    var CategoryName = document.getElementById("Name").value;
    var DepartmentId = document.getElementById("DepartmentId").value;

    if (CategoryName == "") {
        iziToast.warning({
            title: 'Category Name Empty',
            message: 'Please Enter Category Name',
            position: 'topRight'
        });
        valid = false;
    }
    else if ($("#DepartmentId").find(':selected').text() == "Select Department") {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Select Department',
            position: 'topRight'
        });
        return false;
    }

    var CategoryViewModel = {
        Id: Id,
        Name: CategoryName,
        DepartmentId: DepartmentId,
    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Category/EditCategory',
            data: {
                CategoryViewModel: CategoryViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Category Updated",
                        text: "Category Updated Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Category/GetAllCategories";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to update category, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to update category, please try again",
                    icon: 'error'
                })
            }
        });
    }

}

function removeCategory(Id) {

    $.ajax({
        type: 'POST',
        url: '/category/RemoveCategory',
        data: {
            Id: Id
        },
        success: function (response) {
            if (response == true) {
                Swal.fire({
                    title: "Category Removed",
                    text: "Category Removed Successfully.",
                    icon: "success",
                    cancelButtonText: "Close",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "/Category/GetAllCategories";
                        window.location.href = url;
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to remove category, please try again",
                    icon: 'error'
                })
            }

        },
        error: function (ex) {
            Swal.fire({
                title: "Failed",
                text: "Failed to remove category, please try again",
                icon: 'error'
            })
        }
    });
}


function AddCategory() {
    var valid = true;

    var CategoryName = document.getElementById("Name").value;
    var DepartmentId = document.getElementById("DepartmentId").value;

    if (CategoryName == "") {
        iziToast.warning({
            title: 'Category Name Empty',
            message: 'Please Enter Category Name',
            position: 'topRight'
        });
        valid = false;
    }
    else if ($("#DepartmentId").find(':selected').text() == "Select Department") {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Select Department',
            position: 'topRight'
        });
        return false;
    }
    var CategoryViewModel = {
        Name: CategoryName,
        DepartmentId: DepartmentId,
    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Category/AddCategory',
            data: {
                CategoryViewModel: CategoryViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Category Created",
                        text: "Category Created Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Category/GetAllCategories";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to create category, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to create category, please try again",
                    icon: 'error'
                })
            }
        });
    }

}