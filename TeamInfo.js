const fs       = require("fs");
const clear    = require("clear");
const chalk    = require("chalk");
const figlet   = require("figlet");
const inquirer = require("inquirer");
const Manager  = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern   = require("./lib/Intern.js");
const html     = require("./lib/mainHTML.js");

const debug = (process.argv.length > 2 && (process.argv[2] == 'debug' || process.argv[2] == '-d'));

// make an empty array for the team members
let managers    = 0;
let engineers   = 0;
let interns     = 0;
let teamMembers = [];
let htmlPage    = "";

function promptEmployee() {
  return inquirer.prompt([
    {name: "name" , type: "input", message: "TeamInfo: Employee Name? (<first> <last>)"},
    {name: "id"   , type: "input", message: "TeamInfo: Badge Number?"},
    {name: "email", type: "input", message: "TeamInfo: E-mail? (<userName>@<mailServer>.<domain>)"},
    {name: "role" , type: "list" , message: "TeamInfo: Team Role? (manager|engineer|intern)",
      choices: ['Manager','Engineer','Intern'], filter: function(val) {return val.toLowerCase();}},
  ]);
}

function promptTeamName() {return inquirer.prompt([{name:"teamName"    ,type:"input"  ,message:"TeamInfo: Team's Name?"    }]);}
function promptManager()  {return inquirer.prompt([{name:"officeNumber",type:"input"  ,message:"TeamInfo: Phone Number?"   }]);}
function promptEngineer() {return inquirer.prompt([{name:"github"      ,type:"input"  ,message:"TeamInfo: GitHub username?"}]);}
function promptIntern()   {return inquirer.prompt([{name:"school"      ,type:"input"  ,message:"TeamInfo: School?"         }]);}

function promptContinue() {return inquirer.prompt([{name:"getAnother"  ,type:"confirm",message:"TeamInfo: Add a Team Member?"}]);}

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

// make a main app function that holds the logic
start(); async function start() 
{
  textPage();
  let teamName = await promptTeamName();
  textPage(`"${teamName.teamName}"`);
  let keepGoing = await promptContinue();
  while (keepGoing.getAnother)
  {
    textPage(`"${teamName.teamName}"`);
    const basic = await promptEmployee();
    switch (basic.role)
    {
      case 'manager'  : 
        let officeNumber = await promptManager();
        teamMembers.unshift(new Manager(basic.name, basic.id, basic.email, officeNumber.officeNumber)); 
        managers++;
        break;
      case 'engineer' :
        let github = await promptEngineer();
        teamMembers.splice(managers,0,new Engineer(basic.name, basic.id, basic.email, github.github)); 
        engineers++;
        break;
      case 'intern'   :
        let school = await promptIntern();
        teamMembers.push(new Intern(basic.name, basic.id, basic.email, school.school)); 
        interns++;
        break;
    }
    textPage(`"${teamName.teamName}"`);
    if (debug) {console.log(teamMembers);}
    keepGoing = await promptContinue();
  }

  textPage(`"${teamName.teamName}"`);
  console.log(chalk.magenta("Writing Team Summary to ./output/team.html"));

  htmlPage = html.generateHtmlMainTop(teamName.teamName);

  if (debug) {console.log(htmlPage);}

  for (let i = 0; i < teamMembers.length; i++)
  {
    switch (teamMembers[i].getRole())
    {
      case 'Manager' : htmlPage += html.generateManager (teamMembers[i]); console.log("manager  added"); break;
      case 'Engineer': htmlPage += html.generateEngineer(teamMembers[i]); console.log("engineer added"); break;
      case 'Intern'  : htmlPage += html.generateIntern  (teamMembers[i]); console.log("intern   added"); break;
    }
  }
  htmlPage += html.generateHtmlMainBottom();
  // const outputPath = path.resolve(__dirname, "output", "team.html");
  fs.writeFileSync("./output/team.html",htmlPage);
  console.log(chalk.magenta("Completed. From the output directory, run team.html in a browser"));
}
