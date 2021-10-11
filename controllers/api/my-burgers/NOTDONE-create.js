const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')
const { Burger } = require('../../../models')

const permittedParams = [
  'title',
  'description',
  'BurgerItem.name',
  'BurgerItem.importance',
  'BurgerItem.received',
  ''
]

const validation = [
  body('title').isString().withMessage('Title must be a String').notEmpty().withMessage('Title is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
  body('BurgerItems').isArray({ min: 1}).withMessage('Burger must have at least 1 Item'),
  body('BurgerItems.*.name').isString().withMessage('Item Name must be a String').notEmpty().withMessage('Item Name is Required'),
  body('BurgerItems.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Item Important must be Between 0 and 5'),
  body('BurgerItems.*.received').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
]

const apiMyBurgersCreate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: burgerParams } = req
  const newBurger = await Burger.create({
    ...burgerParams,
  }, {
    fields: permittedParams,
    include: {
      association: Burger.BurgerItems
    }
  })
  newBurger.setUser(currentUser)

  res.render('api/my-burgers/show', { burger: newBurger, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  apiMyBurgersCreate
]
