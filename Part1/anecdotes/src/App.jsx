import { useState } from 'react'

// Components
const Button = ({ onClick, text }) => 
    <button onClick={onClick}>
      {text}
    </button>

const App = () => {
  // Data
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialVotes = new Array(anecdotes.length).fill(0)
  
  //States
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  const [mostVotes, setMostVotes] = useState(0)

  // Functions
  const handleNewAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleAddVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] = (updatedVotes[selected] || 0) + 1
    setVotes(updatedVotes)
    handleMostVotes( {updatedVotes} )
  }
  const handleMostVotes = ( {updatedVotes} ) => {
    if (updatedVotes[selected] > updatedVotes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes</p>
        <br />
        <Button onClick={handleAddVote} text='Vote' />
        <Button onClick={handleNewAnecdote} text='Next anecdote' />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotes]}</p>
      </div>
    </>
  )
}

export default App