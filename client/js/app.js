/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var PenguinGame_1 = __webpack_require__(1);
	window.onload = function () {
	    var game = new PenguinGame_1.PenguinGame();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player_1 = __webpack_require__(2);

	var PenguinGame = function () {
	    function PenguinGame() {
	        _classCallCheck(this, PenguinGame);

	        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', {
	            preload: this.preload,
	            create: this.create,
	            update: this.update,
	            render: this.render
	        });
	    }

	    _createClass(PenguinGame, [{
	        key: 'preload',
	        value: function preload() {
	            this.game.load.spritesheet('amputator', 'assets/amputator.png', 50, 50, 6);
	            this.game.load.spritesheet('duck', 'assets/duck.png', 42, 120, 3);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            this.cursors = this.game.input.keyboard.createCursorKeys();
	            this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	            this.game.physics.startSystem(Phaser.Physics.ARCADE);
	            this.game.time.desiredFps = 30;
	            this.game.physics.arcade.gravity.y = 450;
	            this.player = new Player_1.Player();
	            this.player.sprite = this.game.add.sprite(300, 200, 'amputator');
	            this.game.physics.enable(this.player.sprite, Phaser.Physics.ARCADE);
	            this.player.sprite.body.bounce.y = 0.2;
	            this.player.sprite.body.collideWorldBounds = true;
	            this.player.sprite.body.setSize(20, 32, 5, 16);
	            this.player.sprite.animations.add('left', [3, 4, 5, 4], 10, true);
	            this.player.sprite.animations.add('right', [0, 1, 2, 1], 10, true);
	            this.player.sprite.animations.add('turn', [0, 1, 2, 1], 10, true);
	            var duck = this.game.add.sprite(300, 200, 'duck');
	            duck.animations.add('quack', [0, 1], 8, true);
	            duck.animations.add('crouch', [0, 2], 8, true);
	            duck.play('quack');
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.player.update(this, this.cursors, this.jumpButton);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.game.debug.text('' + this.game.time.suggestedFps, 32, 32);
	        }
	    }]);

	    return PenguinGame;
	}();

	exports.PenguinGame = PenguinGame;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
	    function Player() {
	        _classCallCheck(this, Player);

	        this.facing = 'left';
	        this.speed = 200;
	        this.jumpTimer = 0;
	    }

	    _createClass(Player, [{
	        key: 'update',
	        value: function update(game, cursors, jumpButton) {
	            this.sprite.body.velocity.x = 0;
	            if (cursors.left.isDown) {
	                this.sprite.body.velocity.x = -this.speed;
	                if (this.facing != 'left') {
	                    this.sprite.animations.play('left');
	                    this.facing = 'left';
	                }
	            } else if (cursors.right.isDown) {
	                this.sprite.body.velocity.x = this.speed;
	                if (this.facing != 'right') {
	                    this.sprite.animations.play('right');
	                    this.facing = 'right';
	                }
	            } else {
	                if (this.facing != 'idle') {
	                    this.sprite.animations.stop();
	                    if (this.facing == 'left') {
	                        this.sprite.frame = 3;
	                    } else {
	                        this.sprite.frame = 0;
	                    }
	                    this.facing = 'idle';
	                }
	            }
	            if (jumpButton.isDown && this.sprite.body.onFloor() && game.time.now > this.jumpTimer) {
	                this.sprite.body.velocity.y = -this.speed;
	                this.jumpTimer = game.time.now + 750;
	            }
	        }
	    }]);

	    return Player;
	}();

	exports.Player = Player;

/***/ }
/******/ ]);