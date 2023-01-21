import express from 'express';
var router = express.Router();
import clinic_table from '../database/tables/clinic_table.js'

router.get('/', async function(req, res, next) {
    try {
        let data = await clinic_table.scan()
        res.send(data)
    } catch (err){
        console.log("Error", err)
    }
});

router.put('/', async function(req, res, next) {
    try {
        const { name, latitude, longitude } = req.body
        let data = await clinic_table.addItem("23", name, latitude, longitude, "0")
        res.send("Successfully added clinic")
    } catch (err){
        console.log("Error", err)
    }
});
export default router
