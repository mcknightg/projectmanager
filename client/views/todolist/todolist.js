Template.todoList.helpers({	
    todos:function(){
        return Todos.find({archived: {$ne: true}});
    }
});
Template.todoList.events({
	'click .archive':function(evt,tmpl){
		return Meteor.call('archiveTodo', this._id,!this.archived);
	},
    'click .todochecked':function(evt,tmpl){

        return Meteor.call('completeTodo',this._id,!this.completed);
    }
});