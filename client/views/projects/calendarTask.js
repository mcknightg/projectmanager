Template.calendartask.events({
    'click .closetask': function () {
        Session.set('editing_calevent', false);
        resetEventType();
    },
    'click .removeTask': function (evt, tmpl) {
        CalEvents.remove({_id: Session.get('editing_calevent')});
        Session.set('editing_calevent', false);
    },
    'click .saveTask': function (evt, tmpl) {
        var type = tmpl.find('.taskTitle').value;
        if (tmpl.find('.name')) {
            var name = tmpl.find('.name').value;
            CalEvents.update({_id: Session.get('editing_calevent')}, {
                $set: {
                    type: type,
                    title: name,
                    projectId: Session.get('active_project'),
                    type: type
                }
            });
            Session.set('editing_calevent', false);
            resetEventType();
        }
    },
    'change .taskTitle': function (evt) {
        var typeselected = evt.target.value;
        Session.set('eventttype', typeselected);
    }
});


var resetEventType = function () {
    Session.set('eventttype', null);
};
Template.calendartask.helpers({
    editing_calevent: function () {
        return Session.get('editing_calevent');
    },
    evttype_milestone: function () {
        return Session.equals('eventttype', 'milestone');
    },
    evttype_hoursworked: function () {
        return Session.equals('eventttype', 'hoursworked');
    }
});

