export class RegisterCompanyResponse {
  constructor(
    public id: number,
    public description: string,
    public address: string,
    public discount: string,
    public quantity: string,
  ) {}
}