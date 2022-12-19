const inquirer = require('inquirer');
const http = require('http')
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

//opening html
// fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8000);
// });

const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const { resolve } = require('path');

const employeeList = [];

async function init() {
    console.log(`---------------------------Team Profile Generator-------------------------`);

    await askAboutManager()
    await menu()
    createIndex();
}
async function askAboutManager() {
    const promptManager = new Promise((resolve, reject) => {
        console.log("Manager Information:");
        inquirer
        .prompt([
            {
                type: 'input',
                message: "Enter manager's name: ",
                name: 'name',
            },
            {
                type: 'input',
                message: "Enter manager's email: ",
                name: 'email',
            },
            {
                type: 'number',
                message: "Enter manager's office number: ",
                name: 'officeNum',
            }
        ])
        .then((response) => {
            let offNum = parseInt(response.officeNum);
            if (typeof response.name !== "string" || !response.name.trim().length) {
                const error = new Error("Expected parameter 'name' to be a non-empty string");
                reject(error);
            }
            if (typeof response.email !== "string" || !response.email.trim().length) {
                const error = new Error("Expected parameter 'email' to be a non-empty string");
                reject(error);
            }
            if (typeof offNum !== "number" || isNaN(offNum) || offNum < 0) {
                const error = new Error("Expected parameter 'officeNum' to be a non-negative number");
                reject(error);
            }
            let tempObj = {
                name: response.name,
                id: 1,
                email: response.email,
                office: offNum
            }
            resolve(tempObj);
        })})
        await promptManager
        .then((tempObj) => {
            console.log("Success");
            employeeList.push(new Manager(tempObj.name, tempObj.id, tempObj.email, tempObj.office));
            return true
        })
        .catch(async (err) => {
            console.log(err, " Try again");
            await askAboutManager();
        })

}
async function askAboutEngineer() {
    const promptEngineer = new Promise((resolve, reject) => {
        console.log("Engineer Information:");
        inquirer
        .prompt([
            {
                type: 'input',
                message: "Enter engineer's name: ",
                name: 'name',
            },
            {
                type: 'input',
                message: "Enter engineer's email: ",
                name: 'email',
            },
            {
                type: 'input',
                message: "Enter engineer's github: ",
                name: 'github',
            }
        ])
        .then((response) => {
            if (typeof response.name !== "string" || !response.name.trim().length) {
                const error = new Error("Expected parameter 'name' to be a non-empty string");
                reject(error);
            }
            if (typeof response.email !== "string" || !response.email.trim().length) {
                const error = new Error("Expected parameter 'email' to be a non-empty string");
                reject(error);
            }
            if (typeof response.github !== "string" || !response.github.trim().length) {
                const error = new Error("Expected parameter 'github' to be a non-empty string");
            }
            let tempObj = {
                name: response.name,
                id: employeeList.length + 1,
                email: response.email,
                github: response.github
            }
            resolve(tempObj);
        })})
        await promptEngineer
        .then((tempObj) => {
            console.log("Success");
            employeeList.push(new Engineer(tempObj.name, tempObj.id, tempObj.email, tempObj.github));
        })
        .catch(async (err) => {
            console.log(err, " Try again");
            await askAboutEngineer();
        })
}

async function askAboutIntern() {
    const promptIntern = new Promise((resolve, reject) => {
        console.log("Intern Information:");
        inquirer
        .prompt([
            {
                type: 'input',
                message: "Enter intern's name: ",
                name: 'name',
            },
            {
                type: 'input',
                message: "Enter intern's email: ",
                name: 'email',
            },
            {
                type: 'input',
                message: "Enter intern's school: ",
                name: 'school',
            }
        ])
        .then((response) => {
            if (typeof response.name !== "string" || !response.name.trim().length) {
                const error = new Error("Expected parameter 'name' to be a non-empty string");
                reject(error);
            }
            if (typeof response.email !== "string" || !response.email.trim().length) {
                const error = new Error("Expected parameter 'email' to be a non-empty string");
                reject(error);
            }
            if (typeof response.school !== "string" || !response.school.trim().length) {
                const error = new Error("Expected parameter 'school' to be a non-empty string");
            }
            let tempObj = {
                name: response.name,
                id: employeeList.length + 1,
                email: response.email,
                school: response.school
            }
            resolve(tempObj);
        })})
        await promptIntern
        .then((tempObj) => {
            console.log("Success");
            employeeList.push(new Intern(tempObj.name, tempObj.id, tempObj.email, tempObj.school));
        })
        .catch(async (err) => {
            console.log(err, " Try again");
            await askAboutIntern();
        })
}

