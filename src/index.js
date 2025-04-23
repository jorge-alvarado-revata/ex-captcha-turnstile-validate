'use strict'

import app from './app.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3033

app.listen(PORT, ()=>{
    console.log(`Express started on port ${PORT}`);
})
