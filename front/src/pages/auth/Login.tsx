import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHasAccessToken } from '../../hooks/auth/useHasAccessToken';

function Login() {
  const hasAccessToken = useHasAccessToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasAccessToken) {
      window.location.href =
        process.env.REACT_APP_AUTH_URL + '/signin/provider/google' || '';
    } else {
      navigate('/');
    }
  }, [hasAccessToken, navigate]);

  return <></>;
}

export default Login;
