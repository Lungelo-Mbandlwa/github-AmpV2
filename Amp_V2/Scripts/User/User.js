function DeactivateUser(Id) {

    $.ajax({
        type: 'POST',
        url: '/Account/DeactivateUser',
        data: {
            userId: Id
        },
        success: function (response) {
            if (response == true) {
                Swal.fire({
                    title: "User De-Activated",
                    text: "User Deactivated Successfully.",
                    icon: "success",
                    cancelButtonText: "Close",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "/Account/GetAllSystemUsers";
                        window.location.href = url;
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to deactivate user, please try again",
                    icon: 'error'
                })
            }

        },
        error: function (ex) {
            Swal.fire({
                title: "Failed",
                text: "Failed to deactivate user, please try again",
                icon: 'error'
            })
        }
    });
}

function ActivateUser(Id) {
    alert("Its Hitting");
    $.ajax({
        type: 'POST',
        url: '/Account/ActivateUser',
        data: {
            userId: Id
        },
        success: function (response) {
            if (response == true) {
                Swal.fire({
                    title: "User Activated",
                    text: "User Activated Successfully.",
                    icon: "success",
                    cancelButtonText: "Close",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "/Account/GetAllSystemUsers";
                        window.location.href = url;
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to activate user, please try again",
                    icon: 'error'
                })
            }

        },
        error: function (ex) {
            Swal.fire({
                title: "Failed",
                text: "Failed to activate user, please try again",
                icon: 'error'
            })
        }
    });
}