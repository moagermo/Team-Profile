const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
let mgrPhone = "";
let gitHub = "";
let intSchool = "";
let newEmployee = [];

startHTML();

init();

function init()
{
    addNewEmployee();
}

function addNewEmployee()
{
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the employee?',
            name: 'employeeName'
        },
        {
            type: 'input',
            message: 'What is the ID of the employee?',
            name: 'employeeID'
        },
        {
            type: 'list',
            message: 'What is the employee type?',
            name: 'employeeType',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            message: 'What is their email address?',
            name: 'employeeEmail'
        }])
    .then((response) => 
    {
        const employeeType = response.employeeType;
        const employeeID = response.employeeID;
        const employeeEmail = response.employeeEmail;
        const employeeName = response.employeeName;
        
        if(employeeType === 'Manager')
        {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the office phone number of the manager?',
                    name: 'mgrPhone'
                },
                {
                    type: 'list',
                    message: 'Would you like to add another employee?',
                    name: 'anotherEmployee',
                    choices: ['Yes', 'No']
                }])
            .then((response) =>
            {
                mgrPhone = response.mgrPhone;
                let role = "Manager"
                newEmployee = new Manager(employeeID, employeeName, employeeEmail, mgrPhone)
                addHTML(newEmployee, role);

                if(response.anotherEmployee === 'Yes')
                {
                    addNewEmployee();
                }
                else
                {
                    endHTML();
                }
            })
        }
        else if(employeeType === 'Engineer')
        {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is their github username?',
                    name: 'engGithub'
                },
                {
                    type: 'list',
                    message: 'Would you like to add another employee?',
                    name: 'anotherEmployee',
                    choices: ['Yes', 'No']
                }])
            .then((response) =>
            {
                gitHub = response.engGithub;
                let role = "Engineer"
                newEmployee = new Engineer(employeeID, employeeName, employeeEmail, gitHub)
            
                addHTML(newEmployee, role);

                if(response.anotherEmployee === 'Yes')
                {
                    addNewEmployee();
                }
                else
                {
                    endHTML();
                }
            })
        }
        else
        {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is their school name?',
                    name: 'intSchool'
                },
                {
                    type: 'list',
                    message: 'Would you like to add another employee?',
                    name: 'anotherEmployee',
                    choices: ['Yes', 'No']
                }])
            .then((response) =>
            {
                intSchool = response.intSchool;
                let role = "Intern";
                newEmployee = new Intern(employeeID, employeeName, employeeEmail, intSchool)

                addHTML(newEmployee, role);

                if(response.anotherEmployee === 'Yes')
                {
                    addNewEmployee();
                }
                else
                {
                    endHTML();
                }
            });
        };
        
    });
};

function startHTML()
{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    
    fs.writeFile("./output/employees.html", html, function(err) 
    {
        if (err) {
            console.log(err);
        }
    });
};

function addHTML(employee, role) 
{
    return new Promise(function(resolve, reject) 
    {
        const name = employee.getName();
        const id = employee.getID();
        const email = employee.getEmail();
        
        let info = "";

        if (role === "Engineer") 
        {
            const gitHub = employee.getGitHub();
            info = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}" target="_blank">${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        } 
        else if (role === "Intern") 
        {
            const school = employee.getSchool();
            info = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank">${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } 
        else
        {
            const officePhone = employee.getOfficeNumber();
            info = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank">${email}</a></li>
                <li class="list-group-item">Office Phone: <a href="tel:${officePhone}" target="_blank">${officePhone}</a></li>
            </ul>
            </div>
        </div>`
        }
        
        console.log("Added new employee");
        fs.appendFile("./output/employees.html", info, function (err) 
        {
            if (err) 
            {
                return reject(err);
            };
            return resolve();
        });
    });
};

function endHTML() 
{
    const html = `</div>
    </div>
</body>
</html>`;

    fs.appendFile("./output/employees.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("done");
};


