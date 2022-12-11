import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/dashboard/home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import { LandingPage } from "./components/pages/LandingPage";
import SuccessfulPage from "./components/pages/SuccessfulPage";
import ContactPage from "./components/pages/ContactPage";
import PlayerProfile from "./components/dashboard/players/PlayerProfile";
import PlayerAuction from "./components/dashboard/auction/PlayerAuction";
import ErrorPage from "./components/pages/ErrorPage";
import PlayersList from "./components/dashboard/players/PlayersList";
import AuctionPage from "./components/dashboard/auction/AuctionPage";
import AuctionList from "./components/dashboard/auction/AuctionList";
import TeamsList from "./components/dashboard/teams/TeamsList";
import PlayersPage from "./components/dashboard/players/PlayersPage";
import Payment from "./components/payment/Payment";
import PaymentSuccessPage from "./components/payment/PaymentSuccessPage";
import PaymentFailPage from "./components/payment/PaymentFailPage";
import PlayersViewPage from "./components/pages/PlayersViewPage";
import AboutPage from "./components/pages/AboutPage";
import EventPage from "./components/pages/EventPage";
import GalleryPage from "./components/pages/GalleryPage";
import TeamsPage from "./components/pages/TeamsPage";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/" element={<Upload />} /> */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/playersview" element={<PlayersViewPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/successpage" element={<SuccessfulPage />} />
            <Route path="/errorpage" element={<ErrorPage />} />
            <Route path="/pay/:id" element={<Payment />} />
            <Route path="/paysuccesspage" element={<PaymentSuccessPage />} />
            <Route path="/payfailpage" element={<PaymentFailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/auctionpage" element={<AuctionPage />} />
            <Route path="/auctionlist" element={<AuctionList />} />
            <Route path="/playerauction/:id" element={<PlayerAuction />} />
            <Route path="/playerspage" element={<PlayersPage />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/teamspage" element={<TeamsList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
