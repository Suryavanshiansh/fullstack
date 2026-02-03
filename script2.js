const depositButton = document.getElementById('deposit');
const withdrawButton = document.getElementById('withdraw');
const amountInput = document.getElementById('amount');
const balanceDisplay = document.getElementById('balance');
const errorEl = document.getElementById('error');


let balance = 0;
const initialText = (balanceDisplay && balanceDisplay.textContent || '').trim();
if (initialText !== '') {
    
    const parsed = parseFloat(initialText.replace(/[^0-9.-]+/g, ''));
    if (Number.isFinite(parsed)) {
        balance = parsed;
    }
}

function formatCurrency(n) {
    return '$' + Number(n).toLocaleString();
}

function updateBalanceDisplay() {
    balanceDisplay.textContent = formatCurrency(balance);
}

function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.add('show');
    errorEl.style.display = 'block';
    clearTimeout(showError._t);
    showError._t = setTimeout(() => {
        errorEl.classList.remove('show');
        errorEl.style.display = 'none';
    }, 1800);
}


updateBalanceDisplay();

depositButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (Number.isFinite(amount) && amount > 0) {
        balance += amount;
        updateBalanceDisplay();
        amountInput.value = '';
    } else {
        showError('Invalid amount!');
    }
});

withdrawButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (!Number.isFinite(amount) || amount <= 0) {
        showError('Invalid amount!');
        return;
    }
    if (amount > balance) {
        showError('Invalid amount!');
        return;
    }
    balance -= amount;
    updateBalanceDisplay();
    amountInput.value = '';
});