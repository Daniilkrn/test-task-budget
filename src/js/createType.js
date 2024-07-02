import { heads } from "../helpers/data.js";
import { calcHead } from "./calculates.js";
import { deleteType } from "./deleteType.js";
import { sortMain } from "./sort.js";
import { handlerSort } from "./tableFunc.js";
const sortIcon = document.querySelector(".sort-icon");

const handleClick = (e) => {
  const el = e.target;
  let th = el.closest("th") || el;
  th.classList.toggle("active");
  th.innerHTML = "";
  const input = document.createElement("input");
  input.className = "type-input";
  input.classList.toggle("active");
  input.placeholder = "Название статьи...";
  th.appendChild(input);
  const handleInput = () => {
    countInput = input.value;
    let maxlength = 26;
    if (input.value.length > maxlength) {
      const span = document.createElement("span");
      span.innerHTML = "...";
      span.className = "hide-span";
      th.appendChild(span);
      input.removeEventListener("input", handleInput, false);
    }
  };

  input.addEventListener("input", handleInput);

  input.focus();
  input.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      th.innerHTML = "";
      th.classList.toggle("active", false);
      const atr = th.getAttribute("type");
      if (input.value != false) {
        creteNewType(input.value, atr);
      }
  
      const groupIcons = document.createElement("div");
      const groupCell = document.createElement("div");
      groupCell.className = "group-cell";
      const span = document.createElement("span");
      let budgetTypeInner;
      if (atr === "rev") budgetTypeInner = "Бюджет доходов";
      else budgetTypeInner = "Бюджет расходов";
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
      set();
    }
  });
};

function set() {
  const createBtn = document.querySelectorAll(".create-type");
  createBtn.forEach((el) =>
    el.addEventListener("click", (e) => handleClick(e))
  );
}

