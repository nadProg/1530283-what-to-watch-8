import PageHeader from '../page-header/page-header';
import Logo from '../logo/logo';
import PageTitle from '../page-title/page-title';
import LoginForm from '../login-form/login-form';
import PageFooter from '../page-footer/page-footer';

function LoginScreen(): JSX.Element {
  return (
    <div className="user-page">
      <PageHeader className="user-page__head">
        <Logo />
        <PageTitle className="user-page__title">Sign in</PageTitle>
      </PageHeader>
      <LoginForm className="user-page__content" />
      <PageFooter />
    </div>
  );
}

export default LoginScreen;
