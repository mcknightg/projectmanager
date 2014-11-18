Template.todoDlg.events({
    'click .closetodo': function () {
        Session.set('addingTodo', false);
    },
    'click .savetodo': function (evt, tmpl) {
        var todo = {};
        todo.note = tmpl.find('.todoitem').value || 'Empty';
        todo.project = Session.get('active_project');
        Meteor.call('addTodo', todo);
        Session.set('addingTodo', false);
    }
});