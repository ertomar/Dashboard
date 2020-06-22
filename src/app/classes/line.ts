export class Line {
  constructor(
    public from: string,
    public to: string,
    public cost: number,
    public _stations: []
  ) {}
}
