Template.conversationList.helpers({
    conversations:function(){
        return Conversations.find({archived: {$ne: true}},{sort:{dateadded:-1},limit:Session.get('convlimit')|| 3});
    },
    convlimit:function(){
    	return Session.get('convlimit') || 3;
    },
    useremail:function(){

        return this.username;
    }
});
Template.conversationList.events({
	'click .convlimit': function (evt,tmpl) {
		var curlimit = Session.get('convlimit');
		if(curlimit > 0){
			Session.set('convlimit', curlimit + 5);
		} else{
			Session.set('convlimit', 3);
		}
	},
	'click .archive':function(evt,tmpl){
		Meteor.call('archiveConversation', this._id,!this.archived);
	}
});