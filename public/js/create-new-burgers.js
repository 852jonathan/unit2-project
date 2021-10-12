$(document).ready(function() {

  // $ingredientForm = $('#ingredient-form')

  // $ingredientForm.on('click', '#new-burger-btn', function(e) {
  //   e.preventDefault()
  //   // const parent = $(e.target).parent('button')[0]
  //   // const $elem = parent ? $(e.target).parent() : $(e.target)
  //   // const $elem = $(e.target)
  //   // const url = $elem.data('url')
  //   // const method = $elem.data('method')
  //   const formData = new FormData($ingredientForm[0])

  //   axios({
  //     method: 'POST',
  //     url: '/api/my-burgers/create',
  //     data: formData,
  //     withCredentials: true
  //   }).then(function(resp) {
  //     console.log(resp.data)

  //   }).catch(function(err) {
  //     switch(err.response.status) {
  //       case 406:{
  //         const { response: { data: { errors } }} = err

  //         $ingredientForm.find('.invalid-feedback').empty()
  //         $ingredientForm.find('.is-invalid').removeClass('is-invalid')

  //         errors.forEach(function(error) {
  //           const { param: fieldName, msg } = error
  //           const $input = $ingredientForm.find(`[name="${fieldName}"]`)
  //           const $invalidFeedback = $input.siblings('.invalid-feedback')
  //           $input.addClass('is-invalid')
  //           $invalidFeedback.text(msg)
  //         })
  //         break
  //       }
  //       default: {
  //         console.log(err.response)
  //         break
  //       }
  //     }
  //   })
  // })
})
