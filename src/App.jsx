
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import CommanRoutes from './Routes/CommanRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import UserRoutes from './Routes/UserRoutes';


function App() {



  return (
    <>

      <BrowserRouter>
        <AdminRoutes />
        {/* <CommanRoutes /> */}
        <UserRoutes />
      </BrowserRouter>



    </>
  )
}

export default App
