
let button = document.getElementById('operate');
let displayResult = document.getElementById('resultDisplay');
let champ = document.getElementById('champ');
const btns = document.querySelectorAll('.calc-btn');
let clearBtn = document.getElementById('clear-btn');

const allButton = {};


const hoverClasses = ['scale-95', 'shadow-inner', 'bg-white/40', 'shadow-sm'];

const allowed = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '(', ')', '.', ' ',

]

champ.focus();


class CalcHistory {
    static STORAGE_KEY = 'calcHistory';
  
    static getHistory() {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      try {
        return JSON.parse(raw);
      } catch (err) {
        console.error('Erreur de parsing du history:', err);
        // en cas de données corrompues, on remet à zéro
        this.clearHistory();
        return [];
      }
    }
  
    static addOperation(expression, result) {
      const history = this.getHistory();
      const op = {
        expression,
        result,
        timestamp: new Date().toISOString()
      };
      history.push(op);
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
      } catch (err) {
        console.error('Impossible de sauvegarder l’historique:', err);
      }
    }
    static clearHistory() {
      localStorage.removeItem(this.STORAGE_KEY);
    }
}

const History = CalcHistory;



for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    const value = btn.dataset.value;
    if (allowed.includes(value)) allButton[value] = btn;
}

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
    if (e.key === 'Enter') {
        e.preventDefault();
        button.click();
    }
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
    //Verifier si le champ est vide
    if (champContain === '') {
        displayResult.value = '0';
        return;
    }
    try {

        // Check if the input contains only allowed characters
        for (let i = 0; i < champContain.length; i++) {
            if (!allowed.includes(champContain[i])) {
                return;
            }
        }
        let result = eval(champContain);
        displayResult.value =  "=" + result;
        // Save the operation in history
        History.addOperation(champContain, result);
    } catch (error) {
        console.log(error);
    }
    
})