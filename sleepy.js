const selectHours = document.querySelector('select#hour');
const selectMinutes = document.querySelector('select#minute');
const selectPeriod = document.querySelector('select#period');
const calculate = document.querySelector('button#calculate');
const results = document.querySelector('div#results');
const calcNow = document.querySelector('button#calc-now');
const resultsNow = document.querySelector('div#results-now');
const errors = document.querySelector('div#errors');

calculate.addEventListener('click', timesToWakeUp);

function timesToWakeUp() {
    const hour = selectHours.value;
    const minute = selectMinutes.value;
    const period = selectPeriod.value;

    let time;

    time = new Date(null, null, null, `${hour}`, `${minute}`);
    const firstCycle = time;
    firstCycle.setHours(time.getHours() - 9);

    time = new Date(null, null, null, `${hour}`, `${minute}`);
    const secondCycle = time;
    secondCycle.setHours(time.getHours() - 7);
    secondCycle.setMinutes(time.getMinutes() - 30);

    time = new Date(null, null, null, `${hour}`, `${minute}`)
    const thirdCycle = time;
    thirdCycle.setHours(time.getHours() - 6);

    time = new Date(null, null, null, `${hour}`, `${minute}`);
    const fourthCycle = time;
    fourthCycle.setHours(time.getHours() - 4.5);
    fourthCycle.setMinutes(time.getMinutes() - 30);

    if (period === 'PM') {
        firstCycle.setHours(firstCycle.getHours() - 12);
        secondCycle.setHours(secondCycle.getHours() - 12);
        thirdCycle.setHours(thirdCycle.getHours() - 12);
        fourthCycle.setHours(fourthCycle.getHours() - 12);
    }

    if (hour === '12') {
        firstCycle.setHours(firstCycle.getHours() + 12);
        secondCycle.setHours(secondCycle.getHours() + 12);
        thirdCycle.setHours(thirdCycle.getHours() + 12);
        fourthCycle.setHours(fourthCycle.getHours() + 12);
    }

    if (hour === '' || minute === '' || period === '') {
        errors.textContent = 'You must fill in the fields.';
        errors.setAttribute('class', 'error');
    } else {
        errors.textContent = '';
        results.innerHTML = `
        You should go to bed at:
        <div class="cycle-color">
            ${firstCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<span class="commas">, or</span>
            ${secondCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<span class="commas">, or</span>
            ${thirdCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<span class="commas">, or</span>
            ${fourthCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </div>
        `
    }
};

calcNow.addEventListener('click', wakeUpAtTheseTimes);

function wakeUpAtTheseTimes() {
    let date = new Date();

    const firstCycle = date;
    firstCycle.setHours(date.getHours() + 9);

    date = new Date();
    const secondCycle = date;
    secondCycle.setHours(date.getHours() + 7);
    secondCycle.setMinutes(date.getMinutes() + 30);

    date = new Date();
    const thirdCycle = date;
    thirdCycle.setHours(date.getHours() + 6);

    date = new Date();
    const fourthCycle = date;
    fourthCycle.setHours(date.getHours() + 4);
    fourthCycle.setMinutes(date.getMinutes() + 30);

    resultsNow.innerHTML = `
    You should wake up at:
    <div class="cycle-color">
        ${firstCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<span class="commas">, or</span>
        ${secondCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<span class="commas">, or</span>
        ${thirdCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<span class="commas">, or</span>
        ${fourthCycle.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
    </div>
    `
};