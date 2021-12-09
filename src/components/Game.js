import React, {useState} from 'react'
import Artist from "./Artist"
import {searchArtists} from "../api";

const Game = () => {
    const initialFighters = [{}, {}]
    const [searchKey, setSearchKey] = useState('')
    const [artists, setArtists] = useState([])
    const [playerIndex, setPlayerIndex] = useState(0)
    const [fighters, setFighters] = useState(initialFighters)
    const [winner, setWinner] = useState(null)
    const [pointsP1, setPointsP1] = useState(0)
    const [pointsP2, setPointsP2] = useState(0)

    const getArtist = async (e) => {
        e.preventDefault()
        const artists = await searchArtists(searchKey)
        setArtists(artists)
    }

    const selectArtist = async (artist) => {
        const newFighters = fighters
        newFighters[playerIndex] = artist
        setFighters(newFighters)
        setPlayerIndex(playerIndex + 1)
        setSearchKey('')
        setArtists([])
    }

    const renderArtists = () => (
        artists.map(artist => (
            <Artist
                selectArtist={selectArtist}
                key={artist.id}
                artist={artist}
            />
        ))
    )

    const fight = (e) => {
        e.preventDefault()
        const category = e.target.elements.category.value

        let winner;
        switch (category) {

            case 'followers':
                winner = fighters[0].followers.total > fighters[1].followers.total ? 'Player 1' : 'Player 2'
                break
            case 'popularity': {
                winner = fighters[0].popularity > fighters[1].popularity ? 'Player 1' : 'Player 2'
                break
            }
            case 'genres': {
                winner = fighters[0].genres.length > fighters[1].genres.length ? 'Player 1' : 'Player 2'
                break
            }
            default:
                winner = 'Draw'
        }

        addPoint(winner)
        setWinner(winner)
        setFighters(initialFighters)
    }

    const addPoint = () => {
        if (winner === 'Player 1') {
            setPointsP1(pointsP1 + 100)
        } else {
            setPointsP2(pointsP2 + 100)
        }
    }

    const nextRound = () => {
        setArtists([])
        setPlayerIndex(0)
        setFighters(initialFighters)
        setWinner(null)
    }

    return (
        <div className={"game"}>
            <div className={"game-bar"}>
                <div>
                    Player 1: {pointsP1}
                    {fighters[0].name && <span> - {fighters[0].name}</span>}
                </div>
                <div>
                    {fighters[1].name && <span>{fighters[1].name} - </span>}
                    Player 2: {pointsP2}
                </div>
            </div>

            {winner ?
                <div>
                    <div>
                        <span className="title">Winner: {winner}</span>
                    </div>
                    <button onClick={nextRound} className="button button--primary">Next Round</button>
                </div>
                : playerIndex <= 1 ?
                    <div className={"select-player"}>
                        <span className={"title"}>Player {playerIndex + 1}: <br/> Choose Your Fighter</span>
                        <form className={"form"} onSubmit={getArtist}>
                            <input className={"search-input"} type="text" value={searchKey}
                                   onChange={(e) => setSearchKey(e.target.value)}/>
                            <button className={"search-submit"} type={"submit"}>
                                Go
                            </button>
                        </form>
                    </div>
                    :
                    <div>
                        <span className={"title"}>Choose Category</span>

                        <div>
                            <form className={"form"} onSubmit={fight}>
                                <select name="category" id="category" className={"category"}>
                                    <option value="popularity">Popularity</option>
                                    <option value="followers">Follower</option>
                                    <option value="genres">Genres</option>
                                </select>
                                <button type={"submit"} className={"button  button--primary"}>Fight!</button>
                            </form>
                        </div>

                    </div>
            }

            <div className={"grid-container"}>
                {renderArtists()}
            </div>
        </div>
    );
};

export default Game;
