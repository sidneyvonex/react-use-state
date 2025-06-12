import { useState } from "react";
import type { Joke } from "../types";

interface JokeProps {
  joke: Joke;
  increaseRates: (id: number) => void;
  decreaseRates: (id: number) => void;
  updateJoke: (joke: Joke) => void;
  deleteJoke: (id: number) => void;
}

export const JokeComponent = ({
  joke,
  increaseRates,
  decreaseRates,
  updateJoke,
  deleteJoke,
}: JokeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJoke, setEditedJoke] = useState(joke.joke);

  const handleUpdate = () => {
    if (editedJoke.trim() && editedJoke !== joke.joke) {
      updateJoke({ ...joke, joke: editedJoke.trim() });
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedJoke}
            onChange={(e) => setEditedJoke(e.target.value)}
            style={{ padding: "8px", width: "80%", marginBottom: "8px" }}
          />
          <div style={{ marginTop: "8px" }}>
            <button
              onClick={handleUpdate}
              disabled={!editedJoke.trim() || editedJoke === joke.joke}
              style={{ marginRight: "8px" }}
            >
              Save
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3 style={{ marginBottom: "8px" }}>{joke.joke}</h3>
          <p style={{ margin: "4px 0" }}>Likes: {joke.rate}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            <button onClick={() => increaseRates(joke.id)}>+ Like</button>
            <button onClick={() => decreaseRates(joke.id)}>- Unlike</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteJoke(joke.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};
