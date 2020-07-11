import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as taskActions from '../../actions/taskActions';

export class Save extends Component {

  changeUserId = (event) => {
    this.props.changeUserId(event.target.value);
  }

  changeTitle = (event) => {
    this.props.changeTitle(event.target.value);
  }

  save = () => {
    alert("ok")
  }

  render() {
    return (
      <div>
        <h1>
          Save task
        </h1>
        <p>User id:</p>
        <input
          type="number"
          value={this.props.user_id}
          onChange={this.changeUserId}
        />
        <br /> <br />
        <p>Title:</p>
        <input
          value={this.props.title}
          onChange={this.changeTitle}
        />
        <br /> <br />
        <button type="button" onClick={this.save}>Save</button>
      </div>
    )
  }
}

const mapStateToProps = ({ taskReducer }) => taskReducer;
export default connect(mapStateToProps, taskActions)(Save);
