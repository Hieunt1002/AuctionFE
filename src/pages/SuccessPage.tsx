import { UpdatePayment } from '../queries/AuctionAPI';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('orderCode');
    const status = queryParams.get('status');
    const [isFetch, setIsFetch] = useState(true);
  
    const handleReturnHome = () => {
      navigate('/', {state : {data: '4'}});
    };
  
    useEffect(() => {
      if (isFetch) {
        const updatePaymentStatus = async () => {
          try {
            if (id && status === 'PAID') {
              await UpdatePayment(id, 'success');
            }
          } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thanh toán', error);
          }
        };
  
        updatePaymentStatus();
        setIsFetch(false);
      }
    }, [id, status, isFetch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment successful!</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-lg">
      Thank you for bidding. Your payment has been processed successfully.
      </p>
      <button
        onClick={handleReturnHome}
        className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        Back to home page
      </button>
    </div>
  );
};

export default SuccessPage;
