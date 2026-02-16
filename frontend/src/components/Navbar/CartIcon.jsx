import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'

const CartIcon = () => {
  const { getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate('/cart')} 
      style={{ 
        cursor: 'pointer', 
        marginRight: '15px',
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <ShoppingCart size={24} />
      {getTotalCartAmount() > 0 && (
        <div style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '10px',
          height: '10px',
          backgroundColor: 'tomato',
          borderRadius: '50%'
        }}></div>
      )}
    </div>
  )
}

export default CartIcon
