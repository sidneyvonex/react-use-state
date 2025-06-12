import { useState } from 'react';
import './App.css';
import { JokeComponent } from './Components/JokeComponent';
import type { Joke } from './types';

function App() {
  const initialJokes: Joke[] = [
    { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything!", rate: 4 },
    { id: 2, joke: "What's a programmer's favorite place? The Foo Bar!", rate: 4 },
    { id: 3, joke: "Parallel lines have so much in common. It's a shame they'll never meet.", rate: 4 },
    { id: 4, joke: "What do you call a fake noodle? An Impasta.", rate: 3 },
    { id: 5, joke: "What did the pirate say on his 80th birthday? Aye Matey!", rate: 3 },
    { id: 6, joke: "What's the best part about living in Switzerland? I don't know, but the flag is a big plus.", rate: 2 },
    { id: 7, joke: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!", rate: 2 },
    { id: 8, joke: "Why do we tell actors to break a leg? Because every play has a cast.", rate: 1 },
    { id: 9, joke: "Helvetica and Times New Roman walk into a bar. 'Get out of here!' shouts the bartender. 'We don't serve your type.'", rate: 1 },
    { id: 10, joke: "Yesterday I saw a guy spill all his Scrabble letters on the road. I asked him, 'What's the word on the street?'", rate: 0 }
  ];

  const [jokes, setJokes] = useState<Joke[]>(initialJokes);
  const [newJokeText, setNewJokeText] = useState('');

  const addJoke = () => {
    const trimmed = newJokeText.trim();
    if (trimmed) {
      const newJoke: Joke = {
        id: Date.now(),
        joke: trimmed,
        rate: 0
      };
      setJokes([...jokes, newJoke]);
      setNewJokeText('');
    }
  };

  const changeRate = (id: number, delta: number) => {
    setJokes(jokes.map(j => j.id === id ? { ...j, rate: j.rate + delta } : j));
  };

  const updateJoke = (updated: Joke) => {
    setJokes(jokes.map(j => j.id === updated.id ? updated : j));
  };

  const deleteJoke = (id: number) => {
    setJokes(jokes.filter(j => j.id !== id));
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Joke App</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          style={{ padding: "10px", width: '100%' }}
          value={newJokeText}
          onChange={e => setNewJokeText(e.target.value)}
          placeholder="Enter a new joke"
        />
        <button style={{ padding: '10px', marginLeft: '10px' }} onClick={addJoke}>
          Add Joke
        </button>
      </div>

      {jokes.map(j => (
        <JokeComponent
          key={j.id}
          joke={j}
          increaseRates={() => changeRate(j.id, 1)}
          decreaseRates={() => changeRate(j.id, -1)}
          updateJoke={updateJoke}
          deleteJoke={deleteJoke}
        />
      ))}
    </div>
  );
}

export default App;
