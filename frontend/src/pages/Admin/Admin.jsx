
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminControls from '../../components/Admin/AdminControls';
import AdminFormSection from '../../components/Admin/AdminFormSection';
import AdminItemsSection from '../../components/Admin/AdminItemsSection';
import { useSelector } from 'react-redux';

const Admin = () => {

  const { showForm } = useSelector((state) => state.form);
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