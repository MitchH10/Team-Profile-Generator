const Engineer = require('../lib/engineer');

describe('Engineer', () => {
    const eng = new Engineer("Mitch", 2, "test@email.com", "GithubUser3");
    it('Should return the name of the engineer', () => {
        expect(eng.getName()).toEqual("Mitch");
    });
    it('Should return the id of the engineer', () => {
        expect(eng.getId()).toEqual(2);
    });
    it('Should return the email of the engineer', () => {
        expect(eng.getEmail()).toEqual("test@email.com");
    });
    it('Should return the role of the engineer', () => {
        expect(eng.getRole()).toEqual("\u2328Engineer");
    })
    it('Should return githun username of engineer', () => {
        expect(eng.getGithub()).toEqual("GithubUser3");
    })
})