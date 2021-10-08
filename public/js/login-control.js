$('#signup-modal').on('click', '#register-new', function(e) {
  e.preventDefault()
  // const parent = $(e.target).parent('button')[0]
  // const $elem = parent ? $(e.target).parent() : $(e.target)
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#signup-modal form')[0])


  // $elem.attr('disabled', true)
  axios({ method, url, data: formData })
  .then(function(resp) {
    console.log(resp.data)

    if (method === 'POST') {
      console.log('method=post, signup')
      location.reload()
    }
  }).catch(function(err) {
    switch(err.response.status) {
      case 406:
        console.log(err.response.data.errors[0].msg)
        break
      default:
        console.log(err.response.data)
    }
  })
})

//Logout button
$('#navbar-links').on('click', '#logout-btn', function(e) {
  e.preventDefault()

  axios({
    method: 'DELETE',
    url: '/api/auth/logout'
  }).then(function(resp) {
    console.log('Removed Cookie')
    window.location.reload()
  })
})

//Logout button -- ALTERNATIVELY YOU CAN DO IT LIKE THIS
// $('#logout-btn').on('click', function(e) {
//   e.preventDefault()

//   axios({
//     method: 'DELETE',
//     url: '/api/auth/logout'
//   }).then(function(resp) {
//     console.log('Removed Cookie')
//     window.location.reload()
//   })
// })

$('#login-modal').on('click', '#login-now', function(e) {
  e.preventDefault()
  // const parent = $(e.target).parent('button')[0]
  // const $elem = parent ? $(e.target).parent() : $(e.target)
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#login-modal form')[0])

  // $elem.attr('disabled', true)
  axios({ method, url, data: formData })
  .then(function(resp) {
      console.log(resp.data)

      if (method === 'POST') {
        console.log('method=post, login')
        location.reload()
      }
  }).catch(function(err) {
    switch(err.response.status) {
      case 406:
        console.log(err.response.data.errors[0].msg)
        break
      default:
        console.log(err.response.data)
    }
  })
})

//My Wishlist Link
$('#navbar').on('click', '#my-wishlists-link', function(e) {
  e.preventDefault()

  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')

  axios({ method, url })
  .then(function(resp) {
      console.log(resp.data)
    }).catch(function(err) {
      switch(err.response.status) {
        case 406:
          console.log(err.response.data.errors[0].msg)
          break
        default:
          console.log(err.response.data)
      }
    })

})
