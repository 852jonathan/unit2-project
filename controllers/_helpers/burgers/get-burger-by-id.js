const { Burger } = require('../../../models')

module.exports = function(format) {
  return async function (req, res, next) {
    const { params: { id } } = req
    const burger = await Burger.findOne({
      where: { id: Number(id) || 0 },
      // include: {
        // association: Burger.BurgerItems
      // },
      // order: [['BurgerItems', 'createdAt', 'DESC']]
    })

    if (!burger) {
      if (format === 'modal') {
        return res.render('api/burgers/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Burger of ID ${id} not found!` })
      }
    }

    res.locals.currentBurger = burger

    next()
  }
}
