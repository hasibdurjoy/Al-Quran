import "./App.css";
import Quran from "./components/Quran/Quran";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Surah from "./components/Surah/Surah";
import { DataProvider } from "./Context/DataProvider";
import { useState } from "react";
import Player from "./components/Player/Player";

function App() {
  const [searchData, setSearchData] = useState("");
  const [selectedPlay, setSelectedPlay] = useState([]);
  const handlePlaySurah = (data) => {
    setSelectedPlay(data);
  };
  return (
    <div className="App">
      <DataProvider.Provider
        value={{ searchData, setSearchData, handlePlaySurah, selectedPlay }}
      >
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Quran />} />
            <Route
              path="/player"
              element={<Player selectedPlay={selectedPlay} />}
            />
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
