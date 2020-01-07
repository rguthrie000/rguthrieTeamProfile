const Employee = require("./Employee");

// In addition to `Employee`'s properties and methods, `Manager` will also have:
// * officeNumber
// * getRole() // Overridden to return 'Manager'

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = 'Manager';
  }
  getRole()         {return this.role;}
  getOfficeNumber() {return this.officeNumber;}
}

module.exports = Manager;
