import "./App.css";
import Quran from "./components/Quran/Quran";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Surah from "./components/Surah/Surah";
import { DataProvider } from "./Context/DataProvider";
import { useState } from "react";

function App() {
  const [searchData, setSearchData] = useState("");
  return (
    <div className="App">
      <DataProvider.Provider value={{ searchData, setSearchData }}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Quran />} />
            <Route path="/surah">
              <Route path={`/surah/:surahNumber`} element={<Surah />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider.Provider>
    </div>
  );
}

export default App;
