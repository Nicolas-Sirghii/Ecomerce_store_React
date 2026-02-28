import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react';
import "./CheckoutHeader.css"
import "./CheckoutPage.css"
import { formatMoney } from "../utils/money";

export function CheckoutPage({ cart }) {


 



  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState({
    totalItems: 0,
    productCostCents: 0,
    shippingCostCents: 0,
    totalCostBeforeTaxCents: 0,
    taxCents: 0,
    totalCostCents: 0
});

  useEffect(() => {
   
    axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data)
      })
    axios.get("/api/payment-summary")
      .then((response) => {
        setPaymentSummary(response.data)
         
      })
  }, [])

   
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">3 items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">

            {
              deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectdDeliveryOption = deliveryOptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId
                  }
                );


                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date: {dayjs(selectdDeliveryOption.estimatedDeliveryTimeMs).format(
                        "dddd, MMMM D"
                      )}
                    </div>

                    <div className="cart-item-details-grid">
                      <img className="product-image"
                        src={cartItem.product.image} />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

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
                    </div>
                  </div>
                );
              })
            }

          </div>

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
        </div>
      </div>
    </>
  );
}