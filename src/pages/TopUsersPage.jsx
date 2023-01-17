import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../components/PageLayout';
import AuthUserRank from '../components/AuthUserRank';
import UserRankList from '../components/UserRankList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function TopUserPage() {
  const { authUser, leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const authUserRankPosition = leaderboards.findIndex(
    (userData) => userData.user.id === authUser?.id,
  );

  const authUserScore = leaderboards.find(
    (userData) => userData.user.id === authUser?.id,
  )?.score;

  return (
    <PageLayout>
      <div className="px-4 md:px-8 lg:px-10 pt-8">
        {authUser && (
          <h2 className="hidden text-xl lg:block">Users Standing</h2>
        )}
        <div className="mt-4 lg:flex lg:space-x-6">
          <div className="lg:sticky lg:top-[80px] lg:self-start">
            <AuthUserRank
              name={authUser?.name}
              avatar={authUser?.avatar}
              score={authUserScore}
              rankPosition={
                authUserRankPosition !== -1
                  ? authUserRankPosition + 1
                  : undefined
              }
            />
          </div>
          <div className="mt-8 lg:flex-1 lg:mt-0">
            <h2 className="text-base font-medium mb-4 lg:hidden">All User</h2>
            <UserRankList users={leaderboards} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default TopUserPage;
