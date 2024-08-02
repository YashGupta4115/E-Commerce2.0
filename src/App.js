import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import SignIn from './Components/Auth/SignIn';
import NavBar from './CustomerPage/navBar/navBar';
import HomePage from './CustomerPage/HomePage/HomePage';
import CategoryItemLanding from "./CustomerPage/Components/CategoryItemLanding/CategoryItemLanding";
import ItemListAndShop from "./CustomerPage/Components/ItemListAndShop/ItemListAndShop";
import SignInUpPage from "./CustomerPage/Authentication/CustomerAuth/SignInUpPage.jsx";
import CheckOutPage from "./CustomerPage/Components/CheckOutPage/CheckOutPage.jsx";
import AllItems from "./CustomerPage/Components/All_ItemsForSearch/AllItems.jsx";
import ServiceDesk from "./CustomerPage/ServiceDesk/ServiceDesk.jsx";
import TicketRaiser from "./CustomerPage/Components/TicketRaiser/TicketRaiser.jsx";
import AllIssues from "./CustomerPage/Components/AllIssues/AllIssues.jsx";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/adminAuth" element={<SignIn />} />
        <Route path="/ecommerce" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path=":category" element={<CategoryItemLanding />} />
          <Route path=":category/:type" element={<ItemListAndShop />} />
          <Route path="sign-in" element={<SignInUpPage/>}/>
          <Route path='checkout' element={<CheckOutPage/>}/>
          <Route path='search' element={<AllItems/>}/>
          <Route path="serviceDesk" element={<ServiceDesk/>}/>
          <Route path='serviceDesk/raise-a-ticket' element={<TicketRaiser/>} />
          <Route path='serviceDesk/allIssues' element={<AllIssues/>}/>
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
