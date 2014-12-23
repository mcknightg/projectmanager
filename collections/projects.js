Projects = new Mongo.Collection('projects');
Projects.allow({
    insert:function(userId,project){
        return true;
    },
    update:function(userId,project,fields,modifier){
        return true;
    },
    remove:function(userId,project){
        return true;
    }
});