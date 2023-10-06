
const express = require('express');
const router = express.Router();



const {getStation, getStationByIdFID, createOrUpdateStation, getStationListWithSort} = require("../controllers/stationController")

// {
//     "_id": "64775452ecf1ae14ec1cfb6f",
//     "fid": 5,
//     "adress": "Norrskensv gen 10",
//     "id": 509,
//     "kapasiteet": 30,
//     "kaupunki": "Espoo",
//     "name": "Revontulentie",
//     "namn": "Norrskensv gen",
//     "nimi": "Revontulentie",
//     "operaattor": "CityBike Finland",
//     "osoite": "Revontulentie 10",
//     "stad": "Esbo",
//     "total_journeys_ending": 0,
//     "total_journeys_starting": 0,
//     "x": "24.802938",
//     "y": "60.171551"
// }


router.get('/', getStation);

router.post('/create/', createOrUpdateStation);

router.get('/:fid', getStationByIdFID)

router.post('/', getStationListWithSort)

module.exports = router