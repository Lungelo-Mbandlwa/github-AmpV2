
//$(document).ready(() => {
//    $(".custom-file-input").on("change", function () {
//        var fileName = $(this).val().split("\\").pop();
//        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

//        var img = $('<img/>', {
//            id: 'dynamic',
//            width: 250,
//            height: 200
//        });

//        var file = this.files[0];
//        var reader = new FileReader();

//        reader.onload = function (e) {
//            img.attr('src', e.target.result);
//            $(".preview").html(img).show();
//        }

//        reader.readAsDataURL(file);
//    })
//});


//function LoadData() {


//    $.get("/Home/getMessages/", (data) => {
//        data => JSON.stringify(data);

//        data.forEach(element => {
//            if (element.type == "Plain Text") {

//            }
//            else {
//                $('#send').prepend('<img id="theImg" src="/Content/fileicon.png" />')
//            }
//        });
//    });
//}

$(function () {
    var chat = $.connection.chatHub;
    //LoadData();
    //chat.client.changeToOfflineStatus = function (RoleName) {
    //    if(RoleName == "Client")
    //    {
    //        $("#useronline").css("color", "red");
    //    }
    //    else
    //    {
    //        $("#adminonline").css("color", "red");
    //    }
    //}

    //chat.client.changeToOnlineStatus = function (RoleName) {
    //    if (RoleName == "Client") {
    //        $("#useronline").css("color", "green");
    //    }
    //    else {
    //        $("#adminonline").css("color", "green");
    //    }
    //}

    chat.client.SayWhoIsTyping = function (userid, html) {
        if (userid == "Lawyer") {
            $('#typingAdmin').text(html);
            setInterval(function () { $('#typingAdmin').text(''); }, 3000);
        }
        else {
            $('#typingClient').text(html);
            setInterval(function () { $('#typingClient').text(''); }, 3000);

        }
    };

    chat.client.addNewVNToPage = function (name, messagetype, convoid, url) {
        var vnlist = document.createElement('ul');
        var au = document.createElement('audio');
        var li = document.createElement('li');
        var link = document.createElement('a');
        var chatconvo = document.getElementById(convoid);
        var span = document.createElement('span');
        var i = document.createElement('i');
        var sender = $("#Sender").text();
        //name of .wav file to use during upload and download (without extendion)
        var filename = url;

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
        if (name == sender) {
            span.className = "right";
            span.style.backgroundColor = "#800080";
        } else {
            span.className = "left";
            span.style.backgroundColor = "#ffa500";
        }

        span.style.color = 'white';
        span.style.wordBreak = 'break-word';

        var date = new Date();
        var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var p = document.createElement('p');

        var tickleft = document.createElement('p');
        tickleft.style.className = 'w3-right fa fa-check';
        tickleft.style.color = "white";
        tickleft.style.marginTop = "15px";

        var tickright = document.createElement('i');
        tickright.style.className = 'w3-right fa fa-check';
        tickright.style.color = "black";
        tickright.style.marginTop = "15px";

        var tickseen = document.createElement('i');
        tickseen.style.className = 'w3-right fa fa-check';
        tickseen.style.color = "#1881c5";
        tickseen.style.marginTop = "15px";
        //end ticks
        p.style.fontSize = '8px';
        p.className = 'w3-right';
        p.innerHTML = time;

        span.style.padding = '10px';
        span.style.borderRadius = '4px';
        span.style.position = 'relative';
        span.style.borderWidth = '1px';
        span.style.borderStyle = 'solid';
        span.style.borderColor = 'transparent';
        span.style.marginTop = '20px';
        span.style.width = '300px';
        span.style.height = '100px';

        span.appendChild(i);
        span.appendChild(p);

        var br = document.createElement('br');
        //adding elements to discusiion div

        //add the li element to the ol
        li.appendChild(span);
        vnlist.appendChild(li);
        chatconvo.appendChild(vnlist);

        //chatconvo.appendChild(ul);
        var scroll = $('.chat-section');
        var audio = document.getElementById("audio");
        audio.play();
        scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
        var scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }

    //chat.client.DisplayClient = function (clientname) {
    //    $('#adminwindow').text(clientname);

    //};
    // Create a function that the hub can call back to display messages.

    chat.client.addNewDocumentToPage = function (name, filename, messagetype, convoid) {
        var chatconvo = document.getElementById(convoid);
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var span = document.createElement('span');
        var i = document.createElement('i');
        var sender = $("#Sender").text();

        if (name == sender) {
            span.className = "right";
            span.style.backgroundColor = "#800080";
        } else {
            span.className = "left";
            span.style.backgroundColor = "#ffa500";
        }

        span.style.color = 'white';
        span.style.wordBreak = 'break-word';

        //var date = element.DateAndTime;
        //var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        var date = new Date();
        var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var p = document.createElement('p');

        var tickleft = document.createElement('p');
        tickleft.style.className = 'w3-right fa fa-check';
        tickleft.style.color = "white";
        tickleft.style.marginTop = "15px";

        var tickright = document.createElement('i');
        tickright.style.className = 'w3-right fa fa-check';
        tickright.style.color = "black";
        tickright.style.marginTop = "15px";

        var tickseen = document.createElement('i');
        tickseen.style.className = 'w3-right fa fa-check';
        tickseen.style.color = "#1881c5";
        tickseen.style.marginTop = "15px";
        //end ticks
        p.style.fontSize = '8px';
        p.className = 'w3-right';
        p.innerHTML = time;
        p.style.marginBottom = '-10px';


        i.className = 'fa fa-download';
        var msg = filename;
        span.innerHTML = '<img style="height:50px; width:50px;" src= "/Content/fileicon.png"/> ' + '<label id="fname">' + msg + '</label>';
        span.style.padding = '10px';
        span.style.borderRadius = '4px';
        span.style.position = 'relative';
        span.style.borderWidth = '1px';
        span.style.borderStyle = 'solid';
        span.style.borderColor = 'transparent';
        span.style.marginTop = '20px';
        span.appendChild(i);
        span.appendChild(p);


        var br = document.createElement('br');
        //adding elements to discusiion div
        li.appendChild(span);
        ul.appendChild(li);

        chatconvo.appendChild(ul);
        var scroll = $('.chat-section');
        var audio = document.getElementById("audio");
        audio.play();
        scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
        var scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }

    chat.client.addNewMessageToPage = function (name, message, messagetype, convoid) {

        var chatconvo = document.getElementById(convoid);
        var sender = $("#Sender").text();
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var span = document.createElement('span');

        if (name == sender) {
            span.className = "right";
            span.style.backgroundColor = "#800080";
        } else {
            span.className = "left";
            span.style.backgroundColor = "#ffa500";
        }

        span.style.color = 'white';
        span.style.wordBreak = 'break-word';

        var date = new Date();
        var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var p = document.createElement('p');

        var tickleft = document.createElement('p');
        tickleft.style.className = 'w3-right fa fa-check';
        tickleft.style.color = "white";
        tickleft.style.marginTop = "15px";

        var tickright = document.createElement('i');
        tickright.style.className = 'w3-right fa fa-check';
        tickright.style.color = "black";
        tickright.style.marginTop = "15px";

        var tickseen = document.createElement('i');
        tickseen.style.className = 'w3-right fa fa-check';
        tickseen.style.color = "#1881c5";
        tickseen.style.marginTop = "15px";
        //end ticks
        p.style.fontSize = '8px';
        p.className = 'w3-right';
        p.innerHTML = time;
        p.style.marginBottom = '-10px';

        var msg = message;
        span.innerHTML = msg;
        span.style.padding = '10px';
        span.style.borderRadius = '4px';
        span.style.position = 'relative';
        span.style.borderWidth = '1px';
        span.style.borderStyle = 'solid';
        span.style.borderColor = 'transparent';
        span.style.marginTop = '20px';
        span.appendChild(p);

        var br = document.createElement('br');
        //adding elements to discusiion div
        li.appendChild(span);
        ul.appendChild(li);

        chatconvo.appendChild(ul);
        var scroll = $('.chat-section');
        var audio = document.getElementById("audio");
        audio.play();
        scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
        var scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;

    }


    var input = document.getElementById("messagetxt");
    $.connection.hub.start().done(function () {


        $('#messagetxt').keydown(function () {
            var encodedName = "is Typing...";
            chat.server.isTyping($("#accountloggedin").text(), encodedName);
        }),


     $("#Attach").click(function () {
        
         var filename = $('#customFile').val();
         if (filename) { // returns true if the string is not empty
             
             var messagetype = "Attachment";
             // Checking whether FormData is available in browser  
             if (window.FormData !== undefined) {

                 var fileUpload = $("#customFile").get(0);
                 var files = fileUpload.files;
                 $("#sendingdoc").show();
                 // Create FormData object  
                 var fileData = new FormData();

                 // Looping over all files and add it to FormData object  
                 for (var i = 0; i < files.length; i++) {
                     fileData.append(files[i].name, files[i]);
                 }
                 $.ajax({
                     url: '/Messages/SaveDocument',
                     type: "POST",
                     contentType: false, // Not to set any content header  
                     processData: false, // Not to process data  
                     data: fileData,
                     success: function (result) {

                         $.post("/Messages/Attach/", { ClientId: $("#ClientId").text(), LFPId: $("#LFPId").text(), FileName: result.fname, Type: messagetype, Sender: $("#Sender").text(), FileContent: result.FileContent, FileSize: result.FileSize, FilePath: result.path, Receiver: $("#Receiver").text() }, function (response) {
                             $('#customFile').val("");
                             if ($("#LaywerWorkRequestRole").text() != "") {
                                 $("#accountloggedin").text("Client");
                             }
                            
                             chat.server.sendDocument($("#Sender").text(), result.fname, messagetype, response);
                             $("#sendingdoc").hide();
                             $("#exampleModal").modal('toggle');

                         })

                     },
                     error: function (err) {
                         alert(err.statusText);
                     }
                 });

                 //chat.server.send($("#userid").val(), $('#messagetxt').val(), messagetype);
             } else {
                 alert("FormData is not supported.");
             }


         }
     }),
       
        $(".SignOutUser").click(function () {
            var Rolename = $("#accountloggedin").text();
            chat.server.offline(Rolename);
        }),
       $(".SignInUser").click(function () {
           var Rolename = $("#accountloggedin").text();
           chat.server.online(Rolename);
       }),
        // Execute a function when the user releases a key on the keyboard
      input.addEventListener("keyup", function (event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
              var messagetype = "Text";
              var message = $("#messagetxt").val();
              if (message != "") {
                  var loggedinuser = $("#accountloggedin").text();
                  if (loggedinuser == "Client") {

                      $("#usersending").show();

                  }
                  else {

                      $("#adminsending").show();
                  }

                  if ($("#LaywerWorkRequestRole").text() != "") {
                      $("#accountloggedin").text("Client");
                  }
                

                  $.post("/Messages/SendMessage/", { ClientId: $("#ClientId").text(), LFPId: $("#LFPId").text(), Message: $("#messagetxt").val(), Type: messagetype, Sender: $("#Sender").text(), Receiver: $("#Receiver").text() }, function (response) {
                      var message = $("#messagetxt").val();
                      $("#messagetxt").val("");
                      chat.server.send($("#Sender").text(), message, messagetype, response);

                      $("#usersending").css("text-decoration", "none");
                      $("#adminsending").css("text-decoration", "none");
                      $("#adminsending").hide();
                      $("#usersending").hide();
                  })
              }
              // Cancel the default action, if needed
              event.preventDefault();
          }
      });

    }),


    //Make A recording

    //webkitURL is deprecated but nevertheless
    URL = window.URL || window.webkitURL;

    var gumStream; 						//stream from getUserMedia()
    var rec; 							//Recorder.js object
    var input; 							//MediaStreamAudioSourceNode we'll be recording

    // shim for AudioContext when it's not avb. 
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext //audio context to help us record

    var recordButton = document.getElementById("recordButton");
    var stopButton = document.getElementById("stopButton");
    //var pauseButton = document.getElementById("pauseButton");

    //add events to those 2 buttons
    recordButton.addEventListener("click", startRecording);
    stopButton.addEventListener("click", stopRecording);
    //pauseButton.addEventListener("click", pauseRecording);
    $("#stopButton").prop('disabled', false);
    function startRecording() {
        console.log("recordButton clicked");
        var recordingsList = document.getElementById("recordingsList");
        if (recordingsList != null)
        {
            recordingsList.innerHTML = "";
        }
        /*
            Simple constraints object, for more advanced audio features see
            https://addpipe.com/blog/audio-constraints-getusermedia/
        */

        var constraints = { audio: true, video: false }

        /*
            Disable the record button until we get a success or fail from getUserMedia() 
        */

        recordButton.disabled = true;
        stopButton.disabled = false;
        //pauseButton.disabled = false

        /*
            We're using the standard promise based getUserMedia() 
            https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        */

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

            /*
                create an audio context after getUserMedia is called
                sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
                the sampleRate defaults to the one set in your OS for your playback device
    
            */
            audioContext = new AudioContext();

            //update the format 
            //document.getElementById("formats").innerHTML = "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz"

            /*  assign to gumStream for later use  */
            gumStream = stream;

            /* use the stream */
            input = audioContext.createMediaStreamSource(stream);

            /* 
                Create the Recorder object and configure to record mono sound (1 channel)
                Recording 2 channels  will double the file size
            */
            rec = new Recorder(input, { numChannels: 1 })

            //start the recording process
            rec.record()

            console.log("Recording started");

        }).catch(function (err) {
            //enable the record button if getUserMedia() fails
            recordButton.disabled = false;
            stopButton.disabled = true;
            //pauseButton.disabled = true
        });
    }

    function pauseRecording() {
        console.log("pauseButton clicked rec.recording=", rec.recording);
        if (rec.recording) {
            //pause
            rec.stop();
            pauseButton.innerHTML = "Resume";
        } else {
            //resume
            rec.record()
            pauseButton.innerHTML = "Pause";

        }
    }

    function stopRecording() {
        console.log("stopButton clicked");
        $("#sendvoice").attr("disabled", false);
        //disable the stop button, enable the record too allow for new recordings
        stopButton.disabled = true;
        recordButton.disabled = false;
        //pauseButton.disabled = true;

        //reset button just in case the recording is stopped while paused
        //pauseButton.innerHTML = "Pause";

        //tell the recorder to stop the recording
        rec.stop();

        //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        //create the wav blob and pass it on to createDownloadLink
        rec.exportWAV(createDownloadLink);
    }

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    function createDownloadLink(blob) {
        var recordingsList = document.getElementById("recordingsList");
        var url = URL.createObjectURL(blob);
        var au = document.createElement('audio');
        var li = document.createElement('li');
        var link = document.createElement('a');

        if ($("#LaywerWorkRequestRole").text() != "") {
            $("#accountloggedin").text("Client");
        }

        $('#recordingsList li').remove();
        //name of .wav file to use during upload and download (without extendion)
        var filename = getRandomString(8) + ".wav";

        //add controls to the <audio> element
        au.controls = true;
        au.src = url;

        //save to disk link
        link.href = url;
        link.download = filename; //download forces the browser to donwload the file using the  filename
       // link.innerHTML = "Save to disk";

        //add the new audio element to li
        li.appendChild(au);

        //add the filename to the li
        li.appendChild(document.createTextNode(filename + ".wav "))

        //add the save to disk link to li
        li.appendChild(link);

        //upload link
        var upload = document.getElementById('sendvoice');
        //upload.href = "#";
        //upload.innerHTML = "Upload";
        upload.addEventListener("click", function (event) {
            $("#sendingvn").show();
            var xhr = new XMLHttpRequest();
            xhr.onload = function (e) {
                if (this.readyState === 4) {
                    console.log("Server returned: ", e.target.responseText);
                }
            };
            var fd = new FormData();

            fd.set("audio_data", blob, filename);
            var fname = $("#filename").text();
            if (fname == filename)
            {
                xhr.open("POST", "/Messages/SendVoiceNote", true);
                xhr.send(fd);

                xhr.responseType = 'json';
                var messagetype = "voicenote";
                xhr.onload = () =>  $.post("/Messages/SaveVoiceNote/", { ClientId: $("#ClientId").text(), LFPId: $("#LFPId").text(), FileName: xhr.response.filename, Type: messagetype, Sender: $("#Sender").text(), FileContent: xhr.response.FileContent, FileSize: xhr.response.FileSize, FilePath: xhr.response.path, Receiver: $("#Receiver").text() }, function (response) {
                    $('#customFile').val("");
                    chat.server.sendVn($("#Sender").text(), messagetype, response.ConvoId, response.Path);
                    $("#sendingvn").hide();
                    $("#record").modal('toggle');

                })
            }
           
        })
        //li.appendChild(document.createTextNode(" "))//add a space in between
        //li.appendChild(upload)//add the upload link to li

        //add the li element to the ol
        recordingsList.appendChild(li);
        $("#filename").text(filename);
        $("#bloburl").text(url);


    }

});

