'use strict'

import express from 'express'
import dotenv from 'dotenv'
import undici from 'undici'


// load env variable

dotenv.config()
const CLOUDFLARE_SECRET_KEY = process.env.CLOUDFLARE_SECRET_KEY
const URL_CLOUDFLARE = process.env.URL_CLOUDFLARE

const router = express.Router()


router.post('/', async (req, res)=>{


  try {


    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null

    var siteVerifieyReq = {
      response: req.body.response,
      remoteip: ip
    }

    var siteVerifyRes = {
      success: false,
      challenge_ts: '',
      hostname: '',
      error_codes: [],
      action: '',
      cdata: ''
    }
  
  
    if (!CLOUDFLARE_SECRET_KEY){
      throw new createHTTPError("cloudflare secret key not found!");
    }
    else {
      siteVerifieyReq.secret = CLOUDFLARE_SECRET_KEY
      const url_verified = URL_CLOUDFLARE


      const result = await undici.fetch(url_verified, {
        body: JSON.stringify(siteVerifieyReq),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
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
