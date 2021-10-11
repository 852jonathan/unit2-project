const { authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')
const { Burger, Rating, User } = require('../../../models')

const apiMyBurgersDestroy = async function(req, res) {
  const { locals: { currentBurger } } = res
  await currentBurger.setBurger.ingredients([])
  await currentBurger.destroy()
  await Burger.destroy({ where: { BurgerId: null } })
  res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserBurgerById('json'), apiMyBurgersDestroy]
