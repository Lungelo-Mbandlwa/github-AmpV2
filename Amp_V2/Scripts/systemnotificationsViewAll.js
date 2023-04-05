$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Settings/GetNotificationsViewAll",
        traditional: true,
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            var notifications = response;
            $.map(notifications, function (notification) {

                var message = "";
                if (notification.MessageSeen == false) {
                    message = 'No';
                }
                else {
                    message = 'Yes';
                }

                $("#tblNotification tbody").append("<tr>"
                    + "<td>" + notification.Notification + "</td>"
                    + "<td>" + notification.TimeAgo + "</td>"
                    + "<td>" + message + "</td>"
                    + "<td class='conversationId' hidden='hidden'>" + notification.ConversationId + "</td>"
                     + "<td class='messageId' hidden='hidden'>" + notification.MessageId + "</td>"
                    
                    + "</tr>");
            });
        },
        error: function (error) {
            console.log(error);
        }
    })
})
