import {useNavigate} from "react-router-dom";

function PeopleListItem({ person, fire }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/view/${person.id}`);
  };
  
  return (
    <li className="person-item">
      <div className="frame">
        <img
          src={person.picture.medium}
          alt={`${person.name.first} ${person.name.last}`}
        />
      </div>
      <h3>{person.name.title} {person.name.first} {person.name.last}</h3>
      <p>{person.location.city}, {person.location.country}</p>
      {person.wage && <p>Wage: {person.wage} IDR</p>}
      <button onClick={handleRedirect}>
        {person.wage ? 'Edit' : 'View'}
      </button>
      {person.wage && <button style={{ backgroundColor: 'red' }} onClick={() => fire(person)}>Fire</button>}
    </li>
  )
}

export default PeopleListItem
