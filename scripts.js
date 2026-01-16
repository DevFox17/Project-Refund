// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2") 
const expensesQuantity = document.querySelector("aside header p span")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Obtem o valor atual do input e remove os caracters não numéricos
  let value = amount.value.replace(/\D+/g, "")

  // Transformar o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50)
  value = Number(value) / 100

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL (Rea brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

// Catura o evento de submit do formulário para obter o svalores
form.onsubmit = (event) => {
  // Previne comportamento padão de recarregar a página
  event.preventDefault()

  // Cria um objeto com detalhes na nova depesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),

  }

  // Chama a funcção que irá adicionar o item na lista
  expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria um elemento de li para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da dispesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cira a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona name e category na div das informações da dispesa
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da dispesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Aduciona o item na lista
    expenseList.append(expenseItem)

    // Limpa o formulário para adicionar um novo item
    formClear()

    // Atualiza os totais 
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de dispesa")
    console.log(error)
  }
}

// Atualiza os totais 
function updateTotals () {
  try {
    // Recupera todos os itens (li) da lista(ul)
    const items = expenseList.children
    
    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variável para poder incrementar o total
    let total = 0

    // Percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      // Remove caracteres não numéricos e substitui a virgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      // Converte o valor para float
      value = parseFloat(value)

      // Verificar se é um número válido
      if (isNaN(value)){
        return alert("Não foi possível calcular o total. O valor não parece ser um número.")
      }

      // Incrementa o valor total.
      total += Number(value)
    }

    // Cria a span para adicionar o R$ formatado
    const sybolBRL = document.createElement("small")
    sybolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com um estilo sutomizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento 
    expensesTotal.innerHTML = ""

    // Adiciona o simbolo da moeda e o valor total formatado
    expensesTotal.append(sybolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}

// Evento que captura clique nos itens da lista
expenseList.addEventListener("click", function (event){
  // Verificar se o elemento clicado é o ícone de remover
  if(event.target.classList.contains("remove-icon")) {
    // Obtem a li pai do elemento clicado
    const item = event.target.closest(".expense")
     // Remove o item da lista 
    item.remove()
  }

 // Atualiza os totais
  updateTotals()
})

function formClear (){
  // Limpa os inputs
  expense.value = ""
  category.value = ""
  amount.value = ""

  // coloca o foco no input de amount
  expense.focus()
}


