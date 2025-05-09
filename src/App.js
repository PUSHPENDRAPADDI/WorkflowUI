import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import IdeaModal from './pages/IdeaModal';
import IdeaSummaryScreenWithAccordion from './pages/IdeaSummaryScreenWithAccordion';
import PersonaCards from './pages/PersonaCard';
import MoSCoWScreen from './pages/MoSCoWScreen';
import { ThemeProvider } from '@emotion/react';
import lightSkyBlueTheme from './theme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={lightSkyBlueTheme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='ideaSummaryScreen' element={<IdeaSummaryScreenWithAccordion />} />
            <Route path='persona' element={<PersonaCards />} />
            <Route path='moscow' element={<MoSCoWScreen />} />
          </Routes>
        </Layout>
        <IdeaModal />
      </ThemeProvider>
    </Router>
  );
}

export default App;
