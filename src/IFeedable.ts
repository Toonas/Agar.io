import IEatable from "./IEatable";

export default interface IFeedable {
    eat(feed: IEatable): void;
    checkFeedPosibility(feed: IEatable): boolean;
}