async function menu() {
    await inquirer
    .prompt([
        {
            type: 'list',
            message: 'Add another employee?',
            name: 'selection',
            choices: ["Add Engineer", "Add Intern", "Done"],
            default: "Done"
        }
    ])
    .then(async (response) => {
        switch (response.selection) {
            case 'Add Engineer':
                await askAboutEngineer();
                menu();
                break;
            case 'Add Intern':
                await askAboutIntern();
                menu();
                break;
            case 'Done':
                createIndex();
                console.log("Check dist folder for created index.html and style.css");
                employeeList.forEach(element => console.log(element));
                break;
        }
    })
}

function createIndex() {
    // fs.copyFile(path.join(__dirname, 'src/indexBase.html'), path.join(__dirname, 'dist/index.html'), (err) => {
    //     if (err) {
    //         console.log("Error Found:", err);
    //       }
    // });
    fs.copyFile(path.join(__dirname, 'src/style.css'), path.join(__dirname, 'dist/style.css'), (err) => {
        if (err) {
            console.log("Error Found:", err);
          }
    });

    function htmlCode(input) {
        return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
      <link rel="stylesheet" href="./style.css" />
      <title>Team Profile</title>
    </head>
    
    <body>
        <header>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                  <h1 class="display-4">My Team</h1>
                </div>
              </div>
        </header>
        <main>
            <div class="container">
                <mod class="row justify-content-center">
                    <!--Append cards here -->
                    ${input}
                </mod>
            </div>
        </main>
    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script src="../index.js"></script>
    </body>`
    }

    function managerCard(name, role, id, email, office) {
        return `<div class="col-12 col-md-6 col-lg-4">
        <div class="card bg-primary m-3" style="width: 20rem;">
            <div class="card-header text-light">
              ${name} <br>
              Role: ${role}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Office Number: ${office}</li>
            </ul>
        </div>
    </div>
    `
    }

    function engineerCard(name, role, id, email, github) {
        return `<div class="col-12 col-md-6 col-lg-4">
        <div class="card bg-primary m-3" style="width: 20rem;">
            <div class="card-header text-light">
              ${name} <br>
              Role: ${role}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Github: <a href="https://github.com/${github}">${github}</a></li>
            </ul>
        </div>
    </div>
    `
    }

    function internCard(name, role, id, email, school) {
        return `<div class="col-12 col-md-6 col-lg-4">
        <div class="card bg-primary m-3" style="width: 20rem;">
            <div class="card-header text-light">
              ${name} <br>
              Role: ${role}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
        </div>
    </div>
    `
    }

    function constuctCards() {
        let cardString = "";
        employeeList.forEach(item => {
            switch (item.constructor.name) {
                case 'Manager':
                    cardString = cardString.concat(managerCard(item.getName(), item.getRole(), item.getId(), item.getEmail(), item.officeNum));
                    break;
                case 'Engineer':
                    cardString = cardString.concat(engineerCard(item.getName(), item.getRole(), item.getId(), item.getEmail(), item.getGithub()));
                    break;
                case 'Intern':
                    cardString = cardString.concat(internCard(item.getName(), item.getRole(), item.getId(), item.getEmail(), item.getSchool()));
                    break;
            }
        })
        return cardString;
    }
    fs.writeFile(path.join(__dirname, 'dist/index.html'), htmlCode(constuctCards()), (err) =>
    err ? console.error(err) : console.log('Success!'));
}
init();