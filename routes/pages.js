const { Router } = require('express')
const router = Router()

//Private Burgers
// router.use('/my/burgers/:id/edit', require('../controllers/pages/my-burgers/:id/edit'))
// router.use('/my/burgers/:id', require('../controllers/pages/my-burgers/:id'))
router.use('/my/burgers/new', require('../controllers/pages/my-burgers/new'))
router.use('/my/burgers', require('../controllers/pages/my-burgers/index'))

//Public Burgers
// router.use('/burgers/:id', require('../controllers/pages/burgers/:id'))
router.use('/burgers', require('../controllers/pages/burgers/index'))

router.get('/', require('../controllers/pages/static/get-home'))

// Error Response
router.use(function (req, res) {
  res.render('not-found', { message: "Sorry! Page does not exist!" })
})

module.exports = router
