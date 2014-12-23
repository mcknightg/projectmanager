Uploads = new FS.Collection('uploads',
    {stores:[new FS.Store.FileSystem('uploads',{path:'~/meteor_uploads'})]
});
Uploads.allow({
  insert:function(userId,project){
    return true;
  },
  update:function(userId,project,fields,modifier){
    return true;
  },
  remove:function(userId,project){
    return true;
  },
  download:function(){
    return true;
  }
});
