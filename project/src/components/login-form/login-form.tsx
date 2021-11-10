import { ChangeEvent, FocusEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Login } from '../../types/types';
import { getEmailValidityMessage, getPasswordValidityMessage } from '../../utils/common';
import { postLogin } from '../../store/authorization/authorization-api-actions';
import { getAuthorizationErrorMessage } from '../../store/authorization/authorization-selectors';
import { clearAuthorizationErrorMessage } from '../../store/authorization/authorization-actions';

const INITIAL_FORM_DATA: Login = {
  email: '',
  password: '',
} as const;

const INITIAL_FORM_DIRTINESS: {
  [key in keyof typeof INITIAL_FORM_DATA]: boolean
} = {
  email: false,
  password: false,
} as const;

type LoginFormProps = {
  className?: string;
};

function LoginForm({ className }: LoginFormProps): JSX.Element {
  const serverErrorMessage = useSelector(getAuthorizationErrorMessage);
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

  const onInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const { name } = evt.target;
    setFormDirtiness({
      ...formDirtiness,
      [name]: true,
    });
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!formDirtiness.email || !formDirtiness.password) {
      setFormDirtiness({
        email: true,
        password: true,
      });

      return;
    }

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
    <div className={classNames('sign-in', className)} data-testid="login-form-container">
      <form action="#" className="sign-in__form" onSubmit={onFormSubmit} data-testid="login-form">
        <div className="sign-in__fields">
          {validityMessage && (
            <div className="sign-in__message" data-testid="validity-message">
              <p>{validityMessage}</p>
            </div>
          )}

          {serverErrorMessage && (
            <div className="sign-in__message" data-testid="server-message">
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
              onChange={onInputChange}
              onBlur={onInputBlur}
              data-testid="email-input"
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
              onChange={onInputChange}
              onBlur={onInputBlur}
              data-testid="password-input"
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
          <button className="sign-in__btn" type="submit" data-testid="submit-button">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
