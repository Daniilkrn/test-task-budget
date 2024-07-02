export const budgetRevenues = ['Разработка проекта', 'Ремонтные работы', 'Аудит и консалтинг', 'Работа электрика', 'Малярные работы', 'Доставка']
export const budgetExpense = ['Материалы', 'Аренда инструмента', 'Аренда офиса', 'Коммунальные платежи', 'Транспорт']
export const allBudgets = ['Разработка проекта', 'Ремонтные работы', 'Услуги', 'Аренда инструмента', 'Аренда офиса', 'Коммунальные платежи', 'Транспорт']
export const saldo = ['Сальдо']

export const heads = {
    tableHeads: ['','Итог'],
    subTitles: ['БЮДЖЕТ'],
    totalHeads: []
}

function setMonth () {
    for (let i = 0; i < 12; i++){
        const date = new Date(2024, i);
        const month = date.toLocaleString("default", { month: "long" });
        heads.tableHeads.push(month.charAt(0).toUpperCase() + month.slice(1) + " 2024")
    }
}

function setSubTitles() {
    for (let i = 1; i < heads.tableHeads.length; i++) {
        heads.subTitles.push('План')
    }
}

setMonth();
setSubTitles();