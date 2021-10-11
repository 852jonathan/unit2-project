const { burger: { getBurgerById } } = require('../../_helpers')

const apiBurgersShow = async function(req, res) {
  const { locals: { currentBurger } } = res
  res.render('api/burgers/show', { burger: currentBurger, layout: false })
}

module.exports = [getBurgerById('json'), apiBurgersShow]
