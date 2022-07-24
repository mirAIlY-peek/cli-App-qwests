#!/usr/bin/env node

import chalk from 'chalk'; // npm i chalk
import inquirer from 'inquirer'; // npm i inquirer
import gradient from 'gradient-string';// npm i gradient
import chalkAnimation from 'chalk-animation';// npm i chalkAnimation
import figlet from 'figlet';// npm i figlet
import {createSpinner} from "nanospinner";// npm i createSpinner      and    npm i nanospinner

let playerName;

const sleep = (ms = 2000)=> new Promise((r)=> setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants To Be A JavaScript Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgGreen('HOW TO PLAY')}
    Я процесс на вашем компьютере.
    if you get any question wrong I will be ${chalk.bgRed('killed')}
`);
}

// await welcome()
async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
           return 'Player';
        },
    });

    playerName = answers.player_name;
}



async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'javaScript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 2005',
            'Dec 4th, 1995',
            'june 30, 2022'
        ],
    });
    return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}

async function question2(){
    const answers = await inquirer.prompt({
        name: 'Вопрос_2',
        type: 'list',
        message: 'Когда состоялось открытие nFactorial\n',
        choices: [
            'May 23rd, 1995',
            'june 24th, 2022',
            'june 6, 2022',
            'july 6th, 2022'
        ],
    });
    return handleAnswer(answers.Вопрос_2 == 'june 6, 2022');
}
async function question3(){
    const answers = await inquirer.prompt({
        name: 'Вопрос_3',
        type: 'list',
        message: 'Cколько мне лет????????\n',
        choices: [
            '15',
            '16',
            '17',
            '18'
        ],
    });
    return handleAnswer(answers.Вопрос_3 == '16');
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...')
    await sleep();
    if(isCorrect){
        spinner.success({text: `Nice work ${playerName}. Thats a legit answer`});
    }else{
        spinner.error({text: `Game over, haha you lose ${playerName}!`});
        process.exit(1);
    }
}
function winner(){
    console.clear();
    const msg = `Congrats , ${playerName}!\n $ 1, 0 0 0 , 0 0 0`;
    figlet(msg, (err, data) =>{
        console.log(gradient.pastel.multiline(data));
    });
}


await welcome();
await askName();
await question1();
await question2();
await question3();
await winner();
