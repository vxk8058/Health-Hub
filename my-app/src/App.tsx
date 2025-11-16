import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import WelcomeScreen from './components/WelcomeScreen.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;