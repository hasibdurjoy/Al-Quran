import logo from './logo.svg';
import './App.css';
import Quran from './components/Quran/Quran';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Surah from './components/Surah/Surah';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route exact path="/" element={<Quran />} />
            <Route path="/surah"  >
              <Route path={`/surah/:surahNumber`} element={<Surah />} />
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
