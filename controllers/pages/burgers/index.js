const { Op } = require("sequelize")
const { Burger } = require('../../../models')

const pagesBurgersIndex = async function(req, res) {
//   const { query } = req

//   const q = query.q || ''
//   const page = Number(query.page) || 1
//   const limit = 10
//   const offset = (page - 1) * limit
//   const results = await Burger.findAndCountAll({
//     where: {
//       burgerName: {
//         [Op.iLike]: `%${q}%`
//       }
//     },
//     order: [['createdAt', 'DESC']],
//     limit,
//     offset
//   })
  res.render('pages/burgers/index', {
    // burgers: results.rows,
    // filters: { q, page, limit, offset, totalPages: Math.ceil(results.count / limit) }
  })
}

module.exports = [pagesBurgersIndex]
