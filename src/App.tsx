import HeaderTop1 from '@common/header/HeaderTop1';
import LoadingIndicator from '@common/loading-indicator/LoadingIndicator';
import MessageModal from '@common/message-modal/MessageModal';
import ProtectedRoute from '@common/protected-route/ProtectedRoute';
import { LoadingProvider, useLoading } from '@contexts/LoadingContext';
import { MessageProvider } from '@contexts/MessageContext';
import AddInfo from '@pages/Admin/AddInfo';
import Profile from '@pages/Admin/Profile';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@common/footer/Footer';
import Home from '@pages/Dashboard/Home';
import AddActionPage from '@pages/User/AddActionPage';
import EditActionPage from '@pages/User/EditAuctionPage';
import NotFound from '@pages/notFoundPage';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  Contract,
  SuccessPage,
  OTPPage,
  DetailAuctionPage,
  DetailPage,
  ListAuction,
  AuctionDetail,
  ForgotPage,
  InforUser,
  CancelPage,
  ResetPasswordPage,
  About,
  ChangePasswordPage,
  ListYourAuction,
  AuctionRoom,
  AddAdminPage,
} from '@pages/index';
import Updateprofile from '@pages/UpdateProfile';
import ListAccountPage from '@pages/Admin/ListAccountPage';

const AppRoutes: React.FC = () => {
  const { isLoading } = useLoading();
  const getRole = () => {
    const role = localStorage.getItem('role');
    return role;
  };
  return (
    <>
      <MessageModal />
      {isLoading && <LoadingIndicator />}

      <Routes>
      <Route path="/" element={getRole() === 'admin' ? <Navigate to="/dashboard" /> : <HomePage />} />
        <Route path="/thong-tin-chi-tiet/:id" element={<DetailPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          {getRole() == 'user' && (
            <>
              <Route path="/phien-dau-gia/:id" element={<DetailPage />} />
              <Route path="/add-auction" element={<AddActionPage />} />
              <Route path="/edit-auction" element={<EditActionPage />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/listYourAuction" element={<ListYourAuction />} />
              <Route path="/detail-auction/:id" element={<DetailAuctionPage />} />
            </>
          )}
          {getRole() == 'admin' && (
            <>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/listAuction" element={<ListAuction />} />
              <Route path="/addAdminPage" element={<AddAdminPage />} />
              <Route path="/auctionDetail/:id" element={<AuctionDetail />} />
              <Route path="/listuser" element={<ListAccountPage />} />
            </>
          )}
          <Route path="/contract" element={<Contract />} />
          <Route path="/auctionRoom" element={<AuctionRoom />} />
          <Route path="/add-info" element={<AddInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changePasswordPage" element={<ChangePasswordPage />} />
          <Route path="/inforUser" element={<InforUser />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/update-profile" element={<Updateprofile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/resetPasswordPage/:token/:gmail" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  const location = useLocation();
  const hidenHeader = ['/login', '/forgot', '/sign-up', '/add-info', '/otp'];
  return (
    <LoadingProvider>
      <MessageProvider>
        <div className="w-full flex flex-col bg-white">
          {!hidenHeader.includes(location.pathname) && <HeaderTop1 />}
          <div className="bg-white">
            <AppRoutes />
          </div>
          {!hidenHeader.includes(location.pathname) && <Footer />}
        </div>
      </MessageProvider>
    </LoadingProvider>
  );
};

export default App;
