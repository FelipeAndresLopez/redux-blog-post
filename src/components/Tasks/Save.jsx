import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Loading from '../General/Loading';
import Error from '../General/Error';

import * as taskActions from '../../actions/taskActions';

export class Save extends Component {

  componentDidMount() {
    const { match: { params: { user_id, task_id } },
      tasks,
      changeTitle,
      changeUserId,
      resetForm
    } = this.props;

    if (user_id && task_id) {
      const task = tasks[user_id][task_id];
      changeUserId(task.userId);
      changeTitle(task.title);
    } else{
      resetForm();
    }
  }

  changeUserId = (event) => {
    this.props.changeUserId(event.target.value);
  }

  changeTitle = (event) => {
    this.props.changeTitle(event.target.value);
  }

  save = () => {
    const {
      match: { params: { user_id: user_id_param, task_id } },
      tasks,
      user_id,
      title,
      add,
      edit
    } = this.props;

    const newTask = {
      userId: user_id,
      title,
      completed: false
    };

    if (user_id_param && task_id) {
      const task = tasks[user_id_param][task_id];
      const taskEdited = {
        ...newTask,
        completed: task.completed,
        id: task_id
      };
      edit(taskEdited);
    } else {
      add(newTask);
    }
  }

  disable = () => {
    const { user_id, title, loading } = this.props;

    if (loading) {
      return true;
    }

    if (!user_id || !title) {
      return true;
    }

    return false;
  }

  showAction = () => {
    const { error, loading } = this.props;
    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error message={error} />
    }
  }

  render() {
    return (
      <div>
        {
          (this.props.goBack) ? <Redirect to='/tasks' /> : ''
        }
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
        <button type="button" onClick={this.save} disabled={this.disable()}>Save</button>
        {this.showAction()}
      </div>
    )
  }
}

const mapStateToProps = ({ taskReducer }) => taskReducer;
export default connect(mapStateToProps, taskActions)(Save);
