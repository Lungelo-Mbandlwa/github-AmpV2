"use strict";

$("#toastr-1").click(function () {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var EmailMsg = document.getElementById("emailcheckresults");
    var Phone = document.getElementById('phonenumber');
    if ($("#firstname").val() == '') {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Enter Your First Name !',
            position: 'topRight'
        });
        return false;
    }
    else if ($("#lastname").val() == '') {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Enter Your Last Name !',
            position: 'topRight'
        });
        return false;
    }
    else if ($("#phonenumber").val() == '') {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Enter Your Cell Phone Number !',
            position: 'topRight'
        });
        return false;
    }
    else if (Phone.value.length != 10) {
        iziToast.warning({
            title: 'Warning',
            message: "Invalid Phone Number!",
            position: 'topRight'
        });
        return false;
    }
    else if ($("#ProvinceId").find(':selected').text() == "Select Province") {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Select Province !',
            position: 'topRight'
        });
        return false;
    }
    else if ($("#Email").val() == '') {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Enter Your Email Address !',
            position: 'topRight'
        });
        return false;
    }
    else if (EmailMsg.innerText == "Email Already Exists On The System. Please Use Another One")
    {
        iziToast.warning({
            title: 'Warning!',
            message: EmailMsg.innerText,
            position: 'topRight'
        });
        return false;
    }
    else if (EmailMsg.innerText == "Please include an '@' in the Email address. '" + $("#Email").val() + "' is missing an '@'") {
        iziToast.warning({
            title: 'Warning!',
            message: EmailMsg.innerText,
            position: 'topRight'
        });
        return false;
    }
    else if ($("#Password").val() == '') {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please Enter Your Password !',
            position: 'topRight'
        });
        return false;
    }
    else if ($("#Password").val().length < 8) {
        iziToast.warning({
            title: 'Warning!',
            message: 'Password should be minimum 8 characters in length',
            position: 'topRight'
        });
        return false;
    }
    else if (!$("#Password").val().match(decimal)) {
        iziToast.warning({
            title: 'Warning!',
            message: 'Passwords must contain all four available character types: lowercase letters, uppercase letters, numbers, and symbols',
            position: 'topRight'
        });
        return false;
    }
    else {
        //iziToast.success({
        //    title: 'Great, Job !',
        //    message: 'You Have Been Successful Registered On The System',
        //    position: 'topRight'
        //});
    }
  
});

$("#toastr-2").click(function() {
  iziToast.success({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'topRight'
  });
});

$("#toastr-3").click(function() {
  iziToast.warning({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'topRight'
  });
});

$("#toastr-4").click(function() {
  iziToast.error({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'topRight'
  });
});

$("#toastr-5").click(function() {
  iziToast.show({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'bottomRight' 
  });
});

$("#toastr-6").click(function() {
  iziToast.show({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'bottomCenter' 
  });
});

$("#toastr-7").click(function() {
  iziToast.show({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'bottomLeft' 
  });
});

$("#toastr-8").click(function() {
  iziToast.show({
    title: 'Hello, world!',
    message: 'This awesome plugin is made by iziToast',
    position: 'topCenter' 
  });
});
