import React, { useState, useEffect, useCallback } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  const handleAddRepository = useCallback(async () => {
    const { data: newRepo } = await api.post('repositories', {
      url: 'https://github.com/guilhermedeandrade/neues',
      title: 'neues',
      techs: ['foo', 'bar', 'baz'],
    })

    setRepositories([...repositories, newRepo])
  }, [setRepositories, repositories])

  const handleRemoveRepository = useCallback(
    async id => {
      await api.delete(`repositories/${id}`)

      setRepositories(repositories.filter(repo => repo.id !== id))
    },
    [setRepositories, repositories]
  )

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