function creteNewType(inputValue, atr) {
  const tableBody = document.querySelector(".table-body");
  const allTrRev = document.querySelectorAll(".row.rev");
  const allTrExpense = document.querySelectorAll(".row.expense");
  const tableTotalHeads = document.querySelector(".head-total");
  const tableTotalExpense = document.querySelector(".head-total-expense");

  let allTrType;
  if (atr === "rev") {
    allTrType = allTrRev;
  } else {
    allTrType = allTrExpense;
  }

  let row = document.createElement("tr");
  row.className = "row";
  row.setAttribute("type", allTrType.length + 1);
  row.classList.toggle(atr);

  const td = document.createElement("td");
  td.innerHTML = inputValue;
  td.classList.toggle(`td-budget-${atr}`);
  td.setAttribute("type", allTrType.length + 1);
  td.innerHTML += `
    <svg class="del-type" width="9.687256" height="9.687363" viewBox="0 0 9.68726 9.68736" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs/>
	<path id="Union" d="M0 8.48528L1.20215 9.68736L4.84375 6.04576L8.48535 9.68736L9.68726 8.48528L6.04565 4.84367L9.68726 1.20209L8.48535 0L4.84375 3.6416L1.20215 0L0 1.20209L3.6416 4.84367L0 8.48528Z" clip-rule="evenodd" fill="#000000" fill-opacity="0.400000" fill-rule="evenodd"/>
</svg>

  `;

  td.addEventListener(
    "mouseenter",
    () => (td.querySelector(".del-type").style.display = "inline")
  );
  td.addEventListener(
    "mouseleave",
    () => (td.querySelector(".del-type").style.display = "none")
  );
  // const groupIcons = document.createElement("div");
  // const groupCell = document.createElement("div");
  // groupCell.className = "group-cell";
  // const span = document.createElement("span");

  // span.innerHTML = inputValue;
  // groupIcons.innerHTML += `
  //   <svg width="12.000000" height="10.000000" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  //   <defs/>
  //   <path id="Vector" d="M4.3 1.25L5.5 2.5L10.8 2.5L10.8 8.75L1.2 8.75L1.2 1.25L4.3 1.25ZM4.8 0L1.2 0C0.53 0 0 0.56 0 1.25L0 8.75C0 9.43 0.53 10 1.2 10L10.8 10C11.46 10 12 9.43 12 8.75L12 2.5C12 1.81 11.46 1.25 10.8 1.25L6 1.25L4.8 0Z" fill="#333333" fill-opacity="0.450000" fill-rule="nonzero"/>
  //   </svg>
  //   <svg class='create-type' width="16.000000" height="16.000000" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  //   <defs/>
  //   <rect id="Icon/Plus" rx="0.500000" width="15.000000" height="15.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="0"/>
  //   <path id="Vector" d="M9 3L9 7L13 7L13 9L9 9L9 13L7 13L7 9L3 9L3 7L7 7L7 3L9 3Z" fill="#333333" fill-opacity="0.450000" fill-rule="evenodd"/>
  //   </svg>
  // `;
  // groupIcons.className = "group-icons";
  // td.appendChild(groupCell);
  // groupCell.appendChild(groupIcons);
  // groupCell.appendChild(span);

  row.appendChild(td);

  sortIcon.addEventListener("click", handlerSort);

  let count = 0;
  while (count !== heads.subTitles.length - 1) {
    let td = document.createElement("td");
    td.setAttribute("month", count.toString());
    td.setAttribute("type", allTrType.length + 1);
    td.className = "main-td";
    row.appendChild(td);
    td.classList.toggle(`${atr}`);

    if (count == 0) {
      td.innerHTML = "";
      td.className = "budget-main";
      td.classList.toggle(atr);

      const currency = " ₽";
      const spanCurrency = document.createElement("span");
      spanCurrency.innerText = currency;

      const input = document.createElement("input");
      input.className = `${atr}-input`;
      td.innerHTML += "0,00";
      td.appendChild(spanCurrency);
    }
    count++;
  }

  let nodesNew = [
    tableTotalHeads,
    ...allTrRev,
    row,
    tableTotalExpense,
    ...allTrExpense,
  ];

  if (atr === "rev") {
    nodesNew = [
      tableTotalHeads,
      ...allTrRev,
      row,
      tableTotalExpense,
      ...allTrExpense,
    ];
  } else {
    nodesNew = [
      tableTotalHeads,
      ...allTrRev,
      tableTotalExpense,
      ...allTrExpense,
      row,
    ];
  }

  tableBody.innerHTML = "";
  for (let i = 0; i < nodesNew.length; i++) {
    tableBody.appendChild(nodesNew[i]);
  }

  const mainTd = document.querySelectorAll(
    `.main-td.${atr}[type="${allTrType.length + 1}"]`
  );

  mainTd.forEach((td, idx) => {
    if (!mainTd[idx].getAttribute("value")) {
      const currency = "₽";
      const spanCurrency = document.createElement("span");
      spanCurrency.innerText = currency;

      const input = document.createElement("input");

      td.appendChild(input);
      td.appendChild(spanCurrency);

      input.addEventListener("focus", () => {
        spanCurrency.style.display = "none";
        if (Number(input.value.replace(",", ".")) > 0) {
          return (input.value = input.value.replace(",00", ""));
        } else {
          input.value = "";
        }
      });

      input.addEventListener("blur", () => {
        const td = input.closest("td");
        td.setAttribute("value", input.value);
        td.classList.toggle("redactive-input", false);
        if (!input.value || isNaN(input.value)) {
          input.value = Number(0).toFixed(2).replace(".", ",");
          input.style.width = (input.value.length + 1) * 6 + "px";
        } else {
          calcHead(input);
          input.value = Number(input.value).toLocaleString() + ",00";
          input.style.width = (input.value.length + 1) * 6 + "px";
        }
        spanCurrency.style.display = "inline";

        const typeSort = sortIcon.classList.contains("alphabet");
        sortMain(typeSort);
      });

      input.addEventListener("keydown", () => {
        input.style.width = (input.value.length + 1) * 8 + "px";
      });

      td.setAttribute("value", Number(0));
      input.value = Number(0).toFixed(2).replace(".", ",");
    }
  });

  const typeSort = sortIcon.classList.contains("alphabet");
  sortMain(typeSort);
}

set();

window.addEventListener("click", (e) => {
  const el = e.target;
  if (el.className.baseVal === "del-type") {
    deleteType(el.closest("td"));
  }
});
