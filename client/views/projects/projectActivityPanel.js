Template.projectActivityPanel.helpers({
	 activity:function(){
        var sort = -1;
        if(!Session.get('projectActivityAscending')){
          sort = 1;
        }
        return CalEvents.find({projectId:Session.get('active_project')},{reactive:true,sort:{start:sort}});
    },
    projectActivityDirection:function(){
        if(Session.get('projectActivityAscending')){
            return 'Descending';
        } else{
            return 'Ascending';
        }
    }
});
Template.projectActivityPanel.events({
	'click #projectActivityDirection':function(evt,tmpl){
        Session.set('projectActivityAscending',!Session.get('projectActivityAscending'));
    }
})