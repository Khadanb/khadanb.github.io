import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  HomePage,
  ProjectsPage,
  PublicationsPage,
  ResumePage,
  ContactPage,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
