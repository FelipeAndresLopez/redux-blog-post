import React from 'react';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Error from '../components/Error';
import Table from '../components/Table';

import * as userActions from '../actions/userActions';

class Users extends React.Component {
  componentDidMount() {
    if (!this.props.users.length) this.props.getUsers();
  }

  setContent = () => {
    if (this.props.loading) return <Loading />;
    if (this.props.error) return <Error message={this.props.error} />;

    return <Table />;
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.setContent()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.userReducer;
};

export default connect(mapStateToProps, userActions)(Users);
