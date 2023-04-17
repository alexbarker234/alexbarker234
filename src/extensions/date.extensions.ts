export {}; // makes this act as a module

declare global {
    interface Date {
        getWeek(): number;
    }
}

Date.prototype.getWeek = function (): number {
    var startOfYear = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(
        ((this.getTime() - startOfYear.getTime()) / 86400000 +
            startOfYear.getDay() +
            1) /
            7
    );
};
