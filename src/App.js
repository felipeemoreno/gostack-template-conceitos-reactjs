import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';


function App() {

  // useState returns an array with two positions;
  // The first position returns the variable with the initial value, 
  // The second position returns a function to update this value.
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:`Projeto Teste1 ${Date.now()}`,
      url: "https://github.com/felipeemoreno",
      techs:["Node.js", "PHP", "Wordpress"]
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  };

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if(response.status === 204){
      
      const repositorieIdx = repositories.findIndex(repositorie => repositorie.id === id);
      
      repositories.splice(repositorieIdx,1);
      
      setRepositories([...repositories]);

    }

  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(repositorie => (
        <li key={repositorie.id}>
          {repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
      ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
