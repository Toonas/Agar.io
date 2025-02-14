import Phaser from 'phaser'

import AgarioScene from './AgarioScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [AgarioScene],
}

export default new Phaser.Game(config)
