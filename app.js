class HangmanGame {
            constructor() {
                this.words = ['JAVASCRIPT', 'PYTHON', 'COMPUTER', 'HANGMAN', 'CODING'];
                this.hangmanParts = [
                    '',
                    '  +---+\n      |\n      |\n      |\n      |\n      |\n=========',
                    '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========',
                    '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========',
                    '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========',
                    '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========',
                    '  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========',
                    '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========',
                    '  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========='
                ];
                
                this.initializeElements();
                this.startNewGame();
                this.setupEventListeners();
            }
            
            initializeElements() {
                this.hangmanDisplay = document.getElementById('hangmanDisplay');
                this.wordDisplay = document.getElementById('wordDisplay');
                this.wrongLetters = document.getElementById('wrongLetters');
                this.remainingGuesses = document.getElementById('remainingGuesses');
                this.guessInput = document.getElementById('guessInput');
                this.guessBtn = document.getElementById('guessBtn');
                this.gameMessage = document.getElementById('gameMessage');
                this.newGameBtn = document.getElementById('newGameBtn');
            }
            
            startNewGame() {
                this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
                this.guessedLetters = [];
                this.wrongGuesses = [];
                this.maxWrongGuesses = 6;
                this.gameOver = false;
                
                this.updateDisplay();
                this.guessInput.disabled = false;
                this.guessBtn.disabled = false;
                this.guessInput.focus();
            }
            
            setupEventListeners() {
                this.guessBtn.addEventListener('click', () => this.makeGuess());
                this.newGameBtn.addEventListener('click', () => this.startNewGame());
                
                this.guessInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.makeGuess();
                    }
                });
                
                this.guessInput.addEventListener('input', (e) => {
                    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                });
            }
            
            makeGuess() {
                const guess = this.guessInput.value.toUpperCase();
                
                if (!guess || guess.length !== 1) {
                    this.showMessage('Please enter a single letter!', '');
                    return;
                }
                
                if (this.guessedLetters.includes(guess)) {
                    this.showMessage('You already guessed that letter!', '');
                    this.guessInput.value = '';
                    return;
                }
                
                this.guessedLetters.push(guess);
                
                if (this.currentWord.includes(guess)) {
                    this.showMessage('Good guess!', 'win-message');
                    if (this.isWordComplete()) {
                        this.endGame(true);
                    }
                } else {
                    this.wrongGuesses.push(guess);
                    this.showMessage('Wrong letter!', 'lose-message');
                    if (this.wrongGuesses.length >= this.maxWrongGuesses) {
                        this.endGame(false);
                    }
                }
                
                this.updateDisplay();
                this.guessInput.value = '';
                this.guessInput.focus();
            }
            
            isWordComplete() {
                return this.currentWord.split('').every(letter => this.guessedLetters.includes(letter));
            }
            
            getDisplayWord() {
                return this.currentWord
                    .split('')
                    .map(letter => this.guessedLetters.includes(letter) ? letter : '_')
                    .join(' ');
            }
            
            updateDisplay() {
                this.wordDisplay.textContent = this.getDisplayWord();
                this.wrongLetters.textContent = this.wrongGuesses.join(', ');
                this.remainingGuesses.textContent = this.maxWrongGuesses - this.wrongGuesses.length;
                this.hangmanDisplay.textContent = this.hangmanParts[this.wrongGuesses.length];
            }
            
            showMessage(message, className) {
                this.gameMessage.textContent = message;
                this.gameMessage.className = `game-message ${className}`;
                
                setTimeout(() => {
                    if (!this.gameOver) {
                        this.gameMessage.textContent = '';
                        this.gameMessage.className = 'game-message';
                    }
                }, 2000);
            }
            
            endGame(won) {
                this.gameOver = true;
                this.guessInput.disabled = true;
                this.guessBtn.disabled = true;
                
                if (won) {
                    this.showMessage(`🎉 Congratulations! You won! The word was "${this.currentWord}"`, 'win-message');
                } else {
                    this.showMessage(`💀 Game Over! The word was "${this.currentWord}"`, 'lose-message');
                }
            }
        }
        
        // Start the game when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new HangmanGame();
        });

        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98c883df908cfbff',t:'MTc2MDEyNDQ0Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();