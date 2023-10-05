// Your code here
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeArray => {
        return createEmployeeRecord(...employeeArray);
    });
}
function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10);
    const timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10);
    const timeOutEvent = {
        type: "TimeOut",
        hour: hour,
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    if (timeInEvent && timeOutEvent) {
        const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
        return hoursWorked;
    } else {
        return 0;
    }
}
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const amountOwed = hoursWorked * employeeRecord.payPerHour;
    return amountOwed;
}
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date).filter((value, index, self) => self.indexOf(value) === index);
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);
    return totalPayroll;
}

