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
    <Title/>
      <Navbar/>
      <SearchBar/>
      <Form/>
      {/* <Table/> */}
      <Footer/>
    </>
  )
}

export default App
