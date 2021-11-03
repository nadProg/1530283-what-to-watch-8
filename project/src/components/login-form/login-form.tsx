import { ChangeEvent, FocusEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Login } from '../../types/types';
import {
  getEmailValidityMessage,
  getPasswordValidityMessage
} from '../../utils/common';
import { postLogin } from '../../store/authorization/authorization-api-actions';
import { getAuhorizationErrorMessage } from '../../store/authorization/authorization-selectors';
import { clearAuthorizationErrorMessage } from '../../store/authorization/authorization-actions';

const INITIAL_FORM_DATA: Login = {
  email: '',
  password: '',
};

const INITIAL_FORM_DIRTINESS = {
  email: false,
  password: false,
};

type LoginFormProps = {
  className?: string;
};

function LoginForm({ className }: LoginFormProps): JSX.Element {
  const serverErrorMessage = useSelector(getAuhorizationErrorMessage);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formDirtiness, setFormDirtiness] = useState(INITIAL_FORM_DIRTINESS);

  const emailValidityMessage = useMemo(
    () => formDirtiness.email ? getEmailValidityMessage(formData.email) : '',
    [formData.email, formDirtiness.email],
  );

  const passwordValidityMessage = useMemo(
    () => formDirtiness.password ? getPasswordValidityMessage(formData.password) : '',
    [formData.password, formDirtiness.password],
  );

  const validityMessage = useMemo(
    () => `${emailValidityMessage} ${passwordValidityMessage}`.trim(),
    [emailValidityMessage, passwordValidityMessage],
  );

  const dispatch = useDispatch();

  const login = (user: Login) => {
    dispatch(postLogin(user));
  };

  const handleInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const { name } = evt.target;
    setFormDirtiness({
      ...formDirtiness,
      [name]: true,
    });
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validityMessage) {
      return;
    }

    login(formData);
  };

  useEffect(() => {
    if (serverErrorMessage) {
      setFormDirtiness(INITIAL_FORM_DIRTINESS);
    }
  }, [serverErrorMessage]);

  useEffect(() => {
    if (validityMessage) {
      dispatch(clearAuthorizationErrorMessage());
    }
  }, [validityMessage]);

  return (
    <div className={classNames('sign-in', className)}>
      <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
        <div className="sign-in__fields">
          {validityMessage && (
            <div className="sign-in__message">
              <p>{validityMessage}</p>
            </div>
          )}

          {serverErrorMessage && (
            <div className="sign-in__message">
              <p>{serverErrorMessage}</p>
            </div>
          )}

          <div
            className={classNames('sign-in__field', {
              'sign-in__field--error': !!emailValidityMessage,
            })}
          >
            <input
              className="sign-in__input"
              type="text"
              placeholder="Email address"
              name="email"
              id="user-email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <label
              className="sign-in__label visually-hidden"
              htmlFor="user-email"
            >
              Email address
            </label>
          </div>
          <div
            className={classNames('sign-in__field', {
              'sign-in__field--error': !!passwordValidityMessage,
            })}
          >
            <input
              className="sign-in__input"
              type="password"
              placeholder="Password"
              name="password"
              id="user-password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <label
              className="sign-in__label visually-hidden"
              htmlFor="user-password"
            >
              Password
            </label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
