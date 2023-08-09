export class CreateOrderDto {
  id: number;
  from: string;
  to: string;
  pickupAddress: string;
  quantity: number;
  status: string;
  transporterId: number;
}
