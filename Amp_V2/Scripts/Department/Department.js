function AddDepartment() {
    var valid = true;

    var DepartmentName = document.getElementById("Name").value;

    if (DepartmentName == "") {
        iziToast.warning({
            title: 'Department Name Empty',
            message: 'Please Enter Department Name',
            position: 'topRight'
        });
        valid = false;
    }

    var DepartmentViewModel = {
        Name: DepartmentName,
    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Department/AddDepartment',
            data: {
                DepartmentViewModel: DepartmentViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Department Created",
                        text: "Department Created Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Department/GetAllDepartments";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to create department, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to create department, please try again",
                    icon: 'error'
                })
            }
        });
    }

}


function UpdateDepartment(Id) {
    var valid = true;


    var DepartmentName = document.getElementById("Name").value;

    if (DepartmentName == "") {
        iziToast.warning({
            title: 'Department Name Empty',
            message: 'Please Enter Department Name',
            position: 'topRight'
        });
        valid = false;
    }
 

    var DepartmentViewModel = {
        Id: Id,
        Name: DepartmentName,  

    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Department/EditDepartment',
            data: {
                DepartmentViewModel: DepartmentViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Department Updated",
                        text: "Department Updated Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Department/GetAllDepartments";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to update department, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to update department, please try again",
                    icon: 'error'
                })
            }
        });
    }

}