Template.registerHelper('formatdate', function(datetime){
    if (moment && datetime) {
	    return moment(datetime).format("MM/DD/YYYY");
	  }
	  else {
	    return datetime;
	  }
});
Template.registerHelper('formatdatetime', function(datetime){
    if (moment && datetime) {
        if(datetime.getDate() === new Date().getDate()){
            return "Today " + moment(datetime).format("hh:mm");
        } else{
            return moment(datetime).format("MM/DD/YYYY hh:mm");
        }
        
      }
      else {
        return datetime;
      }
});

Template.registerHelper('shorten', function(str,len){
    if(str && len){
        if(str.length > len && Session.get('shorten')){
            str = str.substring(0,len) + "...";
        }
    }
    return str;
});
Template.registerHelper('formatphone', function(str){

    if(str.length > 9){
        str = "(" + str.substring(0,3) + ")" + str.substring(3,6) + "-" + str.substring(6,13);
    }
    return str;
});
Template.registerHelper('isAdmin', function(){
    if(Meteor.user() && Meteor.user().profile)
    var role = Meteor.user().profile.role;
    return role === 'admin';
});