const express = require('express');
require('./config/connect');

const productRoute = require('./routes/product');
const userRoute = require('./routes/user');


const app = express();
app.use(express.json());


//http://127.0.0.1:300/product/
//http://127.0.0.1:300/user/

app.use('/product', productRoute);
app.use('/user', userRoute);





app.listen(3000, ()=>{
    console.log('server work');
});