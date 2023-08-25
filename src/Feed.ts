import Phaser from "phaser";
import IEatable from "./IEatable";

export default class Feed extends Phaser.GameObjects.Arc implements IEatable {
    mass: number = 1;
    sizeOffset: number = 10;
    sizeCoefficient: number = .9;

    constructor(
        scene: Phaser.Scene, 
        x?: number, 
        y?: number, 
        radius?: number, 
        startAngle?: number, 
        endAngle?: number, 
        anticlockwise?: boolean, 
        fillColor?: number, 
        fillAlpha?: number) {
        super(scene, x, y, radius, startAngle, endAngle, anticlockwise, fillColor, fillAlpha);

        scene.add.existing(this);
        
        scene.physics.add.existing(this);
        this.physicsInitialize();

        this.updateSize();
    }

    private physicsInitialize() {
		let playerBody = this.body as Phaser.Physics.Arcade.Body;
		playerBody.allowGravity = false;
		playerBody.collideWorldBounds = true;
    }

    getSize(): number {
        return this.sizeOffset + this.sizeCoefficient * this.mass;
    }

    updateSize(): void {
        this.radius = this.getSize();
		let playerBody = this.body as Phaser.Physics.Arcade.Body;
		playerBody.setCircle(this.getSize());
    }
}