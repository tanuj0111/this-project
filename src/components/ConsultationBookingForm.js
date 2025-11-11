import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ConsultationBookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedUsageType, setSelectedUsageType] = useState({});

  const formSteps = [
    {
      id: 1,
      title: 'General Information',
      price: '$ 2000',
      fields: [
        { label: 'Name', type: 'text', placeholder: 'ABCXYZ' },
        { 
          label: 'Gender', 
          type: 'button-group', 
          options: ['Female', 'Male', 'Other']
        },
        { 
          label: 'Age', 
          type: 'double-input', 
          placeholders: ['Years+', 'Months+']
        },
        { label: 'Email-id', type: 'email', placeholder: 'abc@gmail.com', additionalText: 'Create account' }
      ]
    },
    {
      id: 2,
      title: 'Primary Number',
      price: '$ 2000',
      fields: [
        { 
          label: 'Mobile Number', 
          type: 'isd-mobile', 
          placeholders: ['ISD', 'Mobile Number']
        },
        { 
          label: 'Using this number since', 
          type: 'double-input', 
          placeholders: ['Month', 'Year']
        },
        { 
          label: 'Usage type', 
          type: 'button-group', 
          options: ['Personal', 'Work', 'Both']
        },
        { label: 'Line of Work', type: 'text', placeholder: 'IT, Finance, Marketing, Public-relations, etc.' },
        { label: 'Role', type: 'text', placeholder: 'Student, Shop Keeper, Accountant, etc.' }
      ]
    },
    {
      id: 3,
      title: 'Parallel Number',
      price: '$ 2000',
      fields: [
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' },
        { 
          label: 'Mobile Number', 
          type: 'isd-mobile', 
          placeholders: ['ISD', 'Mobile Number']
        },
        { 
          label: 'Using this number since', 
          type: 'double-input', 
          placeholders: ['Month', 'Year']
        },
        { 
          label: 'Usage type', 
          type: 'button-group', 
          options: ['Personal', 'Work', 'Both']
        },
        { label: 'Role', type: 'text', placeholder: 'Student, Shop Keeper, Accountant, etc.' },
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' }
      ]
    },
    {
      id: 4,
      title: 'Previous Number',
      price: '$ 2000',
      fields: [
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' },
        { 
          label: 'Mobile Number', 
          type: 'isd-mobile', 
          placeholders: ['ISD', 'Mobile Number']
        },
        { 
          label: 'Used since', 
          type: 'double-input', 
          placeholders: ['Month', 'Year'],
          label2: 'Used till',
          placeholders2: ['Month', 'Year']
        },
        { 
          label: 'Usage type', 
          type: 'button-group', 
          options: ['Personal', 'Work', 'Both']
        },
        { label: 'Role', type: 'text', placeholder: 'Student, Shop Keeper, Accountant, etc.' },
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' }
      ]
    },
    {
      id: 5,
      title: 'Compatibility Numbers',
      price: '$ 2500',
      fields: [
        { 
          label: 'Mobile Number', 
          type: 'isd-mobile', 
          placeholders: ['ISD', 'mobile number']
        },
        { label: 'Relationship with the user', type: 'text', placeholder: 'spouse, partner' }
      ]
    },
    {
      id: 6,
      title: 'Compatibility Numbers',
      price: '$ 3000',
      fields: [
        { 
          label: 'Mobile Number', 
          type: 'isd-mobile', 
          placeholders: ['ISD', 'mobile number']
        },
        { label: 'Relationship with the user', type: 'text', placeholder: 'spouse, partner' },
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' },
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' },
        { label: 'Add Number', type: 'button', placeholder: 'Add Number', additionalText: 'If any' }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentForm = formSteps[currentStep];

  return (
    <div className="min-vh-100 bg-black text-white d-flex align-items-center py-5">
      <style>{`
        .form-container {
          max-width: 450px;
          margin: 0 auto;
        }
        
        .form-card {
          background: transparent;
          border: 2px solid #ff6b35;
          border-radius: 15px;
        
        }
          .form-cards{
          padding:2rem;
          }
        
        .form-title {
          font-size: 1.8rem;
          font-weight: 300;
          margin-bottom: 2rem;
         
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 2.5rem;
          text-align: start;
        }
        
        .field-label {
          font-size: 1.1rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .additional-text {
          font-size: 0.95rem;
          color: #e0e0e0;
        }
        
        .form-input {
          width: 100%;
          background: transparent;
          border: 1.5px solid #666;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          height: 48px;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25);
        }
        
        .form-input::placeholder {
          color: #999;
        }
        
        .btn-option {
          background: transparent;
          border: 1.5px solid #666;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-option:hover {
          border-color: #ff6b35;
        }
        
        .btn-option.active {
          background: #ff6b35;
          border-color: #ff6b35;
        }
        
        .isd-input {
          width: 80px;
          background: transparent;
          border: 1.5px solid #666;
          border-radius: 8px;
          padding: 0.75rem 0.5rem;
          color: white;
          font-size: 1rem;
          text-align: center;
          height: 48px;
        }
        
        .isd-input:focus {
          outline: none;
          border-color: #ff6b35;
        }
        
        .mobile-input {
          flex: 1;
          background: transparent;
          border: 1.5px solid #666;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 1rem;
          height: 48px;
        }
        
        .mobile-input:focus {
          outline: none;
          border-color: #ff6b35;
        }
        
        .navigation-text {
          color: #ff6b35;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .navigation-text:hover {
          color: #ff8c5a;
        }
        
        .navigation-text.disabled {
          color: #666;
          cursor: not-allowed;
        }
        
        .price-btn {
          background: transparent;
          border: 2px solid #ff6b35;
          border-radius: 8px;
          padding: 0.75rem 2rem;
          color: white;
          font-size: 1.3rem;
          font-weight: 400;
        }
        
        .proceed-btn {
          background: #333;
          border: 2px solid #666;
          border-radius: 8px;
          padding: 0.75rem 2rem;
          color: white;
          font-size: 1.3rem;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .proceed-btn:hover {
          background: #444;
          border-color: #777;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .form-card {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
          
          .field-label {
            font-size: 1rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
          }
          
          .btn-option {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .form-input,
          .mobile-input {
            font-size: 0.9rem;
            padding: 0.6rem 0.8rem;
          }
          
          .price-btn,
          .proceed-btn {
            font-size: 1.1rem;
            padding: 0.6rem 1.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 1.6rem;
          }
          
          .form-title {
            font-size: 1.3rem;
          }
          
          .btn-option {
            padding: 0.5rem 0.8rem;
            font-size: 0.85rem;
          }
          
          .isd-input {
            width: 70px;
          }
          
          .price-btn,
          .proceed-btn {
            font-size: 1rem;
            padding: 0.5rem 1.2rem;
          }
        }
      `}</style>

      <div className="container">
        <h1 className="section-title text-center">Consultation Booking</h1>
        
        <div className="form-container">
          <div className="form-card">
          <div className="form-cards">

            <h2 className="form-title text-start">{currentForm.title}</h2>
            
            {currentForm.fields.map((field, index) => (
              <div key={index} className="mb-3 ">
                {field.type === 'text' && (
                  <>
                    <div className="field-label">
                      <span>{field.label}</span>
                      {field.additionalText && <span className="additional-text ">{field.additionalText}</span>}
                    </div>
                    <input type="text" className="form-input fw-light" placeholder={field.placeholder} />
                  </>
                )}
                
                {field.type === 'email' && (
                  <>
                    <div className="field-label">
                      <span>{field.label}</span>
                      {field.additionalText && <span className="additional-text">{field.additionalText}</span>}
                    </div>
                    <input type="email" className="form-input" placeholder={field.placeholder} />
                  </>
                )}
                
                {field.type === 'button-group' && (
                  <>
                    <div className="field-label">
                      <span>{field.label}</span>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {field.options.map((option, idx) => (
                        <button
                          key={idx}
                          className={`btn-option ${selectedUsageType[`${currentStep}-${index}`] === option ? 'active' : ''}`}
                          onClick={() => setSelectedUsageType({...selectedUsageType, [`${currentStep}-${index}`]: option})}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                
                {field.type === 'double-input' && (
                  <>
                    <div className="field-label">
                      <span>{field.label}</span>
                    </div>
                    <div className="d-flex gap-2 mb-3">
                      <input type="text" className="form-input" placeholder={field.placeholders[0]} style={{flex: 1}} />
                      <input type="text" className="form-input" placeholder={field.placeholders[1]} style={{flex: 1}} />
                    </div>
                    {field.label2 && (
                      <>
                        <div className="field-label">
                          <span>{field.label2}</span>
                        </div>
                        <div className="d-flex gap-2">
                          <input type="text" className="form-input" placeholder={field.placeholders2[0]} style={{flex: 1}} />
                          <input type="text" className="form-input" placeholder={field.placeholders2[1]} style={{flex: 1}} />
                        </div>
                      </>
                    )}
                  </>
                )}
                
                {field.type === 'isd-mobile' && (
                  <>
                    <div className="field-label">
                      <span>{field.label}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <input type="text" className="isd-input" placeholder={field.placeholders[0]} />
                      <input type="text" className="mobile-input" placeholder={field.placeholders[1]} />
                    </div>
                  </>
                )}
                
                {field.type === 'button' && (
                  <>
                    <div className="d-flex gap-2 align-items-center">
                      <button className="btn-option" style={{flex: 1}}>{field.placeholder}</button>
                      {field.additionalText && <span className="additional-text">{field.additionalText}</span>}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {/* Navigation */}
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
              <span 
                className={`navigation-text ${currentStep === 0 ? 'disabled' : ''}`}
                onClick={handlePrev}
              >
                &#60;&#60;&#60; prev
              </span>
              <span 
                className={`navigation-text ${currentStep === formSteps.length - 1 ? 'disabled' : ''}`}
                onClick={handleNext}
              >
                next &#62;&#62;&#62;
              </span>
            </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="d-flex ">
              <button className="price-btn" style={{flex: 1}}>{currentForm.price}</button>
              <button className="proceed-btn" style={{flex: 1}}>Proceed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}