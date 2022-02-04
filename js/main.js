let timeframe = 'weekly';
const container = document.querySelector('.content');
let regularCards;

//----------------------------------------------

const menu = document.querySelectorAll('.person__timelist');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});

//----------------------------------------------
let data= {};

fetch('./js/data.json')
    .then(resp => resp.json())
    .then(jsonData => {
        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend', 
                createRegularCard(element, timeframe));
        })

        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        })

        regularCards = document.querySelectorAll('.content__time-section');
        console.log(regularCards);
    })






//----------------------------------------------
function menuOnClick(event) {
    console.log('click', event.target.innerText.toLowerCase());
    menu.forEach(element => {
        element.classList.remove('active')
    })
    event.target.classList.add('active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe) {
    regularCards.forEach(card => {
        updateCard(card, timeframe);
    })
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.time__title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeMSG = {
        'daily': 'Yesterday',
        'weekly': 'Last week',
        'monthly' : 'Last month'
    }

    const hours = card.querySelector('.time__hours');
    hours.innerText = `${current}hrs`;
    const msg = card.querySelector('.time__previous');
    msg.innerText = `${timeMSG[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
    let titel = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];
    
    const timeMSG = {
        'daily': 'Yesterday',
        'weekly': 'Last week',
        'monthly' : 'Last month'
    }

    return `
        <div class="content__timecard">
            <div class="content__time-section time" id='${titel.toLowerCase().replace(/\s/g, '')}'>
                <div class="content__block">
                    <div class="time__header">
                        <h4 class='time__title'>${titel}</h4>
                        <img src="./images/icon-ellipsis.svg" class='time__points'>
                    </div>
                    <div class="time__bottom">
                        <h4 class='time__hours'>${current}</h4>
                        <p class='time__previous'>${timeMSG[timeframe]} - ${previous}</p>
                    </div>
                </div>
            </div>
        </div>
    `

}