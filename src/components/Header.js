import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearToken} from "../features/login/loginSlice";

const Header = () => {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.login)

    const logout = () => {
        const url = 'https://accounts.spotify.com/en/logout'
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
        setTimeout(() => spotifyLogoutWindow.close(), 1000);
        window.location.hash = "";
        dispatch(clearToken())
    }

    return (
        <header className={"header"}>
            <div className="container header-container">
                <span className={"brand"}>Spoti Fight</span>
                {token ?
                    <button className={"button button--icon"} onClick={logout}>
                        <i className="fas fa-sign-out-alt"/>
                    </button>
                    : null}
            </div>
        </header>
    );
};

export default Header;
