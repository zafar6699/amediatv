const express = require('express');
const {
    getQuery,
    getCategories,
    getCategory,SortAllCategoryKinoSeason,
    createCategory,
    getByJanr


} = require('../controllers/categories');

// Include other resource routers
// const productRouter = require('./products');

const router = express.Router();

// // Re-route into other resource routers
// router.use('/:categoryId/products' , productRouter);


router.route('/')
    .get(getCategories)
    .post(createCategory)

// router.route('/:categoryId')
//     .get(getCategory)
router
    .route('/janrCategory/:id')
    .get(getByJanr)
router
    .route('/sortSeasonKino/:id')
    .get(SortAllCategoryKinoSeason)

router.route('/query/year/:year')
    .get(getQuery)

module.exports = router;