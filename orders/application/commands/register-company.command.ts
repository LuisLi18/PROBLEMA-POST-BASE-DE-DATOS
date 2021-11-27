export class RegisterCompany {
  constructor(
    public readonly description: string,
    public readonly address: string,
    public readonly discount: string,
    public readonly quantity: string,
    public readonly createdAt: string,
    public readonly createdBy: number,
    public readonly updatedAt: string,
    public readonly updatedBy: number,
  ) {}
}