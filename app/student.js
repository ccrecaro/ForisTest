export default class Student {
    constructor(name) {
        this.name = name;
        this.totalMinutes = 0;
        this.days = new Set();
    }

    getName(){
        return this.name;
    }

    getTotalMinutes(){
        return this.totalMinutes;
    }

    getDays(){
        return this.days;
    }

    setName(newName){
        this.name = newName;
    }

    setTotalMinutes(newTotalMinutes){
        this.totalMinutes = newTotalMinutes;
    }

    setDays(newDays){
        this.days = newDays;
    }

    addPresence(day, startTime, endTime) {
        this.checkDayFormat(day);
        this.checkTimeFormat(startTime);
        this.checkTimeFormat(endTime);
        
        const duration = this.calculatePresenceDuration(startTime, endTime);
        if (duration >= 5) {
            this.totalMinutes += duration;
            this.days.add(day);
        }
    }

    getDaysCount() {
        return this.days.size;
    }

    calculatePresenceDuration(start, end) {
        const [startH, startM] = start.split(':').map(Number);
        const [endH, endM] = end.split(':').map(Number);
        const duration = (endH * 60 + endM) - (startH * 60 + startM);
        if(duration < 0){
            throw new Error('Start time has to be earlier than end time');
        }
        return duration;
    }

    checkDayFormat(day){
        if(day<1 || day>7){
            throw new Error('Day format incorrect');
        }
    }

    checkTimeFormat(time){
        const timeRgx = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/; 
        if(!timeRgx.test(time)) {
            throw new Error('Time format incorrect');
        }
    }
}