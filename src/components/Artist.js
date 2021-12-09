import React from 'react';

const Artist = ({artist, selectArtist}) => {
    return (
        <div className={"artist"} onClick={() => selectArtist(artist)}>
            {artist.images && artist.images.length ?
                <img className={"cover"} src={artist.images[2].url} alt={artist.name}/>
                : <div className={"cover"}>No Image</div>}

            <div className={"artist-info"}>
                <span className={"artist-name"}>{artist.name}</span>
            </div>
        </div>
    );
};

export default Artist;
