import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { setAuthorizationStatus } from '../../store/actions';
import { State, ThunkAppDispatch } from '../../types/types';

const mapStateToProps = ({authorization}: State) => ({
  authorization,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logout() {
    // Полноценная авторизация будет в следующем задании
    dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuth));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBlock({authorization, logout}: PropsFromRedux):JSX.Element {
  return (
    <ul className="user-block" style={{ minHeight: 63 }}>
      { authorization.status === AuthorizationStatus.Auth ?
        (
          <>
            <li className="user-block__item">
              <Link to={AppRoute.MyList()}>
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </Link>
            </li>
            <li className="user-block__item">
              <span className="user-block__link" onClick={logout}>Sign out</span>
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

export {UserBlock};
export default connector(UserBlock);

