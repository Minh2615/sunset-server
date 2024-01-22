const express = require("express");
var RouterProfileSunset = express.Router();

const ProfilesModel = require("../../db/profiles/profiles");

// get profile by apimo
RouterProfileSunset.get("/get-apimo", async (req, res) => {
  try {
    const response = await fetch(
        "https://api.apimo.pro/agencies/22617/properties",
        {
        method: "GET",
        headers: new Headers({
            Authorization:
                "Basic " + btoa("3729:59bb47a3b8cd03becefc451ecc4315b366ee1de9"),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        ),
      }
    );
    const results = await response.json();
  
    if ( ! results ) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
      
    const data = results.properties;
    for ( let i = 0; i < data.length; i++) {
        const ArrayData = {
            User: data[i].user,
            Status: data[i].status,
            Ranking: data[i].ranking,
            Name: data[i].name,
            Type: data[i].type,
            Region: data[i].region,
            City: data[i].city,
            District: data[i].district,
            Location: data[i].location,
            Subtype: data[i].subtype,
            Rooms: data[i].rooms,
            BedRooms: data[i].bedrooms,
            Sleeps: data[i].sleeps,
            Price: data[i].price,
            Rates: data[i].rates,
            Area: data[i].area,
            Category: data[i].category,
            Address: data[i].address,
            Residence: data[i].residence,
            View: data[i].view,
            Construction: data[i].construction,
            Floor: data[i].floor,
            Heating: data[i].heating,
            Water: data[i].water,
            Condition: data[i].condition,
            Availability: data[i].availability,
            Pictures: data[i].pictures,
            Medias: data[i].medias,
            Comment: data[i].comment,
            Areas: data[i].areas,
            Financial: data[i].financial,
            Regulations: data[i].regulations,
            ID: data[i].id,
        };

        //check if the profile exists
        const existingProfile = await ProfilesModel.findOne({ ID: data[i].id });
        if ( ! existingProfile) {
            //save data to mongodb
            const newProfile = new ProfilesModel(ArrayData);
            await newProfile.save();
        }

    }

    res.status(201).json({ message: "Save data success" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//get profile in mongodb
RouterProfileSunset.get("/get", async (req, res) => {
    try {
        // const page = parseInt(req.query.page);
        const limit = 8;
        const page = 1 ;
        const skip = (page - 1) * limit;
        const data = await ProfilesModel.find().skip(skip).limit(limit);
        res.status(201).json({ data : data, page: page, message: "Get data success", error : false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get detail profile
RouterProfileSunset.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ProfilesModel.findOne({ ID: id });
        res.status(201).json({ data : data, message: "Get data success", error : false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = RouterProfileSunset;
