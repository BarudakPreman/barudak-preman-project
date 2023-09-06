/* eslint-disable react/prop-types */
import { Table, Button } from "react-bootstrap";

const NameList = ({ names, onEditName, onDeleteName }) => {
  return (
    <Table striped bordered hover>
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
              <Button variant="info" onClick={() => onEditName(name.id)}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => onDeleteName(name.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NameList;
