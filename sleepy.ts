const getSleepCycles = (hour: number, minute: number): Date[] => {
    const firstCycle: Date = new Date(null, null, null, hour - 9, minute);
    const secondCycle: Date = new Date(null, null, null, hour - 7, minute - 30);
    const thirdCycle: Date = new Date(null, null, null, hour - 6, minute);
    const fourthCycle: Date = new Date(null, null, null, hour - 4, minute - 30);

    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};

const subtractTwelveHours = (sleepCyclesArray: Date[]): Date[] => {
    const copy: Date[] = sleepCyclesArray.map(s => new Date(s.getTime()))
        return copy.map(sleepCycleObject => {
            const hours: number = sleepCycleObject.getHours() - 12;
            sleepCycleObject.setHours(hours);
            return sleepCycleObject;
        });
};

const addTwelveHours = (sleepCyclesArray: Date[]): Date[] => {
    const copy: Date[] = sleepCyclesArray.map(s => new Date(s.getTime()))
        return copy.map(sleepCycleObject => {
            const hours: number = sleepCycleObject.getHours() + 12
            sleepCycleObject.setHours(hours);
            return sleepCycleObject;
        });
};

const isEmpty = (hour: string, minute: string, period: string): boolean => {
    const errors = <HTMLElement>document.querySelector('div#errors');
    if (hour === '' || minute === '' || period === '') {
        errors.textContent = 'You must fill in the fields.';
        errors.setAttribute('class', 'error');
        return true;
    };
    errors.textContent = '';
    return false;
};

const toTwelveHourTime = (arr: Date[]): string[] => {
    const twelveHourArr: string[] = arr.map(obj => {
        return obj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    });
    return twelveHourArr;
};

const getDOMelements = (): { hour: string, minute: string, period: string } => {
    const selectHours: string = (<HTMLInputElement>document.querySelector('select#hour')).value;
    const selectMinutes: string = (<HTMLInputElement>document.querySelector('select#minute')).value;
    const selectPeriod: string = (<HTMLInputElement>document.querySelector('select#period')).value;

    const hour: string = selectHours;
    const minute: string = selectMinutes;
    const period: string = selectPeriod;

    return { hour, minute, period };
};

const render = (isErrors: boolean, sleepCycles: string[]): string => {
    const results = <HTMLElement>document.querySelector('div#results');

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

const getWakeUpTimes = (event: Event): void => {
    event.preventDefault();

    interface IElems {
        hour: string;
        minute: string;
        period: string;
    }

    const elems: IElems = getDOMelements();

    const { hour, minute, period } = elems;

    const isErrors: boolean = isEmpty(hour, minute, period);

    const sleepCycles: Date[] = getSleepCycles(parseInt(hour, 10), parseInt(minute, 10));

    if (period === 'PM') {
        subtractTwelveHours(sleepCycles);
    };

    if (hour === '12') {
        addTwelveHours(sleepCycles);
    };

    render(isErrors, toTwelveHourTime(sleepCycles));
};

const form = <Element>document.querySelector('form#calculate');
form.addEventListener('submit', getWakeUpTimes);

const getSleepCyclesNow = (hour: number, minute: number) => {
    const firstCycle: Date = new Date(null, null, null, hour + 9, minute);
    const secondCycle: Date = new Date(null, null, null, hour + 7, minute + 30);
    const thirdCycle: Date = new Date(null, null, null, hour + 6, minute);
    const fourthCycle: Date = new Date(null, null, null, hour + 4, minute + 30);

    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};

const getWakeUpTimesNow = (): void => {
    const resultsNow = <HTMLElement>document.querySelector('div#results-now')
    const time: Date = new Date();
    const hour: number = time.getHours();
    const minute: number = time.getMinutes();

    const sleepCycles: Date[] = getSleepCyclesNow(hour, minute);

    const cycles: string[] = toTwelveHourTime(sleepCycles);

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

const calcNow = <Element>document.querySelector('button#calc-now');
calcNow.addEventListener('click', getWakeUpTimesNow);