import './App.css'
import Footer from './components/Footer'
import Form from './components/Form'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Title from './components/Title'

function App() {
  

  return (
    <>
      <div className="app">
        {/* <Title/> */}
        <Navbar />
        <div className='hero-section'>
          <SearchBar />
          <Form />
        </div>

        {/* <Table/> */}
        <Footer />
      </div>
    </>
  );
}

export default App
