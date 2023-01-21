import express from 'express';
var router = express.Router();
import city_table from '../database/tables/city_table.js'

router.get('/', async function(req, res, next) {
    try {
        let data = await city_table.scan()
        res.send(data)
    } catch (err){
        console.log("Error", err)
    }
});

export default router