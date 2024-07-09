//Color theme script

const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let savedTheme = localStorage.getItem('colorTheme');

function toggleTheme() {
    const currentTheme = localStorage.getItem('colorTheme');
    if (currentTheme === 'dark') {
        setTheme('light');  
    } else {
        setTheme('dark');
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('colorTheme', theme);
}

function checkSavedTheme() {
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(userPrefersDark ? 'dark' : 'light');
    }
}

window.onload = checkSavedTheme;

//User greeting script (Currently unused)

const usernameInput = document.getElementById('usernameInput');
let username = usernameInput.value.trim();

function setGreeting(username) {
    let currentHour = new Date().getHours();
    if (currentHour < 12) {
        return `Bom dia, ${username}!`;
    } else if (currentHour < 18) {
        return `Boa tarde, ${username}!`;
    } else {
        return `Boa noite, ${username}!`;
    }
}
function renderGreeting(){
    let greeting = setGreeting();
    document.addEventListener('DOMContentLoaded', function(){
        const greetingField = document.getElementById('user-greeting');
        greetingField.innerHTML=`${greeting}`;
    });
}