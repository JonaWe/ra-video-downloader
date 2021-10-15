import Einheit from './Einheit';

export default class VorlesungsWoche {
  nr: number;
  units: Einheit[];

  constructor(nr: number) {
    this.nr = nr;
    this.units = [];
  }
}
