const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
filename = '';
var storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{
        let date = Date.now();
        // image/png
        let fl = date + '.'+file.mimetype.split('/')[1];
        redirect(null, fl);
        filename =fl;
    }
});
const upload = multer({storage: storage});

router.post('/createProd', upload.any('image'), async(req, res)=>{
    try {
        data = req.body;
        prod = new Product(data);
        prod.image = filename;
        savedProd = await prod.save();
        filename = '';
        res.status(200).send(savedProd);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/allProduct', async (req, res)=>{
    try {
        products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put('/updateProduct/:id', async(req, res)=>{
    try {
        id = req.params.id;
        newData= req.body;
        updatedProduct = await Product.findByIdAndUpdate({_id: id}, newData);
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/deleteProduct/:id', async (req,res)=>{
    try {
        id = req.params.id;
        deletedProduct = await Product.findByIdAndDelete({_id: id});
        res.status(200).send(deletedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;