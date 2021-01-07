var getSleepCycles = function (hour, minute) {
    var firstCycle = new Date(null, null, null, hour - 9, minute);
    var secondCycle = new Date(null, null, null, hour - 7, minute - 30);
    var thirdCycle = new Date(null, null, null, hour - 6, minute);
    var fourthCycle = new Date(null, null, null, hour - 4, minute - 30);
    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};
var subtractTwelveHours = function (sleepCyclesArray) {
    var copy = sleepCyclesArray.map(function (s) { return new Date(s.getTime()); });
    return copy.map(function (sleepCycleObject) {
        var hours = sleepCycleObject.getHours() - 12;
        sleepCycleObject.setHours(hours);
        return sleepCycleObject;
    });
};
var addTwelveHours = function (sleepCyclesArray) {
    var copy = sleepCyclesArray.map(function (s) { return new Date(s.getTime()); });
    return copy.map(function (sleepCycleObject) {
        var hours = sleepCycleObject.getHours() + 12;
        sleepCycleObject.setHours(hours);
        return sleepCycleObject;
    });
};
var isEmpty = function (hour, minute, period) {
    var errors = document.querySelector('div#errors');
    if (hour === '' || minute === '' || period === '') {
        errors.textContent = 'You must fill in the fields.';
        errors.setAttribute('class', 'error');
        return true;
    }
    ;
    errors.textContent = '';
    return false;
};
var toTwelveHourTime = function (arr) {
    var twelveHourArr = arr.map(function (obj) {
        return obj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    });
    return twelveHourArr;
};
var getDOMelements = function () {
    var selectHours = document.querySelector('select#hour').value;
    var selectMinutes = document.querySelector('select#minute').value;
    var selectPeriod = document.querySelector('select#period').value;
    var hour = selectHours;
    var minute = selectMinutes;
    var period = selectPeriod;
    return { hour: hour, minute: minute, period: period };
};
var render = function (isErrors, sleepCycles) {
    var results = document.querySelector('div#results');
    return !isErrors ? results.innerHTML = "\n    You should go to bed at:\n    <div class=\"cycle-color\">\n        " + sleepCycles[0] + "<span class=\"commas\">, or</span>\n        " + sleepCycles[1] + "<span class=\"commas\">, or</span>\n        " + sleepCycles[2] + "<span class=\"commas\">, or</span>\n        " + sleepCycles[3] + "\n    </div>\n    " : results.textContent = '';
};
var getWakeUpTimes = function (event) {
    event.preventDefault();
    var elems = getDOMelements();
    var hour = elems.hour, minute = elems.minute, period = elems.period;
    var isErrors = isEmpty(hour, minute, period);
    var sleepCycles = getSleepCycles(parseInt(hour, 10), parseInt(minute, 10));
    if (period === 'PM') {
        subtractTwelveHours(sleepCycles);
    }
    ;
    if (hour === '12') {
        addTwelveHours(sleepCycles);
    }
    ;
    render(isErrors, toTwelveHourTime(sleepCycles));
};
var form = document.querySelector('form#calculate');
form.addEventListener('submit', getWakeUpTimes);
var getSleepCyclesNow = function (hour, minute) {
    var firstCycle = new Date(null, null, null, hour + 9, minute);
    var secondCycle = new Date(null, null, null, hour + 7, minute + 30);
    var thirdCycle = new Date(null, null, null, hour + 6, minute);
    var fourthCycle = new Date(null, null, null, hour + 4, minute + 30);
    return [firstCycle, secondCycle, thirdCycle, fourthCycle];
};
var getWakeUpTimesNow = function () {
    var resultsNow = document.querySelector('div#results-now');
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var sleepCycles = getSleepCyclesNow(hour, minute);
    var cycles = toTwelveHourTime(sleepCycles);
    resultsNow.innerHTML = "\n    You should wake up at:\n    <div class=\"cycle-color\">\n        " + cycles[0] + "<span class=\"commas\">, or</span>\n        " + cycles[1] + "<span class=\"commas\">, or</span>\n        " + cycles[2] + "<span class=\"commas\">, or</span>\n        " + cycles[3] + "\n    </div>\n    ";
};
var calcNow = document.querySelector('button#calc-now');
calcNow.addEventListener('click', getWakeUpTimesNow);
