/*
    The visitor design pattern concerns itself with being able to add functionality to objects without
    modifying the structure of them.
*/

class BankAccount {
    /**
    *
    * @param {'CURRENT' | 'SAVINGS'} accountType
    * @param {String} currency
    * @param {Number} balance - balance in minor currency
    unit
    */
    constructor(accountType = 'CURRENT', currency = 'USD',
        balance = 0) {
        this.accountType = accountType;
        this.currency = currency;
        this.balance = balance;
    }
    setBalance(balance) {
        this.balance = balance;
    }
    accept(visitor) {
        visitor.visit(this);
    }
}

class InterestVisitor {
    constructor(interestRate, currency) {
        this.interestRate = interestRate;
        this.currency = currency;
    }
    /**
    * @param {BankAccount} bankAccount
    */
    visit(bankAccount) {
        if (
            bankAccount.currency === this.currency &&
            bankAccount.accountType === 'SAVINGS'
        ) {
            bankAccount.setBalance((bankAccount.balance *
                this.interestRate) / 100);
        }
    }
}

const accounts = [
    new BankAccount('SAVINGS', 'GBP', 500),
    new BankAccount('SAVINGS', 'USD', 500),
    new BankAccount('CURRENT', 'USD', 10000),
];
const usdInterestVisitor = new InterestVisitor(105, 'USD');
const gbpInterestVisitor = new InterestVisitor(110, 'GBP');
accounts.forEach((account) => {
    account.accept(usdInterestVisitor);
    account.accept(gbpInterestVisitor);
});
console.assert(
    accounts[0].balance === 550 &&
    accounts[1].balance === 525 &&
    accounts[2].balance === 10000,
    '%o',
    accounts
);

/*
    Summary:
            The visitor design pattern concerns itself with being able to add functionality to objects without
            modifying the structure of them.
    In example we created Bank class and defined accept method it means we already knew about visitor class, and there we did nothing to extend Bank class, if Bank class was already
    implemented, it means we modifed Bank class code, this is not allowed in Visitor pattern.
    I don't get it again , may be example is bad, or may be i am not enaugh smart for this  
*/