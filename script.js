let balance = 0;
let users = {};

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

function navigateTo(pageId) {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('banking-system').style.display = 'none';
    
    document.getElementById(pageId).style.display = 'flex';
}

// Signup with Full Name, Email, Username, Password, and DOB
function signup() {
    let fullName = document.getElementById("full-name").value;
    let email = document.getElementById("signup-email").value;
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let dob = document.getElementById("signup-dob").value;

    if (!fullName || !email || !username || !password || !dob) {
        alert("Please fill in all fields.");
        return;
    }

    if (users[username]) {
        alert("Username already taken!");
        return;
    }

    users[username] = { fullName, email, password, dob };
    alert("Account created successfully!");
    navigateTo('login-page');
}

// Login
function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (users[username] && users[username].password === password) {
        alert(`Welcome, ${users[username].fullName}!`);
        navigateTo('banking-system');
    } else {
        alert("Invalid credentials!");
    }
}

// Deposit Money
function deposit() {
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (amount > 0) {
        balance += amount;
        updateBalance();
        addTransaction(`Deposited $${amount}`);
    } else {
        alert("Please enter a valid positive amount.");
    }
}

// Withdraw Money
function withdraw() {
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        updateBalance();
        addTransaction(`Withdrew $${amount}`);
    } else {
        alert("Invalid amount or insufficient funds. Ensure the amount is positive and does not exceed your balance.");
    }
}

// Update Balance Display
function updateBalance() {
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
}

// Add Transaction to History
function addTransaction(transaction) {
    let listItem = document.createElement("li");
    listItem.textContent = transaction;
    document.getElementById("transaction-history-list").appendChild(listItem);
}
