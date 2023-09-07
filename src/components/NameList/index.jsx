/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";

const NameList = ({ names, onEditName, onDeleteName, isDark }) => {
  // eslint-disable-next-line no-unused-vars
  const [currentId, setCurrentId] = useState(0);

  return (
    <Table striped bordered hover data-bs-theme={isDark}>
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name, index) => (
          <tr key={name.id}>
            <td>{currentId + index}</td>
            <td>{name.id}</td>
            <td>{name.nama}</td>
            <td>
              <Button
                variant="warning"
                onClick={() => onEditName(name.id)}
                data-bs-theme={isDark}
              >
                <FaRegPenToSquare />
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => onDeleteName(name.id)}
                data-bs-theme={isDark}
              >
                <FaTrashCan />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NameList;
