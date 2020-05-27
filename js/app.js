new Vue({
    el: '#app',
    data: {
        playGame: false,
        playerHealth: 100,
        monsterHealth: 100,
        turns: [],
    },
    methods: {
        startGame: function() {
            this.turns = [];
            this.playGame = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },

        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.log(1, damage);
            this.monsterAttack();
        },

        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;

            this.log(3, 0);

            this.monsterAttack();
        },

        heal: function() {
            if(this.playerHealth <= 90) this.playerHealth += 10;
            else this.playerHealth = 100;
            
            this.log(4, 0);

            this.monsterAttack();
        },

        giveUp: function() {
            this.playGame = false;
        },

        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        monsterAttack: function() {
            if(this.checkWin()) return;
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.log(2, damage);
        },

        log: function(type, damage) { 
            switch(type) {
                case 1: {
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player hits Monster for ' + damage,
                    });
                    break;
                }
                case 2: {
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Monster hits Player for ' + damage,
                    });
                    break; 
                }
                case 3: { 
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player hits hard Monster for ' + damage,
                    });
                    break; 
                }
                case 4: {
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player heals for 10',
                    });
                    break;
                }
            }
        },  

        checkWin: function() {
            if(this.monsterHealth <= 0){
                if(confirm("You won! New Game?")) this.startGame();
                else this.playGame = false;
                return true;
            } else if(this.playerHealth <= 0) {
                if(confirm("You Lost! New Game?")) this.startGame();
                else this.playGame = false;
                return true;
            }
            return false;
        }
    }
});