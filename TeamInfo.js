// TeamInfo.js
//
// This node.js application uses the command line interface to capture contact and 
// role information for an engineering team, then 'prints' the information as an 
// HTML 5 webpage file.  <style> tags are used to provide CSS formatting in the 
// HTML file.
// The application was partially developed using Test-Driven Development (TDD) 
// methodology; a class implementation test suite was provided at the outset of 
// code development.

//******************************
//*   Modules & Dependencies   *
//******************************

// external modules
const fs       = require("fs");
const path     = require("path");
const clear    = require("clear");
const chalk    = require("chalk");
const figlet   = require("figlet");
const inquirer = require("inquirer");
// classes
const Manager  = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern   = require("./lib/Intern.js");
// HTML templates - head section, bottom section,
// and a card template for each employee class
const html     = require("./assets/mainHTML.js");

//***************
//*   Globals   *
//***************

const debug = (process.argv[2] == '-d');

// count entries by type to aid the user while inputting the team.
// also used to order the entries by manager(s), then engineers,
// then interns.
let managers    = 0;
let engineers   = 0;
let interns     = 0;
// storage array for team members
let teamMembers = [];
// build buffer for the output webpage
let htmlPage    = "";

//*****************
//*   Functions   *
//*****************

// promptEmployee() gathers information common to all three employee classes --
// name, id, and e-mail.  role is captured for use in choosing which prompt()
// function to use after promptEmployee();
function promptEmployee() {
  return inquirer.prompt([
    {name: "name" , type: "input", message: "TeamInfo: Employee Name? (<first> <last>)"},
    {name: "id"   , type: "input", message: "TeamInfo: Badge Number?"},
    {name: "email", type: "input", message: "TeamInfo: E-mail? (<userName>@<mailServer>.<domain>)"},
    {name: "role" , type: "list" , message: "TeamInfo: Team Role? (manager|engineer|intern)",
      choices: ['Manager','Engineer','Intern'], filter: function(val) {return val.toLowerCase();}},
  ]);
}

// promptTeamName() captures the team name, which is used by the CLI and is on the team html.
function promptTeamName() {return inquirer.prompt([{name:"teamName"    ,type:"input"  ,message:"TeamInfo: Team's Name?"    }]);}

// these prompt functions are chosen for use by the selection of role in promptEmployee()
function promptManager()  {return inquirer.prompt([{name:"officeNumber",type:"input"  ,message:"TeamInfo: Phone Number?"   }]);}
function promptEngineer() {return inquirer.prompt([{name:"github"      ,type:"input"  ,message:"TeamInfo: GitHub username?"}]);}
function promptIntern()   {return inquirer.prompt([{name:"school"      ,type:"input"  ,message:"TeamInfo: School?"         }]);}

// promptContinue() forces that enduring question -- 'should I stay or should I go now?'  (Clash)
function promptContinue() {return inquirer.prompt([{name:"getAnother"  ,type:"confirm",message:"TeamInfo: Add a Team Member?"}]);}

// textPage() clears the terminal and presents the current counts of employees already entered.
function textPage(team) {
  clear();
  console.log(chalk.yellow(figlet.textSync('TeamInfo', { horizontalLayout: 'full' })));
  if (team)
  {
    console.log(chalk.green(team));
    console.log(chalk.blue (` ${managers } ${managers  == 1? 'manager' :'managers' }`));
    console.log(chalk.blue (` ${engineers} ${engineers == 1? 'engineer':'engineers'}`));
    console.log(chalk.blue (` ${interns  } ${interns   == 1? 'intern'  :'interns'}\n`));
  }  
}

// start() is the program entry point. Note use of async in the declaration, which
// is required for later use of await.  
start(); async function start() 
{
  // set up the CLI
  textPage();

  // get the team name
  let teamName = await promptTeamName();

  // and update the CLI
  textPage(`"${teamName.teamName}"`);

  // ask before collecting each employee
  let keepGoing = await promptContinue();
  while (keepGoing.getAnother)
  {
    // reset the CLI to remove (overwrite) the promptContinue() query.
    textPage(`"${teamName.teamName}"`);

    // get employee information which is common to all roles.
    const basic = await promptEmployee();

    // then get the role-specific information, and store the employee as a new Class object.
    // note that the splice() method is used to maintain teamMembers order -- 
    // first managers, then engineers, then interns.
    switch (basic.role)
    {
      case 'manager'  : 
        let officeNumber = await promptManager();
        teamMembers.splice(managers,0,new Manager(basic.name, basic.id, basic.email, officeNumber.officeNumber)); 
        managers++;
        break;

      case 'engineer' :
        let github = await promptEngineer();
        teamMembers.splice(managers+engineers,0,new Engineer(basic.name, basic.id, basic.email, github.github)); 
        engineers++;
        break;

      case 'intern'   :
        let school = await promptIntern();
        teamMembers.push(new Intern(basic.name, basic.id, basic.email, school.school)); 
        interns++;
        break;
    }
    // clean up from the last employee entry
    textPage(`"${teamName.teamName}"`);
    if (debug) {console.log(teamMembers);}

    // any more employees?
    keepGoing = await promptContinue();
  }

  // final clean-up of the CLI
  textPage(`"${teamName.teamName}"`);

  // it's possible no employees were entered.  
  if (teamMembers.length == 0)
  {
    console.log(chalk.magenta("No employees captured."));
  }
  else
  {
    // there are team members, so we'll create the team report.
    console.log(chalk.magenta("Writing Team Summary to ./output/team.html"));

    // the HTML is broken into top and bottom chunks. start with the top.
    htmlPage = html.generateHtmlMainTop(teamName.teamName);
    if (debug) {console.log(htmlPage);}

    // work through the list, generating the appropriate HTML card and appending it to
    // the HTML.
    for (let i = 0; i < teamMembers.length; i++)
    {
      switch (teamMembers[i].getRole())
      {
        case 'Manager' : htmlPage += html.generateManager (teamMembers[i]); console.log("manager  added"); break;
        case 'Engineer': htmlPage += html.generateEngineer(teamMembers[i]); console.log("engineer added"); break;
        case 'Intern'  : htmlPage += html.generateIntern  (teamMembers[i]); console.log("intern   added"); break;
      }
    }

    // complete this multi-layer sandwich by putting on the bottom chunk.
    htmlPage += html.generateHtmlMainBottom();

    // find the output directory
    const outputPath = path.resolve(__dirname, "output", "team.html");
    if (debug) {console.log(outputPath);}

    // dump the HTML.  what a load!
    fs.writeFileSync("./output/team.html",htmlPage);

    // oh my, look at the time!  Outta here...
    console.log(chalk.magenta("Completed. From the output directory, run team.html in a browser"));
  }
}