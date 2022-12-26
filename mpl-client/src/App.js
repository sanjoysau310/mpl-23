import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import { useEffect, useState } from "react";
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
import Layout from "./components/layout/Layout";
import { PlayerView } from "./components/players/PlayerView";
import AuctionSearch from "./components/dashboard/auction/AuctionSearch";
import { useStoreContext } from "./context/StoreContext";
import { isAdmin, isPlayer } from "./util/tokenUtils";
import AuctionListSold from "./components/dashboard/auction/AuctionListSold";
import AuctionListUnsold from "./components/dashboard/auction/AuctionListUnSold";
import AuctionPurse from "./components/dashboard/auction/AuctionPurse";

function App() {
  const { store, setStore } = useStoreContext();
  const [adminAccess, setAdminAccess] = useState(false);
  const [playerAccess, setPlayerAccess] = useState(false);

  useEffect(() => {
    if (store && store.token) {
      setAdminAccess(isAdmin(store.token));
      setPlayerAccess(isPlayer(store.token));
    } else {
      let token = sessionStorage.getItem("token");
      if (token) {
        setStore(token);
        setAdminAccess(isAdmin(token));
        setPlayerAccess(isPlayer(token));
      } else {
        setAdminAccess(false);
        setPlayerAccess(false);
      }
    }
    // console.log(store);
  }, [store]);

  return (
    <>
      <Router>
        {/* {console.log(store)} */}
        <Layout>
          <Routes>
            {/* public routes*/}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/playersview" element={<PlayersViewPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/successpage" element={<SuccessfulPage />} />
            <Route path="/errorpage" element={<ErrorPage />} />
            <Route path="/pay/:id" element={<Payment />} />
            <Route path="/paysuccesspage" element={<PaymentSuccessPage />} />
            <Route path="/payfailpage" element={<PaymentFailPage />} />
            {/*protected routes*/}
            <Route
              path="/playerview/:email"
              element={playerAccess ? <PlayerView /> : <LoginPage />}
            />
            {/*admin role*/}

            <Route
              path="/home"
              element={adminAccess ? <HomePage /> : <LoginPage />}
            />
            <Route
              path="/auctionsearch"
              element={adminAccess ? <AuctionSearch /> : <LoginPage />}
            />
            <Route
              path="/auctionpage"
              element={adminAccess ? <AuctionPage /> : <LoginPage />}
            />
            <Route
              path="/auctionlist"
              element={adminAccess ? <AuctionList /> : <LoginPage />}
            />
            <Route
              path="/auctionlistsold"
              element={adminAccess ? <AuctionListSold /> : <LoginPage />}
            />
            <Route
              path="/auctionlistunsold"
              element={adminAccess ? <AuctionListUnsold /> : <LoginPage />}
            />
            <Route
              path="/playerauction/:id"
              element={adminAccess ? <PlayerAuction /> : <LoginPage />}
            />
            <Route
              path="/auctionteampurse"
              element={adminAccess ? <AuctionPurse /> : <LoginPage />}
            />
            <Route
              path="/playerspage"
              element={adminAccess ? <PlayersPage /> : <LoginPage />}
            />
            <Route
              path="/players"
              element={adminAccess ? <PlayersList /> : <LoginPage />}
            />
            <Route
              path="/player/:id"
              element={adminAccess ? <PlayerProfile /> : <LoginPage />}
            />
            <Route
              path="/teamspage"
              element={adminAccess ? <TeamsList /> : <LoginPage />}
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
