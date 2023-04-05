// validate picture upload
function fileValidationCompanyLogo() {
    var fileInput =
        document.getElementById('logo');
    const fi = document.getElementById('logo');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.png|\.jpg)$/i;

    if (!allowedExtensions.exec(filePath)) {
        iziToast.error({
            title: 'Error, Invalid file type',
            message: 'Please Insert The Following File Types(/png /jpg )',
            position: 'topRight'
        });
        fileInput.value = '';
        return false;
    }
    else if (fi.files.length > 0) {
        for (const i = 0; i <= fi.files.length - 1; i++) {

            const fsize = fi.files.item(i).size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 9999) {
                iziToast.error({
                    title: 'Error, File To Large',
                    message: 'Please Select A File Less Than 10 MB',
                    position: 'topRight'
                });
                fileInput.value = '';
            } else {
                //document.getElementById('size3').innerHTML = '<b>'
                //    + file + '</b> KB';
            }
        }
    }
    else {

        // Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById(
                    'imagePreview').innerHTML =
                    '<img src="' + e.target.result
                    + '"/>';
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function CaptureNewCustomer() {
    var valid = true;

    var ContactNumber = document.getElementById("ContactNumber").value;
    var Name = document.getElementById("Name").value;
    var Surname = document.getElementById("Surname").value;
    var Email = document.getElementById("Email").value;


    if (Name == "") {
        iziToast.warning({
            title: 'Name Empty',
            message: 'Please Enter Name -- Select Next Tab',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Surname == "") {
        iziToast.warning({
            title: 'Surname Empty',
            message: 'Please Enter Surname -- Select Next Tab',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Email == "") {
        iziToast.warning({
            title: 'Email Empty',
            message: 'Please Enter Email -- Select Next Tab',
            position: 'topRight'
        });
        valid = false;
    }
    else if (ContactNumber == "") {
        iziToast.warning({
            title: 'Contact Number Empty',
            message: 'Please Enter Contact Number',
            position: 'topRight'
        });
        valid = false;
    }


    var UserViewModel = {
        Name: Name,
        Surname: Surname,
        ContactNumber: ContactNumber,
        Email: Email,
    };

    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Customers/CaptureNewCustomer',
            data: {
                UserViewModel: UserViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Customer Added",
                        text: "Customer Added Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Customers/GetAllCustomers";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to add customer, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to add customer, please try again",
                    icon: 'error'
                })
            }
        });
    }

}


function submitConfirmAccount() {
    var valid = true;

    
    var Email = document.getElementById("email").value;
    var Password = document.getElementById("password").value;
    var ConfirmPassword = document.getElementById("confirmpassword").value;

   if (Email == "") {
        iziToast.warning({
            title: 'Email Empty',
            message: 'Please Enter Email',
            position: 'topRight'
        });
        valid = false;
    }
   else if (Password == "") {
        iziToast.warning({
            title: 'Password Empty',
            message: 'Please Enter Password',
            position: 'topRight'
        });
        valid = false;
    }
   else if (ConfirmPassword == "") {
       iziToast.warning({
           title: 'Confirm Password Empty',
           message: 'Please Enter Confirm Password',
           position: 'topRight'
       });
       valid = false;
    }

   else if (ConfirmPassword != Password) {
       iziToast.warning({
           title: 'Password Do Not Match',
           message: 'Password And Confirm Password Do Not Match',
           position: 'topRight'
       });
       valid = false;
    }

    var UserViewModel = {
        Password: Password,
        ConfirmPassword: ConfirmPassword,
        Email: Email,
    };

    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Account/ConfirmAccount',
            data: {
                UserViewModel: UserViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Password Created",
                        text: "Password Created Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Account/Login";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to create password, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to create password, please try again",
                    icon: 'error'
                })
            }
        });
    }

}


function UpdateCompany(Id) {
    var valid = true;


    var CompanyName = document.getElementById("CompanyName").value;
    var Description = document.getElementById("Description").value;
    var CompanyEmail = document.getElementById("CompanyEmail").value;
    var Phone = document.getElementById("Phone").value;

    var PhysicalAddress = document.getElementById("PhysicalAddress").value;


    if (CompanyName == "") {
        iziToast.warning({
            title: 'Company Name Empty',
            message: 'Please Enter Company Name',
            position: 'topRight'
        });
        valid = false;
    }
    else if (CompanyEmail == "") {
        iziToast.warning({
            title: 'Email Empty',
            message: 'Please Enter Company Email',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Phone == "") {
        iziToast.warning({
            title: 'Phone Empty',
            message: 'Please Enter Phone',
            position: 'topRight'
        });
        valid = false;
    }
    else if (PhysicalAddress == "") {
        iziToast.warning({
            title: 'Address Empty',
            message: 'Please Enter Address',
            position: 'topRight'
        });
        valid = false;
    }

    var CompanyViewModel = {
        CompanyId: Id,
        CompanyName: CompanyName,
        Description: Description,
        CompanyEmail: CompanyEmail,
        Phone: Phone,
        PhysicalAddress: PhysicalAddress,

    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Company/EditCompany',
            data: {
                CompanyViewModel: CompanyViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Company Updated",
                        text: "Company Updated Successfully.",
                        icon: "success",
                        cancelButtonText: "Close",
                        cancelButtonColor: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Company/GetAllCompanies";
                            window.location.href = url;
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Failed",
                        text: "Failed to update company, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to update company, please try again",
                    icon: 'error'
                })
            }
        });
    }

}