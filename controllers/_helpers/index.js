module.exports = {
  getUserByToken: require('./get-user-by-token'),
  authenticateCurrentUserByToken: require('./authenticate-current-user-by-token'),
  checkValidation: require('./check-validation'),
  getUserByToken: require('./get-user-by-token'),
  burger: {
    getBurgerById: require('./burgers/get-burger-by-id')
  },
  myBurger: {
    getCurrentUserBurgerById: require('./my-burgers/get-current-user-burger-by-id')
  }
}
