const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')
const { Burger, User } = require('../../../models')
const multer = require('multer')

const permittedParams = [
  'burgerName',
  'description',
  'ingredients'
]

const validation = [
  body('burgerName').isString().withMessage('Name must be a String').notEmpty().withMessage('Name is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
  // body('topBun').isArray({ min: 1}).withMessage('Burger must have a top bun'),
  // body('middle').isArray({ min: 1}).withMessage('Burger must have at least 1 middle ingredient'),
  // body('botBun').isArray({ min: 1}).withMessage('Burger must have a bottom bun')
]

const apiMyBurgersCreate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: burgerParams } = req

  const newBurger = await Burger.create({
    ...burgerParams,
  }, {
    fields: permittedParams,
    include: {
      association: Burger.User
    }
  })
  newBurger.setUser(currentUser)

  res.json({ message: 'created'})
  // go back to Show My Burgers index
  // res.render('pages/my-burgers/index', { burger: newBurger })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  apiMyBurgersCreate
]
