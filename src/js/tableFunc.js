import { budgetExpense, budgetRevenues, heads } from "../helpers/data.js";
import { calcHead } from "./calculates.js";
import { sortMain } from "./sort.js";

const mainTd = document.querySelectorAll(".main-td");
const tdAll = document.querySelectorAll(".main-td");
const tdBudgetAllExpense = document.querySelectorAll(".td-budget-expense");
const tdBudgetAllRev = document.querySelectorAll(".td-budget-rev");
const tableBudgetHeads = document.querySelector(".head-budget");
const tableHeads = document.querySelector(".head-main");

export const toRedact = (e) => {
  const el = e.target;

  const input = el.querySelector("input") || el;
  input.focus();

  const td = input.closest("td") || td;
  td.classList.toggle("redactive-input");
};

export function setDefault() {
  heads.tableHeads.forEach((head) => {
    let th = document.createElement("th");
    tableHeads.appendChild(th);
    th.innerHTML = head;
  });

  heads.subTitles.forEach((sub, idx) => {
    let th = document.createElement("th");
    tableHeads.appendChild(th);

    if (idx == 0) {
      th.innerHTML = sub;
      th.className = "th-budget-sort";
      th.innerHTML += `
      <svg class="sort-icon alphabet" width="13.333328" height="12.000000" viewBox="0 0 13.3333 12" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs/>
      <path id="Vector" d="M0 9.33L2 9.33L2 0L3.33 0L3.33 9.33L5.33 9.33L2.66 12L0 9.33ZM6.66 2.66L13.33 2.66L13.33 1.33L6.66 1.33L6.66 2.66ZM6.66 6.66L11.33 6.66L11.33 5.33L6.66 5.33L6.66 6.66ZM9.33 9.33L9.33 10.66L6.66 10.66L6.66 9.33L9.33 9.33Z" fill="#333333" fill-opacity="1.000000" fill-rule="evenodd"/>
      </svg>
      `;
    } else {
      th.innerHTML = sub;
    }
    tableBudgetHeads.appendChild(th);
  });

  mainTd.forEach((td) => {
    const currency = " ₽";
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
  });
}

setDefault();

tdAll.forEach((td) => {
  td.addEventListener("click", (e) => {
    const valueTd = e.target.getAttribute("value");
    toRedact(e, valueTd);
  });
});

tdBudgetAllRev.forEach((tdb, idx) => {
  tdb.innerHTML += budgetRevenues[idx];
});

tdBudgetAllExpense.forEach((tdb, idx) => {
  tdb.innerHTML += budgetExpense[idx];
});

const sortIcon = document.querySelector(".sort-icon");
sortIcon.addEventListener("click", handlerSort);

export function handlerSort() {
  if (sortIcon.classList.contains("alphabet")) {
    sortIcon.classList.toggle("alphabet", false);
    sortIcon.innerHTML = `
  	<defs>
		<clipPath id="clip2_225">
			<rect id="sort-alphabetical-ascending" rx="0.500000" width="15.000000" height="15.000000" transform="translate(0.500000 0.500000)" fill="white" fill-opacity="0"/>
		</clipPath>
	</defs>
	<rect id="sort-alphabetical-ascending" rx="0.500000" width="15.000000" height="15.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="0"/>
	<g clip-path="url(#clip2_225)">
		<path id="Vector" d="M1.33 11.33L3.33 11.33L3.33 2L4.66 2L4.66 11.33L6.66 11.33L4 14L1.33 11.33ZM9.33 2L10.66 2C11.4 2 12 2.59 12 3.33L12 7.33L10.66 7.33L10.66 6L9.33 6L9.33 7.33L8 7.33L8 3.33C8 2.59 8.59 2 9.33 2ZM9.33 4.66L10.66 4.66L10.66 3.33L9.33 3.33L9.33 4.66ZM12 10L12 8.66L8 8.66L8 10L10.22 10L8 12.66L8 14L12 14L12 12.66L9.78 12.66L12 10Z" fill="#333333" fill-opacity="1.000000" fill-rule="evenodd"/>
	</g>
  `;
  } else {
    sortIcon.classList.toggle("alphabet");
    sortIcon.innerHTML = `
    <defs/>
    <path id="Vector" d="M0 9.33L2 9.33L2 0L3.33 0L3.33 9.33L5.33 9.33L2.66 12L0 9.33ZM6.66 2.66L13.33 2.66L13.33 1.33L6.66 1.33L6.66 2.66ZM6.66 6.66L11.33 6.66L11.33 5.33L6.66 5.33L6.66 6.66ZM9.33 9.33L9.33 10.66L6.66 10.66L6.66 9.33L9.33 9.33Z" fill="#333333" fill-opacity="1.000000" fill-rule="evenodd"/>
  `;
  }

  const typeSort = sortIcon.classList.contains("alphabet");
  sortMain(typeSort);
}