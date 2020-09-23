'use strict';

const nav = document.querySelector('.nav'),
    day = document.querySelector('.day'),
    week = document.querySelector('.week'),
    month = document.querySelector('.month'),
    year = document.querySelector('.year'),
    curDate = document.querySelector('.curDate'),
    modal = document.querySelector('.addModal'),
    textarea = document.querySelector('.textarea'),
    deadline = document.querySelector('.time'),
    parentLi = document.querySelector('.parent'),
    miniMonth = document.querySelector('.miniMonth'),
    miniMonthBody = document.querySelector('.miniMonth__days'),
    monthDays = document.querySelector('.month__days'),
    btnAddTask = document.querySelector('.btnAdd'),
    goose = document.querySelector('.goose'),
    navDayWrapper = [...document.querySelectorAll('.nav__wrapper')];

const now = new Date();

const monthArr = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Тривень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
];

// __________CurrentDay__________

curDate.innerHTML = `<i class="fas fa-calendar-day"></i>${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()}`;

curDate.addEventListener('click', () => {
    miniMonth.style.display = 'grid';
});

document.querySelector('.fa-times').addEventListener('click', () => {
    miniMonth.style.display = 'none';
});

// __________ChangeWindow(day, week, month, year)__________

const navItems = [...document.querySelectorAll('.nav__wrapper')],
    windows = [day, month, year];

function bgc() {
    navItems.forEach(element => {
        element.style.background = 'transparent';
    });
};

function showWindow() {
    windows.forEach((e) => {
        e.style.display = 'none';
    })
}

nav.addEventListener('click', (e) => {
    if (e.target && e.target.className == 'nav__item_day') {
        bgc();
        e.target.parentElement.style.background = 'rgba(0, 0, 0, .1)';
        showWindow()
        day.style.display = 'grid';
    }
    if (e.target && e.target.className == 'nav__item_week') {
        bgc();
        e.target.parentElement.style.background = 'rgba(0, 0, 0, .1)';
        showWindow()
        week.style.display = 'grid';
    }
    if (e.target && e.target.className == 'nav__item_month') {
        bgc();
        e.target.parentElement.style.background = 'rgba(0, 0, 0, .1)';
        showWindow()
        month.style.display = 'grid';
    }
    if (e.target && e.target.className == 'nav__item_year') {
        bgc();
        e.target.parentElement.style.background = 'rgba(0, 0, 0, .1)';
        showWindow()
        year.style.display = 'grid';
    }
});

// __________ModalWindow__________

document.querySelector('.addTask').addEventListener('click', () => {
    modal.style.display = 'block';
});

document.querySelector('.btnCancel').addEventListener('click', () => {
    modal.style.display = 'none';
});

// _________AddTask__________
function getTaskGroupName() {
    let taskGroupName = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    return taskGroupName;
}

let task = [];

btnAddTask.addEventListener('mousedown', () => {
    goose.style.display = 'block';
});

btnAddTask.addEventListener('mouseup', () => {
    const taskText = textarea.value,
        deadLineTime = deadline.value;

    if (taskText != '') {
        task.push([taskText, deadLineTime]);

        localStorage.setItem(`${getTaskGroupName()}`, JSON.stringify(task));
    }

    textarea.value = '';
    modal.style.display = 'none';
    goose.style.display = 'none';

    renderList(getTaskGroupName());
});

reload(getTaskGroupName());

function reload(taskGroupName) {
    const str = localStorage.getItem(taskGroupName);
    if (str) {
        task = JSON.parse(str);
    }
}

console.log(getTaskGroupName());

renderList(getTaskGroupName());

function renderList(ArrNameFromLocalStorage) {
    const ArrFromLocalStorage = localStorage.getItem(ArrNameFromLocalStorage);

    if (ArrFromLocalStorage != null) {
        const htmlStr = JSON.parse(ArrFromLocalStorage).map((e) => {
            return `<li>
                        <input type="checkbox" class="checkbox">
                        <label  data-content="${e[0]}">${e[0]}</label>
                        <label class="deadline" data-content="До: ${e[1]}">До: ${e[1]}</label>
                        <span class="delete"><i class="far fa-trash-alt"></i></span>
                    </li>`;
        }).join('');

        parentLi.innerHTML = htmlStr;
    }
}

