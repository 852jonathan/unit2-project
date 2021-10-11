const $ingredientForm = $("#ingredient-form")
const $selectedIngredient = $(".selected-ingredient")
const $formCheckInput = $(".form-check-input")

const ingredientList = []


// $ingredientForm.on("change", function() {
  $(".form-check").on('change', '.form-check-input', function() {
    if(this.checked) {
      $selectedIngredient.appendTo(`<p>`$formCheckInput.value`</p>`)
    }
  })

  // $(".form-check").on('change', '.form-check-input', function() {
  //   if(this.unchecked) {
  //     $selectedIngredient.prepend("<p>Added 1</p>")
  //   }
  // })

// })

// $(".selected-ingredient").htm  l( $("input:checked").val() + " is checked!")
// $("input[type=checkbox]").on("change",).val() + " is checked!"
