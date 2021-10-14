const { Router } = require('express')
const router = Router()

// AUTH
router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))

// Public Burgers
// router.get('/burgers', require('../controllers/api/burgers/show'))

// Private Burgers
router.post('/my/burgers', require('../controllers/api/my-burgers/create'))
// router.get('/my/burgers/new', require('../controllers/api/my-burgers/new'))
// router.get('/my/burgers/:id', require('../controllers/api/my-burgers/show'))
// router.delete('/my/burgers/:id', require('../controllers/api/my-burgers/destroy'))
// router.put('/my/burgers/:id', require('../controllers/api/my-burgers/update'))
// router.get('/my/burgers/:id/edit', require('../controllers/api/my-burgers/edit'))

// // Private Rate Burger
// router.post('/my/ratings/:id', require('../controllers/api/my/ratings/show'))


// Error Response
router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! not exist!" })
})

module.exports = router
