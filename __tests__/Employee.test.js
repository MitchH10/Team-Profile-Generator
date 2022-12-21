const Employee = require("../lib/employee");

describe('Employee', () => {
    it('Should return the name of the employee', () => {
        const employ = new Employee("Mitch", 1, "test@email.com");

        expect(employ.getName()).toEqual("Mitch");
    });
    it('Should return the id of the employee', () => {
        const employ = new Employee("Mitch", 1, "test@email.com");

        expect(employ.getId()).toEqual(1);
    });
    it('Should return the email of the employee', () => {
        const employ = new Employee("Mitch", 1, "test@email.com");

        expect(employ.getEmail()).toEqual("test@email.com");
    });
    it('Should return the role of the employee', () => {
        const employ = new Employee("Mitch", 1, "test@email.com");

        expect(employ.getRole()).toEqual("Employee");
    })
})