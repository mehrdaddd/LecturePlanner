const createClient = require('hafas-client')
const finderClient = require('nahsh-hafas')
const dbProfile = require('hafas-client/p/db')
var bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = createClient(dbProfile, 'DRTracker API Server')

const config = {
    fuzzy: true
    , results: 1 // how many search results?
    , stations: true
    , addresses: true
    , poi: true // points of interest        
    , language: 'en' // language to get results in
}


app.get('/location', (req, res) => {
    const b = req.query
    findLocation(b.location, res)
})
app.get('/path', (req, res) => {
    const b = req.query
    console.log(b.s, "          ", b.d)
    findPath({ source: b.s, destination: b.d }, res)
})

app.get('/me', (req, res) => {
    const b = req.query
    console.log(b.lat, b.long)
    findNearbyLocation('location', parseFloat(b.lat), parseFloat(b.long), res)
})
app.listen(4444, () => console.log("started..."))

function findPath(path, cb) {
    client.journeys(path.source, path.destination, config)
        .then(journeys => {
            result = []
            for (const j of journeys) {
                if (j.type === "journey") {
                    if(j.legs.length > 0){
                        for(let leg of j.legs){
                            result.push({
                                origin: leg.origin.name,
                                destination: leg.destination.name,
                                departureTime: leg.departure,
                                arrivalTime: leg.arrival,
                                mode: leg.mode,
                                public: leg.public,
                                distance: leg.distance
                            })
                        }
                    }                    
                }
            }
            cb.send(result)
        })
        .catch(console.error)
}

function findNearbyLocation (type, latitude, longitude, cb) {    
    client.nearby({
        type: type,
        latitude: latitude,
        longitude: longitude
    }, { results: 1})
    .then(locations => {
        var stops = []
        for(l of locations){
            if(l.type == 'stop'){
                stops.push(l)
            }
        }
        cb.send(refineNearest(stops, latitude, longitude))
    })
    .catch(error => console.log(error))
}


function findLocation(location, cb) {


    client.locations(location, config)
        .then(result => {
            var locations = []
            for (r of result) {
                if (r.type === "stop") {
                    locations.push({
                        type: r.type,
                        id: r.id,
                        name: r.name,
                        location: {
                            "type": r.location.type,
                            "latitude": r.location.latitude,
                            "longitude": r.location.longiture
                        }
                    })
                }
            }
            cb.send(locations)
        })
        .catch(console.error)
}


function refineNearest(stops, originLat, originLong){
    //const lat = 0.006000
    //const long = 0.003000
    const lat = 0.016000
    const long = 0.013000
    return stops.filter(stop => (Math.abs(parseFloat(stop.location.latitude) - parseFloat(originLat)) <= lat ) && Math.abs(parseFloat(stop.location.longitude) - parseFloat(originLong) <=long))
}