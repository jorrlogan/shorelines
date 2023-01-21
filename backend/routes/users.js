import express from 'express'
var router = express.Router()
import users_table from '../database/tables/user_table.js'

router.get('/', async function (req, res){
  try {
    const data = await users_table.scan()
    res.send(data)
  } catch (err){
    res.status(404)
    res.send('Could process request')
  }
})

/* GET users listing. */
router.put('/:email', async function (req, res, next) {
  try {
    const {email} = req.params
    console.log(email)
    await users_table.addItem(email)
    res.send("Successfully added email to database")
  } catch (err) {
    res.status(404)
    res.send("Couldn't process request")
  }
});
export default router
// module.exports = router;
