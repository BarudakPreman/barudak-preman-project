/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddNameForm from "./components/AddNameForm";
import NameList from "./components/NameList";
import "./styles/index.css"; // Dark theme styles

function App() {
  const [names, setNames] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const apiUrl = import.meta.env.VITE_KEY_URL;

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [darkVar, setDarkVar] = useState("");
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // console.log("isDarkTheme:", isDarkTheme); // Check the state
    if (isDarkTheme) {
      setDarkVar("light");
      document.body.classList.remove("dark-root");
      document.body.classList.add("light-root");
    } else {
      setDarkVar("dark");
      document.body.classList.remove("light-root");
      document.body.classList.add("dark-root");
    }
  };

  useEffect(() => {
    // Fetch the names from json-server when the component mounts
    fetch(`${apiUrl}/preman`)
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
      fetch(`${apiUrl}/preman/${editIndex}`, {
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
      fetch(`${apiUrl}/preman`, {
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
    fetch(`${apiUrl}/preman/${id}`, {
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
    <Container data-bs-theme="light">
      <Row>
        <Row>
          <Col>
            <Button
              onClick={toggleTheme}
              variant={
                isDarkTheme ? "light outline-light" : "dark outline-dark"
              }
            >
              {isDarkTheme ? (
                <>
                  <FaSun /> Light Mode
                </>
              ) : (
                <>
                  <FaMoon /> Dark Mode
                </>
              )}
            </Button>
          </Col>
        </Row>
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
            isDark={darkVar}
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
            isDark={darkVar}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
