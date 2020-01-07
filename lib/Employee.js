// create a class called Employee
// The first class is an `Employee` parent class with the following properties and
// methods:
//   * name
//   * id
//   * title
//   * email
//   * role
//   * getName()
//   * getId()
//   * getTitle()
//   * getEmail()
//   * getRole() // Returns 'Employee'

class Employee {
    constructor(name, id, email) 
    {
        this.name  = name;
        this.id    = id;
        this.email = email;
        this.role  = 'Employee';
        this.getName    = function() { return this.name  ;};
        this.getId      = function() { return this.id    ;};
        this.getEmail   = function() { return this.email ;};
        this.getRole    = function() { return this.role  ;};
        this.printClass = function() {for (var k in this) {console.log(`${k}: ${this[k]}`);}};
    }
}
// export Employee
module.exports = Employee;