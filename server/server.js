Meteor.startup(function () {
    if (Meteor.users.find().fetch().length === 0) {
        var users = [
            {name:"Customer Service",email:"cs@home.com",roles:['view-projects','view-customers']},
            {name:"Admin User",email:"geomck1967@gmail.com",roles:['admin']}
        ];

        _.each(users, function (userData) {
           var id = Accounts.createUser({
                email: userData.email,
                password: "apple1",
                username:userData.email,
                profile: { name: userData.name }
            });
            Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
            Roles.addUsersToRoles(id, userData.roles);
        });
    }
    if(Customers.find().count() < 1){
        Meteor.call('addCustomer','House Account');
    }
});
Meteor.methods({
    'saveProject': function (project) {
        check(project.name, String);
        project.userId = Meteor.userId();
        project.dateentered = new Date();
        project.lastupdate = new Date();
        if (!project.datedue) {
            project.datedue = new Date();
        }
        if (!project.customer) {
            project.customer = Customers.findOne({})._id;
        }
        project.invited = [];
        return Projects.insert(project);

    },
    'updateProject': function (id, project) {
        project.description = "Project ";
        project.userId = Meteor.userId();
        if (!project.customer) {
            project.customer = Customers.findOne({})._id;
        }
        return Projects.update({_id: id}, {
            $set: {
                name: project.name,
                description: project.description,
                datedue: project.datedue,
                customer: project.customer,
                dateentered: project.dateentered,
                lastupdate: new Date(),
                invited: project.invited

            }
        });
    },
    'updateProjectName': function (id, name) {
        return Projects.update({_id: id}, {$set: {name: name}});
    },
    'updateProjectCustomer': function (project, id) {
        return Projects.update({_id: project}, {
            $set: {
                customer: id
            }
        });
    },
    'updateProjectDate': function (project, date) {
        return Projects.update({_id: project}, {
            $set: {
                datedue: date
            }
        });
    },
    'removeProject': function (id) {
        Projects.remove({_id: id});
        Todos.remove({project: id});
        Conversations.remove({project: id});
    },
    'archiveProject': function (id, archived) {
        Project.update({_id: id}, {$set: {archived: archived}});
    },
    'addCalEvent': function (calevent) {
        if (!calevent.type) {
            calevent.type = 'milestone';
        }
        return CalEvents.insert(calevent);
    },
    'updateCalEvent': function (calevent) {
        return CalEvents.update({_id: calevent._id}, {
            $set: {
                title: calevent.title,
                start: calevent.start,
                end: calevent.end
            }
        });
    },
    'updateCalEventTimes': function (calEvent) {
        return CalEvents.update(calEvent.id, {$set: {start: calEvent.start, end: calEvent.start}});
    },
    'addCustomer': function (name) {
        return Customers.insert({name: name});
    },
    'updateCustomerName': function (id, name) {
        return Customers.update({_id: id}, {$set: {name: name}});
    },
    'updateCustomerPhone': function (id, phone) {
        return Customers.update({_id: id}, {$set: {phone: phone}});
    },
    'updateCustomerContact': function (id, contact) {
        return Customers.update({_id: id}, {$set: {contact: contact}});
    },
    'removeCustomer': function (id) {
        return Customers.remove({_id: id});
    },
    'addConversation': function (conversation) {
        conversation.archived = false;
        return Conversations.insert(conversation);
    },
    'addTodo': function (todo) {
        todo.userId = Meteor.user().username;
        todo.dateadded = new Date();
        todo.archived = false;
        todo.completed = false;
        return Todos.insert(todo);
    },
    'archiveConversation': function (id, archived) {
        Conversations.update({_id: id}, {$set: {archived: archived}});
    },

    'archiveTodo': function (id, archived) {
        Todos.update({_id: id}, {$set: {archived: archived}})
    },
    'completeTodo': function (id, complete) {
        Todos.update({_id: id}, {$set: {completed: complete}})
    },
    addFlit: function (flit) {
        return Flits.insert(flit);
    },
    removeFlits: function () {
        return Flits.remove({});
    },
    'sendMessage': function (toId, msg) {
        sendMessage(Meteor.userId(), toId, msg);
    },
    'updateRoles': function (targetUserId, roles, group) {
        var loggedInUser = Meteor.user();

        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                ['admin'], group)) {
            throw new Meteor.Error(403, "Access denied")
        }

        Roles.setUserRoles(targetUser, roles, group)
    },
    'deleteUser': function (targetUserId, group) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                ['admin'])) {
            throw new Meteor.Error(403, "Access denied")
        }
        Roles.setUserRoles(targetUserId, [])
    },
    'inviteUser': function (projectid, userId) {
        console.log(projectid, userId);
        var project = Projects.findOne(projectid);
        if (!project || project.userId !== this.userId) {
            throw new Meteor.Error(404, "No such project");
        }
        if (userId !== project.userId && !_.contains(project.invited, userId)) {
            Projects.update(projectid, {$addToSet: {invited: userId}});
        }
    },
    'removeInvite': function (projectid, userId) {
        var project = Projects.findOne(projectid);
        if (!project || project.userId !== this.userId) {
            throw new Meteor.Error(404, "No such project");
        }
        Projects.update(projectid, {$pull: {invited: userId}});
    },
    addToRole:function(user,role){

    },
    removeFromRole:function(user,role){

    }
});
