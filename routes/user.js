const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/create', async(req, res)=>{
    try {
        data = req.body;
        usr = new User(data);
       savedUser = await usr.save();
       res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/all', async (req,res)=>{
    try {
        users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/getuserbyid/:id', async (req, res)=>{
    try {
        myid = req.params.id;
        user = await User.findOne({_id: myid});
        res.status(200).send(user);
    } catch (error) {
       res.status(400).send(error) 
    }
 
})
router.put('/updateUser/:id', async(req, res)=>{
    try {
        id = req.params.id;
        newData = req.body;
        updateduser = await User.findByIdAndUpdate({_id: id}, newData);
        res.status(200).send(updateduser);
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/deleteUser/:id', async(req, res) =>{
    try {
        id = req.params.id;
        deletedUser =  await User.findOneAndDelete({ _id: id})
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(400).send(error)  
    }
})
router.post('/register', async(req, res)=>{
    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password, salt);
    usr.password =  cryptedPass;
    usr.save()
        .then(
            (saved)=>{
                res.status(200).send(saved);
            }
        )
        .catch(
            (err) =>{
                res.status(400).send(err);
            }
        )

})

module.exports = router;