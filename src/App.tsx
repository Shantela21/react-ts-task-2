import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
function App() {
  const [query, setQuery] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  return (
    <>
      <div className="app">
        {/* <Title/> */}
        <Navbar />
        <div className="hero-section">
          <SearchBar
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            onSearch={() => setQuery(searchInput.trim())}
          />
          <Form query={query} />
        </div>
        {/* <Table/> */}
        <Footer />
      </div>
    </>
  );
}
export default App;
