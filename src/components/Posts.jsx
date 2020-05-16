import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import Error from './Error';

import { getUsers } from '../actions/userActions';
import { getPostsByUser, toggle, getComments } from '../actions/postActions';
import Comments from './Comments';

class Posts extends Component {
  async componentDidMount() {
    const {
      getUsers,
      getPostsByUser,
      match: {
        params: { key }
      }
    } = this.props;

    if (!this.props.userReducer.users.length) {
      await getUsers();
    }

    if (this.props.userReducer.error) {
      return;
    }

    if (!('postsKey' in this.props.userReducer.users[key])) getPostsByUser(key);
  }

  setUsers = () => {
    const {
      userReducer,
      match: {
        params: { key }
      }
    } = this.props;

    if (userReducer.error) {
      return <Error message={userReducer.error} />;
    }

    if (!userReducer.users.length || userReducer.loading) {
      return <Loading />;
    }

    const name = userReducer.users[key].name;

    return <h1>Posts from {name}</h1>;
  };

  setPosts = () => {
    const {
      userReducer,
      userReducer: { users },
      postReducer,
      postReducer: { posts },
      match: {
        params: { key }
      }
    } = this.props;

    if (!users.length) return;

    if (userReducer.error) return;

    if (postReducer.loading) {
      return <Loading />;
    }

    if (postReducer.error) {
      return <Error message={postReducer.error} />;
    }

    if (!posts.length) return;

    if (!('postsKey' in users[key])) return;

    const { postsKey } = users[key];
    return this.showInfo(posts, postsKey);
  };

  showInfo = (posts, postsKey) =>
    posts[postsKey].map((post, commentsKey) => (
      <div key={post.id} className="posts-title" onClick={() => this.showComments(postsKey, commentsKey, post.comments)}>
        <h2>{post.title}</h2>
        <h3>{post.body}</h3>
        {post.open ? <Comments comments={post.comments} /> : ''}
      </div>
    ));

  showComments = (postsKey, commentsKey, comments) => {
    this.props.toggle(postsKey, commentsKey);
    if (!comments.length) {
      this.props.getComments(postsKey, commentsKey);
    }
  };

  render() {
    return (
      <div>
        {this.setUsers()}
        {this.setPosts()}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, postReducer }) => {
  return { userReducer, postReducer };
};

const mapDispatchToProps = {
  getUsers,
  getPostsByUser,
  getComments,
  toggle
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
