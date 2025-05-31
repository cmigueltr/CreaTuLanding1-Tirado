import './css/App.css'
import Navbar from './components/navbar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Bienvenidos a Bizzco Cakes and Cookies" />} />
            <Route path="/category/:categoryId" element={<ItemListContainer/>} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

