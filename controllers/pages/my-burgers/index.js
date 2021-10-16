const { Op } = require("sequelize")

const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Burger } = require('../../../models')

const pagesMyBurgersIndex = async function(req, res) {
  const { locals: { currentUser} } = res

  const { query } = req

  const q = query.q || ''
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit
  const results = await Burger.findAndCountAll({
    where: {
      burgerName: {
        [Op.iLike]: `%${q}%`
      },
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })

  res.render('pages/my-burgers/index', {
    burgers: results.rows,
    filters: { q, page, limit, offset, totalPages: Math.ceil(results.count / limit) }
  })
}

// module.exports = [pagesMyBurgersIndex]
module.exports = [authenticateCurrentUserByToken('html'), pagesMyBurgersIndex]
