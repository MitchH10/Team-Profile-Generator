const Intern = require('../lib/intern');

describe('Employee', () => {
    const intern = new Intern("Mitch", 2, "test@email.com", "School of Rock");
    it('Should return the name of the intern', () => {
        expect(intern.getName()).toEqual("Mitch");
    });
    it('Should return the id of the intern', () => {
        expect(intern.getId()).toEqual(2);
    });
    it('Should return the email of the intern', () => {
        expect(intern.getEmail()).toEqual("test@email.com");
    });
    it('Should return the role of the intern', () => {
        expect(intern.getRole()).toEqual("\u270FIntern");
    })
    it('Should return githun username of intern', () => {
        expect(intern.getSchool()).toEqual("School of Rock");
    })
})