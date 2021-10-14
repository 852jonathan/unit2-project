const { Router } = require('express')
const router = Router()

//Private Burgers
router.get('/my/burgers/new', require('../controllers/pages/my-burgers/new'))
router.get('/my/burgers/:id', require('../controllers/pages/my-burgers/edit'))
// router.use('/my/burgers/:id', require('../controllers/pages/my-burgers/show'))
router.get('/my/burgers', require('../controllers/pages/my-burgers/index'))

//Public Burgers
router.get('/burgers/:id', require('../controllers/pages/burgers/show'))
router.get('/burgers', require('../controllers/pages/burgers/index'))

router.get('/', require('../controllers/pages/static/get-home'))

// Error Response
router.use(function (req, res) {
  res.render('not-found', { message: "Sorry! Page does not exist!" })
})

module.exports = router
