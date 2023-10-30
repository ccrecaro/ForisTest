import { expect } from "chai";
import Student from "../app/student.js"

describe("Student", function() {
    describe("Add presence", function() {
        it("over 5 minutes", function() {
            let student1 = new Student('Jose');
            let expectedDaysSetStudent1 = new Set();
            expectedDaysSetStudent1.add(3);


            student1.addPresence(3, '09:02', '10:17');
            expect(student1.getTotalMinutes()).to.equal(75);
            expect(student1.getDays()).to.deep.equal(expectedDaysSetStudent1);
        });

        it("under 5 minutes", function() {
            let student2 = new Student('Francisco');
            let expectedDaysSetStudent2 = new Set();

            student2.addPresence(3, '09:02', '09:04');
            expect(student2.getTotalMinutes()).to.equal(0);
            expect(student2.getDays()).to.deep.equal(expectedDaysSetStudent2);

        });

        it("start time after end time", function() {
            let student3 = new Student('Fernando');
            let expectedDaysSetStudent3 = new Set();

            expect(student3.addPresence.bind(student3, 3, '10:02', '09:04')).to.throw('Start time has to be earlier than end time');
            expect(student3.getTotalMinutes()).to.equal(0);
            expect(student3.getDays()).to.deep.equal(expectedDaysSetStudent3);

        });

        it("day over 7", function() {
            let student4 = new Student('Luisa');
            let expectedDaysSetStudent4 = new Set();

            expect(student4.addPresence.bind(student4, 8, '10:02', '09:04')).to.throw('Day format incorrect');
            expect(student4.getTotalMinutes()).to.equal(0);
            expect(student4.getDays()).to.deep.equal(expectedDaysSetStudent4);
        });

        it("day under 1", function() {
            let student5 = new Student('Maria');
            let expectedDaysSetStudent5 = new Set();

            expect(student5.addPresence.bind(student5, -2, '10:02', '09:04')).to.throw('Day format incorrect');
            expect(student5.getTotalMinutes()).to.equal(0);
            expect(student5.getDays()).to.deep.equal(expectedDaysSetStudent5);
        });

        it("hour time format incorrect", function() {
            let student6 = new Student('Paulina');
            let expectedDaysSetStudent6 = new Set();

            expect(student6.addPresence.bind(student6, 2, '25:02', '09:04')).to.throw('Time format incorrect');
            expect(student6.getTotalMinutes()).to.equal(0);
            expect(student6.getDays()).to.deep.equal(expectedDaysSetStudent6);
        });

        it("minutes time format incorrect", function() {
            let student7 = new Student('Paul');
            let expectedDaysSetStudent7 = new Set();

            expect(student7.addPresence.bind(student7, 6, '10:02', '09:78')).to.throw('Time format incorrect');
            expect(student7.getTotalMinutes()).to.equal(0);
            expect(student7.getDays()).to.deep.equal(expectedDaysSetStudent7);
        });
    })

    describe("Get days count", function() {
        it("no days", function() {
            let student8 = new Student('Margarita');

            expect(student8.getDaysCount()).to.equal(0);
        });

        it("3 days", function() {
            let student9 = new Student('Paula');
            let daysStudent9 = new Set();
            daysStudent9.add(1);
            daysStudent9.add(2);
            daysStudent9.add(7);

            student9.setDays(daysStudent9);
            expect(student9.getDaysCount()).to.equal(3);
        });
    })
})