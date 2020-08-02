const express = require("express");
const bodyParser = require("body-parser");
const storage = require("node-persist");
const cors = require("cors");
const licences = require("./licences.json");

(async () => {
    await storage.init({ dir: "./data" });
    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());

    server.post("/licences", async (request, response) => {
        let highest = 0;
        for (let i = 0; i < licences.length; i++) {
            if (licences[i].licenceNumber > highest) {
                highest = licences[i].licenceNumber;
            }
        }
        let application = { licenceNumber: ++highest, timestamp: new Date(), ...request.body }
        await storage.setItem(`licence-${application.licenceNumber}`, application)
    })

    server.get("/licences/:id", async (request, response) => {
        let licence = await storage.getItem(`licence-${request.params.id}`);
        response.json(licence);
    })
    

    server.put("/licences/:id", async (request, response) => {
        let id = request.params.id;
        if (id == undefined) {
            response.json({ status: 400, message: `id is not valid` })
        } else {
            let updatedLicence = await storage.updateItem(`licence-${id}`, request.body)
            response.json(updatedLicence)
        }

    })

    server.get("/licences/search/:searchTerm", async (request, response) => {
        let searchTerm = request.params.searchTerm.toLowerCase();
        let licences = await storage.valuesWithKeyMatch(/licence-/);
        //DOES NOT SEARCH THROUGH NESTED OBJECTS
        let results = licences.filter(licence => Object.keys(licence).some(k => licence[k].toString().toLowerCase()
        .includes(searchTerm)));
        //SEARCHES ONE NESTED OBJECT
        let addressNestSearch = [];
        for (let i = 0; i < licences.length; i++) {
            object = Object.values(licences[i].address)
            if (object.toString().toLowerCase().includes(searchTerm)) {
                addressNestSearch.push(licences[i]);
            }
        }
        //ADDS ALL SEARCH RESULT ARRAYS TOGTHER AND DELETES DUPLICATE IDs
        let fullResults = results.concat(allSearch);
        uniqueResults = Array.from(new Set(fullResults.map(a => a)))

        response.json(uniqueResults)

    });

    server.get("/licences", async (request, response) => {
        let licences = await storage.valuesWithKeyMatch(/licence-/);
        response.json(licences);
    })

    server.get("/licences/abalone", async (request, response) => {
        let licences = await storage.valuesWithKeyMatch(/licence-/);
        let abaloneLicences = licences.filter(l => l.abalone == true);
        response.json(abaloneLicences);
    })

    server.get("licences/lobster", async (request, response) => {
        let licences = await storage.valuesWithKeyMatch(/licence-/);
        let lobsterLicences = licences.filter(l => l.lobster == true);
        response.json(lobsterLicences);
    })

    server.listen(4000, () => {
        console.log(`The server is listening on http://localhost:4000`)
    })
})()