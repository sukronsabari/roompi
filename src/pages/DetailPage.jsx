import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
} from '../states/detailThread/action';
import { setLoginModalActionCreator } from '../states/showLoginModal/action';
import DetailThread from '../components/DetailThread';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncAddComment,
} from '../states/comments/action';
import { setCommentContentActionCreator } from '../states/commentContent/action';

function DetailPage() {
  const {
    detailThread = null,
    authUser,
    comments,
    commentContent = '',
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const { threadId } = useParams();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(threadId));
  }, [threadId, dispatch]);

  const upVoteThreadHandler = (id) => {
    dispatch(asyncUpVoteDetailThread(id));
  };

  const downVoteThreadHandler = (id) => {
    dispatch(asyncDownVoteDetailThread(id));
  };

  const upVoteCommentHandler = ({ threadId: ID, commentId }) => {
    dispatch(asyncUpVoteComment({ threadId: ID, commentId }));
  };

  const downVoteCommentHandler = ({ threadId: ID, commentId }) => {
    dispatch(asyncDownVoteComment({ threadId: ID, commentId }));
  };

  const showLoginModalHandler = () => {
    dispatch(setLoginModalActionCreator(true));
  };

  const inputCommentChangeHandler = (content) => {
    dispatch(setCommentContentActionCreator(content));
  };

  const submitCommentHandler = () => {
    dispatch(asyncAddComment({ threadId, content: commentContent }));
  };

  if (!detailThread) {
    return null;
  }

  return (
    <section className="mt-[62px] pt-6 pb-16 px-4 max-w-6xl mx-auto md:px-8">
      <DetailThread
        {...detailThread}
        authUser={authUser}
        comments={comments}
        commentContent={commentContent}
        upVoteThreadHandler={upVoteThreadHandler}
        downVoteThreadHandler={downVoteThreadHandler}
        showLoginModal={showLoginModalHandler}
        upVoteCommentHandler={upVoteCommentHandler}
        downVoteCommentHandler={downVoteCommentHandler}
        inputCommentChangeHandler={inputCommentChangeHandler}
        submitCommentHandler={submitCommentHandler}
      />
    </section>
  );
}

export default DetailPage;
