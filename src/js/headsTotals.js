// const tdAll = document.querySelectorAll(".main-td");
// const thAllRev = document.querySelector(".budget-total-head-rev")
// const thAllExpense = document.querySelector(".budget-total-head-expense")


export const headsTotals = {
  setMonth(month, nameClass) {
    const tdAll = document.querySelectorAll(".main-td");
    let arr = [];
    for (let i = 0; i < tdAll.length; i++) {
      if (
        tdAll[i].getAttribute("month") == month &&
        tdAll[i].classList.contains(nameClass)
      ) {
        arr.push(+tdAll[i].getAttribute('value'));
      }
    }
    const totalMonth = arr.reduce((acc, item) => acc + item);
    return totalMonth;
  },

  setTotalMonths(typeHead) {
    let count = 0;
    for (let i = 0; i < typeHead.length; i++) {
      const el = +typeHead[i].getAttribute('value')
      count += el
    }
    return count;
  },

  setTypes(type, nameClass) {
    const tdAll = document.querySelectorAll(".main-td");
    let arr = [];
    for (let i = 0; i < tdAll.length; i++) {
      if (
        tdAll[i].getAttribute("type") == type &&
        tdAll[i].classList.contains(nameClass)
      ) {
        arr.push(+tdAll[i].getAttribute('value'));
      }
    }
    if(arr.length > 0){
      const totalType = arr.reduce((acc, item) => acc + item);
      return totalType;
    }
  },

  setTotalBudget(type) {
    const allType = document.querySelectorAll(`.budget-main.${type}`)

    let count = 0;
    for (let i = 0; i < allType.length; i++) {
      const el = +allType[i].getAttribute('value')
      count += el
    }
 
    return count
  },

  setBudgetSaldo() {
    const allType = document.querySelectorAll('.budget-main')

    let count = 0;
    for (let i = 0; i < allType.length; i++) {
      const el = +allType[i].getAttribute('value')
      count += el
    }
 
    return count
  },

  setSaldo(month) {
    const tdAll = document.querySelectorAll(".main-td");
    let count = 0;
    for (let i = 0; i < tdAll.length; i++) {
      if (tdAll[i].getAttribute("month") == month) {
        count += +tdAll[i].getAttribute('value');
      }
    }
    return count
  },
};
