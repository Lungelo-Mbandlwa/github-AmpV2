
function ValidateForgotPasswordUsername() {
    var valid = false;

    $.get("/Account/CheckUserByUsername/", { Email: $('#email').val() },
        function (data) {

            if (data == "Usernameexists") {
                valid = true;
                document.getElementById('usernameerr').innerHTML = '';
                document.getElementById("btnSubmit").disabled = false;
                document.getElementById('invalid-feedback').innerHTML = '';
            }
            else {
                valid = false;
                document.getElementById('usernameerr').innerHTML = 'The email address does not exist';
                document.getElementById("btnSubmit").disabled = true;
                document.getElementById("email").focus();
                document.getElementById('invalid-feedback').innerHTML = '';

            }
        });

    return valid;
}


function ForgotPasswordUsername() {
    var username = document.getElementById("email").value;
    var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (username == "") {
        document.getElementById("usernameerr").innerHTML = 'Email is required';
        document.getElementById("btnSubmit").disabled = true;
        document.getElementById("email").focus();
        document.getElementById('invalid-feedback').innerHTML = '';

        return (false);
    }
    else if (email.test(username) == false) {
        document.getElementById("usernameerr").innerHTML = 'Please enter a valid email address';
        document.getElementById("btnSubmit").disabled = true;
        document.getElementById("email").focus();
        document.getElementById('invalid-feedback').innerHTML = '';

        return (false);
    }
    else if (email.test(username) == true) {
        //Get User by Email 
        var exist = ValidateForgotPasswordUsername(username);
        document.getElementById('invalid-feedback').innerHTML = '';

        return (exist);
    }
    else {
        document.getElementById('usernameerr').innerHTML = '';
        document.getElementById("btnSubmit").disabled = false;
        document.getElementById('invalid-feedback').innerHTML = '';

        return (true);
    }
}

function checkPasswordMatch() {
    var password = $("#PasswordText").val();
    var confirmPassword = $("#ConfirmPasswordText").val();

    if (password != confirmPassword)
        $("#confirmpassworderr").html("Passwords do not match!");
    else
        $("#confirmpassworderr").html("Passwords match.");
}

$(document).ready(function () {
    $("#ConfirmPasswordText").keyup(checkPasswordMatch);
});


function ValidateStrongPassword() {
    var username = document.getElementById('UsernameText').value;
    var password = document.getElementById('PasswordText').value;
    var confirmPassword = document.getElementById('ConfirmPasswordText').value;
    document.getElementById("resetPasswordButton").disabled = false;
    document.getElementById("passworderr").innerHTML = '';
    document.getElementById("confirmpassworderr").innerHTML = '';

    if (password == "") {
        document.getElementById("passworderr").innerHTML = 'Password is required';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('PasswordText').value = "";
        document.getElementById('PasswordText').focus();
        return false;
    }
    if (password == username) {
        document.getElementById("passworderr").innerHTML = 'Password must be different from Username';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('PasswordText').value = "";
        document.getElementById('PasswordText').focus();
        return false;
    }
    if (password.length < 8) {
        document.getElementById("passworderr").innerHTML = 'Password must contain at least 8 characters';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('PasswordText').value = "";
        document.getElementById('PasswordText').focus();
        return false;
    }

    re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!re.test(password)) {
        document.getElementById("passworderr").innerHTML = 'Passwords must use all the available character types: lowercase letters, uppercase letters, numbers, and symbols';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('PasswordText').value = "";
        document.getElementById('PasswordText').focus();
        return false;
    }

    //if (password.length >= 8) {
    //    var reg = [/[a-z]/, /[A-Z]/, /[0-9]/, /[(!@#$%&]/]
    //    var count = 0;
    //    for (var i = 0; i < reg.length; i++) {
    //        if (reg[i].test(password)) {
    //            count++;
    //        }
    //        if (count >= 3) {
    //            document.getElementById('ConfirmPasswordText').value = "";
    //            document.getElementById('ConfirmPasswordText').focus();
    //            return false;
    //        }
    //    }
    //    document.getElementById("passworderr").innerHTML = 'Passwords must use at least three of the four available character types: lowercase letters, uppercase letters, numbers, and symbols';
    //    document.getElementById("resetPasswordButton").disabled = true;
    //    document.getElementById('PasswordText').value = "";
    //    document.getElementById('PasswordText').focus();
    //    return false;
    //}

    if (password != confirmPassword) {
        document.getElementById("confirmpassworderr").innerHTML = 'Passwords do not match';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('ConfirmPasswordText').value = "";
        document.getElementById('ConfirmPasswordText').focus();
        return false;
    }

}

function ValidateConfirmPassword() {

    var password = document.getElementById('PasswordText').value;
    var confirmPassword = document.getElementById('ConfirmPasswordText').value;
    document.getElementById("resetPasswordButton").disabled = false;
    document.getElementById("confirmpassworderr").innerHTML = '';

    if (password == "" && confirmPassword == "") {
        document.getElementById("passworderr").innerHTML = 'Password is required';
        document.getElementById("confirmpassworderr").innerHTML = 'Confirm Password is required';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('PasswordText').value = "";
        document.getElementById('PasswordText').focus();
        return false;
    }
    else if (password == "" && confirmPassword != "") {
        document.getElementById("passworderr").innerHTML = 'Password is required';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('PasswordText').value = "";
        document.getElementById('PasswordText').focus();
        return false;
    }

    if (confirmPassword == "") {
        document.getElementById("confirmpassworderr").innerHTML = 'Confirm Password is required';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('ConfirmPasswordText').value = "";
        document.getElementById('ConfirmPasswordText').focus();
        return false;
    }
    if (confirmPassword.length < 8) {
        document.getElementById("confirmpassworderr").innerHTML = 'Confirm Password must contain at least 8 characters';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('ConfirmPasswordText').value = "";
        document.getElementById('ConfirmPasswordText').focus();
        return false;
    }
    if (password != confirmPassword) {
        document.getElementById("confirmpassworderr").innerHTML = 'Passwords do not match';
        document.getElementById("resetPasswordButton").disabled = true;
        document.getElementById('ConfirmPasswordText').value = "";
        document.getElementById('ConfirmPasswordText').focus();
        return false;
    }
}


