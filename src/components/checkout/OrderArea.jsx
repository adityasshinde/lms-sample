import React, { useState } from "react";
// import PaymentMethod from "./PaymentMethod";
// import CouponArea from "./CouponArea";
import { useDispatch } from "react-redux";
import { useGetStudentProfileMutation } from "../../store/api/authApi";
import {
  usePurchaseCourseMutation,
  useVerifyPaymentMutation,
} from "../../store/api/paymentApi";
import LoadingOverlay from "../ui/LoadingOverlay";

const OrderArea = ({ course, isBillingFormComplete }) => {
  const [shippingCost, setShippingCost] = useState(0);
  const dispatch = useDispatch();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [purchaseCourseMutation, { isLoading: orderLoading }] =
    usePurchaseCourseMutation();
  const [getStudentProfileMutation] = useGetStudentProfileMutation();

  const initPayment = (data) => {
    const truncatedDescription =
      data.description.length > 255
        ? data.description.substring(0, 252) + "..."
        : data.description;

    console.log("data", data);
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data?.amount,
      currency: "INR",
      name: data?.productName,
      description: truncatedDescription,
      image: data?.imageURI,
      order_id: data?.orderId,
      handler: async (response) => {
        try {
          response = { ...response, courseId: course._id };
          console.log({ response });
          // const result = await verifyPayment(response);
          // console.log(result);
          // if (result.data) {
          //   //add logic to redirect to my courses page
          //   toast.success("Course Purchased Successfully", {
          //     position: "top-center",
          //     autoClose: 2000,
          //   });
          //   const student = await getStudentProfileMutation();
          //   if (student.data) {
          //     dispatch(setUser(student.data));
          //   }
          // } else {
          //   toast.error("Failed to Purchase course", {
          //     position: "top-center",
          //     autoClose: 2000,
          //   });
          // }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#0074BA",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // if (isBillingFormComplete() === false) {
      //   return;
      // }
      const result = await purchaseCourseMutation(course._id);
      initPayment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="your-order mb-12 ">
      {orderLoading && (
        <LoadingOverlay message="Processing your request, please do not close this window or press back while we confirm your payment" />
      )}
      <h3 className="font-bold text-3xl">Your order</h3>
      <div className="your-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product-name">Course</th>
              <th className="product-total">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="cart_item">
              <td className="product-name">{course.title}</td>
              <td className="product-total">
                <span className="amount">
                  {course.discountedPrice
                    ? `Rs.${course.discountedPrice}`
                    : "Rs.0"}
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            {/* <tr className="cart-subtotal">
              <th>Cart Subtotal</th>
              <td className="product-total">
                <span className="amount">Rs.{totalPrice}</span>
              </td>
            </tr> */}
            <tr className="shipping">
              <th>Shipping</th>
              <td className="product-total">
                <ul>
                  <li>
                    <input
                      onClick={() => setShippingCost(40)}
                      type="radio"
                      id="Amount"
                      name="Shipping"
                    />
                    <label htmlFor="Amount">
                      Flat Rate: <span className="amount">Rs.40</span>
                    </label>
                  </li>
                  <li>
                    <input
                      onClick={() => setShippingCost(0)}
                      type="radio"
                      id="FreeShipping"
                      name="Shipping"
                      defaultChecked
                    />
                    <label htmlFor="FreeShipping">Free Shipping</label>
                  </li>
                  <li></li>
                </ul>
              </td>
            </tr>
            <tr className="order-total">
              <th>Order Total</th>
              <td className="product-total">
                <strong>
                  <span className="amount">
                    Rs.{course.discountedPrice + shippingCost}
                  </span>
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* <CouponArea/> */}
      <form action="#" className="my-12 w-full">
        <p className="checkout-coupon flex flex-wrap justify-between mr-8">
          <input type="text" placeholder="Coupon Code" />
          <button className="edu-btn">Apply Coupon</button>
        </p>
      </form>
      <div className="payment-method">
        <div className="order-button-payment mt-8">
          <button className="edu-btn" onClick={handlePayment}>
            Place order
          </button>
        </div>
      </div>
      {/* <PaymentMethod courseId={course._id} /> */}
    </div>
  );
};

export default OrderArea;
