const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email)

        if (typeof github !== "string" || !github.trim().length) {
            throw new Error("Expected parameter 'github' to be a non-empty string");
        }

        this.github = github;
    }

    getRole() {
        return "\u2328Engineer";
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;