import { formatMoney } from "../../utils/money";



export function PaymentSummary({ paymentSummary }) {
    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            <div className="payment-summary-row">
                <div>Items {paymentSummary.totalItems != null && paymentSummary.totalItems}:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.productCostSents || 0)}</div>
            </div>

            <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents || 0)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents || 0)}</div>
            </div>
            {paymentSummary && (
                <>
                    <div className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.textCents || 0)}</div>
                    </div>

                    <div className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents || 0)}</div>
                    </div>

                    <button className="place-order-button button-primary">
                        Place your order
                    </button>
                </>
            )}
        </div>
    );
}