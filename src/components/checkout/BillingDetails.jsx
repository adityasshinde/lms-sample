import React, { useState } from 'react'
import DifferentAdress from './DifferentAddress';
import BillingForm from './BillingForm';

const BillingDetails = () => {
    const [isActiveB, setActiveB] = useState(false);

    const handleToggleB = () => {
        setActiveB(!isActiveB);
    };
    
    return (
        <div className="checkbox-form">
            <h3 className="font-semibold text-2xl mb-4">Billing Details</h3>
            <BillingForm/>
            <div className="md:w-full">
            {/* <div className="checkout-form-list create-acc">
                <label onClick={handleToggleB}>
                    Create an account?
                </label>
            </div> */}
            {/* {isActiveB && <div
                id="cbox_info"
                className={`checkout-form-list create-account"
                                      }`}
            >
                <p>
                    Create an account by entering the information below.
                    If you are a returning customer please login at the
                    top of the page.
                </p>
                <label>
                    Account password <span className="required">*</span>
                </label>
                <input type="password" placeholder="password" required />
            </div>} */}
        </div>
            {/* <DifferentAdress /> */}
        </div>
    )
}

export default BillingDetails;