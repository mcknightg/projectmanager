Session.set('editing_project', false);
Template.projects.events({

    'click .deleteProject': function (evt, tmpl) {
        evt.preventDefault();
        evt.stopPropagation();
        if (Session.get('projectToDelete'))
            Meteor.call('removeProject', Session.get('projectToDelete'));
        Session.set('projectToDelete', null);
    },
    'click .deleteConfirm': function (evt, tmpl) {
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('projectToDelete', this._id);

    },
    'click .closeProject': function (evt, tmpl) {
        Session.set('projectToDelete', null);
    },
    'click .sortToggle': function (evt, tmpl) {
        var projectSorts =
        {
            'name': 'datedue',
            'datedue': 'name'
        };
        Session.set('projectSorts', projectSorts[evt.target.text]);
        evt.target.text = projectSorts[evt.target.text];
    },
    'keyup input[type=text]': function (event, tmpl) {
        if (event.which === 27 || event.which === 13) {
            event.preventDefault();
            event.target.blur();
            var project = {};
            project.name = tmpl.find('#projectNameEnter').value;
            Meteor.call('saveProject', project);
            tmpl.find('#projectNameEnter').value = '';
            tmpl.find('#projectNameEnter').focus();
        }
    }

});
Template.projects.helpers({
    projects: function () {
        var filter = {sort: {}};
        filter.sort[Session.get('projectSorts')] = 1;
        return Projects.find({}, filter);
    },
    projectToDelete: function () {
        return Session.get('projectToDelete');
    },
    sortType: function () {
        return Session.get('sortType') || 'name';
    }
});
Template.project.helpers({
    customer: function (customer) {
        var cust = Customers.findOne({_id: this.customer});
        return cust;
    }
});

