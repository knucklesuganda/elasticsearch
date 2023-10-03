
const mongoose = require('mongoose');

const stationModel = mongoose.Schema({
    fid:{
        type: Number,
        required: [true, "Pls add fid value"]
    },
    id:{
        type: Number,
        required: [true, "Pls add id value"] 
    },
    Name:{
        type: String
    },
    Address:{
        type: String
    },
    x:{
        type: String
    },
    y:{
        type: String 
    } ,
    total_journeys_starting:{
        type: Number
    } ,
    total_journeys_ending:{
        type: Number
    }  
}, {
    timepstamps: true,
})

module.exports = mongoose.model('station', stationModel);