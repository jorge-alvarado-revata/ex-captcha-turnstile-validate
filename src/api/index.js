'use strict'

import express from 'express'
import validate_recaptcha from "./validate_recaptcha.js"

const router = express.Router()

router.get('/', function(req, res){
    res.json({
        message: "API V1 Para validar token de captcha.",
      })
})

router.use('/validate/recaptcha/', validate_recaptcha)


export default router