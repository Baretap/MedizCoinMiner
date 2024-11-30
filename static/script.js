document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('startButton');
    const upgradeButton = document.getElementById('upgradeButton');
    const mineCount = document.getElementById('mine-count');
    const totalPrice = document.getElementById('total-price');
    const minedAmount = document.getElementById('mined-amount');
    
    let mining = false;
    let coinsMined = 0;
    let miningSpeed = 0.0001;
    let upgradeCost = 100;

    startButton.addEventListener('click', () => {
        mining = !mining;
        if (mining) {
            startButton.textContent = "Stop Mining";
            mineCoins();
        } else {
            startButton.textContent = "Start Mining";
        }
    });

    upgradeButton.addEventListener('click', () => {
        if (coinsMined >= upgradeCost) {
            coinsMined -= upgradeCost;
            miningSpeed /= 2; // Nopeus kaksinkertaistuu
            upgradeCost *= 2; // Hinta tuplaantuu
            updateDisplay();
            upgradeButton.textContent = `Upgrade Mining (${upgradeCost} MedizCoin)`;
        } else {
            alert("You need more MedizCoin to upgrade!");
        }
    });

    function mineCoins() {
        if (mining) {
            coinsMined += 1;
            updateDisplay();
            setTimeout(mineCoins, miningSpeed);
        }
    }

    function updateDisplay() {
        mineCount.value = coinsMined;
        totalPrice.textContent = coinsMined;
        minedAmount.textContent = `Total Mined: ${coinsMined}`;
    }
});
