export class RegisterCompanyRequest {
  constructor(
    public readonly description: string,
    public readonly address: string,
    public readonly discount: string,
    public readonly quantity: string,
  ) {}
}