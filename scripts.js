// Seleciona os elementos do formulário
const amount = document.getElementById("amount")


amount.oninput = () => {
  let value = amount.value.replace(/\D+/g, "")
  
  amount.value = value

}