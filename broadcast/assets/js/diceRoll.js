class DiceRoll {
    constructor(rollExpression) {
        rollExpression = rollExpression.replace(/D/g, 'd');
        Object.defineProperty(this, 'dicesRollOut', {
            value: rollExpression,
            enumerable: true,
            writable: true,
            configurable: true
        });
    }

    executeRollOut() {
        try {
            let expression = this.dicesRollOut;
            let generalRollList = [];

            const rollDice = (numOfRolls, diceSides) => {
                let rollList = [];
                let total = 0;

                for (let roll = 0; roll < numOfRolls; roll++) {
                    let diceRoll = Math.floor(Math.random() * diceSides) + 1;
                    rollList.push(diceRoll);
                    total += diceRoll;
                }

                return { rollList, total };
            };

            expression = expression.replace(/(\d*)d(\d+)/gi, (match, rolls, sides) => {
                rolls = rolls === '' ? 1 : parseInt(rolls);
                sides = parseInt(sides);

                let { rollList, total } = rollDice(rolls, sides);
                generalRollList.push(`${rolls}D${sides}: ${rollList.join(', ')}`);

                return total;
            });

            let finalResult = eval(expression);
            generalRollList.unshift(finalResult);

            return generalRollList;
        } catch (e) {
            return false;
        }
    }
}
