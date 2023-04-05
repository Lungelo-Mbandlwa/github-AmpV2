"use strict";
//var stringTemplate ='<div class="tooltip" role="tooltip">'+
//                        '<div class="card card-primary">' +

//                            '<div class="card-header">' +


//                                        '<h3>'+
//                                            '<small>Title for work request asnsdas sdsf</small>'+
//                                        '</h3>' +


//                            '</div>' +

//                            '<div class="card-body">' +

//                                     '<div>' +
//                                        '<label class="lead">Assigned To : </label> <label class="lead">Nkanyiso Manyoni</label>' +
//                                    '</div>' +

//                                    '<div class="text-wrap" style="width:400px;height:100%;">' +
//                                        '<label class="lead">Description :</label><p>This the descriptopThis dfgdfghtrhf trhtrhr  fthjtjhtr  rtjrtjtrb ffg   fgnfnfgjfgjfgj fgbdfhdfhdfhdfdf  dgdfgdfgdfg dfgdfg dfgdfg dfgdfg dfgdfgdf dfgdf gdfg dfgfdgfddfgdfg dfgdf the descriptopThis the descriptopThis the descriptop This the descriptopThis the descriptopThis the descriptopThis the descriptopThis the descriptop This the descriptopThis the descriptop</p>' +
//                                    '</div>'+

//                            '</div>' +

//                        '</div>'+
//                    '</div>';






//var workingWithEvent = '<div class="tooltip" role="tooltip">'+
//                        '<div class="card card-primary">' +

//                            '<div class="card-header">' +

//                                '<div class="container-fluid">'+
//                                    '<div class="row">' +
//                                        '<label class="lead">'+
//                                            '<span class="fa fa-calendar-alt fa-fw"></span>'+event.title+''+
//                                        '</label>' +
//                                    '</div>' +
//                                '</div>' +

//                            '</div>' +

//                            '<div class="card-body">'+

//                            '</div>' +

//                        '</div>'+
//                    '</div>';

$("#myEvent").fullCalendar({
    height: 'auto',
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
    },
    eventLimit: true,
    nowIndicator: true,
    displayEventTime: false,
    editable: false,
    timeFormat: 'HH:mm',
    eventTextColor: 'white',
    //eventColor:'#3abaf4',
    eventOverlap: true,
    events:
        {
            url: '/Calendar/GetWorkRequests',
            method: 'POST',
            failure: function () {
                //Add Toaster incase error happens
            }
        },
    eventRender: function (event, element, view) {
        var display = "none";
        if(event.isOverdue){
            display = "visibilty";
        }
        $(element).tooltip({
            title: event.description,
            trigger: 'hover',
            boundary: 'window',
            container: 'body',
            template: '<div class="tooltip" role="tooltip" style="width:400px;">' +
                        '<div class="card card-primary">'+
                                  '<form class="needs-validation" novalidate="">'+

                                        '<div class="card-header">' +
                                            '<div class="container-fluid row" style="padding-bottom:5px">' +
                                                '<h4>'+event.title+'</h4>' +
                                            '</div>' +

                                            '<div class="container-fluid row">' +
                                                '<div class="pr-4">' + moment(event.start).format('dddd[, ]MMMM DD') + '</div>' +
                                                '<div class="badges"><span class="badge badge-danger float-right " style="display:' + display + ';">Overdue</span></div>' +
                                            '</div>' +

                                        '</div>'+

                                        '<div class="card-body">'+
                                              '<div class="row align-items-end">' +
                                                '<label class="col-sm-4" style="padding-right: 0px"><b>Assigned To : </b></label>' +
                                                    '<label class="col-sm-8" style="padding-left: 0px;">' +
                                                         event.assignedTo +
                                                    '</label>'+
                                              '</div>' +

                                              '<div class="row align-items-start">' +
                                                '<label class="col-sm-4" style="padding-right: 0px;"><b>Description : </b></label>' +
                                                    '<label class="col-sm-8" style="padding-left: 0px;">' +
                                                         event.description+
                                                    '</label>' +
                                              '</div>' +

                                        '</div>'+
                                  '</form>'+
                        ' </div>'+
                    '</div>',
            //template: '<div class="tooltip" role="tooltip"><div class="card"><div class="card-header"><div class="row"><label class="lead mt-4"><span class="fa fa-calendar-alt fa-fw"></span>Title for work request</label></div></div><div class="card-body">Body</div></div></div>',
            //template: '<div class="tooltip" role="tooltip"><div class="card card-primary"><div class="card-header"><h2 class="section-title">Event title</h2></div><div class="card-body">Details of the event</div></div></div>'
        });
    },
    eventClick: function (event, element) {
        if (event.isClient == true) {
            window.location.href = "/AssignedWork/Index";
        } else {
            window.location.href = "/ReceiveWork/AssignedWorkRequest";
        }
    }
});
