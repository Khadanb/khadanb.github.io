import { SinglePageLayout } from './components/layout';
import { ScrollProvider } from './context/ScrollContext';
import { CollisionProvider } from './context/CollisionContext';

function App() {
  return (
    <ScrollProvider>
      <CollisionProvider>
        <SinglePageLayout />
      </CollisionProvider>
    </ScrollProvider>
  );
}

export default App;
