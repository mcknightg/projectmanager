Template.uploads.events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            var yourFile = new FS.File(file);
            yourFile.creatorId = Meteor.userId();
            yourFile.project = Session.get('active_project');
            Uploads.insert(yourFile, function (err, fileObj) {
                if (!err) {
                }
            });
        });
    }
});
Template.uploads.helpers({
    'uploads':function(){
        return Uploads.find({project:Session.get('active_project')});
    }
});
