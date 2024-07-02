import { calcHead } from "./calculates.js";
const tableBody = document.querySelector(".table-body");
export function deleteType (td) {
    console.log(td);
    const allTrRev = document.querySelectorAll(".row.rev");
    const allTrExpense = document.querySelectorAll(".row.expense");

    let typeArr
    let atr
    if(td.className.includes('rev')){
        typeArr = allTrRev
        atr = 'rev'
    } else {
        typeArr = allTrExpense
        atr = 'expense'
    }

    const typeTd = td.getAttribute('type')
    const input = document.querySelector(`tr[type="${typeTd}"].${atr}`).querySelector('[month="1"]').querySelector('input')    

    const res = [...typeArr].forEach(el => {
        if(el.getAttribute('type') == typeTd){
            tableBody.removeChild(el)
        }
    })
    calcHead(input)
}