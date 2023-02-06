import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    event.target.reset();
  };
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" id="" placeholder="Email" />
        <br />
        <button type="submit">Add User</button>
      </form>
      <h2>Users: {users.length}</h2>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
