import './App.css';
import SessionClaim from './components/SessionClaim'
import SessionListing from './components/SessionListing';

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO THE CITY FARM</h1>
      <SessionListing />
      <SessionClaim/>
    </div>
  );
}

export default App;
