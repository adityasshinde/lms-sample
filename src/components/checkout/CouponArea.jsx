import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const CouponArea = () => {

    return (
        <section className="coupon-area pt-12 pb-8">
        <div className="container mx-auto">
            <div className="flex">
                <div className="md:w-1/2">
                    <div className="coupon-accordion">
                        <div id="checkout_coupon" >
                            <div className="coupon-info">
                                <form action="#">
                                    <p className="checkout-coupon">
                                        <input type="text" placeholder="Coupon Code" />
                                        <button className="edu-btn">Apply Coupon</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default CouponArea;