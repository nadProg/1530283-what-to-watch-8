import classNames from 'classnames';
import { FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus } from '../../constants';
import { setAuthorizationStatus } from '../../store/actions';
import { ThunkAppDispatch } from '../../types/types';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  login() {
    // Полноценная авторизация будет в следующем задании
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LoginFormProps = PropsFromRedux & {
  className?: string,
}

function LoginForm({className, login}: LoginFormProps): JSX.Element {
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login();
  };

  return (
    <div className={classNames('sign-in', className)}>
      <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" required/>
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className="sign-in__field">
            <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required minLength={2} />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}

export {LoginForm};
export default connector(LoginForm);
