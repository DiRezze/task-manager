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