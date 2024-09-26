import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

const GithubLogin = () => {
    const [isOAuthCalled, setIsOAuthCalled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        handleGitHubAuth();
    }, [])

    const handleGitHubAuth = async () => {
        if (isOAuthCalled) return; // Prevent multiple calls
        setIsOAuthCalled(true);
        handleGitHubAuthcall();
    };
    const handleGitHubAuthcall = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Send code to backend
            Api.post('api/auth/github', { code })
                .then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem('token', JSON.stringify(res.data.token));
                        navigate('/dashboard');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/signin');
                });
        }
    }


    return (
        <div className='container text-center'>
            <div className='mt-8'>
                <p>Redirecting...</p>
            </div>
        </div>
    )
}

export default GithubLogin