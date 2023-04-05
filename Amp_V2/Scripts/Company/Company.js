// Company Logo validation
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
        for (var i = 0; i <= fi.files.length - 1; i++) {

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

function AddNewCompany() {
    var valid = true;
    var CompanyName = document.getElementById("CompanyName").value;  
    var CompanyEmail = document.getElementById("CompanyEmail").value;
    var Phone = document.getElementById("Phone").value;

    var Name = document.getElementById("Name").value;
    var Surname = document.getElementById("Surname").value;
    var Email = document.getElementById("Email").value;
    var Password = document.getElementById("Password").value;


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
            title: 'Company Email Empty',
            message: 'Please Company Email',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Phone == "") {
        iziToast.warning({
            title: 'Phone Number Empty',
            message: 'Please Enter Phone',
            position: 'topRight'
        });
        valid = false;
    }
    else if (Name == "") {
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
    else if (Password == "") {
        iziToast.warning({
            title: 'Password Empty',
            message: 'Please Enter Password -- Select Next Tab',
            position: 'topRight'
        });
        valid = false;
    }
    //Company View model
    var CompanyViewModel = {
        CompanyName: CompanyName,
        CompanyEmail: CompanyEmail,
        Description: document.getElementById("Description").value,
        PhysicalAddress: document.getElementById("PhysicalAddress").value,
        Phone: document.getElementById("Phone").value,
        Logo: document.getElementById("logo").value,
    };

    //User View Model
    var UserViewModel = {
        Name: Name,
        Surname: Surname,
        Email: Email,
        ContactNumber: document.getElementById("ContactNumber").value,
        Password: Password,
    };

    var AddCompanyViewModel = {
        CompanyViewModel: CompanyViewModel,
        UserViewModel: UserViewModel,      
    };
    if (valid == true) {
        $.ajax({
            type: 'POST',
            url: '/Company/AddCompany',
            data: {
                AddCompanyViewModel: AddCompanyViewModel
            },
            success: function (response) {
                if (response == true) {
                    Swal.fire({
                        title: "Company Created",
                        text: "Company Created Successfully.",
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
                        text: "Failed to create company, please try again",
                        icon: 'error'
                    })
                }

            },
            error: function (ex) {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to create company, please try again",
                    icon: 'error'
                })
            }
        });
    }

}


