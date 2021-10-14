const { authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const pagesMyBurgersShow = async function(req, res) {
  const { locals: { currentBurger } } = res
  res.render('pages/my-burgers/show', { burger: currentBurger })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserBurgerById('modal'), pagesMyBurgersShow]
