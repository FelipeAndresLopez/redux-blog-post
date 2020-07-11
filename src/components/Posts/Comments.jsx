import React from 'react';
import { connect } from 'react-redux';
import Loading from '../General/Loading';
import Error from '../General/Error';

const Comments = (props) => {
  if (props.commentsError) {
    return <Error message={props.commentsError} />;
  }
  if (props.commentsLoading && !props.comments.length) {
    return <Loading />;
  }

  const setComments = () =>
    props.comments.map((comment) => (
      <li key={comment.id}>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        {comment.body}
      </li>
    ));
  return <ul>{setComments()}</ul>;
};

const mapStateToProps = ({ postReducer }) => postReducer;

export default connect(mapStateToProps)(Comments);
