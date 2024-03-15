import { useRef, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.users.users);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null)

  function handleSubmit(e) {
    e.preventDefault();

    let name = nameRef.current.value;
    let age = ageRef.current.value;

    if (name && age) {
      if (edit !== null) {
        dispatch({
          type: "EDIT",
          payload: {
            id: edit,
            updatedUser: {
              name: name,
              age: age
            }
          }
        });
        setEdit(null);
      } else {

        let user = {
          id: Date.now(),
          name: name,
          age: age,
        };

        dispatch({ type: "ADD", payload: user });
        nameRef.current.value = "";
        ageRef.current.value = "";
      }
    }
  }

  function handleRemove(id) {
    let confirmDeleting = confirm('Are you sure?')

    if (confirmDeleting) {
      dispatch({ type: "REMOVE", payload: id })
    }

  }

  function handleEdit(id, name, age) {

    nameRef.current.value = name;
    ageRef.current.value = age;

    setEdit(id)

    // nameRef.current.value = "";
    // ageRef.current.value = "";
  }



  return (
    <div id="container">
      <h1>User Info</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              ref={ageRef}
              type="number"
              className="form-control"
              id="age"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>

        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(user.id)}
                    >
                      Delete
                    </button>
                    <button onClick={() => handleEdit(user.id, user.name, user.age)} type="button" className="btn btn-success btn-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
