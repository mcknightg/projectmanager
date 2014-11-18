Projects = new Mongo.Collection('projects');
Conversations = new Mongo.Collection('conversations');
Customers = new Mongo.Collection('customers');
CalEvents = new Mongo.Collection('calevents');
Todos = new Mongo.Collection('todos');
Flits = new Mongo.Collection('flits');


Projects.allow({
  insert: function (userId, project) {
    return false; 
  },
  update: function (userId, project, fields, modifier) {
    return userId === project.owner;
  },
  remove: function (userId, project) {
    return project.owner === userId ;
  }
});

CalEvents.allow({
  insert: function (userId, calevent) {
    return true;
  },
  update: function (userId, calevent, fields, modifier) {
    
    return true;
  },
  remove: function (userId, calevent) {
    return true;
  }
});

