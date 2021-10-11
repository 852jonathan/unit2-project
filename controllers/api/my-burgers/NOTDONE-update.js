const { body } = require('express-validator')

const { checkValidation, authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const { BurgerItem } = require('../../../models')

const permittedChangeParams = {
  Burger: ['title', 'description', 'BurgerItem.name', 'BurgerItem.importance', 'BurgerItem.received'],
  BurgerItems: ['name', 'importance', 'received']
}

const validation = [
  body('title').isString().withMessage('Title must be a String').notEmpty().withMessage('Title is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
  body('BurgerItems').isArray({ min: 1}).withMessage('Burger must have at least 1 Item'),
  body('BurgerItems.*.name').isString().withMessage('Item Name must be a String').notEmpty().withMessage('Item Name is Required'),
  body('BurgerItems.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Item Important must be Between 0 and 5'),
  body('BurgerItems.*.received').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
]

const apiMyBurgersUpdate = async function(req, res) {
  const { body: { BurgerItems: itemsParams, ...wishlistParams } } = req
  const { locals: { currentBurger } } = res

  await currentBurger.update(wishlistParams, { fields: permittedChangeParams.Burger })
  await currentBurger.setBurgerItems([])
  itemsParams.forEach(async function({ id: ItemId, ...itemParams }) {
    let wishlistItem = await BurgerItem.findOne({ where: { id: Number(ItemId) || 0 } })

    if (wishlistItem) {
      await wishlistItem.update(itemParams, { fields: permittedChangeParams.BurgerItems })
    } else {
      wishlistItem = await BurgerItem.create(itemParams, { fields: permittedChangeParams.BurgerItems })
    }

    await currentBurger.addBurgerItem(wishlistItem)
  })
  await BurgerItem.destroy({ where: { BurgerId: null } })

  res.render('api/my-wishlists/show', { wishlist: currentBurger, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  getCurrentUserBurgerById('modal'),
  apiMyBurgersUpdate
]
