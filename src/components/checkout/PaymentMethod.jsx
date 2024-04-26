import React from "react";
import {
  usePurchaseCourseMutation,
  useVerifyPaymentMutation,
} from "../../store/api/paymentApi";

const PaymentMethod = ({ courseId }) => {
  const verifyPayementMutation = useVerifyPaymentMutation();
  const purchaseCourseMutation = usePurchaseCourseMutation();

  const initPayment = (data) => {
    const truncatedDescription =
      data.description.length > 255
        ? data.description.substring(0, 252) + "..."
        : data.description;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: data.product_name,
      description: truncatedDescription,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFL-v6nl1FzrhAWptsex7awRnI9wR7J7T9Ig&usqp=CAU", //sample img for now
      order_id: data.order_id,
      handler: async (response) => {
        try {
          const result = await verifyPayementMutation[0](response);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const result = await purchaseCourseMutation[0](courseId);
      console.log(result);
      initPayment(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="payment-method">
        <div className="accordion" id="checkoutAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="checkoutOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#bankOne"
                aria-expanded="true"
                aria-controls="bankOne"
              >
                Payment Method
              </button>
            </h2>
            <div
              id="bankOne"
              className="accordion-collapse show"
              aria-labelledby="checkoutOne"
              data-bs-parent="#checkoutAccordion"
            >
              <div className="accordion-body">
                <p className="mb-8">
                  You need to pay it with your prefable methods
                </p>
                <div className="payment-option mb-4">
                  <label htmlFor="pay_later_payment">
                    <input
                      type="radio"
                      id="pay_later_payment"
                      name="payment_method"
                    />{" "}
                    Pay later
                  </label>
                </div>
                <div className="payment-option mb-4">
                  <label htmlFor="mollie_payment">
                    <input
                      type="radio"
                      id="mollie_payment"
                      name="payment_method"
                    />{" "}
                    Mobile Payment
                  </label>
                </div>
                <div className="payment-option mb-4">
                  <label htmlFor="paypal_payment">
                    <input
                      type="radio"
                      id="paypal_payment"
                      name="payment_method"
                    />{" "}
                    Pay with Paypal
                  </label>
                </div>
                <div className="payment-option mb-4">
                  <label htmlFor="stripe_payment">
                    <input
                      type="radio"
                      id="stripe_payment"
                      name="payment_method"
                    />{" "}
                    Pay with Visa/Mastercard
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-button-payment mt-8">
          <button className="buy-now-btn" onClick={handlePayment}>
            Place order
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
