const tableBody = document.querySelector(".table-body");

export function sortMain(sortType) {
  const allTrRev = document.querySelectorAll(".row.rev");

  const allTrExpense = document.querySelectorAll(".row.expense");
  let allTdRev = document.querySelectorAll(".budget-main.rev");
  let allTdExpense = document.querySelectorAll(".budget-main.expense");

  const tableTotalHeads = document.querySelector(".head-total");
  const tableTotalExpense = document.querySelector(".head-total-expense");
  if (sortType) {
    sortBySum(allTdRev, tableTotalHeads, allTrRev);
    sortBySum(allTdExpense, tableTotalExpense, allTrExpense);
  } else {
    sortByAlphabet(tableTotalHeads, allTrRev);
    sortByAlphabet(tableTotalExpense, allTrExpense);
  }
}

export function sortBySum(allTdType, typeTotalHeads, allTrType) {
  const values = [];
  const alphabet = [];

  for (let i = 0; i < allTdType.length; i++) {
    const value = +allTdType[i].getAttribute('value');

    if (value > 0) {
      allTdType[i].parentNode.setAttribute("value", value);
      values.push(allTrType[i]);
    } else {
      alphabet.push(allTrType[i]);
    }
  }

  console.log(values);
  if (values) {
    const sortedSum = values
      .sort((a, b) => {
        return +a.getAttribute("value") - +b.getAttribute("value");
      })
      .reverse();

    sortedSum.unshift(typeTotalHeads);
    sortedSum.forEach((el) => {
      tableBody.appendChild(el);
    });
  }

  if (alphabet) {
    const sortedAlphabet = alphabet
      .sort((a, b) => {
        return a.firstChild.innerText.localeCompare(b.firstChild.innerText);
      })
      
    sortedAlphabet.forEach((el) => {
      tableBody.appendChild(el);
    });
  }
  
}

export function sortByAlphabet(typeTotalHeads, allTrType) {
  const sorted = [...allTrType].sort((a, b) =>
    a.firstChild.innerText.localeCompare(b.firstChild.innerText)
  );

  sorted.unshift(typeTotalHeads);
  sorted.forEach((el) => {
    tableBody.appendChild(el);
  });
}
