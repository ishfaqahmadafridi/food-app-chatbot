
import AdminHeader from './AdminHeader';
import AdminControls from './AdminControls';
import AdminFormSection from './AdminFormSection';
import AdminItemsSection from './AdminItemsSection';
import { useState } from 'react';

const Admin = () => {

  const [showForm] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <AdminHeader />
      <div className="max-w-1200px mx-auto">
        <AdminControls />
        {showForm && (
          <AdminFormSection />
        )}
        <AdminItemsSection />
      </div>
    </div>
  );
};

export default Admin;