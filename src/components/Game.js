import React, {useState} from 'react'
import Artist from "./Artist"
import {searchArtists} from "../api";

const Game = () => {
    const [searchKey, setSearchKey] = useState('')
    const [artists, setArtists] = useState([])
    const [playerIndex, setPlayerIndex] = useState(0)
    const [fighters, setFighters] = useState([{}, {}])
    const [winner, setWinner] = useState(null)

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

        setWinner(winner)
    }

    return (
        <div>
            <div className={"game-bar"}>
                <div>
                    <div>Player 1:</div>
                    <h5>{fighters[0].name && fighters[0].name}</h5>
                </div>
                <div>
                    <div>Player 2:</div>
                    <h5>{fighters[1].name && fighters[1].name}</h5>
                </div>
            </div>

            {winner ?
                <div>
                    Winner: {winner}

                    <button className="button">Next Round</button>
                </div>
                : playerIndex <= 1 ?
                    <div className={"select-player"}>
                        <h1 className={"text-center"}>Player {playerIndex + 1}: Choose Your Fighter</h1>
                        <form className={"search-form"} onSubmit={getArtist}>
                            <input className={"search-input"} type="text" value={searchKey}
                                   onChange={(e) => setSearchKey(e.target.value)}/>
                            <button className={"search-submit"} type={"submit"}>
                                <i className="fas fa-search"/>
                            </button>
                        </form>
                    </div>
                    :
                    <div>
                        <div>Choose Category</div>

                        <div>
                            <form onSubmit={fight}>
                                <select name="category" id="category">
                                    <option value="popularity">Popularity</option>
                                    <option value="followers">Follower</option>
                                    <option value="genres">Amount of Genres</option>
                                </select>
                                <button type={"submit"} className={"button button-fight"}>Fight</button>
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
