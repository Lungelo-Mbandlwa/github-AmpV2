$(document).ready(function () {
    $(".left-first-section").click(function () {
        $(".main-section").toggleClass("open-more");
    });
});



$(document).ready(function () {
    $("#openfilemodal").click(function () {
        $("#sendingdoc").hide();
    });
});

$(document).ready(function () {
    $(".fa-minus").click(function () {
        $(".main-section").toggleClass("open-more");
    });
});
$(document).ready(function () {
    $(".fa-times").click(function () {
        $("#showhide").hide();
    });
});

$(document).ready(function () {
    $("#userwindow").hide();
    $("#adminwindow").hide();
    $("#showhide").hide();
    $("#useronline").hide();
    $("#adminonline").hide();
    $("#sendvoice").attr("disabled", true);

    $.get("/Account/GetRoleName/", function (response) {
        $("#accountloggedin").text(response.RoleName);
        $("#accountloggedinId").text(response.UserId);
        $("#Sender").text(response.Sender);
    });
});

function LoadChats(RequesterId, LFPId) {
    $.get(
      "/Account/CheckOnlineIdentification/",
      { LawyerId: LFPId, ClientId: RequesterId },
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
      { ClientId: RequesterId, LFPId: LFPId },
      (data) => {
          (data) => JSON.stringify(data);
          var getDivId = $("#convoid").text();
          var chatconvo = document.getElementById(getDivId);
          var Sender = $("#Sender").text();
          chatconvo.innerHTML = "";

          $("#loadmessages").hide();
          data.forEach((element) => {
              if (element.Type == "Text") {
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
                  //var ul = document.createElement('ul');
                  //var li = document.createElement('li');
                  //var span = document.createElement('span');
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
                  p.style.marginBottom = "-10px";

                  i.className = "fa fa-download";

                  var msg = element.FileName;
                  //span.innerHTML = '<img style="height:25%; width:25%;" src= "/Content/fileicon.png"/>';
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
                  //START JELE
                  var getDivId = $("#convoid").text();
                  var chatconvo = document.getElementById(getDivId);
                  //var ul = document.createElement('ul');
                  //var li = document.createElement('li');
                  //var span = document.createElement('span');

                  var au = document.createElement("audio");
                  var link = document.createElement("a");
                  var filename = filename;
                  au.controls = true;
                  au.src = url;
                  link.href = url;
                  link.download = filename;
                  var linkbr = document.createElement("br");
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

                  //span.style.padding = '10px';
                  span.style.borderRadius = "4px";
                  span.style.height = "100px";
                  span.style.position = "relative";
                  span.style.width = "300px";
                  span.style.paddingBottom = "-10px";
                  span.style.borderWidth = "1px";
                  span.style.borderStyle = "solid";
                  span.style.borderColor = "transparent";
                  span.style.marginTop = "20px";

                  span.appendChild(au);
                  li.appendChild(span);
                  ul.appendChild(li);
                  chatconvo.appendChild(ul);

                  var scroll = $(".chat-section");

                  scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
                  var scrollingElement = document.scrollingElement || document.body;
                  scrollingElement.scrollTop = scrollingElement.scrollHeight;

              }
          });
      }
    );
}


$(document).ready(function () {
    $("#openvnmodal").click(function () {
        var recordingsList = document.getElementById("recordingsList");
        if (recordingsList != null) {
            $('#recordingsList li').remove();
        }
        $("#sendvoice").attr("disabled", true);
    })
})


$(document).ready(function () {
    $("#closerecord").click(function () {
        var recordingsList = document.getElementById("recordingsList");
        if (recordingsList != null) {
            $('#recordingsList li').remove();
        }
    })
})

$(document).ready(function () {
    $("#dismismodaldisplay").click(function () {
        var recordingsList = document.getElementById("recordingsList");
        if (recordingsList != null) {
            $('#recordingsList li').remove();
        }
    })
})

