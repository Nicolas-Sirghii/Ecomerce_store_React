import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";


export function DeliveryOptions({cartItem, deliveryOptions}) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {
                deliveryOptions.map((elem) => {
                    let priceString = 'FREE Shipping'

                    if (elem.priceCents > 0) {
                        priceString = `${formatMoney(elem.priceCents)} - Shipping`;
                    }



                    return (
                        <div key={elem.id} className="delivery-option">
                            <input type="radio"
                                checked={elem.id === cartItem.deliveryOptionId}


                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {
                                        dayjs(elem.estimatedDeliveryTimeMs)
                                            .format("dddd, MMMM, D")
                                    }
                                </div>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}