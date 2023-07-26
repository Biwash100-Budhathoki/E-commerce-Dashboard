import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer' 
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateComponent  from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
//import EsewaForm from './components/eSewaForm';
import { useState } from 'react';
import PaymentForm from "./components/eSewaForm";
import SuccessPage from "./components/SuccessPage";
import FailurePage from "./components/FailurePage";
import EsewaPage from './components/eSewaPage';

function App() {

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
            <Route path="/pay" element={<PaymentForm />} />
            <Route path="/payment/success" element={<SuccessPage />} />
            <Route path="/payment/failure" element={<FailurePage />} />
            <Route path="/payment" element={<EsewaPage />} />

          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
