function UserLogin() {
    var valid = true;
    var Username = document.getElementById("username").value;
    var Password = document.getElementById("password").value;
    if (Username == "") {
        valid = false;
        iziToast.warning({
            title: 'Username Empty',
            message: 'Please Enter Your Username',
            position: 'topRight'
        });
    }
    else if (Password == "") {
        valid = false;
        iziToast.warning({
            title: 'Password Empty',
            message: 'Please Enter Your Password',
            position: 'topRight'
        });
    }
    else {
        if (valid == true) {
            var LoginViewModel = {
                Username: Username,
                Password: Password,
                RememberLogin: true,
            };

            $.ajax({
                type: 'POST',
                url: "/Account/Login",
                data: { LoginViewModel: LoginViewModel },
                success: function (response) {
                    if (response == "User Found") {
                        var url = "/Home/Dashboard";
                        window.location.href = url;

                    }
                    else if (response == "Username and password incorrect") {
                        iziToast.warning({
                            title: 'Incorrect Password',
                            message: 'Username and Password Is Incorrect, Please try again',
                            position: 'topRight'
                        });
                    }
                    else if (response == "This account is not active")
                    {
                        iziToast.warning({
                            title: 'This account is not active',
                            message: 'Please contact system administrator and try again',
                            position: 'topRight'
                        });
                    }
                    else {
                        iziToast.warning({
                            title: 'User Does Not Exist',
                            message: response,
                            position: 'topRight'
                        });
                    }
                },
                error: function (ex) {
                    iziToast.warning({
                        title: 'Error',
                        message: 'Please try again',
                        position: 'topRight'
                    });
                }
            });
        }
    }

}