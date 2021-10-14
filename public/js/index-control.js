$('#burgers-list').on('click', '.edit-btn', function(e) {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')

  // setLoadingModal()

  axios({ method, url }).then(function(resp) {
    setModal(resp.data)
  })
})
