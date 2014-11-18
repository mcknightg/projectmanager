Template.calendar.rendered = function () {
    Session.set('shorten', true);
    Session.set('editing_calevent', false);
    $calendar = $('.projectCalendar');
    var calendar = $calendar.fullCalendar({
        dayClick:function( date, allDay, jsEvent, view ) {
            var ce = {
                start:date,
                end:date,
                color:'red',
                className:'todo',
                projectId:Session.get('active_project'),
                title:'New Milestone',
                owner:Meteor.userId
            };
            Meteor.call('addCalEvent',ce);
        },
        eventClick:function(calEvent,jsEvent,view){
            Session.set('editing_calevent',calEvent.id);
        },
        eventDrop:function(reqEvent){
            Meteor.call('updateCalEventTimes',reqEvent);
        },
        events: function(start, end, callback) {
            var events = [];
            var calEvents = CalEvents.find({projectId:Session.get('active_project')},{reactive:false});
            calEvents.forEach(function(evt){
                var event = {id:evt._id,title:evt.title,start:evt.start,end:evt.end,color:evt.color,type:evt.type};
                events.push(event);
            });
            callback(events);
        },
        eventRender: function (evt, ele) {
            var bkgrd = 'teal';
            var icon = 'fa-users';
            var addtltext = '';
            if (evt.type === 'hoursworked') {
                bkgrd = 'darkblue';
                icon = 'fa-cog';
                addtltext = ' Hours Worked';
            }
            ele.html('<div style="background-color:' + bkgrd + ';color:white"><i class="fa '+icon+'"></i> ' + evt.title + addtltext + ' </div>');
        },
        header: {
            left: 'title',
            center: 'today',
            right: 'prev,next'
        },
        contentHeight: 200,
        theme:true,
        defaultView: 'basicWeek',
        selectable: true,
        selectHelper: true,
        editable:true,
        weekMode: 'liquid'
    }).data().fullCalendar;
    Deps.autorun(function(){
        CalEvents.find({projectId:Session.get('active_project')}).fetch();
        if(calendar){
            calendar.refetchEvents();
        }
    })

};