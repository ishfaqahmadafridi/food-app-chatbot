import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const AdminItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 transition-all hover:border-[#667eea] hover:shadow-[0_5px_20px_rgba(102,126,234,0.2)] hover:-translate-y-1">
      {item.image && (
        <div className="mb-2.5">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-150px object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <h3 className="m-0 text-gray-800 text-lg font-semibold">{item.name}</h3>
        <div className="flex gap-2">
          <button
            className="bg-transparent border-0 cursor-pointer p-2 rounded-md transition-all text-blue-500 hover:bg-gray-100 hover:text-[#2980b9] flex items-center justify-center"
            onClick={() => onEdit(item)}
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            className="bg-transparent border-0 cursor-pointer p-2 rounded-md transition-all text-red-500 hover:bg-gray-100 hover:text-[#c0392b] flex items-center justify-center"
            onClick={() => onDelete(item.id || item._id)}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col gap-2.5">
        <p className="m-0 text-gray-600 text-sm leading-6"><strong className="text-gray-800">Price:</strong> Rs. {Math.floor(Number(item.price))}</p>
        <p className="m-0 text-gray-600 text-sm leading-6"><strong className="text-gray-800">Category:</strong> {item.category_name || item.category || 'N/A'}</p>
        <p className="m-0 text-gray-600 text-sm leading-6"><strong className="text-gray-800">Description:</strong> {item.description || 'N/A'}</p>
        <p className="m-0 text-gray-600 text-sm leading-6"><strong className="text-gray-800">Status:</strong> {item.is_available ? '✅ Available' : '❌ Unavailable'}</p>
      </div>
    </div>
  );
};

export default AdminItemCard;
