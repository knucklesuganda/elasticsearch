
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const Station = require('../models/stationModel')


// @desc GET Station info
// @route GET/api/station
// @access Private
const getStation = asyncHandler(async (req, res) => {
        const station = await Station.find();
        console.log(station)    
        res.send(station)
})

// @desc get Journey info
// @route POST/api/journey/list   body parameters: sort, skip, limit
// @access Private
const getStationListWithSort = asyncHandler(async (req, res) => {
    const limit = req.body.limit || 10
    const sort = req.body.sort || 'Name'
    const skip = req.body.skip || 0
    const stations = await Station.aggregate([
                {$match: {}},
                {$sort: {sort: 1}},
                {$skip: skip },
                {$limit: limit }]
                );  
    res.send(stations)
})

// @desc POST Station info create Or Update
// @route POST/api/station
// @access Private
const createOrUpdateStation = asyncHandler(async (req, res) => {
     if(!req.body.fid && !req.body.id && !req.body.name){
        res.status(400)
        throw new Error("FID, ID and name fields are reqired");
     }
     
    // const newStation = {
    //     FID: req.body.FID,
    //     ID: req.body.ID,
    //     Nimi:req.body.Nimi,
    //     Namn:req.body.Namn,
    //     Name:req.body.Name,
    //     Osoite:req.body.Osoite,
    //     Adress: req.body.Adress,
    //     Kaupunki: req.body.Kaupunki,
    //     Stad: req.body.Stad,
    //     Operaattor: req.body.Operaattor,
    //     Kapasiteet: req.body.Kapasiteet,
    //     x:req.body.x,
    //     y:req.body.y,
    //  total_journeys_starting,
    // total_journeys_ending
    // }
    const newStation = {
             fid: req.body.fid,
             id: req.body.id,
             Name:req.body.Name,
             Address: req.body.Address,
             x:req.body.x,
             y:req.body.y,
             total_journeys_starting: 0,
             total_journeys_ending: 0
        }
        console.log(newStation)
    const myquery = { fid: req.body.fid, };
    const newvalues = { $set: newStation };
    const options = { upsert: true };
    const stations = await Station.updateOne(myquery, newvalues, options)
    console.log(stations);
    res.status(200).json(stations)
})



// @desc GEt Station record by Id
// @route GET/api/Station/:id
// @access Private
const getStationByIdFID = asyncHandler(async (req, res) => {
    console.log(req.params)
    const station = await Station.find({fid: req.params.fid})
    res.status(200).json(station)
})

module.exports = {
    getStation,
    createOrUpdateStation,
    getStationByIdFID,
    getStationListWithSort
}