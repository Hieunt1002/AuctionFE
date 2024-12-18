import { UpdatePayment } from '../queries/AuctionAPI';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('orderCode');
  const status = queryParams.get('status');
  const [isFetch, setIsFetch] = useState(true);

  const handleReturnHome = () => {
    navigate('/', {state : {data: '0'}});
  };

  useEffect(() => {
    if (isFetch) {
      const updatePaymentStatus = async () => {
        try {
          if (id && status === 'CANCELLED') {
            await UpdatePayment(id, 'cancel');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-red-600 mb-4">Payment has been cancelled!</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-lg">
      Your payment transaction has been canceled. If you have any questions, please contact us for support.
      </p>
      <button
        onClick={handleReturnHome}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Back to home page
      </button>
    </div>
  );
};

export default CancelPage;
