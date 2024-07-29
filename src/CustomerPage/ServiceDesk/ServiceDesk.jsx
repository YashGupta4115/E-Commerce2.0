import React, { useState } from "react";
import "./ServiceDesk.css";
import { serviceDeskData } from "../../Assests/data";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ServiceDesk = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(-1);
  const navigate = useNavigate();

  const faqData = serviceDeskData.filter((data) => data.type === "FAQs");

  const faqToggle = (data) => {
    setOpenFaqId(data.id);
    setIsFaqOpen(!isFaqOpen);
  };
  return (
    <div className="ServiceDeskPage">
      <div className="faqs-container">
        <h1 className="Servive-desk-title">Faqs</h1>
        <div className="Faqs-section">
          {faqData.map((data) => {
            return (
              <div key={data.id} className="faqs-individual">
                <div>
                  {data.question}{" "}
                  {isFaqOpen && data.id === openFaqId ? (
                    <IoIosArrowUp onClick={() => faqToggle(data)} />
                  ) : (
                    <IoIosArrowDown onClick={() => faqToggle(data)} />
                  )}
                </div>
                {data.id === openFaqId ? (
                  <p>{isFaqOpen ? data.answer : ""}</p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="portals-section">
        <h1 className="Servive-desk-title">Portals</h1>
        <button
          type="button"
          className="service-desk-button"
          onClick={() => navigate("/ecommerce/serviceDesk/raise-a-ticket")}
        >
          Issue ? Raise a Ticket !
        </button>
      </div>
    </div>
  );
};

export default ServiceDesk;
