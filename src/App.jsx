import './App.css'
import Navbar from './components/navbar'
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <ItemListContainer greeting="Bienvenido a Bizzco Cakes and Cookies" />
      </main>
    </div>
  )
}

export default App
