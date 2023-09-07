/* eslint-disable react/prop-types */
import { Table, Button } from "react-bootstrap";
import { FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";

const NameList = ({ names, onEditName, onDeleteName, isDark }) => {
  return (
    <Table striped bordered hover data-bs-theme={isDark}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name) => (
          <tr key={name.id}>
            <td>{name.id}</td>
            <td>{name.name}</td>
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
