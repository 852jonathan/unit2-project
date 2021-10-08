module.exports = {
  getUserByToken: require('./get-user-by-token'),
  authenticateCurrentUserByToken: require('./authenticate-current-user-by-token'),
  checkValidation: require('./check-validation'),
  getUserByToken: require('./get-user-by-token'),
  wishlist: {
    getWishlistById: require('./wishlists/get-wishlist-by-id')
  },
  myWishlist: {
    getCurrentUserWishlistById: require('./my-wishlists/get-current-user-wishlist-by-id')
  }
}
