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

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/premans`);
      if (!response.ok) {
        throw new Error("Failed to fetch names from the server.");
      }
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    setDarkVar(isDarkTheme ? "light" : "dark");
    document.body.classList.toggle("light-root", isDarkTheme);
    document.body.classList.toggle("dark-root", !isDarkTheme);
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to run this effect once

  const handleAddName = async (newName) => {
    try {
      if (editIndex !== null) {
        // Edit existing name
        const updatedNames = names.map((name) =>
          name.id === editIndex ? { ...name, nama: newName } : name
        );
        setNames(updatedNames);
        setEditIndex(null);

        // Send a PUT request to update the name on the JSON Server
        const response = await fetch(`${apiUrl}/premans/${editIndex}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama: newName }),
        });
        if (!response.ok) {
          throw new Error("Failed to update name on the server.");
        }
      } else {
        // Add new name
        const response = await fetch(`${apiUrl}/premans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama: newName }),
        });
        if (!response.ok) {
          throw new Error("Failed to add name on the server.");
        }
        const data = await response.json();
        setNames([...names, data]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditName = async (id) => {
    setEditIndex(id);
  };

  const handleDeleteName = async (id) => {
    try {
      // Send a DELETE request to remove the name from JSON Server
      const response = await fetch(`${apiUrl}/premans/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // If successful, update the state to reflect the change
        const updatedNames = names.filter((name) => name.id !== id);
        setNames(updatedNames);
      } else {
        throw new Error("Failed to delete name on the server.");
      }
    } catch (error) {
      console.error("Error deleting name:", error);
    }
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
