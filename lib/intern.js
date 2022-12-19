const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name,id,email);
        if (typeof school !== "string" || !school.trim().length) {
            throw new Error("Expected parameter 'school' to be a non-empty string");
        }

        this.school = school;
    }
    
    getRole() {
        return "\u270FIntern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;