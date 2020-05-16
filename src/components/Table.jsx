import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Table = props => {
  const setRows = () =>
    props.users.map((user, key) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>
          <Link to={`/posts/${key}`}>
            <div className="eye-solid3 icon"></div>
          </Link>
        </td>
      </tr>
    ));

  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>{setRows()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = reducers => {
  return reducers.userReducer;
};

export default connect(mapStateToProps)(Table);
