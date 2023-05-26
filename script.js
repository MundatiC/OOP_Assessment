// BankAccount class
class BankAccount {
  constructor(accountNumber, accountHolder, balance) {
    // Encapsulation: Making properties private with the use of underscores
    this._accountNumber = accountNumber;
    this._accountHolder = accountHolder;
    this._balance = balance;
  }

  // Encapsulation: Getter methods to access the private properties
  get accountNumber() {
    return this._accountNumber;
  }

  get accountHolder() {
    return this._accountHolder;
  }

  get balance() {
    return this._balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this._balance += amount;
      console.log(`Deposited ${amount} into account ${this._accountNumber}`);
    } else {
      console.log("Invalid amount. Deposit amount must be greater than 0.");
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this._balance) {
      this._balance -= amount;
      console.log(`Withdrawn ${amount} from account ${this._accountNumber}`);
    } else {
      console.log("Invalid amount or insufficient balance.");
    }
  }
}

// SavingsAccount class - Inherits from BankAccount
class SavingsAccount extends BankAccount {
  constructor(accountNumber, accountHolder, balance, interestRate) {
    super(accountNumber, accountHolder, balance);
    // Encapsulation: Adding an additional property specific to SavingsAccount
    this._interestRate = interestRate;
  }

  calculateInterest() {
    // Polymorphism: Providing a specific implementation for calculateInterest method
    const interest = this._balance * (this._interestRate / 100);
    console.log(
      `Interest amount for account ${this._accountNumber}: ${interest}`
    );
    return interest;
  }
}

// CheckingAccount class - Inherits from BankAccount
class CheckingAccount extends BankAccount {
  constructor(accountNumber, accountHolder, balance, overdraftLimit) {
    super(accountNumber, accountHolder, balance);
    // Encapsulation: Adding an additional property specific to CheckingAccount
    this._overdraftLimit = overdraftLimit;
  }

  // Polymorphism: Method overriding to handle overdraft behavior
  withdraw(amount) {
    if (
      amount > 0 &&
      (amount <= this._balance + this._overdraftLimit)
    ) {
      if (amount <= this._balance) {
        this._balance -= amount;
        console.log(`Withdrawn ${amount} from account ${this._accountNumber}`);
      } else {
        const remainingOverdraft = this._overdraftLimit - this._balance;
        this._balance = 0;
        console.log(
          `Withdrawn ${this._balance} from account ${this._accountNumber}`
        );
        console.log(
          `Reached overdraft limit. Remaining overdraft: ${remainingOverdraft}`
        );
      }
    } else {
      console.log("Invalid amount or exceeding overdraft limit.");
    }
  }
}

// Create instances of each account type
const calebSavingsAccount = new SavingsAccount(
  "C026",
  "Caleb Mundati",
  5000,
  5
);
const lennyCheckingAccount = new CheckingAccount(
  "C027",
  "Lenny Mbugua",
  3000,
  2000
);

// Retrieve account information
console.log(
  `Savings Account - Account Number: ${calebSavingsAccount.accountNumber}`
);
console.log(
  `Savings Account - Account Holder: ${calebSavingsAccount.accountHolder}`
);
console.log(`Savings Account - Balance: ${calebSavingsAccount.balance}`);
console.log(
  `Checking Account - Account Number: ${lennyCheckingAccount.accountNumber}`
);
console.log(
  `Checking Account - Account Holder: ${lennyCheckingAccount.accountHolder}`
);
console.log(`Checking Account - Balance: ${lennyCheckingAccount.balance}`);

console.log(
  `Checking Account - Overdraft Limit: ${lennyCheckingAccount._overdraftLimit}`
);

// Perform operations
calebSavingsAccount.deposit(1000); //depositing

calebSavingsAccount.withdraw(2000); // normal withdraw

console.log(`Savings Account - Balance: ${calebSavingsAccount.balance}`); //Checking balance

calebSavingsAccount.withdraw(5000); // trying to withdraw an amount exceeding the balance

calebSavingsAccount.calculateInterest(); // Calculating interest of savings account

  lennyCheckingAccount.deposit(500);



  lennyCheckingAccount.withdraw(2000); // withdrawing amount less than balance in account

  console.log(`Checking Account - Balance: ${lennyCheckingAccount.balance}`);

  lennyCheckingAccount.withdraw(3500); // withdrawing ammount equal that balance + overdraft
  console.log(`Checking Account - Balance: ${lennyCheckingAccount.balance}`);

  lennyCheckingAccount.deposit(500);



  

  lennyCheckingAccount.withdraw(2000); //withdrawing ammount equal that balance + overdraft
