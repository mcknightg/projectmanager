Template.conversationDlg.events({
    'click .closeconversation': function () {
        Session.set('adding_conversation', false);
    },
    'click .saveconversation': function (evt, tmpl) {
        var text = tmpl.find('#conversationtext').value;
        var conversation = {
            "username": Meteor.user().username,
            "note": text,
            "dateadded": new Date(),
            "project": Session.get('active_project')
        };
        Meteor.call('addConversation', conversation);
        Session.set('adding_conversation', false);
    }
});

Template.conversationDlg.rendered = function () {
    $('.dateDue').datepicker();
};