export class Offer {
  constructor(
    public title: string,
    public code: string,
    public start: Date,
    public end: Date,
    public offerType: string,
    public description: string,
    public value?: number,
    public _passengers?: any,
    public _line?: any,
    public id?: number
  ) {}
}
