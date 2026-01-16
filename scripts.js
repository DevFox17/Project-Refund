// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")

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

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo)

    // Aduciona o item na lista
    expenseList.append(expenseItem)
  } catch (error) {
    alert("Não foi possível atualizar a lista de dispesa")
    console.log(error)
  }
}

