/* eslint linebreak-style: ["error", "windows"] */

const express = require('express');
const { mongoclient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      res.json(req.body);
    });
  return authRouter;
}

module.exports = router;
