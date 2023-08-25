import IMoveable from "./IMoveable";
import Feed from "./Feed";
import IFeedable from "./IFeedable";
import IEatable from "./IEatable";

export default class MoveableEater extends Feed implements IMoveable, IFeedable {
    speedOffset: number = 200;
    speedCoefficient: number = 1;

    getSpeed(): number {
        return this.speedOffset + this.speedCoefficient * this.mass;
    }

    eat(feed: IEatable): void {
        if (!this.checkFeedPosibility(feed))
            throw new Error("feed size is too big");

        this.mass += feed.mass;
        feed.mass = 0;
    }

    checkFeedPosibility(feed: IEatable) {
        return this.getSize() > feed.getSize();
    }
}