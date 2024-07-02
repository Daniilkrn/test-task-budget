import { headsTotals } from "./headsTotals.js";


export function calcHead(input) {
  
  const td = input.closest("td") || input;
  const nameClass = td.classList[1]
  const month = td.getAttribute("month");
  const type = td.getAttribute("type");

  reloadTitle(month, type, nameClass);
}

export function reloadTitle(month, type, nameClass) {
  const budgetHeads = document.querySelectorAll(".budget-head-rev");
  const budgetHeadsExpense = document.querySelectorAll(".budget-head-expense");
  const totalBudgetHead = document.querySelector(".budget-total-head-rev");
  const totalBudgetHeadExpense = document.querySelector('.budget-total-head-expense')
  const tdSaldo = document.querySelectorAll('.budget-head-saldo')
  const tdTotalSaldo = document.querySelector('.budget-total-head-saldo')
  
  budgetHeads.forEach((head) => {
    if (head.getAttribute(nameClass) == month) {
      head.innerHTML = "";
      const res = headsTotals.setMonth(month, nameClass);
      head.innerHTML = Number(res).toLocaleString() + ',00 ₽';
    }
  });

  budgetHeadsExpense.forEach((head) => {
    if (head.getAttribute(nameClass) == month) {
      head.innerHTML = "";
      const res = headsTotals.setMonth(month,nameClass);
      head.innerHTML = Number(res).toLocaleString() + ',00 ₽';
    }
  });

  const totalType = headsTotals.setTypes(type, nameClass);
  const totalBudgetHeadTd = document.querySelectorAll('.budget-main')
  totalBudgetHeadTd.forEach((el) => {

    if (el.getAttribute("type") === type && el.classList.contains(nameClass)) {
      el.innerHTML = totalType.toLocaleString() + ',00 ₽'
      el.setAttribute('value', totalType)
    }
  });

  const totalAllBudgetsSaldo = headsTotals.setBudgetSaldo()
  tdTotalSaldo.innerHTML = totalAllBudgetsSaldo.toLocaleString() + ',00 ₽';

  const totalTypeBudgetRev = headsTotals.setTotalBudget('rev')
  totalBudgetHead.innerHTML = totalTypeBudgetRev.toLocaleString() + ',00 ₽';
  
  const totalTypeBudgetExpense = headsTotals.setTotalBudget('expense')
  totalBudgetHeadExpense.innerHTML = totalTypeBudgetExpense.toLocaleString() + ',00 ₽';

  const totalTdSaldo = headsTotals.setSaldo(month)
  tdSaldo.forEach(td => {
    if (td.getAttribute("month") === month) {
      td.innerHTML = totalTdSaldo.toLocaleString() + ',00 ₽';
    }
  })
}