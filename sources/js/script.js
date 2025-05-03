
let button = document.getElementById('operate');
let displayResult = document.getElementById('resultDisplay');
let champ = document.getElementById('champ');
const btns = document.querySelectorAll('.calc-btn');
let clearBtn = document.getElementById('clear-btn');

const allButton = {};

for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    const value = btn.dataset.value;
    allButton[value] = btn;
}



const hoverClasses = ['scale-95', 'shadow-inner', 'bg-white/40', 'shadow-sm'];

const allowed = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '(', ')', '.', ' ',

]

btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const char = btn.dataset.value;
      champ.value += char
      champ.focus();
    });
});

champ.addEventListener('input', e => {
    const v = e.target.value;
    const filtered = [...v].filter(ch => allowed.includes(ch)).join('');
    if (filtered !== v) {
      e.target.value = filtered;
    }
});

champ.addEventListener('keydown', e => {
    const ctrlKeys = ['Backspace','Enter','ArrowLeft','ArrowRight','Delete','Tab'];
    if (allButton.hasOwnProperty(e.key)) {
        const btn = allButton[e.key];
        btn.classList.add(...hoverClasses);
        setTimeout(() => {
            btn.classList.remove(...hoverClasses);
        }, 200);
    }
    if (ctrlKeys.includes(e.key)) return;
    if (!allowed.includes(e.key)) {
      e.preventDefault();
    }
});

clearBtn.addEventListener('click', () => {
    champ.value = '';
    displayResult.value = '0';
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
        displayResult.value =  "=" + result;
    } catch (error) {
        console.log(error);
    }
    
})
