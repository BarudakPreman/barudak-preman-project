/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddNameForm = ({ onAddName, editIndex, names, isDark }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      const editedName = names.find((n) => n.id === editIndex);
      if (editedName) {
        setName(editedName.nama);
      }
    } else {
      setName("");
    }
  }, [editIndex, names]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") return;

    onAddName(name);

    if (editIndex !== null) {
      setName("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>{editIndex !== null ? "Edit Name" : "Add Name"}</Form.Label>
        <Form.Control
          type="text"
          className="mb-2"
          placeholder="Enter a new name"
          value={name}
          onChange={handleNameChange}
          data-bs-theme={isDark}
        />
      </Form.Group>
      <Button variant="primary" type="submit" data-bs-theme={isDark}>
        {editIndex !== null ? "Edit Member" : "Add New Member"}
      </Button>
    </Form>
  );
};

export default AddNameForm;
