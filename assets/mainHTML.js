// TeamInfo.js output template files.  the output HTML page will be built into a sandwich
// of HtmlMainTop, manager cards, engineer cards, intern cards, and HtmlMainBottom. 

const generateHtmlMainTop = (teamName) => 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${teamName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
    <style>
        body {
            background-image: url('../assets/embossed-diamond.gif');
            background-color: wheat;
        }
        .team-heading {
            background-color: yellow;
            border-radius: 100px;
            margin: auto;
            border: 4px solid black;
            box-shadow: 4px 4px lightgray;
        }
        .employee-card {
            width: 260px;
            height: 400px;
            margin: 10px 10px 10px 10px; 
            border-radius: 10px;
            border: 2px solid black;
            box-shadow: 4px 4px lightgray;
        }
        .manager-card {
            background-color: lightblue;
        }
        .engineer-card {
            background-color: red;
        }
        .intern-card {
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">${teamName}</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
`;

const generateHtmlMainBottom = () =>
`
        </div>
    </div>
</body>
</html>
`;

const generateManager = (manager) =>
`
            <div class="card employee-card">
                <div class="card-header manager-card">
                    <h2 class="card-title">${manager.name}</h2>
                    <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${manager.id}</li>
                        <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                        <li class="list-group-item">Phone: ${manager.getOfficeNumber()}</li>
                    </ul>
                </div>
            </div>
`;

const generateEngineer = (engineer) =>
`
            <div class="card employee-card">
                <div class="card-header engineer-card">
                    <h2 class="card-title">${engineer.name}</h2>
                    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${engineer.id}</li>
                        <li class="list-group-item">Email: <a href="mailto:{{ email }}">${engineer.email}</a></li>
                        <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.github}</a></li>
                    </ul>
                </div>
            </div>
`;

const generateIntern = (intern) =>
`
            <div class="card employee-card">
                <div class="card-header intern-card">
                    <h2 class="card-title">${intern.name}</h2>
                    <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${intern.id}</li>
                        <li class="list-group-item">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
                        <li class="list-group-item">School: ${intern.getSchool()}</li>
                    </ul>
                </div>
            </div>
`;

// make these functions visible
exports.generateHtmlMainTop    = generateHtmlMainTop;
exports.generateHtmlMainBottom = generateHtmlMainBottom;
exports.generateManager        = generateManager;
exports.generateEngineer       = generateEngineer;
exports.generateIntern         = generateIntern;

