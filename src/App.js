import React, {useEffect} from 'react'
import Game from "./components/Game";
import Login from "./components/Login";
import "./App.css"
import Header from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./features/login/loginSlice";

function App() {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.login)

    useEffect(() => {
        let token;
        if (window.localStorage.getItem('token')) {
            token = window.localStorage.getItem('token')
        } else if (window.location.hash) {
            token = window.location.hash
                .substring(1)
                .split("&")
                .find(key => key.startsWith("access_token"))
                .split("=")[1]

            window.location.hash = "";
        }

        if (token) {
            dispatch(setToken(token))
        }
    }, [dispatch])

    return (
        <div>
            <Header/>

            <div className="App">
                {token ?
                    <Game/> :
                    <Login/>
                }
            </div>
        </div>
    );
}

export default App;
