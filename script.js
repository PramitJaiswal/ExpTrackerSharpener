// script.js
// Get form, expense list, and total amount elements 
const expenseForm = document.getElementById("expense-form"); 
const expenseList = document.getElementById("expense-list"); 
const totalAmountElement = document.getElementById("total-amount"); 

// Initialize expenses array from localStorage 
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 
    // Clear expense list 
    expenseList.innerHTML = ""; 

    // Initialize total amount 
    let totalAmount = 0; 

    // Loop through expenses array and create table rows 
    for (let i = 0; i < expenses.length; i++) { 
        const expense = expenses[i]; 
        const expenseRow = document.createElement("tr"); 
        expenseRow.innerHTML = ` 
            <td>${expense.name}</td> 
            <td>${expense.description}</td> 
            <td>${expense.amount}</td> 
            <td>${expense.currency}</td> 
            <td>
                <button class="edit-btn" data-id="${i}">Edit</button> 
                <button class="delete-btn" data-id="${i}">Delete</button>
            </td>
        `; 
        expenseList.appendChild(expenseRow); 

        // Update total amount 
        totalAmount += parseFloat(expense.amount); 
    } 

    // Update total amount display 
    totalAmountElement.textContent = totalAmount.toFixed(2); 

    // Save expenses to localStorage 
    localStorage.setItem("expenses", JSON.stringify(expenses)); 
} 

// Function to add or edit expense 
function addOrEditExpense(event) { 
    event.preventDefault(); 

    // Get expense name, description, amount, and currency from form 
    const expenseName = document.getElementById("expense-name").value; 
    const expenseDescription = document.getElementById("expense-description").value; 
    const expenseAmount = document.getElementById("expense-amount").value; 
    const expenseCurrency = document.getElementById("currency").value; 

    // Validate inputs 
    if (expenseName.trim() === "" || isNaN(expenseAmount)) { 
        alert("Please enter valid expense details."); 
        return; 
    } 

    const expenseIndex = event.target.getAttribute("data-id"); 

    // Create new expense object 
    const expense = { 
        name: expenseName, 
        description: expenseDescription, 
        amount: expenseAmount, 
        currency: expenseCurrency 
    }; 

    // Add or edit expense based on the presence of data-id attribute 
    if (expenseIndex === null) { 
        expenses.push(expense); 
    } else { 
        expenses[expenseIndex] = expense; 
    } 

    // Render expenses 
    renderExpenses(); 

    // Clear form inputs 
    expenseForm.reset(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
    if (event.target.classList.contains("delete-btn")) { 
        const expenseIndex = parseInt(event.target.getAttribute("data-id")); 
        expenses.splice(expenseIndex, 1); 
        renderExpenses(); 
    } 
} 

// Function to edit expense 
function editExpense(event) { 
    if (event.target.classList.contains("edit-btn")) { 
        const expenseIndex = parseInt(event.target.getAttribute("data-id")); 
        const selectedExpense = expenses[expenseIndex]; 

        document.getElementById("expense-name").value = selectedExpense.name; 
        document.getElementById("expense-description").value = selectedExpense.description; 
        document.getElementById("expense-amount").value = selectedExpense.amount; 
        document.getElementById("currency").value = selectedExpense.currency; 

        // Set data-id attribute to track the edited expense 
        expenseForm.setAttribute("data-id", expenseIndex); 
    } 
} 

// Add event listeners 
expenseForm.addEventListener("submit", addOrEditExpense); 
expenseList.addEventListener("click", deleteExpense); 
expenseList.addEventListener("click", editExpense); 

// Render initial expenses on page load 
renderExpenses();
