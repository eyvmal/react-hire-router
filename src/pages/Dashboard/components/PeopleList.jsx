import PeopleListItem from './PeopleListItem'

function PeopleList({ peopleList, hiredPeople, firePerson }) {
  
  return (
    <div className="people-list-container">
      <div className="people-list">
        <h2>Available People</h2>
        <ul>
          {peopleList.map((person, index) => (
            <PeopleListItem key={index} person={person} />
          ))}
        </ul>
      </div>

      <div className="hired-list">
        <h2>Hired People</h2>
        <ul>
          {hiredPeople.map((person, index) => (
            <PeopleListItem key={index} person={person} fire={firePerson}/>
          ))}
        </ul>         
      </div>
    </div>
  )
}

export default PeopleList
