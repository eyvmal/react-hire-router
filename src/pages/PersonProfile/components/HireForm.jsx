import {useNavigate} from "react-router-dom";
import {useState} from "react";

function HireForm({ person, hire }) {
  const [wage, setWage] = useState(person.wage || "");
  const navigate = useNavigate();
  
  function handleSubmit(event) {
    event.preventDefault()
    if (wage !== "") {
      person.wage = wage;
      hire(person);
      navigate(`/`);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <p>{person.name.first} {person.name.last}</p>
      <label htmlFor="wage">Wage Offer</label>
      <input
        type="text"
        id="wage"
        name="wage"
        onChange={e => setWage(e.target.value)}
        value={wage}
      />
      <button type="submit">{person.wage ? 'Update' : 'Hire'}</button>
    </form>
  )
}

export default HireForm
