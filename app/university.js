import Student from "./student.js";

export default class University {
    constructor() {
        this.students = {};
    }

    getStudents(){
        return this.students;
    }
    setStudents(newStudents){
        this.students = newStudents;
    }

    registerStudent(name) {
        this.students[name] = new Student(name);
    }

    addStudentPresence(name, day, startTime, endTime) {
        if(!this.students[name]) {
            this.registerStudent(name);
        }
        this.students[name].addPresence(day, startTime, endTime);
    }

    generateReport() {
        return Object.values(this.students)
            .sort((a,b) => b.totalMinutes - a.totalMinutes)
            .map(student => ({
                name: student.getName(),
                totalMinutes: student.getTotalMinutes(),
                totalDays: student.getDaysCount(),
            }))
    }
}