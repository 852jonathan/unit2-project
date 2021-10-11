const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Burger, Rating } = require('../../../models')

const pagesMyBurgersNew = async function(req, res) {
  // const burger = await Burger.build({
  //   Ratings: []
  // }, {
  //   include: Burger.Ratings
  // })
  // burger.Ratings.push(await Rating.build())

  // res.render('pages/my-burgers/new', { burger })
  res.render('pages/my-burgers/new')
}

module.exports = [authenticateCurrentUserByToken('html'), pagesMyBurgersNew]
