/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SearchBar from '../components/SearchBar';
import useInput from '../hooks/useInput';
import ButtonIcon from '../components/ButtonIcon';
import ThreadList from '../components/ThreadList';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncAddThread,
} from '../states/threads/action';
import asyncPopulateThreadsAndUsers from '../states/shared/action';
import { setLoginModalActionCreator } from '../states/showLoginModal/action';
import FilterByTime from '../components/FilterByTime';
import ButtonFullWidth from '../components/ButtonFullWidth';
import AddThreadModal from '../components/AddThreadModal';
import { setShowAddThreadModal } from '../states/showAddThreadModal/action';
import TagList from '../components/TagList';

function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [searchKeyword, setSearchKeyword] = useState(keyword || '');
  const [filterByTime, onFilterByTimeChange] = useInput('newest');
  const [tagActive, setTagActive] = useState('');

  const {
    threads = [],
    users = [],
    authUser,
    showAddThreadModal = false,
  } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const onSearchKeywordChange = ({ target }) => {
    setTagActive('');
    setSearchKeyword(target.value);
    setSearchParams({ keyword: target.value });
  };

  const upVoteThreadHandler = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const downVoteThreadHandler = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const showLoginModalHandler = () => {
    dispatch(dispatch(setLoginModalActionCreator(true)));
  };

  const showAddThreadModalHandler = () => {
    dispatch(setShowAddThreadModal(true));
  };

  const closeAddThreadModalHandler = () => {
    dispatch(setShowAddThreadModal(false));
  };

  const submitThreadHandler = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const setTagActiveHandler = (event) => {
    const tagName = event.target.innerText.split('#')[1];
    setTagActive((prevTag) => (prevTag !== tagName ? tagName : ''));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  const allTags = threadList.map((thread) => {
    return thread.category.split(',')[0];
  });

  const uniqueTags = Array.from(new Set(allTags));

  const getThreadFiltered = () => {
    if (tagActive) {
      return threadList.filter((thread) => {
        return thread.category.toLowerCase().includes(tagActive.toLowerCase());
      });
    }

    if (filterByTime === 'oldest') {
      return threadList
        .filter((thread) => {
          return thread.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
        })
        .reverse();
    }

    return threadList.filter((thread) => {
      return thread.title.toLowerCase().includes(searchKeyword.toLowerCase());
    });
  };

  const threadListFiltered = getThreadFiltered();

  return (
    <PageLayout>
      <>
        <div className="flex space-x-4">
          <div className="flex-1 xl:mr-72 xl:px-4">
            <div className="mt-6 px-4">
              <SearchBar
                keyword={searchKeyword}
                onKeywordChange={onSearchKeywordChange}
                className="w-full flex-1"
              />
            </div>
            <div className="mt-4">
              <ThreadList
                threads={threadListFiltered}
                upVoteThreadHandler={upVoteThreadHandler}
                downVoteThreadHandler={downVoteThreadHandler}
                showLoginModal={showLoginModalHandler}
                setTagActive={setTagActiveHandler}
                tagActive={tagActive}
              />
            </div>
          </div>
          <div className="hidden fixed top-[62px] right-0 w-72 h-screenCustom  p-4 pt-6 xl:block bg-white  border-l border-l-slate-200">
            <div className="mb-4">
              <ButtonFullWidth
                isDisable={!authUser}
                className="font-medium disabled:bg-slate-100 disabled:text-slate-500"
                handleClick={showAddThreadModalHandler}
              >
                Add new thread
              </ButtonFullWidth>
            </div>
            <FilterByTime
              filterByTime={filterByTime}
              onFilterByTimeChange={onFilterByTimeChange}
            />

            <div className="p-4 mt-4 rounded-md border border-slate-300">
              <p className="font-medium mb-4">Popular keywords</p>
              <TagList
                tagActive={tagActive}
                tags={uniqueTags}
                handleClick={setTagActiveHandler}
                role="button"
              />
            </div>
          </div>
        </div>
        <div>
          {authUser && (
            <div className="xl:hidden fixed bottom-24 right-4">
              <ButtonIcon
                handleClick={showAddThreadModalHandler}
                classNameInner="bg-primary text-white rounded-full"
                className="[&>div]:disabled:bg-slate-400"
                isDisable={!authUser}
              >
                <IconPlus />
              </ButtonIcon>
            </div>
          )}
        </div>
        {showAddThreadModal && authUser ? (
          <AddThreadModal
            submitThread={submitThreadHandler}
            closeAddThreadModal={closeAddThreadModalHandler}
          />
        ) : null}
      </>
    </PageLayout>
  );
}

export default HomePage;
