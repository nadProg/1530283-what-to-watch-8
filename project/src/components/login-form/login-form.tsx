import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import { User } from '../../types/types';
import { validateLoginFormData } from '../../utils/common';
import { postLogin } from '../../store/authorization/authorization-api-actions';

const INITIAL_FORM_STATE: User = {
  email: '',
  password: '',
};

type LoginFormProps = {
  className?: string,
}

function LoginForm({className}: LoginFormProps): JSX.Element {
  const [ formData, setFormData ] = useState(INITIAL_FORM_STATE);

  const dispatch = useDispatch();

  const login = (user: User) => {
    dispatch(postLogin(user));
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

    const validityMessage = validateLoginFormData(formData);

    if (validityMessage) {
      toast.error(validityMessage);
      return;
    }

    login(formData);
  };

  return (
    <div className={classNames('sign-in', className)}>
      <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input className="sign-in__input" type="text" placeholder="Email address" name="email" id="user-email" onChange={handleInputChange}/>
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className="sign-in__field">
            <input className="sign-in__input" type="password" placeholder="Password" name="password" id="user-password" onChange={handleInputChange}/>
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

export default LoginForm;
