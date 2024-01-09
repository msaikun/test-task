import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { AllPlacesPage } from '../modules/pages/AllPlacesPage';
import { AdditionalPlaceInfoPage } from '../modules/pages/AdditionalPlaceInfoPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/test-task" element={<AllPlacesPage />} />
      <Route path="/test-task/:id" element={<AdditionalPlaceInfoPage />} />

      <Route path="*" element={<AllPlacesPage />} />
    </Routes>
  </Router>
);

export default App;
