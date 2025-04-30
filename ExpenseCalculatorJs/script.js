let expenses = [];

function addExpense() {
    const nameInput = document.getElementById('expenseName');
    const amountInput = document.getElementById('expenseAmount');
    
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    if (!name || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and amount');
        return;
    }
    
    const expense = {
        name: name,
        amount: amount
    };
    
    expenses.push(expense);
    updateExpensesTable();
    
    // Clear inputs
    nameInput.value = '';
    amountInput.value = '';
}

function updateExpensesTable() {
    const tbody = document.getElementById('expensesTableBody');
    tbody.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = expense.name;
        
        const amountCell = document.createElement('td');
        amountCell.textContent = `$${expense.amount.toFixed(2)}`;
        
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteExpense(index);
        actionCell.appendChild(deleteButton);
        
        row.appendChild(nameCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);
        
        tbody.appendChild(row);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesTable();
}

function calculateExpenses() {
    if (expenses.length === 0) {
        alert('Please add some expenses first');
        return;
    }
    
    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Get top 3 largest expenses
    const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
    const top3 = sortedExpenses.slice(0, 3);
    
    // Calculate average daily expenses
    const dailyAverage = total / 30;
    
    // Update the results section
    document.getElementById('totalExpenses').textContent = total.toFixed(2);
    
    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    top3.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
        topExpensesList.appendChild(li);
    });
    
    document.getElementById('dailyAverage').textContent = dailyAverage.toFixed(2);
    
    // Show results section
    document.getElementById('results').style.display = 'block';
} 