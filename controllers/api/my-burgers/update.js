const { body } = require('express-validator')

const { checkValidation, authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const { Burger } = require('../../../models')

const permittedChangeParams = {
  Burger: ['name', 'description'],
}

const validation = [
  body('name').isString().withMessage('Name must be a String').notEmpty().withMessage('Name is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
]

const apiMyBurgersUpdate = async function(req, res) {
  const { body: { Burger: Params, ...burgerParams } } = req
  const { locals: { currentBurger } } = res

  await currentBurger.update(burgerParams, { fields: permittedChangeParams.Burger })
  await currentBurger.setBurger([])
  Params.forEach(async function({ id: Id, ...itemParams }) {
  //   let burger = await Burger.findOne({ where: { id: Number(Id) || 0 } })

  //   if (burger) {
  //     await burger.update(itemParams, { fields: permittedChangeParams.Burger })
  //   } else {
  //     burger = await Burger.create(itemParams, { fields: permittedChangeParams.Burger })
  //   }

    await currentBurger.addBurger(burger)
  })

  res.render('pages/my-burgers/show', { burger: currentBurger})
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  getCurrentUserBurgerById('json'),
  apiMyBurgersUpdate
]
