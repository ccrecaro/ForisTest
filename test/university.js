import { expect } from "chai";
import Student from "../app/student.js";
import University from "../app/university.js";

describe("University", function() {
    describe("Register student", function() {
        it("new student", function() {
            let university1 = new University();
            let student1 = new Student('Agusto');
            let expectedStudentsUniversity1 = {
                'Agusto': student1
            }

            university1.registerStudent('Agusto');
            expect(university1.getStudents()).to.deep.equal(expectedStudentsUniversity1);
        });
    
        it("duplicated students", function() {
            let university2 = new University();
            let student2 = new Student('Paloma');
            let expectedStudentsUniversity2 = {
                'Paloma': student2
            }

            university2.registerStudent('Paloma');
            university2.registerStudent('Paloma');

            expect(university2.getStudents()).to.deep.equal(expectedStudentsUniversity2);
        });
    })

    describe("Add student presence", function() {
        it("new student", function() {
            let university3 = new University();
            let student3 = new Student('Jorge');
            student3.setTotalMinutes(120);
            let expectedDaysSetStudent3 = new Set();
            expectedDaysSetStudent3.add(4);
            student3.setDays(expectedDaysSetStudent3);

            let expectedStudentsUniversity3 = {
                'Jorge': student3
            }

            university3.addStudentPresence('Jorge', 4, '10:00', '12:00');

            expect(university3.getStudents()).to.deep.equal(expectedStudentsUniversity3);
        });

        it("existing student", function() {
            let university4 = new University();

            let student4 = new Student('Pamela');
            student4.setTotalMinutes(120);
            let daysSetStudent4 = new Set();
            daysSetStudent4.add(4);
            daysSetStudent4.add(1);
            student4.setDays(daysSetStudent4);


            let student5 = new Student('Nicole');
            student5.setTotalMinutes(60);
            let daysSetStudent5 = new Set();
            daysSetStudent5.add(3);
            student5.setDays(daysSetStudent5);

            university4.setStudents({
                'Pamela': student4,
                'Nicole': student5
            });

            university4.addStudentPresence('Nicole', 4, '14:00', '16:00');

            student5.setTotalMinutes(180);
            let expectedDaysSetStudent5 = new Set();
            daysSetStudent5.add(3);
            expectedDaysSetStudent5.add(4);
            student5.setDays(expectedDaysSetStudent5);

            let expectedStudentsUniversity4 = {
                'Pamela': student4,
                'Nicole': student5
            }

            expect(university4.getStudents()).to.deep.equal(expectedStudentsUniversity4);
        });
    })
})