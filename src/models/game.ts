export default class Game {
    public dateID: string;
    public clicks: number;
    constructor(dateID: string) {
        this.dateID = dateID;
        this.clicks = 0;
    }
}