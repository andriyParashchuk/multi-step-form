import React, { useState } from 'react';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    country: '',
    city: '',
    street: '',
    zip: '',
    terms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }

    if (currentStep === 2) {
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    if (currentStep === 3) {
      if (!formData.terms) newErrors.terms = 'You must agree to the Terms and Conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-5 space-x-2">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep >= step ? 'bg-[#4778e1] text-white' : 'bg-[#dddddd] text-[#8d8a89]'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`dash w-12 h-0.75 ${currentStep > step ? 'bg-[#4778e1] text-white' : 'bg-[#dddddd] text-[#8d8a89]'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <main className="bg-white px-6 py-5 rounded-xl shadow-sm border border-gray-100 w-full max-w-xl transition-all duration-300">
        <form onSubmit={handleSubmit}>

          {currentStep === 1 && (
            <section className="space-y-4 animate-fadeIn">
              <header>
                <h2 className="text-xl font-bold text-black">Personal info</h2>
                <p className="text-sm text-[#a1aebf] mb-4">Step 1 of 3</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">First name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    className={`placeholder-[#bec1ca] text-gray-600 w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} placeholder="John" />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    className={`placeholder-[#bec1ca] text-gray-600 w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Doe" />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={`placeholder-[#bec1ca] text-gray-600 w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className={`placeholder-[#bec1ca] text-gray-600 w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="+380 (XX) XXX-XX-XX" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="ok"
                  className={`w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${formData.dob ? 'text-gray-600' : 'text-[#bec1ca]'}`} />
              </div>

              <div className="flex justify-end pt-4">
                <button type="button" onClick={handleNext} className="bg-[#388add] hover:bg-blue-500 text-white font-medium px-9 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Next →
                </button>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section className="space-y-4 animate-fadeIn">
              <header>
                <h2 className="text-xl font-bold text-black">Address</h2>
                <p className="text-sm text-[#a1aebf] mb-4">Step 2 of 3</p>
              </header>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Country *</label>
                <select name="country" value={formData.country} onChange={handleChange}
                  className={`text-gray-600 w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">Select country...</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                  className={`placeholder-[#bec1ca] text-gray-600 w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`} placeholder="Odesa" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Street address</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange}
                  className="placeholder-[#bec1ca] text-gray-600 w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="123 Main St, Apt 4" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ZIP / Postal code</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange}
                  className="placeholder-[#bec1ca] text-gray-600 w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="65000" />
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={handleBack} className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium px-9 py-2.5 rounded-lg transition-colors cursor-pointer">
                  ← Back
                </button>
                <button type="button" onClick={handleNext} className="bg-[#388add] hover:bg-blue-500 text-white font-medium px-9 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Next →
                </button>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section className="space-y-4 animate-fadeIn">
              <header>
                <h2 className="text-xl font-bold text-black">Confirmation</h2>
                <p className="text-sm text-[#a1aebf] mb-4">Step 3 of 3</p>
              </header>

              <div className="space-y-3">
                <label className="flex items-start">
                  <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange}
                    className="mt-1 h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="#" className="underline text-gray-900">Terms and Conditions</a> *
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-xs ml-6">{errors.terms}</p>}

                <label className="flex items-start">
                  <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange}
                    className="mt-1 h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Subscribe to newsletter</span>
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={handleBack} className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium px-9 py-2.5 rounded-lg transition-colors cursor-pointer">
                  ← Back
                </button>
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-9 py-2.5 rounded-lg transition-colors flex items-center cursor-pointer">
                  Submit ✓
                </button>
              </div>
            </section>
          )}

        </form>
      </main>
    </div>
  );
};

export default MultiStepForm;
