import React, { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./NotificationDropDown.css";
import { cartContext } from "../../../Context/cartContext";
import { UserContext } from "../../../Context/userContext";
import { getAuthDocuments } from "../../../Firebase/firebase";

const NotificationDropDown = () => {
  const { isNoficationOpen, setIsNoficationOpen } = useContext(cartContext);
  const { currentUser } = useContext(UserContext);
  const [notification, setNotification] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (currentUser) {
        setIsLoading(true);
        const fetchedCartItems = await getAuthDocuments(currentUser.uid);
        setNotification(fetchedCartItems?.notifications || []);
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, [currentUser]);

  return (
    <div className="cart-dropDown-container">
      <div className="navPopUp-title">
        <div>
          Notifications
          {notification ? <span>{`(${notification.length})`}</span> : ""}
        </div>
        <IoIosCloseCircleOutline
          className="navPopUp-toggleIcon"
          onClick={() => setIsNoficationOpen(!isNoficationOpen)}
        />
      </div>
      <hr />
      {isLoading ? (
        "Loading..."
      ) : notification ? (
        notification.map((item, index) => (
          <div key={index} className="item-box">
            <div className="item-nameAndQuantity">
              <span className="item-name">{item}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-cart">No Notifications</div>
      )}
    </div>
  );
};

export default NotificationDropDown;
