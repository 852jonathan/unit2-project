const { authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const apiMyBurgersShow = async function(req, res) {
  const { locals: { currentBurger } } = res
  res.render('api/my-burgers/show', { wishlist: currentBurger, layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserBurgerById('modal'), apiMyBurgersShow]
