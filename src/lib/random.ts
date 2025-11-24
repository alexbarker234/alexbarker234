import seedrandom, { PRNG } from "seedrandom";

export class SeededRandom {
  rand: PRNG;
  constructor(seed: string) {
    this.rand = seedrandom(seed);
  }
  randBetween = (min: number, max: number) => Math.floor(this.rand() * (max - min + 1) + min);
  randBool = () => this.rand() > 0.5;

  randSkewedBetween = (min: number, max: number, mean: number, stdDev: number) =>
    Math.floor(this.skewedRand(mean / (max - min), stdDev) * (max - min + 1) + min);
  randSkewedBool = (mean: number, stdDev: number) => this.skewedRand(mean, stdDev) > 0.5;

  skewedRand = (mean: number, stdDev: number) => {
    let value;

    do {
      let u1 = 0;
      let u2 = 0;

      do {
        u1 = this.rand();
        u2 = this.rand();
      } while (u1 === 0);

      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      value = mean + stdDev * z0;
    } while (value < 0 || value > 1);

    return value;
  };
}
