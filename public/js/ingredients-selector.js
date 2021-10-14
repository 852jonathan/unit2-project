$(document).ready(function() {
  const $topIngredient = $("#top-ingredient")
  const $midIngredient = $("#mid-ingredient")
  const $botIngredient = $("#bot-ingredient")
  const $ingredientForm = $('#ingredient-form')

  const ingredients = {
    topBun: [],
    middle: [],
    botBun: []
  }

let str="185-51-671";
let newStr = str.replace(/-/g, "");

  $(".form-check").on('change', '.form-check-input', function(e) {
    const $formCheckInput = $(e.target)
    const ingredient = $formCheckInput.val()
    const type = $formCheckInput.data('type')

    if (type === 'topBun') {
      ingredients[type] = [ingredient]
      $topIngredient.html(`<img src='/assets/${ingredient}.png' class="">`)
    } else if (type === 'botBun') {
      ingredients[type] = [ingredient]
      $botIngredient.html(`<img src='/assets/${ingredient}.png' class="">`)
    } else {
      if(ingredients.middle.includes(ingredient)) {
        $(`img[src='/assets/${ingredient}.png']`).remove()
        ingredients.middle = ingredients.middle.filter((i) => i !== ingredient)
      } else {
        $(`<img src='/assets/${ingredient}.png'> class="mid-ingredients position-absolute"`).appendTo($midIngredient)
        ingredients.middle.push(ingredient)
      }
    }
  })

  $ingredientForm.on('submit', '#new-burger-btn', function(e) {
    console.log('hi')
    e.preventDefault()
    const formData = new FormData($ingredientForm[0])

    formData.append('ingredients', JSON.stringify(ingredients))

    axios({
      method: 'POST',
      url: '/api/my/burgers',
      data: formData,
      withCredentials: true
    }).then(function(resp) {
      console.log(resp.data)
      window.location.href = '/my/burgers'
    }).catch(function(err) {
      switch(err.response.status) {
        case 406:{
          const { response: { data: { errors } }} = err

          $ingredientForm.find('.invalid-feedback').empty()
          $ingredientForm.find('.is-invalid').removeClass('is-invalid')

          errors.forEach(function(error) {
            const { param: fieldName, msg } = error
            const $input = $ingredientForm.find(`[name="${fieldName}"]`)
            const $invalidFeedback = $input.siblings('.invalid-feedback')
            $input.addClass('is-invalid')
            $invalidFeedback.text(msg)
          })
          break
        }
        default: {
          console.log(err.response)
          break
        }
      }
    })
  })

  $ingredientForm.on('submit', '#update-burger-btn', function(e) {
    console.log('hi')
    e.preventDefault()
    const formData = new FormData($ingredientForm[0])

    formData.append('ingredients', JSON.stringify(ingredients))

    axios({
      method: 'PUT',
      url: '/api/my/burgers',
      data: formData,
      withCredentials: true
    }).then(function(resp) {
      console.log(resp.data)
      window.location.href = '/my/burgers'
    }).catch(function(err) {
      switch(err.response.status) {
        case 406:{
          const { response: { data: { errors } }} = err

          $ingredientForm.find('.invalid-feedback').empty()
          $ingredientForm.find('.is-invalid').removeClass('is-invalid')

          errors.forEach(function(error) {
            const { param: fieldName, msg } = error
            const $input = $ingredientForm.find(`[name="${fieldName}"]`)
            const $invalidFeedback = $input.siblings('.invalid-feedback')
            $input.addClass('is-invalid')
            $invalidFeedback.text(msg)
          })
          break
        }
        default: {
          console.log(err.response)
          break
        }
      }
    })
  })
})
