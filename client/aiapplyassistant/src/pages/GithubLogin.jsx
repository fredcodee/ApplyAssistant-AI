import React ,{useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

const GithubLogin = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Send code to backend
            Api.post('api/auth/github', {code})
            .then((res) => {
                Cookies.set('access_token', res.data.token, { expires: 7 }); // Set for 7 days
                setError('');
                navigate('/dashboard');
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
        }
    },[])
  return (
    <div>
        {error && <p>{error}</p>}
        <div>
            <p>Redirecting...</p>
        </div>
    </div>
  )
}

export default GithubLogin