const mongoose = require("mongoose");
const connectiontodb = mongoose.connect(
  "mongodb+srv://simardeep:simardeep@mpgamecluster.5ds3v.mongodb.net/?retryWrites=true&w=majority&appName=MPGAMECluster",
  {
    dbName: "UsersInMpGame",
  }
);
module.exports = connectiontodb;
