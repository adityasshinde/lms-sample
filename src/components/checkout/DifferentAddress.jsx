import React, { useState } from 'react';
import BillingForm from './BillingForm';

const DifferentAdress = () => {
    const [isActiveC, setActiveC] = useState(true);
    const handleToggleC = () => {
        setActiveC(!isActiveC);
    };
    return (
        <div className="different-address">
        <div className="ship-different-title">
            <label onClick={handleToggleC}>Ship to a different address?</label>
        </div>
            {isActiveC && <BillingForm/>}
        <div className="order-notes">
            <div className="checkout-form-list">
                <label>Order Notes</label>
                <textarea id="checkout-mess" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
            </div>
        </div>
    </div>
    );
};

export default DifferentAdress;