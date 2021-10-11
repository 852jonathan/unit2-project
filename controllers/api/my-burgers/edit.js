const { authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const apiMyBurgersEdit = async function(req, res) {
  const { locals: { currentBurger } } = res
  res.render('api/my-burgers/edit', { wishlist: currentBurger, layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserBurgerById('modal'), apiMyBurgersEdit]
