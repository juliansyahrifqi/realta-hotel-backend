export class CreateBookingOrderDto {
    order_number: string;
    order_date: string;
    arrival_date: string;
    total_room: number;
    total_guest: number;
    total_tax: number;
    total_amount: number;
    down_payment: number;
    pay_type: string;
    is_paid: boolean;
    type: string;
    card_number: string;
    member_type: string;
    status: string;
    user_id: number;
    hotel_id: number;
}
