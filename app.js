// require Manager,Engineer, Intern, inquirer, path, fs


//when used it will put an html file called team.html and put it into the output folder 
const outputPath = path.resolve(__dirname, "output", "team.html");

// require the html render file 
const render = require("./lib/htmlRenderer");

// make an empty array for the team members
const teamMembers = [];
// make and array of store employee id

// make a main app function that holds the logic
function mainApp() {
// A function that creates the manager
// use inquire for user to answer questions
  
// A function that creates the team
//use inquire to allow the user the options to add engineer, intern, or if you dont want to add another memeber
  
// A function that creates the engineer
// use inquire for user to answer questions
  
  // A funtion that creates the intern
// use inquire for user to answer questions

// this function takes the team members that was added to the teamMembers array and will create an html file
// and send it the to the out put folder
  function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

}


mainApp();

