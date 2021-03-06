import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { deleteLogout } from '../../store/authorization/authorization-api-actions';
import { getAuthorizationStatus, getUserAvatar } from '../../store/authorization/authorization-selectors';

const USER_BLOCK_STYLES: CSSProperties = {
  minHeight: 63,
};

function UserBlock():JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userAvatar = useSelector(getUserAvatar);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(deleteLogout());
  };

  return (
    <ul className="user-block" style={USER_BLOCK_STYLES}>
      { authorizationStatus === AuthorizationStatus.Auth ?
        (
          <>
            <li className="user-block__item">
              <Link to={AppRoute.MyList()}>
                <div className="user-block__avatar">
                  <img src={userAvatar} alt="User avatar" width="63" height="63" />
                </div>
              </Link>
            </li>
            <li className="user-block__item">
              <span className="user-block__link" onClick={() => logout()}>Sign out</span>
            </li>
          </>
        )  : (
          <li className="user-block__item">
            <Link to={AppRoute.Login()} className="user-block__link">Sign In</Link>
          </li>
        )}
    </ul>
  );
}

export default UserBlock;
