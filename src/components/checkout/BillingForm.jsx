import React, { useEffect, useState } from 'react';
import { usePayment } from '../../hooks/hooks';
import { setbillingFormStatus } from '../../store/slices/paymentSlice';
import { useDispatch } from 'react-redux';

const BillingForm = () => {
    const {billingFormStatus}=usePayment();
    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
        // country: 'volvo',
        firstName: '',
        lastName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        townCity: '',
        stateCounty: '',
        postcodeZip: '',
        emailAddress: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        // country: false,
        firstName: false,
        lastName: false,
        companyName: false,
        streetAddress: false,
        apartment: false,
        townCity: false,
        stateCounty: false,
        postcodeZip: false,
        emailAddress: false,
        phone: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Reset error for the current field when it is being edited
        setErrors({
            ...errors,
            [name]: false,
        });
    };

    const validateInput = (name, value) => {
        switch (name) {
            case 'firstName':
                return /^[A-Za-z\s]+$/.test(value);
            case 'lastName':
                return /^[A-Za-z\s]+$/.test(value);
            case 'companyName':
                return /^[A-Za-z\s]+$/.test(value);
            case 'townCity':
                return /^[A-Za-z\s]+$/.test(value);
            case 'stateCounty':
                return /^[A-Za-z\s]+$/.test(value);
            case 'emailAddress':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'postcodeZip':
                return /^[0-9]{6}(?:-[0-9]{4})?$/.test(value);
            case 'phone':
                return /^\d{10}$/.test(value);
            default:
                return true;
        }
    };

    const handleSubmit = () => {
        // e.preventDefault();
        let hasError = false;
        const updatedErrors = {};
        // Validate each field
        for (const [name, value] of Object.entries(formData)) {
            const isValid = validateInput(name, value);
            console.log(name, value, isValid)
            if (!isValid) {
                hasError = true;
                updatedErrors[name] = true;
                break;
            }
        }

        // Set errors state
        setErrors(updatedErrors);

        // If there are errors, prevent form submission
        if (hasError) {
            console.log('Form has errors. Please fix them before submitting.');
            dispatch(setbillingFormStatus('ERROR'));
            return;
        }
        dispatch(setbillingFormStatus('SUCCESS'));
        // Proceed with form submission logic
        console.log('Billing Form submitted successfully.');
        return;
    };
    useEffect(() => {
      if(billingFormStatus==='CHECK'){
        handleSubmit();
      }
    }, [billingFormStatus]);
    

    return (
        <div className="checkbox-form">
            <h3 className="font-semibold text-2xl mb-4">Billing Details</h3>
                <div className="flex flex-col mr-8 mt-8">
                    <div className="md:w-full">
                        {/* <div className="country-select">
                            <label>
                                Country <span className="required">*</span>
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={errors.country ? 'border border-red-500' :'border border-gray-200'}
                            >
                                <option value="volvo">India</option>
                                <option value="saab">Algeria</option>
                                <option value="mercedes">Afghanistan</option>
                                <option value="audi">Ghana</option>
                                <option value="audi2">Albania</option>
                                <option value="audi3">Bahrain</option>
                                <option value="audi4">Colombia</option>
                                <option value="audi5">Dominican Republic</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="flex">
                        <div className="md:w-1/2 mr-4">
                            <div className="checkout-form-list">
                                {/* <label>
                                    First Name <span className="required">*</span>
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="First name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={errors.firstName ? 'border border-red-500' :'border border-gray-200'}
                                    
                                />
                                {errors.firstName && <p className='text-red-500'>*This field is required</p>}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="checkout-form-list">
                                {/* <label>
                                    Last Name <span className="required">*</span>
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={errors.lastName ? 'border border-red-500' :'border border-gray-200'}
                                    
                                />
                                {errors.lastName && <p className='text-red-500'>*This field is required</p>}

                            </div>
                        </div>
                    </div>
                    <div className="md:w-full">
                        <div className="checkout-form-list">
                            {/* <label>Company Name</label> */}
                            <input
                                type="text"
                                placeholder="Company name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? 'border border-red-500' :'border border-gray-200'}
                            />
                            {errors.companyName && <p className='text-red-500'>*This field is required</p>}
                        </div>
                    </div>
                    <div className="md:w-full">
                        <div className="checkout-form-list">
                            {/* <label>
                                Address <span className="required">*</span>
                            </label> */}
                            <input
                                type="text"
                                placeholder="Street address"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                className={errors.streetAddress ? 'border border-red-500' :'border border-gray-200'}
                                
                            />
                            {errors.streetAddress && <p className='text-red-500'>*This field is required</p>}
                        </div>
                    </div>
                    <div className="md:w-full">
                        <div className="checkout-form-list">
                            <input
                                type="text"
                                placeholder="Apartment, suite, unit etc. (optional)"
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleChange}
                                className={errors.apartment ? 'border border-red-500' :'border border-gray-200'}
                            />
                            {errors.apartment && <p className='text-red-500'>*This field is required</p>}
                        </div>
                    </div>
                    <div className="md:w-full">
                        <div className="checkout-form-list">
                            {/* <label>
                                Town / City <span className="required">*</span>
                            </label> */}
                            <input
                                type="text"
                                placeholder="Town / City"
                                name="townCity"
                                value={formData.townCity}
                                onChange={handleChange}
                                className={errors.townCity ? 'border border-red-500' :'border border-gray-200'}
                                
                            />
                            {errors.townCity && <p className='text-red-500'>*This field is required</p>}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="md:w-1/2 mr-2">
                            <div className="checkout-form-list">
                                {/* <label>
                                    State / County <span className="required">*</span>
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="State / County"
                                    name="stateCounty"
                                    value={formData.stateCounty}
                                    onChange={handleChange}
                                    className={errors.stateCounty ? 'border border-red-500' :'border border-gray-200'}
                                    
                                />
                                {errors.stateCounty && <p className='text-red-500'>*This field is required</p>}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="checkout-form-list">
                                {/* <label>
                                    Postcode / Zip <span className="required">*</span>
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Postcode / Zip"
                                    name="postcodeZip"
                                    value={formData.postcodeZip}
                                    onChange={handleChange}
                                    className={errors.postcodeZip ? 'border border-red-500' :'border border-gray-200'}
                                    
                                />
                                {errors.postcodeZip && <p className='text-red-500'>*This field is required</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="md:w-1/2 mr-2">
                            <div className="checkout-form-list">
                                {/* <label>
                                    Email Address <span className="required">*</span>
                                </label> */}
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    className={errors.emailAddress ? 'border border-red-500' :'border border-gray-200'}
                                />
                                {errors.emailAddress && <p className='text-red-500'>*This field is required</p>}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="checkout-form-list">
                                {/* <label>
                                    Phone <span className="required">*</span>
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'border border-red-500' :'border border-gray-200'}
                                />
                                {errors.phone && <p className='text-red-500'>*This field is required</p>}
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={handleSubmit} className="edu-btn">Submit</button> */}
                </div>
        </div>
    );
};

export default BillingForm;

