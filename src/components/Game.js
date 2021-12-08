import React, {useState} from 'react'
import axiso from 'axios'
import Artist from "./Artist"

const Game = ({token}) => {
    const URL = "https://api.spotify.com/v1/search"
    const [artist, setArtist] = useState('')
    const [artists, setArtists] = useState([])

    const getArtist = async () => {
        const {data: {artists: {items}}} = await axiso.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: artist,
                type: "artist"
            }
        })

        console.log('artist', items)
        setArtists(items)
    }

    const renderArtists = () => (
        artists.map(artist => (
            <Artist
                key={artist.id}
                artist={artist}
            />
        ))
    )

    return (
        <div>
            <h1>Choose Your Fighter</h1>
            <div>
                <div>Player 1</div>
                <input type="text" onChange={(e) => setArtist(e.target.value)}/>
                <button onClick={getArtist}>search</button>
            </div>

            <div className={"grid"}>
                {renderArtists()}
            </div>
        </div>
    );
};

export default Game;
