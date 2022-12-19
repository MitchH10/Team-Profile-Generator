const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super(name, id, email)

        if (typeof officeNum !== "number" || isNaN(officeNum) || officeNum < 0) {
            throw new Error("Expected parameter 'officeNum' to be a non-negative number");
          }

        this.officeNum = officeNum;
    }

    getRole() {
        return "\u2615Manager";
    }
}

module.exports = Manager;