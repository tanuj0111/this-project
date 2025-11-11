import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ConsultationPlans() {
  const plans = [
    {
      id: 1,
      title: "Unmarried Individual",
      price: "$ 2000",
      description:
        "For students, freelancers, or solo entrepreneurs",
    },
    {
      id: 2,
      title: "Married Individual",
      price: "$ 2500",
      description:
        "For those whose number must be considered alongside a spouse or partner",
    },
    {
      id: 3,
      title: "Individual with Extended Compatibility",
      price: "$ 3000",
      description:
        "For entrepreneurs, co-founders, or professionals requiring compatibility checks with up to 4 other people.",
    },
  ];

  return (
    <section className=" bg-black text-white d-flex align-items-center py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-light display-5 mb-3">Consultation Plans</h1>
          <p className="fs-5 fw-light  mb-1">
            Each plan is designed for one mobile number.
          </p>
          <p className="fs-6 fw-light ">
            The depth of analysis varies with your alignment needs.
          </p>
        </div>

        {/* Plans Section */}
      <div className="row justify-content-center g-4">
  {plans.map((plan) => (
    <div key={plan.id} className="col-12 col-md-10 col-lg-7">
      <div
        className="rounded-4 p-4 h-100 text-white bg-transparent"
  style={{
    border: "3px solid #ff6b35",
    transition: "0.3s",
  }}
      >
        <div className="d-flex justify-content-between flex-wrap mb-3">
          <h3 className="fw-normal fs-4 mb-2 text-start">{plan.title}</h3>
          <span className="fw-semibold fs-4">{plan.price}</span>
        </div>
        <p className="fs-6 fw-light mb-0 text-start">
          {plan.description}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
