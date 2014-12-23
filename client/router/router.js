Router.configure({
    yieldTemplates: {
        header: {
            to: 'header'
        },
        footer: {
            to: 'footer'
        }
    }
});
Router.map(function () {

    this.route('home', {
        path: '/',
        data: function () {
        }
    });


    this.route('projects', {
        layoutTemplate: 'layout',
        path: '/projects',
        loginRequired:true,
        waitOn: function () {
            Session.set('editing_project', false);
            Meteor.subscribe('customers');
            Meteor.subscribe('calevents', Meteor.userId());
            Meteor.subscribe('projects', Meteor.userId());
        }

    });
    this.route('projectForm', {
        layoutTemplate: 'layout',
        path: '/projects/:_id',
        waitOn: function () {
            Meteor.subscribe('customers');
            Meteor.subscribe('conversations', this.params._id);
            Meteor.subscribe('todos', this.params._id);
            Meteor.subscribe('calevents');
            Meteor.subscribe('uploads');
            Meteor.subscribe('directory');
            Session.set('active_project', this.params._id);
            Meteor.subscribe('projectEdit', this.params._id)
        },
        data:function(){
                return Projects.findOne({_id: this.params._id});
        }
    });

    this.route('customers', {
        layoutTemplate: 'layout',
        waitOn: function () {
            Meteor.subscribe('customers');
        },
        path: '/customers'
    });
    this.route('archives', {
        layoutTemplate: 'layout',
        path: '/archives',
        waitOn: function () {
            Meteor.subscribe('archives', Meteor.userId(), Meteor.user().username);

        }
    });
    this.route('roles', {
        layoutTemplate: 'layout',
        path: '/roles'
    });
});

Meteor.subscribe('flits');
Meteor.subscribe('directory');
