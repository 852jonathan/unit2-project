const { authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')
const { Burger, Rating, User } = require('../../../models')

const apiMyBurgersDestroy = async function(req, res) {
  const { locals: { currentBurger } } = res
  await currentBurger.destroy()
  // Below line will be used when we are doing Ratings
  // await Rating.destroy({ where: { BurgerId: currentBurger.id } })
  res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserBurgerById('json'), apiMyBurgersDestroy]
