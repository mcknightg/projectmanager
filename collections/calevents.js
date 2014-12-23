CalEvents = new Mongo.Collection('calevents');
CalEvents.allow({
    insert:function(userId,calevent){
        return true;
    },
    update:function(userId,calevent,fields,modifier){
        return true;
    },
    remove:function(userId,calevent){
        return true;
    }
});
