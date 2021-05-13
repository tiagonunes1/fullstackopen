import React, {useState} from 'react'

const Button =({text,click}) => {
  return(
    <button onClick={click}>{text}</button>
  )
}

const MostVotes = ({value,mostvoted}) =>{
  return(
    <div>
      <h2>Anecdote with the most votes</h2>
  {value}<br></br>
  has {mostvoted} votes
    </div>
  )
}

const Anecdote = ({value,votes}) => {

  return(
    <div>
    <h3>
        {value}
    </h3>
    <p>
        has {votes} votes
    </p>
    </div>
  )
}
const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the co de in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0:0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  })

  const mostVoted = Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0];


  const random = () => Math.floor(Math.random() * anecdotes.length);

  const xSelected = () => {
    let index = random();
    while( index === selected ){
      index = random();
    }
    setSelected(index);
  }

  const xSetVotes = () => {
      setVotes({
        ...votes,[selected]:votes[selected] + 1,
      });
  };
  
  
  return (
    <div>
      <Anecdote  votes={votes[selected]} value={anecdotes[selected]}/>
      <Button text="vote" click={xSetVotes}/>
      <Button text="next anecdote" click={xSelected}/>
      <MostVotes  value={anecdotes[mostVoted]} mostvoted={votes[mostVoted]} />
    </div>
  )
}

export default App;