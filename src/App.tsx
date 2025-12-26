import { SinglePageLayout } from './components/layout';
import { ScrollProvider } from './context/ScrollContext';

function App() {
  return (
    <ScrollProvider>
      <SinglePageLayout />
    </ScrollProvider>
  );
}

export default App;
