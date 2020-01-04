# rguthrieTeamProfile - rguthrie's Team Profile Summary - v1, 20200107

User Story:
AS A        manager
I WANT TO   generate a webpage that displays my team's basic info
SO THAT     I have quick access to emails and GitHub profiles

Resulting In:
This node.js application uses the command line interface to capture contact and 
role information for an engineering team, then 'prints' the information as an 
HTML 5 webpage file.  <style> tags are used to provide CSS formatting in the 
HTML file.

The application was developed using Test-Driven Development (TDD) methodology;
the full test suite was provided at the outset of code development.

# Requirements

* The project must prompt the user to build an engineering team. An engineering
team consists of a manager, and any number of engineers and interns.

* All provided tests must pass.

* The project must have classes `Employee`, `Manager`, `Engineer`, and `Intern`.
These classes must be extended from an `Employee` parent class which has the 
following properties and methods:

  * name
  * id
  * title
  * getName()
  * getId()
  * getEmail()
  * getRole() // Returns 'Employee'

In addition to `Employee`'s properties and methods, `Manager` must also have:

  * officeNumber
  * getRole() // Overridden to return 'Manager'

In addition to `Employee`'s properties and methods, `Engineer` must also have:

  * github  // GitHub username
  * getGithub()
  * getRole() // Overridden to return 'Engineer'

In addition to `Employee`'s properties and methods, `Intern` must also have:

  * school 
  * getSchool()
  * getRole() // Overridden to return 'Intern'

* The project must generate a `team.html` page in the `output` directory.  This
page must format the team roster 'nicely'. Each team member should display the following 
in no particular order:

  * Name
  * Role
  * ID
  * Role-specific property (School, link to GitHub profile, or office number)

# Design
 
Package inquirer.js is used to implement command-line data capture. jest.js is the testing
framework.

# Getting Started

A sample Team Profile webpage is hosted on GitHub at https://rguthrie000.github.io/rguthrieTeamProfile/
The node.js file is located at repo rguthrie000/rguthrieTeamProfile.  

### Prerequisites

Node.js is required to interpret/run this program, with external modules inquirer and jest.

### Installing

See file package.JSON for node.js package dependencies; these must be installed 
from npm in a location with visibility from the execution directory.

## Running the tests

Use 'npm test' from the repository directory (rguthrieTeamProfile) to execute the 
.test.js files found in the test subdirectory.

## This application was developed with:
VS Code - Smart Editor for HTML/CSS/JS
node.js - JavaScript command-line interpreter
jest - test automation
Google Chrome - browser for development of the output webpage
Google Chrome Inspector - inspection/analysis tools integrated in Chrome Browser.

## Versioning

GitHub is used for version control; the github repository is 
rguthrie000/rguthrieTeamProfile.

## Author
rguthrie000 (Richard Guthrie)

## Acknowledgments
rguthrie000 is grateful to the UCF Coding Bootcamp - we rock!

