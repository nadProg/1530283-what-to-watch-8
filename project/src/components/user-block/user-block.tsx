import { useHistory, Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function UserBlock():JSX.Element {
  const history = useHistory();
  const handleAvatarClick = () => {
    history.push(AppRoute.MyList());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" onClick={handleAvatarClick}>
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to={AppRoute.Login()} className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}

export default UserBlock;

