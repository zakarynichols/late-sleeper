const getSleepCycles = (hour, minute) => {
    const firstCycle = new Date(null, null, null, hour - 9, minute);
    const secondCycle = new Date(null, null, null, hour - 7, minute - 30);
    const thirdCycle = new Date(null, null, null, hour - 6, minute);
    const fourthCycle = new Date(null, null, null, hour - 4, minute - 30);

    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};

const setSleepCyclesPM = (period, sleepCyclesArray) => {
    if (period === 'PM') {
        const cycles = sleepCyclesArray.map(sleepCycleObject => {
            const hours = sleepCycleObject.getHours() - 12;
            sleepCycleObject.setHours(hours);
        });
        return cycles;
    };
};

const setSleepCyclesTwelve = (hour, sleepCyclesArray) => {
    if (hour === '12') {
        const cycle = sleepCyclesArray.map(sleepCycleObject => {
            const hours = sleepCycleObject.getHours() + 12
            sleepCycleObject.setHours(hours);
        });
        return cycle;
    };
};

const isEmpty = (hour, minute, period) => {
    const errors = document.querySelector('div#errors');
    if (hour === '' || minute === '' || period === '') {
        errors.textContent = 'You must fill in the fields.';
        errors.setAttribute('class', 'error');
        return true;
    };
    errors.textContent = '';
    return false;
};

const toTwelveHourTimeString = (arr) => {
    const twelveHourArr = arr.map(obj => {
        return obj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    });
    return twelveHourArr;
};

const getWakeUpTimes = (event) => {
    event.preventDefault();
    const results = document.querySelector('div#results');
    const selectHours = document.querySelector('select#hour');
    const selectMinutes = document.querySelector('select#minute');
    const selectPeriod = document.querySelector('select#period');

    const hour = selectHours.value;
    const minute = selectMinutes.value;
    const period = selectPeriod.value;

    const errors = isEmpty(hour, minute, period);

    const sleepCycles = getSleepCycles(hour, minute);

    setSleepCyclesPM(period, sleepCycles);

    setSleepCyclesTwelve(hour, sleepCycles);

    const cycles = toTwelveHourTimeString(sleepCycles);

    return !errors ? results.innerHTML = `
        You should go to bed at:
        <div class="cycle-color">
            ${cycles[0]}<span class="commas">, or</span>
            ${cycles[1]}<span class="commas">, or</span>
            ${cycles[2]}<span class="commas">, or</span>
            ${cycles[3]}
        </div>
        ` : results.textContent = '';
};

const form = document.querySelector('form#calculate');
form.addEventListener('submit', getWakeUpTimes);

const getSleepCyclesNow = (hour, minute) => {
    const firstCycle = new Date(null, null, null, hour + 9, minute);
    const secondCycle = new Date(null, null, null, hour + 7, minute + 30);
    const thirdCycle = new Date(null, null, null, hour + 6, minute);
    const fourthCycle = new Date(null, null, null, hour + 4, minute + 30);

    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};

const getWakeUpTimesNow = () => {
    const resultsNow = document.querySelector('div#results-now')
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();

    const sleepCycles = getSleepCyclesNow(hour, minute);

    const cycles = toTwelveHourTimeString(sleepCycles);

    resultsNow.innerHTML = `
    You should wake up at:
    <div class="cycle-color">
        ${cycles[0]}<span class="commas">, or</span>
        ${cycles[1]}<span class="commas">, or</span>
        ${cycles[2]}<span class="commas">, or</span>
        ${cycles[3]}
    </div>
    `
};

const calcNow = document.querySelector('button#calc-now');
calcNow.addEventListener('click', getWakeUpTimesNow);