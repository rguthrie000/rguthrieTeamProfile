const Employee = require("./Employee");

// In addition to `Employee`'s properties and methods, `Intern` will also have:
//   * school 
//   * getSchool()
//   * getRole() // Overridden to return 'Intern'

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email)
    this.school = school;
    this.role = 'Intern';
  }
  getSchool() {return this.school;};
}

module.exports = Intern;

