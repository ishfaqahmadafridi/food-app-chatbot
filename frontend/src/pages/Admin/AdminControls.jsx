import React from 'react';
import { Plus } from 'lucide-react';

const AdminControls = ({ showForm, onToggleForm }) => {
  return (
    <div className="flex gap-4 mb-8">
      <button 
        className="bg-green-600 text-white border-0 py-3 px-6 rounded-[25px] cursor-pointer text-base font-medium flex items-center gap-2 transition-all hover:bg-[#229954] hover:-translate-y-0.5"
        onClick={onToggleForm}
      >
        <Plus size={20} /> {showForm ? 'Cancel' : 'Add New Item'}
      </button>
    </div>
  );
};

export default AdminControls;
