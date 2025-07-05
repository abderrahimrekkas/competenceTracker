import { useState } from 'react';
import CompetenceList from './components/CompetenceList';
import AddCompetenceForm from './components/AddCompetenceForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="">
      <AddCompetenceForm onAdd={() => setRefresh(!refresh)} />
      <CompetenceList key={refresh} />
    </div>
  );
}

export default App;
