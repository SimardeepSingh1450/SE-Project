const mongoose=require('mongoose');
const connectiontodb=mongoose.connect('mongodb+srv://simardeep:simardeep@mpgamecluster.13nb16e.mongodb.net/?retryWrites=true&w=majority',{
    dbName:'UsersInMpGame'
});
module.exports=connectiontodb;