'use strict;'

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money_plus');
const moneyMinus = document.getElementById('money_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const transaction = document.getElementById('transaction');
const amount = document.getElementById('amount');


const localStorageTransaction = JSON.parse(
    localStorage.getItem('transactions'));

// console.log(localStorageTransaction);

let transactions = localStorage.getItem('transactions') !== null
    ? localStorageTransaction :[];

// console.log(transactions);

// Update Values

const updatedValues = function(){
    const amounts = transactions.map((transaction) =>
    transaction.amount);
    const plusTransaction = amounts.filter((amount) => 
    amount > 0);
    const minusTransaction = amounts.filter((amount) => 
    amount < 0);
    const incomeValue = plusTransaction.reduce((acc,amount) => 
    acc + amount,0);
    const expenseValue = minusTransaction.reduce((acc,amount) => 
    acc + amount, 0);

    moneyPlus.innerHTML = `₹ ${incomeValue}`;
    moneyMinus.innerHTML = `₹ ${expenseValue}`;
    balance.innerHTML = `₹ ${incomeValue + expenseValue}`;
}

// updatedValues();

// To add Transaction DOM list

const transactionDomList = function(transaction){
  // Sign
   const sign = transaction.amount < 0 ? '-' : '+';

  // Create Element li list
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.transaction} <span>${sign} ${Math.abs(transaction.amount)}
  </span><button class="delete_btn" onclick = "removeTransaction(${transaction.id})">X</button>`;

  list.appendChild(item);

  updatedValues();
}

 list.innerHTML = null;

// transactions.forEach((transaction => transactionDomList(transaction)));

// Update Local Storage
const updateLocalStorage = function(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

// Remove Transaction
const removeTransaction = function(id){
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  list.innerHTML = '';
  transactions.forEach(transactionDomList);
  updatedValues();
}


form.addEventListener('submit',(e) =>{
  e.preventDefault();
  if(transaction.value.trim() === '' || amount.value.trim() === ''){
    alert("Enter Transaction Details");
  }
  const transactionDetails = {
    id : Math.floor(Math.random() * 1000),
    transaction : transaction.value,
    amount : Number(amount.value)
  };
  transactions.push(transactionDetails);
  transactionDomList(transactionDetails);
  updateLocalStorage();
  transaction.value = '';
  amount.value = '';
}) 

