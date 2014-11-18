Template.activityTpl.helpers({
	'yourfirstname':function(){
		return 'George';
	}
})
Template.activityTpl.events({
	'click .someclass':function(evt,tmpl){
		doSomething();
	}
})
Template.activityTpl.rendered = function(){
	
}