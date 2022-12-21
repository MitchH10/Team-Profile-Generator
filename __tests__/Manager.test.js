const Manager = require('../lib/manager');

describe('Manager', () => {
    const man = new Manager("Mitch", 2, "test@email.com", 1203);
    it('Should return the name of the manager', () => {
        expect(man.getName()).toEqual("Mitch");
    });
    it('Should return the id of the manager', () => {
        expect(man.getId()).toEqual(2);
    });
    it('Should return the email of the manager', () => {
        expect(man.getEmail()).toEqual("test@email.com");
    });
    it('Should return the role of the manager', () => {
        expect(man.getRole()).toEqual("\u2615Manager");
    })
    it('Should contain the office number', () => {
        expect(man.officeNum).toEqual(1203);
    })
})