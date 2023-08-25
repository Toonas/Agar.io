import Phaser from 'phaser';
import Feed from './Feed';
import MoveableEater from './MoveableEater';

export default class AgarioScene extends Phaser.Scene {
	private player!: MoveableEater;
	private feedGroup!: Phaser.Physics.Arcade.Group;
	private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

	private speed: number = 100;

	constructor() {
		super('');
	}

	create(): void {
		this.feedGroup = this.initializeFeed();
		this.player = this.initializePlayer(this.feedGroup);

		this.cursor = this.input.keyboard.createCursorKeys();
	}

	private initializeFeed(): Phaser.Physics.Arcade.Group {
		let feedGroup = this.physics.add.group();

		let spawnRect = new Phaser.Geom.Rectangle(0, 0, 800, 600);

		for (let i = 0; i < 100; i++) {
			let point = spawnRect.getRandomPoint();
			let feed = new Feed(this, point.x, point.y, 10, 0, 360, false, 0x00ffff);
			feedGroup.add(feed, true);
		}

		feedGroup.children.iterate(this.updateFeedGroup);

		//let circle = new Phaser.Geom.Circle(300, 200, 200);

		return feedGroup;
	}

	private updateFeedGroup(child: Phaser.GameObjects.GameObject): void {
		let feedBody = child.body as Phaser.Physics.Arcade.Body;
		feedBody.allowGravity = false;
	}

	private initializePlayer(feedGroup: Phaser.Physics.Arcade.Group): MoveableEater {
		let player = new MoveableEater(this, 400, 200, 50, 0, 360, false, 0xff0000);
		player.mass = 10;
		player.speedOffset = 250;
		player.speedCoefficient = 10;
		player.updateSize();
		
		this.physics.add.overlap(player, feedGroup, this.collectFeed, undefined, this);
		
		return player;
	}

	private collectFeed(player: MoveableEater, feed: Feed) {
		if (!player.checkFeedPosibility(feed))
			return;

		player.eat(feed);
		feed.destroy();
		console.log(player.mass);
		console.log(player.getSpeed());
	}

	update(time: number, delta: number): void {
		let velocity = this.getInput();

		velocity.x *= this.player.getSpeed();
		velocity.y *= this.player.getSpeed();

		(this.player.body as Phaser.Physics.Arcade.Body).setVelocity(velocity.x, velocity.y);
	}

	private getInput(): Phaser.Math.Vector2 {
		let velocity = new Phaser.Math.Vector2(
			Number(this.cursor.right.isDown) - Number(this.cursor.left.isDown), 
			Number(this.cursor.down.isDown) - Number(this.cursor.up.isDown)
		);

		if (velocity.lengthSq() != 0)
			velocity = velocity.normalize();

			return velocity;
	}
}