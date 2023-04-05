﻿$(function () {
    // Click on notification icon for show notification
    $('span.noti').click(function (e) {
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
        $('#notiContent').empty();
        $('#notiContent').append($('<li>Loading...</li>'));
        $("#idMarkAll").hide();
        $.ajax({
            type: 'GET',
            url: '/Messages/GetNotifications',
            success: function (response) {
                $('#notiContent').empty();
                if (response.length == 0) {
                    $('#notiContent').append($('<li>No unread message available</li>'));
                    $("#idMarkAll").hide();
                    $("#checkbeep").removeClass("beep");
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
                        $('#notiContent').append($('<li >'
                                                        + "<span style='font-weight: bold;'>" + value.Fullname + "</span>" + '<br/>'
                                                        + value.Message + '<br/>'
                                                        + "<span style='font-style: italic;'>" + value.TimeAgo + "</span>" + '<br/>'
                                                        + " " +
                                                        '<label id="convoId" hidden="hidden">' + value.ConversationId + '</label>' +
                                                         '<label id="msgId" hidden="hidden">' + value.MessageId + '</label>' +
                                                        '</li>'));
                        $("#idMarkAll").show();
                        //$("#idViewAll").show();

                        $("#notiContent li:contains(' ')").css("background-color", "#f4f6f9");

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

function initConversation(ClientId, LFPId) {
    $.get(
      "/Messages/StartConversation/",
      { LawyerId: LFPId, ClientId: ClientId },
      function (response) {
          $(".chat2").attr("id", response.ConvoId);

          $("#convoid").text(response.ConvoId);
          $("#Receiver").text(response.Receiver);
      }
    );
}

function hideText(text) {
    var source = document.getElementsByTagName('html')[0].innerHTML;
    var found = source.search("No");

}


$(document).ready(function () {
    $("#notiContent").on('click', 'li', function (e) {
        var msgid = $(this).find("#msgId").text().trim();
        var convoid = $(this).find("#convoId").text().trim();
        $(".chat2").attr("id", convoid);
        $("#convoid").text(convoid);

        $.get("/Messages/GetClientAndLawyerId/", { convoId: convoid, MessageId: msgid }, function (response) {

            var RoleName = $("#accountloggedin").text();

            if (RoleName == "Client") {
                //var ClientId = $(this).closest("tr").find(".ClientId").text().trim();
                var LFPId = response.LFPId;

                $("#LFPId").text(LFPId);
                var RequesterId = $("#accountloggedinId").text();
                $("#ClientId").text(RequesterId);

                initConversation(RequesterId, LFPId);
                LoadChats(RequesterId, LFPId);
            } else {
                var ClientId = response.ClientId;
                //var LFPId = $(this).closest("tr").find(".LFPId").text().trim();

                $("#ClientId").text(ClientId);
                var LFPId = $("#accountloggedinId").text();
                $("#LFPId").text(LFPId);
                initConversation(ClientId, LFPId);
                LoadChats(ClientId, LFPId);
            }

            LoadData(response.ClientId, response.LFPId);
        })

        //if (FileName != "") {
        //    window.location.href = "/Messages/DownloadAttachment?FileName=" + FileName;
        //}

    });
})


function LoadData(ClientId, LFPId) {

    $.get(
    "/Account/CheckOnlineIdentification/",
    { LawyerId: LFPId, ClientId: ClientId },
    function (response) {
        if ($("#LaywerWorkRequestRole").text() != "") {
            $("#adminwindow").text(response.LawyerName);
            $("#adminwindow").show();
            $("#adminonline").show();
        }
        else if ($("#accountloggedin").text() == "Client") {
            $("#adminwindow").text(response.LawyerName);
            $("#adminwindow").show();
            $("#adminonline").show();
        } else {
            $("#userwindow").text(response.ClientName);
            $("#userwindow").show();
            $("#useronline").show();
        }
    }
  );
    $.get(
      "/Messages/GetMessages/",
      { ClientId: ClientId, LFPId: LFPId },
      (data) => {
          (data) => JSON.stringify(data);
          var getDivId = $("#convoid").text();
          var chatconvo = document.getElementById(getDivId);
          var Sender = $("#Sender").text();
          chatconvo.innerHTML = "";

          $("#loadmessages").hide();
          data.forEach((element) => {
              if (element.Type == "Text") {
                  var getDivId = $("#convoid").text();
                  var chatconvo = document.getElementById(getDivId);

                  var ul = document.createElement("ul");
                  var li = document.createElement("li");
                  var span = document.createElement("span");

                  if (element.Sender == Sender) {
                      span.className = "right";
                      span.style.backgroundColor = "#800080";
                  } else {
                      span.className = "left";
                      span.style.backgroundColor = "#ffa500";
                  }

                  span.style.color = "white";
                  span.style.wordBreak = "break-word";

                  //var date = element.DateAndTime;
                  //var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  var date = element.Date;
                  var time = element.Time;
                  var p = document.createElement("p");

                  var tickleft = document.createElement("p");
                  tickleft.style.className = "w3-right fa fa-check";
                  tickleft.style.color = "white";
                  tickleft.style.marginTop = "15px";

                  var tickright = document.createElement("i");
                  tickright.style.className = "w3-right fa fa-check";
                  tickright.style.color = "black";
                  tickright.style.marginTop = "15px";

                  var tickseen = document.createElement("i");
                  tickseen.style.className = "w3-right fa fa-check";
                  tickseen.style.color = "#1881c5";
                  tickseen.style.marginTop = "15px";
                  //end ticks
                  p.style.fontSize = "8px";
                  p.innerHTML = time;
                  p.style.marginBottom = "-10px";

                  var msg = element.Message;
                  span.innerHTML = msg;
                  span.style.padding = "10px";
                  span.style.borderRadius = "4px";
                  span.style.position = "relative";
                  span.style.borderWidth = "1px";
                  span.style.borderStyle = "solid";
                  span.style.borderColor = "transparent";
                  span.style.marginTop = "20px";
                  span.appendChild(p);

                  var br = document.createElement("br");
                  //adding elements to discusiion div
                  li.appendChild(span);
                  ul.appendChild(li);

                  chatconvo.appendChild(ul);
                  var scroll = $(".chat-section");

                  scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
                  var scrollingElement = document.scrollingElement || document.body;
                  scrollingElement.scrollTop = scrollingElement.scrollHeight;
              } else if (element.Type == "Attachment") {
                  var getDivId = $("#convoid").text();
                  var chatconvo = document.getElementById(getDivId);
                  var ul = document.createElement("ul");
                  var li = document.createElement("li");
                  var span = document.createElement("span");
                  var i = document.createElement("i");

                  if (element.Sender == Sender) {
                      span.className = "right";
                      span.style.backgroundColor = "#800080";
                  } else {
                      span.className = "left";
                      span.style.backgroundColor = "#ffa500";
                  }
                  span.style.color = "white";
                  span.style.wordBreak = "break-word";

                  //var date = element.DateAndTime;
                  //var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  var date = element.Date;

                  var time = element.Time;
                  var p = document.createElement("p");

                  var tickleft = document.createElement("p");
                  tickleft.style.className = "w3-right fa fa-check";
                  tickleft.style.color = "white";
                  tickleft.style.marginTop = "15px";

                  var tickright = document.createElement("i");
                  tickright.style.className = "w3-right fa fa-check";
                  tickright.style.color = "black";
                  tickright.style.marginTop = "15px";

                  var tickseen = document.createElement("i");
                  tickseen.style.className = "w3-right fa fa-check";
                  tickseen.style.color = "#1881c5";
                  tickseen.style.marginTop = "15px";
                  //end ticks
                  p.style.fontSize = "8px";
                  p.className = "w3-right";
                  p.innerHTML = time;
                  p.style.marginBottom = "-10px";

                  i.className = "fa fa-download";
                  var msg = element.FileName;
                  span.innerHTML =
                    '<img style="height:50px; width:50px;" src= "/Content/fileicon.png"/> ' +
                    '<label id="fname">' +
                    msg +
                    "</label>";
                  span.style.padding = "10px";
                  span.style.borderRadius = "4px";
                  span.style.position = "relative";
                  span.style.borderWidth = "1px";
                  span.style.borderStyle = "solid";
                  span.style.borderColor = "transparent";
                  span.style.marginTop = "20px";
                  span.appendChild(i);
                  span.appendChild(p);

                  var br = document.createElement("br");
                  //adding elements to discusiion div
                  li.appendChild(span);
                  ul.appendChild(li);

                  chatconvo.appendChild(ul);
                  var scroll = $(".chat-section");

                  scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
                  var scrollingElement = document.scrollingElement || document.body;
                  scrollingElement.scrollTop = scrollingElement.scrollHeight;
              } else {
                  var vnlist = document.createElement("ul");
                  var au = document.createElement("audio");
                  var li = document.createElement("li");
                  var link = document.createElement("a");
                  var getDivId = $("#convoid").text();
                  var chatconvo = document.getElementById(getDivId);
                  var span = document.createElement("span");
                  var i = document.createElement("i");

                  var filename = element.FileName;
                  var url = element.FileName;
                  //name of .wav file to use during upload and download (without extendion)

                  //add controls to the <audio> element
                  au.controls = true;
                  au.src = url;

                  //save to disk link
                  link.href = url;
                  link.download = filename; //download forces the browser to donwload the file using the  filename

                  //add the new audio element to li
                  span.appendChild(au);

                  //add the filename to the li
                  //span.appendChild(document.createTextNode(filename))

                  //add the save to disk link to li
                  span.appendChild(link);

                  if (element.Sender == Sender) {
                      span.className = "right";
                      span.style.backgroundColor = "#800080";
                  } else {
                      span.className = "left";
                      span.style.backgroundColor = "#ffa500";
                  }

                  span.style.color = "white";
                  span.style.wordBreak = "break-word";

                  var date = new Date();
                  var time = element.Time;
                  var p = document.createElement("p");

                  var tickleft = document.createElement("p");
                  tickleft.style.className = "w3-right fa fa-check";
                  tickleft.style.color = "white";
                  tickleft.style.marginTop = "15px";

                  var tickright = document.createElement("i");
                  tickright.style.className = "w3-right fa fa-check";
                  tickright.style.color = "black";
                  tickright.style.marginTop = "15px";

                  var tickseen = document.createElement("i");
                  tickseen.style.className = "w3-right fa fa-check";
                  tickseen.style.color = "#1881c5";
                  tickseen.style.marginTop = "15px";
                  //end ticks
                  p.style.fontSize = "8px";
                  p.className = "w3-right";
                  p.innerHTML = time;
                  p.marginBottom = "-100px";

                  span.style.padding = "10px";
                  span.style.height = "100px";
                  span.style.borderRadius = "4px";
                  span.style.width = "300px";
                  span.style.position = "relative";
                  span.style.borderWidth = "1px";
                  span.style.borderStyle = "solid";
                  span.style.borderColor = "transparent";
                  span.style.marginTop = "20px";
                  span.appendChild(i);
                  span.appendChild(p);

                  var br = document.createElement("br");
                  //adding elements to discusiion div
                  li.appendChild(span);
                  //add the li element to the ol

                  vnlist.appendChild(li);
                  chatconvo.appendChild(vnlist);

                  var scroll = $(".chat-section");

                  scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
                  var scrollingElement = document.scrollingElement || document.body;
                  scrollingElement.scrollTop = scrollingElement.scrollHeight;
              }
          });
      }
    );


    $("#showhide").show();
}

$(document).ready(function () {
    $.get("/Messages/CheckMessage/", function (response) {
        if (response == true) {
            $("#checkbeep").addClass("beep");
        }
    })

})


function MarkAllAsRead() {
    $("#notiContent li").each(function () {
        var convoid = $(this).find("#convoId").text().trim();
        $.get("/Messages/MarkAllAsRead/", { convoId: convoid }, function (response) {
            $("#checkbeep").removeClass("beep");
        })
    })
}

