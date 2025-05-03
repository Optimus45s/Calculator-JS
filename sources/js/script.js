
let button = document.getElementById('operate');
let displayResult = document.getElementById('resultDisplay');
let champ = document.getElementById('champ');

const allowed = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '(', ')', '.', ' ',

]

champ.addEventListener('input', e => {
    const v = e.target.value;
    const filtered = [...v].filter(ch => allowed.includes(ch)).join('');
    if (filtered !== v) {
      e.target.value = filtered;
    }
});

champ.addEventListener('keydown', e => {
    const ctrlKeys = ['Backspace','Enter','ArrowLeft','ArrowRight','Delete','Tab'];
    if (ctrlKeys.includes(e.key)) return;
    if (!allowed.includes(e.key)) {
      e.preventDefault();
    }
});


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
        displayResult.value = result;
    } catch (error) {
        console.log(error);
    }
    
})
