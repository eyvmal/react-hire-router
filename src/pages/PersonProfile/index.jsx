import {useEffect, useState} from 'react'
import HireForm from './components/HireForm'
import {useParams} from "react-router-dom";

function PersonProfile({ people, hire }) {
  const { id } = useParams();
  const [person, setPerson] = useState(null)

  useEffect(() => {
    const foundPerson = people.find(p => p.id === id);
    setPerson(foundPerson);
  }, [id, people]);
  
  if (!person) return <p>Loading...</p>

  return (
    <>
      <h2>
        {person.name.first} {person.name.last}
      </h2>
      <article>
        <HireForm person={person} hire={hire}/>
      </article>
    </>
  )
}

export default PersonProfile
