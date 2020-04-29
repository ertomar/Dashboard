export class Complaint {
  constructor(
    public response: string,
    public code: number,
    public text: string,
    public date: Date,
    public from_passenger: boolean,
    public status: string,
    public _trip: string,
    public _passenger: any
  ) {}
}
