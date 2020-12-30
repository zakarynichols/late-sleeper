const getSleepCycles = (hour, minute) => {
    const firstCycle = new Date(null, null, null, hour - 9, minute);
    const secondCycle = new Date(null, null, null, hour - 7, minute - 30);
    const thirdCycle = new Date(null, null, null, hour - 6, minute);
    const fourthCycle = new Date(null, null, null, hour - 4, minute - 30);

    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};


const setSleepCyclesPM = (period, sleepCyclesArray) => {
    const copy = sleepCyclesArray.map(s => new Date(s.getTime()))
    if (period === 'PM') {
        return copy.map(sleepCycleObject => {
            const hours = sleepCycleObject.getHours() - 12;
            sleepCycleObject.setHours(hours);
            return sleepCycleObject;
        });
    };
    return copy;
};

const setSleepCyclesTwelve = (hour, sleepCyclesArray) => {
    const copy = sleepCyclesArray.map(s => new Date(s.getTime()))
    if (hour === '12') {
        return copy.map(sleepCycleObject => {
            const hours = sleepCycleObject.getHours() + 12
            sleepCycleObject.setHours(hours);
        });
    };
    return copy;
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

const getDOMelements = () => {
    const selectHours = document.querySelector('select#hour');
    const selectMinutes = document.querySelector('select#minute');
    const selectPeriod = document.querySelector('select#period');

    const hour = selectHours.value;
    const minute = selectMinutes.value;
    const period = selectPeriod.value;

    return { hour, minute, period };
};

const render = (isErrors, sleepCycles) => {
    const results = document.querySelector('div#results');

    return !isErrors ? results.innerHTML = `
    You should go to bed at:
    <div class="cycle-color">
        ${sleepCycles[0]}<span class="commas">, or</span>
        ${sleepCycles[1]}<span class="commas">, or</span>
        ${sleepCycles[2]}<span class="commas">, or</span>
        ${sleepCycles[3]}
    </div>
    ` : results.textContent = '';
};

const getWakeUpTimes = (event) => {
    event.preventDefault();
    
    const elems = getDOMelements();

    const { hour, minute, period } = elems

    const errors = isEmpty(hour, minute, period);

    const sleepCycles = getSleepCycles(hour, minute);

    const sleepCyclesPM = setSleepCyclesPM(period, sleepCycles);

    const twelve = setSleepCyclesTwelve(hour, sleepCyclesPM);

    const cycles = toTwelveHourTimeString(twelve);

    render(errors, cycles);
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