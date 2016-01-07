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

	var config_1 = __webpack_require__(2);
	var Player_1 = __webpack_require__(3);
	var Input_1 = __webpack_require__(4);

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
	            this.game.load.spritesheet('amputator', 'assets/sprites/amputator.png', 50, 50, 6);
	            this.game.load.spritesheet('duck', 'assets/sprites/duck.png', 42, 120, 3);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            this.input = new Input_1.PenguinInput();
	            this.input.create(this.game, config_1.config.input);
	            this.game.physics.startSystem(Phaser.Physics.ARCADE);
	            this.game.time.desiredFps = 30;
	            this.game.physics.arcade.gravity.y = 980;
	            this.player = new Player_1.Player(this.game, 'amputator', [{
	                name: 'left',
	                frames: [3, 4, 5, 4],
	                framerate: 10,
	                loop: true
	            }, {
	                name: 'right',
	                frames: [0, 1, 2, 1],
	                framerate: 10,
	                loop: true
	            }]);
	            this.game.physics.enable(this.player.sprite, Phaser.Physics.ARCADE);
	            this.player.sprite.body.bounce.y = 0.2;
	            this.player.sprite.body.collideWorldBounds = true;
	            this.player.sprite.body.setSize(20, 32, 5, 16);
	            var duck = this.game.add.sprite(300, 200, 'duck');
	            duck.animations.add('quack', [0, 1], 8, true);
	            duck.animations.add('crouch', [0, 2], 8, true);
	            duck.play('quack');
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.player.update(this, this.input);
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

	exports.config = {
	    tile: {
	        width: 32,
	        height: 32
	    },
	    player: {
	        width: 42,
	        height: 120
	    },
	    input: {}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
	    function Player(game, key, animations) {
	        var _this = this;

	        _classCallCheck(this, Player);

	        this.facing = 'left';
	        this.speed = 300;
	        this.jumpSpeed = 500;
	        this.jumpTimer = 0;
	        this.key = key;
	        this.sprite = game.add.sprite(0, 0, key);
	        if (animations) animations.map(function (animation) {
	            return _this.sprite.animations.add(animation.name, animation.frames, animation.framerate, animation.loop);
	        });
	    }

	    _createClass(Player, [{
	        key: 'update',
	        value: function update(game, input) {
	            this.sprite.body.velocity.x = 0;
	            if (input.cursors.left.isDown) {
	                this.sprite.body.velocity.x = -this.speed;
	                if (this.facing != 'left') {
	                    this.sprite.animations.play('left');
	                    this.facing = 'left';
	                }
	            } else if (input.cursors.right.isDown) {
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
	            if (input.buttonJump.isDown && this.sprite.body.onFloor() && game.time.now > this.jumpTimer) {
	                this.sprite.body.velocity.y = -this.jumpSpeed;
	                this.jumpTimer = game.time.now + 750;
	            }
	        }
	    }]);

	    return Player;
	}();

	exports.Player = Player;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PenguinInput = function () {
	    function PenguinInput() {
	        _classCallCheck(this, PenguinInput);
	    }

	    _createClass(PenguinInput, [{
	        key: "create",
	        value: function create(game, config) {
	            this.cursors = game.input.keyboard.createCursorKeys();
	            this.buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	            this.buttonQuack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	            this.buttonAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	        }
	    }]);

	    return PenguinInput;
	}();

	exports.PenguinInput = PenguinInput;

/***/ }
/******/ ]);