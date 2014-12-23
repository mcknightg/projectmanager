Template.projectForm.helpers({
    adding_conversation: function () {
        return Session.get('adding_conversation');
    },
    addingTask: function () {
        return Session.get('addingTask');
    },
    addingTodo: function () {
        return Session.get('addingTodo');
    },
    editing_calevent: function () {
        return Session.get('editing_calevent')
    }
});

Template.projectForm.events({
    'click .addconversation': function () {
        Session.set('adding_conversation', true);
    },
    'click .shorten': function () {
        Session.set('shorten', !Session.get('shorten'));
    },
    'click .addtodo': function () {
        Session.set('addingTodo', true);
    }
});



