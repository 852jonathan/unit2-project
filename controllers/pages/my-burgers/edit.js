const { authenticateCurrentUserByToken , myBurger: { getCurrentUserBurgerById } } = require('../../_helpers')

const pagesMyBurgersEdit = async function(req, res) {
  const { locals: { currentBurger } } = res

  const ingredients = JSON.parse(currentBurger.ingredients)
  console.log(ingredients)
  res.render('pages/my-burgers/edit', { burger: currentBurger, ingredients })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserBurgerById('json'), pagesMyBurgersEdit]
