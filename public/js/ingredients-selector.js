$(document).ready(function() {
  const $topIngredient = $("#top-ingredient")
  const $midIngredient = $("#mid-ingredient")
  const $botIngredient = $("#bot-ingredient")

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
})
