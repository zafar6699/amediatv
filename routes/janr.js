const express = require('express');
const {
 getJanrs,
 getJanr,
 createJanr
} = require('../controllers/janr');

// // Include other resource routers
// const productRouter = require('./products');

const router = express.Router();

// // Re-route into other resource routers
// router.use('/:janrId/products', productRouter);




router.route('/')
 .get(getJanrs)
 .post(createJanr);

router.route('/:id')
 .get(getJanr)


module.exports = router;