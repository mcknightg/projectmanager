Meteor.publish('projects', function(userId){
	return Projects.find(
		{$or: [{invited: this.userId}, {userId: this.userId}]});
});

Meteor.publish('allprojects',function(){
	if (Roles.userIsInRole(this.userId, ['admin'])) {

		return Projects.find();

	} else {

		this.stop();
		return;

	}
});
Meteor.publish('archives', function(userId,username){
  	return [
		Conversations.find({username:username,archived:true}),
		Todos.find({userId:username,archived:true}),
		Projects.find({userId:userId,archived:true})
	];
});
Meteor.publish('projectEdit', function(projectId){
  	return Projects.find({_id: projectId});
});
Meteor.publish('calevents', function(userId,project){
  	return CalEvents.find({owner: userId,project:project});
});
Meteor.publish('customers', function(){
  	return Customers.find({});
});
Meteor.publish('uploads',function(){
	return Uploads.find();
});
Meteor.publish('conversations', function(projectid){
  	return Conversations.find({project:projectid});
});
Meteor.publish('todos', function(projectid){
  	return Todos.find({project:projectid});
});
Meteor.publish('usertodos', function(userId){
  	return Todos.find({userId:userId});
});
Meteor.publish('userconversations', function(userId){
  	return Conversations.find({username:userId});
});
Meteor.publish('flits',function(){
	return Flits.find();
});
Meteor.publish("directory", function () {
  return Meteor.users.find({}, {});
});
Meteor.publish(null, function (){
	return Meteor.roles.find({})
});

