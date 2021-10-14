const { burger: { getBurgerById } } = require('../../_helpers')
const { Burger, Rating } = require('../../../models')


const pagesBurgersShow = async function(req, res) {
  const { locals: { currentBurger } } = res

  const ingredients = JSON.parse(currentBurger.ingredients)

  res.render('pages/burgers/show', { burger: currentBurger, ingredients})
}

module.exports = [getBurgerById('json'), pagesBurgersShow]
