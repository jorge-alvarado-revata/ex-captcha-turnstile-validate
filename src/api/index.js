'use strict'

import express from 'express'
import validate_turnstile from "./validate_turnstile.js"

const router = express.Router()

router.get('/', function(req, res){
    res.json({
        message: "API V1 Para validar token de captcha turnstile.",
      })
})

router.use('/validate/turnstile/', validate_turnstile)


export default router