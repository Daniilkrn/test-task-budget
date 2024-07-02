import { budgetExpense, budgetRevenues, heads } from "../helpers/data.js";
import { deleteType } from "./deleteType.js";

const tableBody = document.querySelector(".table-body");
const tableFoot = document.querySelector(".table-foot");

export function setHeadsSaldo(budgetName) {
  const tr = document.createElement("tr");
  tr.className = `head-total-${budgetName}`;
  tableFoot.appendChild(tr);
  for (let i = 0; i < heads.tableHeads.length; i++) {
    let th = document.createElement("th");
    th.className = `budget-head-${budgetName}`;
    th.setAttribute("month", i - 1);
    th.innerHTML = 0;
    if (i == 0) {
      th.innerHTML = "";
      th.className = `budget-head-total-${budgetName}`;
      th.innerHTML += "Сальдо";
    } else {
      th.innerHTML = Number(0).toFixed(2).replace(".", ",");
    }

    if (i == 1) {
      th.className = `budget-total-head-${budgetName}`;
    }
    if (i > 0) th.innerHTML += " ₽";
    th.setAttribute(budgetName, i - 1);
    tr.appendChild(th);
  }
}

export function setHeads(budgetTypeInner, budgetType, nameSection, arr, groupStatus) {
  const tr = document.createElement("tr");
  tr.className = nameSection;
  tableBody.appendChild(tr);

  for (let i = 0; i < heads.tableHeads.length; i++) {
    let th = document.createElement("th");
    th.className = `budget-head-${budgetType}`;
    th.innerHTML = 0;

    if (i == 0) {
      th.innerHTML = "";
      th.className = "budget-head-create";
      th.setAttribute("type", budgetType);
      const groupIcons = document.createElement("div");
      const groupCell = document.createElement("div");
      groupCell.className = "group-cell";
      const span = document.createElement("span");
      span.innerHTML = budgetTypeInner;

      groupIcons.innerHTML += `
      <svg class="create-group" width="12.000000" height="10.000000" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs/>
      <path id="Vector" d="M4.3 1.25L5.5 2.5L10.8 2.5L10.8 8.75L1.2 8.75L1.2 1.25L4.3 1.25ZM4.8 0L1.2 0C0.53 0 0 0.56 0 1.25L0 8.75C0 9.43 0.53 10 1.2 10L10.8 10C11.46 10 12 9.43 12 8.75L12 2.5C12 1.81 11.46 1.25 10.8 1.25L6 1.25L4.8 0Z" fill="#333333" fill-opacity="0.450000" fill-rule="nonzero"/>
      </svg>
      <svg class='create-type' width="16.000000" height="16.000000" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs/>
      <rect id="Icon/Plus" rx="0.500000" width="15.000000" height="15.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="0"/>
      <path id="Vector" d="M9 3L9 7L13 7L13 9L9 9L9 13L7 13L7 9L3 9L3 7L7 7L7 3L9 3Z" fill="#333333" fill-opacity="0.450000" fill-rule="evenodd"/>
      </svg>
      `;

      groupIcons.className = "group-icons";
      th.appendChild(groupCell);
      groupCell.appendChild(groupIcons);
      groupCell.appendChild(span);
    } else {
      th.innerHTML = Number(0).toFixed(2).replace(".", ",");
    }

    if (i == 1) {
      th.className = `budget-total-head-${budgetType}`;
      th.setAttribute("totalName", true);
    }

    if (i > 0) th.innerHTML += " ₽";
    th.setAttribute(budgetType, i - 1);
    tr.appendChild(th);
  }

  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    let row = document.createElement("tr");
    row.setAttribute("type", i);
    row.classList.toggle("row");
    row.classList.toggle(budgetType);
    tableBody.appendChild(row);
    let td = document.createElement("td");
    row.appendChild(td);
    if (count == 0) {
      td.className = `td-budget-${budgetType}`;
      td.innerHTML += `
      <svg class="del-type" width="9.687256" height="9.687363" viewBox="0 0 9.68726 9.68736" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs/>
        <path id="Union" d="M0 8.48528L1.20215 9.68736L4.84375 6.04576L8.48535 9.68736L9.68726 8.48528L6.04565 4.84367L9.68726 1.20209L8.48535 0L4.84375 3.6416L1.20215 0L0 1.20209L3.6416 4.84367L0 8.48528Z" clip-rule="evenodd" fill="#000000" fill-opacity="0.400000" fill-rule="evenodd"/>
      </svg>
    `;
      td.setAttribute("type", i);
      td.addEventListener(
        "mouseenter",
        () => (td.querySelector(".del-type").style.display = "inline")
      );
      td.addEventListener(
        "mouseleave",
        () => (td.querySelector(".del-type").style.display = "none")
      );
    } else {
      td.className = "main-td";
    }

    while (count !== heads.subTitles.length - 1) {
      let td = document.createElement("td");
      td.setAttribute("month", count.toString());
      td.setAttribute("type", i + 1);
      td.className = "main-td";
      row.appendChild(td);
      td.classList.toggle(`${budgetType}`);

      if (count == 0) {
        td.innerHTML = "";
        td.className = "budget-main";
        td.classList.toggle(budgetType);

        const currency = " ₽";
        const spanCurrency = document.createElement("span");
        spanCurrency.innerText = currency;

        const input = document.createElement("input");
        input.className = `${budgetType}-input`;
        td.innerHTML += "0,00";
        td.appendChild(spanCurrency);
      }
      count++;
    }
  }
}

setHeads("Бюджет доходов", "rev", "head-total", budgetRevenues);
setHeads("Бюджет расходов", "expense", "head-total-expense", budgetExpense);
setHeadsSaldo("saldo");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("td").forEach((el) => {
    const td = el;
    const elF = el.querySelector(".del-type");
    if (elF) {
      elF.addEventListener("click", () => {
        deleteType(td);
      });
    }
  });
});
