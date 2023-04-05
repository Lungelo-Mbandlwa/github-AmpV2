
$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Messages/GetNotificationsViewAll",
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
                    + "<td class='fullName'>" + notification.Fullname + "</td>"
                    + "<td>" + notification.Message + "</td>"
                    + "<td>" + notification.TimeAgo
                    + "</td>"
                    + "<td>" + message + "</td>"
                    + "<td class='conversationId' hidden='hidden'>" + notification.ConversationId + "</td>"
                     + "<td class='messageId' hidden='hidden'>" + notification.MessageId + "</td>"
                     + "<td class='ClientId' hidden='hidden'>" + notification.SendById + "</td>"
                    + "<td>" +
                           '<span type="button" aria-hidden="true" data-icon="&#xe000;"><i class="fas fa-comments startchat" style="font-size:16px" id="convoId"></i></span>' +
                       "</td>" +

                    + "</tr>");
            });
        },
        error: function (error) {
            console.log(error);
        }
    })
})



$(document).on('click', '#convoId', function () {
    var ConversationId = $(this).closest("tr").find(".conversationId").text().trim();
    var MessageId = $(this).closest("tr").find(".messageId").text().trim();
    var fullname = $(this).closest("tr").find(".fullName").text().trim();
        $("#userwindow").text(fullname);
        $("#userwindow").show();
        $("#useronline").show();
    //alert(MessageId + " " + ConversationId);
    $.get("/Messages/GetClientAndLawyerId/", { convoId: ConversationId, MessageId: MessageId }, function (response) {
        $("#ClientId").text(response.ClientId);
        $("#LFPId").text(response.LFPId);
        initiateConversation(response.ClientId, response.LFPId);
        LoadDataViewAll(response.ClientId, response.LFPId);
        $('.chat2').attr("id", ConversationId);
        $("#convoid").text(ConversationId);
    })

});


function initiateConversation(ClientId, LFPId) {
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

function LoadDataViewAll(ClientId, LFPId) {

    $.get(
    "/Account/CheckOnlineIdentification/",
    { LawyerId: LFPId, ClientId: ClientId },
    function (response) {
        
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

