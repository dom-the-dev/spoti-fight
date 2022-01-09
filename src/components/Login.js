import React from 'react';

const Login = () => {
    const SPOTIFY_AUTH = process.env.REACT_APP_SPOTIFY_AUTH
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI

    return (
        <div className={"login"}>
            <h1>Spoti Fight</h1>
            <p>Choose your Artists and fight your friends</p>
            <a className={"button button--primary"} href={`${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`}>Login
                with Spotify</a>
        </div>
    );
};

export default Login;
