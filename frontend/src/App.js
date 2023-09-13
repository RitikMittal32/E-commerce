
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import SignUp from './components/SignUp';
import Footer from './components/footer';
import Private from './components/Private';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';



function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>

          <Route path="/" element={<ProductList />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct />}/>
          <Route element={<Private />}>
            <Route path='/logout' element={<h1></h1>}/>
          </Route>
          <Route path='/profile' element={<h1></h1>}/>


          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
