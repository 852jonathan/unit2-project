const { Router } = require('express')
const router = Router()

const { getUserByToken } = require('../controllers/_helpers')


router.use('/api', getUserByToken, require('./api'))
router.use('/', getUserByToken, require('./pages'))

module.exports = router