// __________RemoveTask__________

const doneLi = document.querySelector('.done');

parentLi.addEventListener('click', (e) => {
    if (e.target && e.target.className == 'far fa-trash-alt') {
        const textInLokalStorage = e.target.parentElement.parentElement.children[1].innerHTML,
            timeInLokalStorage = e.target.parentElement.parentElement.children[2].innerHTML;

        const indexForDelete = task.indexOf(task.find(el => el[0] == `${textInLokalStorage}` && el[1] == `${timeInLokalStorage}`));
        task.splice(indexForDelete, 1);

        localStorage.setItem(`${getTaskGroupName()}`, JSON.stringify(task));

        const deleteParent = e.target.parentNode.parentNode;
        deleteParent.remove();
    }
});

// __________WeekWindow__________

// const curWeek = document.querySelector('.curWeek');

// let numOfWeek;

// setWeekNum();

// function setWeekNum() {
//     const onejan = new Date(now.getFullYear(), 0, 1),
//         today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
//         dayOfYear = ((today - onejan + 86400000) / 86400000);

//     numOfWeek = Math.ceil(dayOfYear / 7);

//     curWeek.innerHTML = `${numOfWeek} Тиждень`;
// };

// __________MonthWindows__________
renderMonthCalendar();

function renderMonthCalendar() {
    now.setDate(1);

    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
        prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate(),
        firstDayOfManthIndex = now.getDay(),
        lastDayIndexOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).getDay(),
        nextMonthDays = 7 - lastDayIndexOfMonth;

    document.querySelector('.curMonth').innerHTML = monthArr[now.getMonth()];
    document.querySelector('.curYear').innerHTML = `${now.getFullYear()}`;

    document.querySelector('.miniCurDate').innerHTML = `${monthArr[now.getMonth()]} / ${now.getFullYear()}`;

    let days = '';

    for (let h = firstDayOfManthIndex; h > 0; h--) {
        days += `<div class="prevMonsDays">${prevMonthLastDay - h + 1}</div>`;
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
        if (i == new Date().getDate() && now.getMonth() == new Date().getMonth() && now.getFullYear() == new Date().getFullYear()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    for (let k = 1; k <= nextMonthDays; k++) {
        days += `<div class="nextMonsDays">${k}</div>`;
    }

    monthDays.innerHTML = days;
    miniMonthBody.innerHTML = days;
}

document.querySelector('.month-chevron-left').addEventListener('click', () => {
    now.setMonth(now.getMonth() - 1);
    renderMonthCalendar();
});

document.querySelector('.month-chevron-right').addEventListener('click', () => {
    now.setMonth(now.getMonth() + 1);
    renderMonthCalendar();
});

monthDays.addEventListener('click', (e) => {
    const setDateFromMonth = e.target.innerHTML,
        MonthFromMonth = e.target.parentElement.parentElement.parentElement.children[0].children[1].innerHTML,
        setNewMonth = monthArr.indexOf(MonthFromMonth) - 1;

    if (setNewMonth == -1) {
        setMonth = 11;
    }

    if (e.target && e.target.tagName == 'DIV') {
        now.setDate(setDateFromMonth);
    }

    if (e.target && e.target.className == 'prevMonsDays') {
        now.setDate(setDateFromMonth);
        now.setMonth(setNewMonth);
    }

    if (e.target && e.target.className == 'nextMonsDays') {
        now.setDate(setDateFromMonth);
        now.setMonth(setNewMonth + 2);
    }

    curDate.innerHTML = `<i class="fas fa-calendar-day"></i>${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()}`;

    month.style.display = 'none';

    day.style.display = 'grid';

    bgc();

    navDayWrapper[0].style.background = 'rgba(0, 0, 0, .1)';

    if (!localStorage.getItem(getTaskGroupName())) {
        task = [];
        parentLi.innerHTML = '';
    } else {
        renderList(getTaskGroupName());
    }
});

// __________MiniMonthSetData__________

miniMonthBody.addEventListener('click', (e) => {
    miniMonth.style.display = 'none';

    now.setDate(e.target.innerHTML);

    if (!localStorage.getItem(getTaskGroupName())) {
        task = [];
        parentLi.innerHTML = '';
    } else {
        renderList(getTaskGroupName());
    }

    if (e.target && e.target.tagName == 'DIV') {
        curDate.innerHTML = `<i class="fas fa-calendar-day"></i>${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()}`;
    }

    if (e.target && e.target.className == 'nextMonsDays') {
        curDate.innerHTML = `<i class="fas fa-calendar-day"></i>${now.getDate()} / ${now.getMonth() + 2} / ${now.getFullYear()}`;
    }

    if (e.target && e.target.className == 'prevMonsDays') {
        curDate.innerHTML = `<i class="fas fa-calendar-day"></i>${now.getDate()} / ${now.getMonth() - 1} / ${now.getFullYear()}`;
    }
});

document.querySelector('.miniMonth-chevron-left').addEventListener('click', () => {
    now.setMonth(now.getMonth() - 1);
    renderMonthCalendar();
});

document.querySelector('.miniMonth-chevron-right').addEventListener('click', () => {
    now.setMonth(now.getMonth() + 1);
    renderMonthCalendar();
});

// __________YearWindows__________

const curYearInYear = document.querySelector('.curYearInYear'),
    yearMonthName = [...document.querySelectorAll('.yearMonth__month')],
    yearMonthDays = [...document.querySelectorAll('.yearMonth__days')];

curYearInYear.innerHTML = `${now.getFullYear()}`;

document.querySelector('.year-chevron-left').addEventListener('click', () => {
    now.setFullYear(`${now.getFullYear() - 1}`);

    curYearInYear.innerHTML = `${now.getFullYear()}`;

    renderYearCalendar();
});

document.querySelector('.year-chevron-right').addEventListener('click', () => {
    now.setFullYear(`${now.getFullYear() + 1}`);

    curYearInYear.innerHTML = `${now.getFullYear()}`;

    renderYearCalendar();
});

for (let i = 0; i < yearMonthName.length; i++) {
    yearMonthName[i].innerText = `${monthArr[i]}`;
}

renderYearCalendar();

function renderYearCalendar() {
    const yearMonthDays = [...document.querySelectorAll('.yearMonth__days')];

    for (let i = 0; i < yearMonthDays.length; i++) {
        now.setDate(1);
        now.setMonth(i)

        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
            prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate(),
            firstDayOfManthIndex = now.getDay(),
            lastDayIndexOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).getDay(),
            nextMonthDays = 7 - lastDayIndexOfMonth;

        let days = '';

        for (let h = firstDayOfManthIndex; h > 0; h--) {
            days += `<div class="prevMonsDays">${prevMonthLastDay - h + 1}</div>`;
        }

        for (let i = 1; i <= lastDayOfMonth; i++) {
            if (i == new Date().getDate() && now.getMonth() == new Date().getMonth() && now.getFullYear() == new Date().getFullYear()) {
                days += `<div class="today">${i}</div>`;
            } else {
                days += `<div>${i}</div>`;
            }
        }

        for (let k = 1; k <= nextMonthDays; k++) {
            days += `<div class="nextMonsDays">${k}</div>`;
        }

        yearMonthDays[i].innerHTML = days;
    }

    now.setMonth(new Date().getMonth())
    now.setDate(new Date().getDate())
}

const yearMonthBody = [...document.querySelectorAll('.yearMonth__body')];

yearMonthBody.forEach(element => {
    element.addEventListener('click', (e) => {
        const chooseMonth = e.target.parentElement.parentElement.parentElement.children[0].innerHTML,
            indexMonth = monthArr.indexOf(chooseMonth),
            setDateFromYear = e.target.innerHTML;

        if (e.target && e.target.parentElement.className == 'yearMonth__days') {
            now.setDate(setDateFromYear);
            now.setMonth(indexMonth);

            curDate.innerHTML = `<i class="fas fa-calendar-day"></i>${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()}`;

            year.style.display = 'none';

            day.style.display = 'grid';

            bgc();

            navDayWrapper[0].style.background = 'rgba(0, 0, 0, .1)';
        }

        if (!localStorage.getItem(getTaskGroupName())) {
            task = [];
            parentLi.innerHTML = '';
        } else {
            renderList(getTaskGroupName());
        }
    });
});