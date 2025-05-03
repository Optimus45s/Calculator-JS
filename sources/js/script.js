
let button = document.getElementById('button');
let displayResult = document.getElementById('resultDisplay');
let champ = document.getElementById('champ');

const allowed = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '(', ')', '.', ' ',

]


button.addEventListener('click', () => {
    let champContain = champ.value.trim();
    try {

        // Check if the input contains only allowed characters
        for (let i = 0; i < champContain.length; i++) {
            if (!allowed.includes(champContain[i])) {
                throw new Error('Invalid character in input');
            }
        }
        let result = eval(champContain);
        displayResult.innerText = result;
    } catch (error) {
        console.log(error);
    }
    
})
