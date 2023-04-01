export class CreateOrderMenuDto {
    orme_order_number: string;
    orme_order_date: string;
    orme_total_item: number;
    orme_total_discount: number;
    orme_total_amount: string;
    orme_pay_type: string;
    orme_cardnumber: string;
    orme_is_paid: boolean;
    orme_modified_date: string;
    orme_user_id: number;
}
