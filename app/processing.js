import Student from "./student.js";
import University from "./university.js";

import * as fs from 'fs';

function processCommands(lines, university) {
    for (let line of lines) {
        const parts = line.split(' ');
        const command = parts[0];
        if (command === 'Student') {
            university.registerStudent(parts[1]);
        } else if (command === 'Presence') {
            const name = parts[1];
            const newDay = parts[2];
            const newStartTime = parts[3];
            const newEndTime = parts[4];
            university.addStudentPresence(name, newDay, newStartTime, newEndTime);
        }
    }
}

function processFile(filename) {
    const university = new University();
    
    try {
        const lines = fs.readFileSync(filename, 'utf-8').split('\n');
        processCommands(lines, university);

        const report = university.generateReport();
        for (let entry of report) {
            console.log(`${entry.name}: ${entry.totalMinutes} minutes in ${entry.totalDays} days`);
        }
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
    }
}

const filename = process.argv[2];
if (!filename) {
    console.error('Please, add file as an argument');
    process.exit(1);
}

processFile(filename);