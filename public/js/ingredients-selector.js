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

  $(".form-check").on('change', '.form-check-input', function(e) {
    const $formCheckInput = $(e.target)
    const ingredient = $formCheckInput.val()
    const type = $formCheckInput.data('type')

    if (type === 'topBun') {
      ingredients[type] = [ingredient]
      $topIngredient.html(`<img src='../../assets/${ingredient}.png'>`)
    } else if (type === 'botBun') {
      ingredients[type] = [ingredient]
      $botIngredient.html(`<img src='../../assets/${ingredient}.png'>`)
    } else {
      if(ingredients.middle.includes(ingredient)) {
        $(`img[src='../../assets/${ingredient}.png']`).remove()
        ingredients.middle = ingredients.middle.filter((i) => i !== ingredient)
      } else {
        $(`<img src='../../assets/${ingredient}.png'> class="moved"`).appendTo($midIngredient)
        ingredients.middle.push(ingredient)
      }
    }
  })

  $ingredientForm.on('submit', function(e) {
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
