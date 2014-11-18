Meteor.startup(function () {
	if(Meteor.users.find({'profile.role': 'admin'}).count() < 1){
		Accounts.createUser({username: 'geomck1967@gmail.com', password: '12345678', profile: {role: 'admin', Name: 'Admin'}});
	}
});
Meteor.methods({
	'saveProject':function(project){
		check(project.name, String);
		project.userId = Meteor.userId();
		project.dateentered = new Date();
		project.lastupdate = new Date();
		if(!project.datedue){
			project.datedue = new Date();
		}
		if(!project.customer){
			project.customer = Customers.findOne({})._id;
		}
		return Projects.insert(project);
		
	},	
	'updateProject':function(id,project){
		project.description = "Project ";
		project.userId = Meteor.userId();
		if(!project.customer){
			project.customer = Customers.findOne({})._id;
		}
		return Projects.update({_id:id},{$set:
			{
				name:project.name,
				description:project.description,
				datedue:project.datedue,
				customer:project.customer,
				dateentered:project.dateentered,
				lastupdate : new Date()
				
			}
		});
	},
	'updateProjectName':function(id,name){
    return Projects.update({_id:id},{$set:{name:name}});
	},
	'updateProjectCustomer':function(project,id){
		return Projects.update({_id:project},{$set:
			{
				customer:id				
			}
		});
	},
	'updateProjectDate':function(project,date){
		return Projects.update({_id:project},{$set:
			{
				datedue:date				
			}
		});
	},
	'removeProject':function(id){
		Projects.remove({_id:id});
		Todos.remove({project:id});
		Conversations.remove({project:id});
	},

	'addCalEvent':function(calevent){
		if(!calevent.type){
			calevent.type = 'milestone';
		}
		return CalEvents.insert(calevent);
	},
    'updateCalEvent':function(calevent){
        return CalEvents.update({_id:calevent._id},{$set:{title:calevent.title,start:calevent.start,end:calevent.end}});
    },
    'updateCalEventTimes':function(calEvent){
		return CalEvents.update(calEvent.id, {$set: {start:calEvent.start,end:calEvent.start}});
	},
	'addCustomer':function(name){
		return Customers.insert({name:name});
	},
	'updateCustomerName':function(id,name){
        return Customers.update({_id:id},{$set:{name:name}});
    },
    'updateCustomerPhone':function(id,phone){
        return Customers.update({_id:id},{$set:{phone:phone}});
    },
    'updateCustomerContact':function(id,contact){
        return Customers.update({_id:id},{$set:{contact:contact}});
    },
	'removeCustomer':function(id){
		return Customers.remove({_id:id});
	},
	'addConversation':function(conversation){
		conversation.archived = false;
		return Conversations.insert(conversation);
	},
	'archiveConversation':function(id,archived){
	Conversations.update({_id:id},{$set:{archived:archived}});
	},
	'archiveProject':function(id,archived){
	Project.update({_id:id},{$set:{archived:archived}});
	},
	'addTodo':function(todo){
		todo.userId = Meteor.user().username;
		todo.dateadded = new Date();
		todo.archived = false;
		todo.completed = false;
		return Todos.insert(todo);
	},
	'archiveTodo':function(id,archived){
		Todos.update({_id:id},{$set:{archived:archived}})
	},
    'completeTodo':function(id,complete){
        Todos.update({_id:id},{$set:{completed:complete}})
    },
    addFlit:function(flit){
    	return Flits.insert(flit);
    },
    removeFlits:function(){
    	return Flits.remove({});
    }
});