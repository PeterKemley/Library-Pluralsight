const express = require('express');
const { mongoclient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.router;

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
    });
  return authRouter;
}

module.exports = router;
