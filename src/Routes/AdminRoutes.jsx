import { Routes, Route } from 'react-router-dom';
 
import AdminLayout from '../Admin/Layout/AdminLayout';
import Dashboard from '../Admin/Pages/Dashboard';
import Test from '../Admin/Pages/Test';


const AdminRoutes = () => {
  return (
 

    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="Test" element={<Test />} />
      </Route>
    </Routes>
 
  );
};

export default AdminRoutes;
