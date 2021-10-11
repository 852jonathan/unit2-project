const { Burger, User } = require('../../../models')

module.exports = function(format) {
  return async function (req, res, next) {
    const { locals: { currentUser } } = res
    const { params: { id } } = req
    const burger = await Burger.findOne({
      where: {
        id: Number(id) || 0,
        UserId: currentUser.id
      },
      include: {
        association: Burger.User
      },
      order: [['User', 'createdAt', 'DESC']]
    })

    if (!burger) {
      if (format === 'modal') {
        return res.render('api/my-burger/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Burger of ID ${id} not found!` })
      }
    }

    res.locals.currentBurger = burger

    next()
  }
}
