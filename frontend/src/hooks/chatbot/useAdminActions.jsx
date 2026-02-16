import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import toast from 'react-hot-toast';

const useAdminActions = () => {
  const { refreshFoodItems } = useContext(StoreContext);

  const handleAdminResponse = async (replyText) => {
    if (!replyText.includes('✅')) return;

    await refreshFoodItems();
    
    if (replyText.includes('added')) {
      toast.success('Item added!');
    } else if (replyText.includes('removed')) {
      toast.success('Item removed!');
    } else if (replyText.includes('updated')) {
      toast.success('Item updated!');
    }
  };

  return { handleAdminResponse };
};

export default useAdminActions;
