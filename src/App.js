import React, {useState, useEffect} from 'react'
import Game from "./components/Game";
import Login from "./components/Login";
import "./App.css"

function App() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        if (window.location.hash) {
            // GET TOKEN FROM HASH
            const token = window.location.hash
                .substring(1)
                .split("&")
                .find(key => key.startsWith("access_token"))
                .split("=")[1]

            window.location.hash = "";

            if (token) {
                setToken(token)
            }
        }
    }, [])

    const logout = () => {
        const url = 'https://accounts.spotify.com/en/logout';
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
        setTimeout(() => spotifyLogoutWindow.close(), 1500);
        setToken(null)
        window.location.hash = "";
    }

    return (
        <div className="App">
            <header>
                <span>Spoti Fight</span>
                {token ?
                    <button onClick={logout}>Logout</button>
                    : null}
            </header>

            {token ?
                <Game token={token}/> :
                <Login/>
            }

        </div>
    );
}

export default App;
