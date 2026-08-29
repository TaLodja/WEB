// JavaScript source code
const display = document.querySelector('.display');
let shouldResetDisplay = false;
let currentInput = '0';
let previousValue = null;
let operator = null;
let memory = 0;

function UpdateDisplay() {
    display.value = currentInput;
}
function ClearAll() {
    currentInput = '0';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    memory = 0;
    UpdateDisplay();
}
function ClearEntry() {
    if (operator && shouldResetDisplay) {
        operator = null;
        previousValue = null;
        shouldResetDisplay = false;
    }
    else {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    UpdateDisplay();
}
function InputNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    }
    else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    UpdateDisplay();
}
function SetOperator(op) {
    if (operator && previousValue !== null && !shouldResetDisplay) {
        Calculate();
    }
    if (previousValue === null || shouldResetDisplay) {
        previousValue = parseFloat(currentInput);
    }
    operator = op;
    shouldResetDisplay = true;
}
function Calculate() {
    if (!operator || previousValue === null) return;
    const current = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+': result = previousValue + current;
            break;
        case '-': result = previousValue - current;
            break;
        case '*': result = previousValue * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                UpdateDisplay();
                previousValue = null;
                operator = null;
                shouldResetDisplay = true;
                return;
            }
            result = previousValue / current;
            break;
    }
    currentInput = String(result);
    previousValue = result;
    operator = null;
    shouldResetDisplay = true;
    UpdateDisplay();
    previousValue = null;
}
function DoSqrt() {
    const current = parseFloat(currentInput);
    if (current < 0) {
        currentInput = 'Error';
        UpdateDisplay();
        shouldResetDisplay = true;
        return;
    }
    currentInput = String(Math.Sqrt(current));
    UpdateDisplay();
    shouldResetDisplay = true;
}
function DoPercent() {
    if (previousValue !== null && operator) {
        currentInput = String(parseFloat(currentInput) / 100 * previousValue);
    }
    else {
        currentInput = String(parseFloat(currentInput) / 100);
    }
    UpdateDisplay();
    shouldResetDisplay = true;
}
function DoInverse() {
    const current = parseFloat(currentInput);
    if (current === 0) {
        currentInput = 'Error';
        UpdateDisplay();
        shouldResetDisplay = true;
        return;
    }
    currentInput = String(1 / current);
}
function DoNegative() {
    currentInput = String(-parseFloat(currentInput));
    UpdateDisplay();
}
function MemoryClear() {
    memory = 0;
}
function MemoryRead() {
    currentInput = String(memory);
    UpdateDisplay();
    shouldResetDisplay = true;
}
function MemorySave() {
    memory = parseFloat(currentInput);
    shouldResetDisplay = true;
}
function MemoryAdd() {
    memory += parseFloat(currentInput);
}
document.querySelectorAll('.calc-buttons button').forEach
    (
        btn => {
            btn.addEventListener('click', () => {
                const text = btn.textContent.trim();
                if (/^[0-9]$/.test(text) || text === '.') InputNumber(text);
                else if (['+', '-', '*', '/'].includes(text)) SetOperator(text);
                else if (text === '=') Calculate();
                else if (text == 'C') ClearAll();
                else if (text == 'CE') ClearEntry();
                else if (text === 'Backspace') {
                    currentInput = currentInput.slice(0, -1);
                    if (currentInput === '' || currentInput === '-') currentInput = '0';
                    UpdateDisplay();
                }
                else if (text === 'sqrt') DoSqrt();
                else if (text === '%') DoPercent();
                else if (text === '1/x') DoInverse();
                else if (text === '+/-') DoNegative();
                else if (text === 'MC') MemoryClear();
                else if (text === 'MR') MemoryRead();
                else if (text === 'MS') MemorySave();
                else if (text === 'M+') MemoryAdd();
            })
        }
    )
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        InputNumber(key);
        e.preventDefault();
        return;
    }
    if (['+', '-', '*', '/'].includes(key)) {
        SetOperator(key);
        e.preventDefault();
        return;
    }
    if (key === 'Enter' || key === '=') {
        Calculate();
        e.preventDefault();
        return;
    }
    if (key == 'Escape') {
        ClearAll();
        e.preventDefault();
        return;
    }
    if (key === 'Backspace') {
        if (currentInput !== '0') {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '' || currentInput === '-') currentInput = '0';
            UpdateDisplay();
        }
        e.preventDefault();
        return;
    }
})
