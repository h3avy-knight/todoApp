import React, { useEffect, useState } from "react";
// import Clock from "react-live-clock";
import Clock from "react-live-clock";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const getLocalItems = () => {
  let lists = localStorage.getItem("lists");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());

  const addItem = () => {
    if (!inputData) {
      alert("Todo Can't be Empty.");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((elem, ind) => {
      return ind !== id;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <div className="row">
        <div className="col mx-auto col-md-8 mt-3 text-center">
          <div className="d-flex justify-content-between align-items-center">
            <h3>
              <Clock format={"HH:mm:ss"} ticking={true} />
            </h3>
            <h3> Todo List</h3>
            <h3>
              <Clock format={"dddd:MMMM DD:YYYY"} date={""} />
            </h3>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              autoFocus
              className="form-control"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
              placeholder="Add Item..."
            />
            <button className="btn btn-outline-dark" onClick={addItem}>
              Add todo
            </button>
          </div>

          {/* <ul className="nav nav-tabs">
            <li className="nav-items">
              <a className="nav-link" href="#"></a>
            </li>
          </ul> */}
          <ul className="list-group list-group-flush">
            {items.map((elem, ind) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={ind}
                >
                  <span>{elem}</span>
                  <span>
                    <i
                      className="fas fa-trash-alt"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteItem(ind)}
                    ></i>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
