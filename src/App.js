import './App.css';
import Home from './Component/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/freefeature" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
