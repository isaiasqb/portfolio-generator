const fs = require('fs');
const inquirer = require('inquirer')
const generatePage = require('./src/page-template.js');


const promptUser = () => {
return inquirer .prompt([
        {   
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please Enter Your Name!');
                    return false;
                }
            }
        },
        {   
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if(githubInput){
                    return true;
                } else {
                    console.log('Please enter your username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself?',
            default: true
        },
        {   
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if(confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
        },
    ])
};

const promptProject = portfolioData => {
        //if there/s no 'projects' array property, create one
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }

    console.log(`
    =================
    ADD A NEW PROJECT
    =================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please enter your project name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (Required)',
            validation: descriptionInput => {
                if(descriptionInput){
                    return true;
                } else {
                    console.log('Please enter your project description!')
                    return false
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)',
            validation: linkInput => {
                if(linkInput){
                    return true;
                } else {
                    console.log('Please enter your project link!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ]).then(projectData =>{
        portfolioData.projects.push(projectData);
            //if the user confirms they want to add another project
        if (projectData.confirmAddProject){
            return promptProject(portfolioData) //this calls the function again and prompts the project questions
        } else {
            return portfolioData;
        }
    });//end of inquirer prompt
};//end of promptProject function

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./index.html', pageHTML, err =>{
            if (err) throw new Error(err);

        console.log('Portfolio Complete! Checkout index.html to see the output!');
        });
    });

    const mockData = {
        name: 'mockname',
        github: 'mockgithub',
        projects: []
    }
