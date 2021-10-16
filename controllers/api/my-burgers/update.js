const multer = require('multer')
const { body } = require('express-validator')

const { checkValidation, authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const permittedChangeParams = {
  Burger: ['burgerName', 'description'],
}

const validation = [
  body('burgerName').isString().withMessage('Name must be a String').notEmpty().withMessage('Name is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
]

const apiMyBurgersUpdate = async function(req, res) {
  const { body: { Burger: Params, ...burgerParams } } = req
  const { locals: { currentBurger } } = res

  await currentBurger.update(burgerParams, { fields: permittedChangeParams.Burger })

  res.json({ message: 'updated!' })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken('json'),
  getCurrentUserBurgerById('json'),
  validation,
  checkValidation,
  apiMyBurgersUpdate
]
