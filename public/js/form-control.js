$(document).ready(() => {
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

  $formCheck.on('change', '.form-check-input', function(e) {
    const $formCheckInput = $(e.target)
    const ingredient = $formCheckInput.val()
    const type = $formCheckInput.data('type')

    const $imgs = $('#selected-ingredient img')
    let sumHeight = 0
    let zIndex = 99

    $imgs.each((i) => {
      const $elem = $imgs.eq(i)
      $elem.css('top', sumHeight).css('z-index', zIndex)
      sumHeight += (($elem.height() / 4)*1.2)
      zIndex -= 1
    })
    if (type === 'topBun') {
      ingredients[type] = [ingredient]
      $topIngredient.html(`<img src='/assets/${ingredient}.png' class="" style="z-index: 100">`)
    } else if (type === 'botBun') {
      ingredients[type] = [ingredient]
      $botIngredient.html(`<img src='/assets/${ingredient}.png'>`)
    } else {
      //limit checkboxes
      const $checked = $('input[type="checkbox"]:checked')
      const limit = 10
      if ($checked.length > limit) {
        console.log("You can select a maximum of " + limit + " checkboxes.")
        alert("You can select a maximum of " + limit + " checkboxes.")
        $formCheckInput.trigger('click')
      } else {
        if(ingredients.middle.includes(ingredient)) {
          $(`img[src='/assets/${ingredient}.png']`).remove()
          ingredients.middle = ingredients.middle.filter((i) => i !== ingredient)
        } else {
          $(`<img src='/assets/${ingredient}.png'> class=""`).appendTo($midIngredient)
          ingredients.middle.push(ingredient)
        }
      }
    }
  })

  $ingredientForm.on('submit', function(e) {
    console.log('new/edit Burger')
    e.preventDefault()
    const url = $ingredientForm.data('url')
    const method = $ingredientForm.data('method')
    const formData = new FormData($ingredientForm[0])
    formData.append('ingredients', JSON.stringify(ingredients))

    axios({
      method,
      url,
      data: formData,
      withCredentials: true
    }).then(function(resp) {
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

    axios({ method: 'DELETE', url}).then(function() {
      window.location.href = "/my/burgers"
    }).catch().then(function() {
      $('#destroy-burger-btn').attr('disabled', false)
    })
  })

})
