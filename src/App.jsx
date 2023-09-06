import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import AddNameForm from "./components/AddNameForm";
import NameList from "./components/NameList";

function App() {
  const [names, setNames] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Initialize with null

  useEffect(() => {
    // Fetch the names from json-server when the component mounts
    fetch("http://localhost:3001/preman")
      .then((response) => response.json())
      .then((data) => {
        setNames(data);
      });
  }, []); // Empty dependency array to run this effect once

  const handleAddName = (newName) => {
    if (editIndex !== null) {
      // Edit existing name
      const updatedNames = names.map((name) =>
        name.id === editIndex ? { ...name, name: newName } : name
      );
      setNames(updatedNames);
      setEditIndex(null);

      // Send a PUT request to update the name on the JSON Server
      fetch(`http://localhost:3001/preman/${editIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update name on the server.");
          }
        })
        .catch((error) => {
          console.error("Error updating name:", error);
        });
    } else {
      // Add new name
      fetch("http://localhost:3001/preman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      })
        .then((response) => response.json())
        .then((data) => {
          setNames([...names, data]);
        })
        .catch((error) => {
          console.error("Error adding name:", error);
        });
    }
  };

  const handleEditName = (id) => {
    setEditIndex(id);
  };

  const handleDeleteName = (id) => {
    // Send a DELETE request to remove the name from JSON Server
    fetch(`http://localhost:3001/preman/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If successful, update the state to reflect the change
          const updatedNames = names.filter((name) => name.id !== id);
          setNames(updatedNames);
        } else {
          throw new Error("Failed to delete name on the server.");
        }
      })
      .catch((error) => {
        console.error("Error deleting name:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>
            {editIndex !== null
              ? "Edit Barudak Preman Member"
              : "Barudak Preman Member"}
          </h1>
          <AddNameForm
            onAddName={handleAddName}
            editIndex={editIndex}
            names={names}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Name List</h1>
          <NameList
            names={names}
            onEditName={handleEditName}
            onDeleteName={handleDeleteName}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
