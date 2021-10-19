const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const EngingeerTemplate = require('./src/EngineerTemplate');
const InternTemplate = require('./src/InternTemplate');
const ManagerTemplate = require('./src/ManagerTemplate');
const PageTemplate = require('./src/PageTemplate');



// create an empty array to push the information into
const employees = [];


// Prompt for questions
function addMember() {
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is the team member name? (required)",
        validate: input => {
            if (input) {
                return true;
            }else {
                console.log ("Please enter a name!");
            }
    }
},

    {
        type: 'input',
        name: 'id',
        message: 'Enter Employee ID (required)',
        validate: input => {
            if (input) {
                return true;
            }else {
                console.log ("Please enter an ID!");
            }
    }
},

    {
        type: 'input',
        name: 'email',
        message: 'Enter Employee email'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select the Employee role',
        choices: ['Manager', 'Engineer', 'Intern']
    }])
    .then(function({name, id, email, role}) {
        let roleDetails = "";
        if(role === 'Engineer') {
            roleDetails = "GitHub username";
        } else if (role === 'Intern') {
            roleDetails = "school name";            
        } else {
            roleDetails = "office phone number";
            
        }
    inquirer.prompt([
        {
        type: 'input',
        name:'roleDetails',
        message: `Enter team member's ${roleDetails}`
        
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add another team member?',       
        }])
        .then(function(data) {

            let allData = {...data, name, id, email, role};
            htmlRender(allData);

            if(data.addMore) {

                addMember()
            } else {
               let finalHTML = PageTemplate(employees);
            
               fs.writeFileSync(path.resolve('./dist/index.html'), finalHTML)
                // function to end the prompts
            }
        })
    })
}


function htmlRender(data){
    switch (data.role) {
        case 'Engineer':  employees.push(EngingeerTemplate(data)); break;
        case  'Manager': employees.push(ManagerTemplate(data)); break;
        case  'Intern': employees.push(InternTemplate(data)); break;
    
        default:
            break;
    }
    console.log(employees)
}


addMember();