$(document).ready(function () {
    $(".chat2").on("click", "li", function (e) {
        var FileName = $(this).find("#fname").text().trim();

        if (FileName != "") {
            window.location.href =
              "/Messages/DownloadAttachment?FileName=" + FileName;
        }
    });
});
$(document).ready(function () {
    $(".chat2").on("mouseover", "i", function () {
        $(this).css("cursor", "pointer").attr("title", "Download File");
    });
});



function StartConversation(ClientId, LFPId) {
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
function CheckLoggedinUser(UserId) {
    $.get(
      "/Account/CheckLoggedinUser/",
      { UserId: UserId },
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
}
function LoadChats(ClientId, LFPId) {
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
}

$(document).ready(function () {
    $(".startchat").click(function () {
        var RoleName = $("#accountloggedin").text();
        $("#loadmessages").show();
        if (RoleName == "Client") {
            //var ClientId = $(this).closest("tr").find(".ClientId").text().trim();
            var LFPId = $(this).closest("tr").find(".LFPId").text().trim();
            var WorkRequest = $(this).closest("tr").find(".TitleWorkRequest").text().trim();

            $("#LFPId").text(LFPId);
            var RequesterId = $("#accountloggedinId").text();
            $("#ClientId").text(RequesterId);
            $("#WorkRequest").text(WorkRequest);
            StartConversation(RequesterId, LFPId);
            LoadChats(RequesterId, LFPId);
        } else {

            var ClientId = $(this).closest("tr").find(".ClientId").text().trim();
            //var LFPId = $(this).closest("tr").find(".LFPId").text().trim();
            if (ClientId == "") {

                var LFPId = $(this).closest("tr").find(".LFPId").text().trim();
                var ClientId = $("#accountloggedinId").text();
                $("#ClientId").text(ClientId);
                $("#LFPId").text(LFPId);

                StartConversation(ClientId, LFPId);
                LoadChats(ClientId, LFPId);
            }
            else {
                $("#ClientId").text(ClientId);
                var LFPId = $("#accountloggedinId").text();
                $("#LFPId").text(LFPId);
                StartConversation(ClientId, LFPId);
                LoadChats(ClientId, LFPId);
            }


            var WorkRequest = $(this).closest("tr").find(".TitleWorkRequest").text().trim();

            $("#WorkRequest").text(WorkRequest);

        }
        $(".main-section").toggleClass("open-more");
        $("#showhide").show();
      

    });
});

//bid application chat.
$(document).ready(function () {
    $(".startbidchat").click(function () {
        var RoleName = $("#accountloggedin").text();
        $("#loadmessages").show();
        if (RoleName == "Client") {
            var WorkRequest = $(this).closest("tr").find(".TitleWorkRequest").text().trim();
            var LFPId = $(this).closest("tr").find(".BidderId").text().trim();

            $("#LFPId").text(LFPId);
            var RequesterId = $("#accountloggedinId").text();
            $("#ClientId").text(RequesterId);
            $("#WorkRequest").text(WorkRequest);

            StartConversation(RequesterId, LFPId);
            LoadChats(RequesterId, LFPId);
        } else {
            var ClientId = $(this).closest("tr").find(".WRCreatedBy").text().trim();
            //var LFPId = $(this).closest("tr").find(".LFPId").text().trim();
            if (ClientId == "") {
                var LFPId = $(this).closest("tr").find(".BidderId").text().trim();
                var ClientId = $("#accountloggedinId").text();
                $("#ClientId").text(ClientId);
                $("#LFPId").text(LFPId);

                StartConversation(ClientId, LFPId);
                LoadChats(ClientId, LFPId);
            }
            else {
                $("#ClientId").text(ClientId);
                var LFPId = $("#accountloggedinId").text();
                $("#LFPId").text(LFPId);
                StartConversation(ClientId, LFPId);
                LoadChats(ClientId, LFPId);
            }


            var WorkRequest = $(this).closest("tr").find(".TitleWorkRequest").text().trim();

            $("#WorkRequest").text(WorkRequest);

        }
        $(".main-section").toggleClass("open-more");
        $("#showhide").show();
         
    });
});
