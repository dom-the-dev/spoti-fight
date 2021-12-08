import React from 'react';

const Login = () => {
    const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize"
    const CLIENT_ID = "b39c9c2f4fa346a69e4cdbcafefd5185"
    const REDIRECT_URI = "http://localhost:3000"

    return (
        <div>
            <a href={`${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`}>Login
                with Spotify</a>
        </div>
    );
};

export default Login;
