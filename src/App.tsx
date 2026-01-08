import React from "react";
import { Toaster } from "sonner";
import "./App.css";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Title from "./components/Title";
function App() {
  const [query, setQuery] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  React.useEffect(() => {
    if (searchInput.trim() === "") setQuery("");
  }, [searchInput]);
  return (
    <>
      <div className="app">
        <Navbar />
        <Title />
        <div className="hero-section">
          <SearchBar
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            onSearch={() => setQuery(searchInput.trim())}
          />
          <Form query={query} />
        </div>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
export default App;
