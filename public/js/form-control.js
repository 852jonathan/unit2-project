$(document).ready(function() {
  const $topIngredient = $("#top-ingredient")
  const $midIngredient = $("#mid-ingredient")
  const $botIngredient = $("#bot-ingredient")
  const $ingredientForm = $('#ingredient-form')
  const $formCheck = $('.form-check')

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
      $topIngredient.html(`<img src='/assets/${ingredient}.png' class="">`)
    } else if (type === 'botBun') {
      ingredients[type] = [ingredient]
      $botIngredient.html(`<img src='/assets/${ingredient}.png' class="">`)
    } else {

      //limit checkboxes
      let limit = 1
      for (let i = 0; i < $formCheckInput.length; i++) {
        $formCheckInput[i].onClick = () => {
          let checkedcount = 0
          for (let i = 0; i < $formCheckInput.length; i++) {
            checkedcount += ($formCheckInput[i].checked) ? 1 : 0;
          }
          if (checkedcount > limit) {
            console.log("You can select a maximum of " + limit + " checkboxes.")
            alert("You can select a maximum of " + limit + " checkboxes.")
            this.checked = false;
          }
        }
      }
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


  $ingredientForm.on('click', '#destroy-burger-btn', function(e) {
    e.preventDefault()
    const parent = $(e.target).parent('button')[0]
    const $elem = parent ? $(e.target).parent() : $(e.target)
    const url = $elem.data('url')

    $('#destroy-burger-btn').attr('disabled', true)

    axios({ method: 'DELETE', url }).then(function() {
      // $(`#destroy-burger-btn[data-url="${url}"][data-method="DELETE"]`).parentsUntil('#burgers-list').remove()
      $(`#destroy-burger-btn[data-url="${url}"][data-method="DELETE"]`).remove()
    }).catch(errorHandler).then(function() {
      $('#destroy-burger-btn').attr('disabled', false)
    })
  })

})
