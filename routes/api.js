const { Router } = require('express')
const router = Router()

// AUTH
router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))

// Private Burgers
router.post('/my/burgers', require('../controllers/api/my-burgers/create'))
router.delete('/my/burgers/:id', require('../controllers/api/my-burgers/destroy'))
router.put('/my/burgers/:id', require('../controllers/api/my-burgers/update'))

// Private Rate Burger
// router.post('/my/ratings/:id', require('../controllers/api/my/ratings/create'))


// Error Response
router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! Does not exist!" })
})

module.exports = router
