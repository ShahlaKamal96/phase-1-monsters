const MONSTERS_URL = 'http://localhost:3000/monsters';
const monstersContainer = document.querySelector('#monster-container');
const formMonster = document.querySelector('#formMonster');
const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');
let currentPage = 1;

function getMonsters() {
    fetch(`${MONSTERS_URL}/?_limit=10&_page=${currentPage}`)
        .then(response => response.json())
        .then(monsters => displayMonsters(monsters));
}

function displayMonsters(monsters) {
    monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.innerHTML = `
      <h2>${monster.name}</h2>
      <p>Age: ${monster.age}</p>
      <p>Description: ${monster.description}</p>
    `;
        monstersContainer.appendChild(monsterDiv);
    });
}

function createMonster(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const desc = document.querySelector('#desc').value;

    const monster = {
        name: name,
        age: age,
        description: desc
    };

    fetch(MONSTERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
    })
        .then(response => response.json())
        .then(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
            monstersContainer.appendChild(monsterDiv);
        });

    formMonster.reset();
}

function clearMonsters() {
    while (monstersContainer.firstChild) {
        console.log(monstersContainer.firstChild.innerHTML)
        monstersContainer.removeChild(monstersContainer.firstChild);

    }
}

function loadNextPage() {
    clearMonsters();
    currentPage++;
    getMonsters();
}

function loadPreviousPage() {
    if (currentPage > 1) {
        clearMonsters();
        currentPage--;
        getMonsters();
    }
}

formMonster.addEventListener('submit', createMonster);
backButton.addEventListener('click', loadPreviousPage);
forwardButton.addEventListener('click', loadNextPage);

getMonsters();