import Navbar from './components/Navbar.jsx';
import { Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products/:id' element={<ProductPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App
