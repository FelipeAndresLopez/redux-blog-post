import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import * as taskActions from '../../actions/taskActions';
import Loading from '../General/Loading';
import Error from "../General/Error";

export class Tasks extends Component {

  componentDidMount() {
    this.props.getTasks();
  }

  showContent = () => {
    const { tasks, loading, error } = this.props;
    console.log(this.props)
    if (loading) return <Loading />

    if (error) return <Error message={error} />

    return Object.keys(tasks).map((usu_id) => (
      <div key={usu_id}>
        <h2>
          User {usu_id}
        </h2>
        <div className="container_tasks">
          {this.putTasks(usu_id)}
        </div>
      </div>
    ))
  }

  putTasks = (usu_id) => {
    const { tasks } = this.props;
    const byUser = {
      ...tasks[usu_id]
    };

    return Object.keys(byUser).map((task_id) => (
      <div key={task_id}>
        <input type="checkbox" defaultChecked={byUser[task_id].completed} />
        {byUser[task_id].title}
      </div>
    ))

  }

  render() {
    return (
      <div>
        <button>
          <Link to="/tasks/save">
            Add
          </Link>
        </button>
        {this.showContent()}
      </div>
    )
  }
}
const mapStateToProps = ({ taskReducer }) => taskReducer;
export default connect(mapStateToProps, taskActions)(Tasks);
