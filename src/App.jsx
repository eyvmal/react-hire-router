import {useEffect, useState} from 'react'
import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import PeopleList from "./pages/Dashboard/components/PeopleList.jsx";
import PersonProfile from "./pages/PersonProfile/index.jsx";
import { v4 as uuidv4 } from 'uuid';
import confetti from 'canvas-confetti';

export default function App() {
  const url = "https://randomuser.me/api/?results=50&inc=gender,name,email,location,picture";
  const [hiredPeople, setHiredPeople] = useState([])
  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([])
  
  const fetchPeople = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    const peopleWithIds = jsonData.results.map((person) => ({
      ...person,
      id: uuidv4()
    }));
    setPeople(peopleWithIds);
    setFilteredPeople(peopleWithIds);
  };
  
  useEffect(() => {
    fetchPeople();
  }, []);

  const hirePerson = (person) => {
    if (!hiredPeople.find((p) => p.id === person.id)) {
      setHiredPeople([...hiredPeople, person]);
      
      const updatedPeopleList = people.filter((p) => p.id !== person.id);
      setFilteredPeople(updatedPeopleList);
    }
  };

  const firePerson = (person) => {
    const updatedHiredPeople = hiredPeople.filter((p) => p.id !== person.id);
    setHiredPeople(updatedHiredPeople);

    delete person.wage
    setFilteredPeople([...filteredPeople, person]);

    // Trigger confetti
    confetti({
      particleCount: 10000,
      spread: 360,
      origin: { y: 0.5 }
    });
  };

  return (
    <>
      <header>
        <h1>Hire Your Team</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={<PeopleList
            peopleList={filteredPeople}
            hiredPeople={hiredPeople}
            firePerson={firePerson} />}
        />
        <Route
          path="/view/:id"
          element={<PersonProfile people={people} hire={hirePerson} />}
        />
      </Routes>
    </>
  )
}
