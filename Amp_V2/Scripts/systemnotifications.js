
$(document).ready(function () {
    $.get("/Settings/CheckMessageSystem/", function (response) {
        if (response == true) {
            $("#checkbeepsystem").addClass("beep");
        }
    })

        $.get("/Settings/AssignedWorkIsDueForWorkRequest/", function (response) {
        if(response==true)
        {
            $("#checkbeepsystem").addClass("beep");
        }
    })
})


function MarkAllAsReadSystem() {
    $("#notiContentSystem li").each(function () {
        var userid = $(this).find("#userId").text().trim();
        $.get("/Settings/MarkAllAsReadSystem/", { UserId: userid }, function (response) {
            $("#checkbeepsystem").removeClass("beep");
        })
    })
}


$(function () {
    // Click on notification icon for show notification
    $('span.system').click(function (e) {
        e.stopPropagation();
        $('.dropdown-item-desc').show();
        updateNotification();
    })
    // hide notifications
    $('html').click(function () {
        $('.dropdown-item-desc').hide();
    })
    // update notification 
    function updateNotification() {
        $('#notiContentSystem').empty();
        $('#notiContentSystem').append($('<li>Loading...</li>'));
        $("#idMarkAllSystem").hide();
        $.ajax({
            type: 'GET',
            url: '/Settings/GetNotificationsSystem',
            success: function (response) {
                $('#notiContentSystem').empty();
                if (response.length == 0) {
                    $('#notiContentSystem').append($('<li>No unread message available</li>'));
                    $("#idMarkAllSystem").hide();
                    $("#checkbeepsystem").removeClass("beep");
                }
                else {
                    var message = "";
                    var msgid = 0;
                    $.each(response, function (index, value) {
                        if (value.MessageSeen == false) {
                            message = 'Message has not been read';
                        }
                        else {
                            message = '';
                        }
                        $('#notiContentSystem').append($('<li >'
                                                        + value.Notification + '<br/>'
                                                        + "<span style='font-style: italic;'>" + value.TimeAgo + "</span>" + '<br/>'
                                                        + " " +
                                                        '<label id="notificationId" hidden="hidden">' + value.Id + '</label>' +
                                                        '<label id="userId" hidden="hidden">' + value.UserId + '</label>' +
                                                        '</li>'));
                        $("#idMarkAllSystem").show();
                        //$("#idViewAll").show();

                        $("#notiContentSystem li:contains(' ')").css("background-color", "#f4f6f9");

                    });
                }

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    // update notification count
    function updateNotificationCount() {
        var count = 0;
        count = parseInt($('span.count').html()) || 0;
        count++;
        $('span.count').html(count);
    }
    // signalr js code for start hub and send receive notification
    var notificationHub = $.connection.ChatHub;
    $.connection.hub.start().done(function () {
        console.log('Notification hub started');
    });

    //signalr method for push server message to client
    notificationHub.client.notify = function (message) {
        if (message && message.toLowerCase() == "added") {
            //updateNotificationCount();
            updateNotification();
        }
    }

})

function hideText(text) {
    var source = document.getElementsByTagName('html')[0].innerHTML;
    var found = source.search("No");

}


$(document).ready(function () {
    $("#notiContentSystem").on('click', 'li', function (e) {
        var id = $(this).find("#notificationId").text().trim();
        var userid = $(this).find("#userId").text().trim();
        $.get("/Settings/UpdateSystemStatus/", { UserId: userid, NotificationId: id }, function (response) {
        })

        //if (FileName != "") {
        //    window.location.href = "/Messages/DownloadAttachment?FileName=" + FileName;
        //}

    });
})


