
const express = require('express');
const router = express.Router();



const {getStation, getStationByIdFID, createOrUpdateStation, getStationListWithSort} = require("../controllers/stationController")



router.get('/', getStation);

router.post('/create/', createOrUpdateStation);

router.get('/:fid', getStationByIdFID)

router.post('/', getStationListWithSort)

module.exports = router