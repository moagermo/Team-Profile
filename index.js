const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const employees = [];
const mgrPhone = "";
const gitHub = "";
const intSchool = ";"

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
            name: 'employeeType'
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
        
        if(response.employeeType === 'Manager')
        {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the office phone number of the manager?',
                    name: 'mgrPhone'
                }])
            .then((response) =>
            {
                mgrPhone = response.mgrPhone;
            })
        }
        else if(response.employeeType === 'Engineer')
        {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is their github username?',
                    name: 'engGithub'
                }])
            .then((response) =>
            {
                gitHub = response.engGithub;
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
                }])
            .then((response) =>
            {
                intSchool = response.intSchool;
            })
        }
        
        inquirer
        .prompt([
            {
                type: 'list',
                message: 'Would you like to add another employee?',
                name: 'newEmployee',
                choices: ['Yes', 'No']
            }])
        .then((response) => 
        {
            if(employeeType === 'Manager')
            {
                const newEmployee = new Manager(employeeID, employeeName, employeeEmail, mgrPhone)
            }
            else if(employeeType === 'Engineer')
            {
                const newEmployee = new Engineer(employeeID, employeeName, employeeEmail, gitHub)
            }
            else
            {
                const newEmployee = new Intern(employeeID, employeeName, employeeEmail, intSchool)
            }

            employees.push(newEmployee);

            if(response.newEmployee === 'Yes')
            {
                addNewEmployee();
            }
            else
            {

            }
        })
    })
}
