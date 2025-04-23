'use strict'

import express from 'express'
import dotenv from 'dotenv'
import undici from 'undici'


// load env variable

dotenv.config()
const GOOGLE_RECAPTCHA_SECRET_KEY = process.env.GOOGLE_RECAPTCHA_SECRET_KEY
const GOOGLE_URL_RECAPTCHA = process.env.GOOGLE_URL_RECAPTCHA

const router = express.Router()


router.post('/', async (req, res)=>{


  try {

    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null

    var siteVerifieyReq = {
      response: req.body.response,
      secret: '',
      remoteip: ip
    }

    var siteVerifyRes = {
      success: false,
      challenge_ts: '',
      hostname: '',
      error_codes: []
    }
  
  
    if (!GOOGLE_RECAPTCHA_SECRET_KEY){
      throw new createHTTPError("cloudflare secret key not found!");
    }
    else {
      siteVerifieyReq['secret'] = GOOGLE_RECAPTCHA_SECRET_KEY
      const url_verified = GOOGLE_URL_RECAPTCHA


      const result = await undici.fetch(url_verified, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `secret=${siteVerifieyReq.secret}&response=${siteVerifieyReq.response}&remoteip=${siteVerifieyReq.remoteip}`
      });
      const outcome = await result.json();
      if (outcome.success) {

        siteVerifyRes.success = true
        res.send(siteVerifyRes)

      }
      else {
        res.send(siteVerifyRes)
      }
    }
  }
  catch(err){
    res.send(siteVerifyRes)

  }

})


export default router
