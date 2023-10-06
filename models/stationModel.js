
const mongoose = require('mongoose');
const { stationElasticService } = require('./elasticSearch');

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


stationElasticService.createIndex({
    "properties": {
        "fid": {
            "type": "integer"
        },
        "price": {
            "type": "float"
        },
        "category": {
            "type": "keyword"
        }
    }
})


module.exports = mongoose.model('station', stationModel);