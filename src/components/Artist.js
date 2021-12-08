import React from 'react';

const Artist = ({artist}) => {
    return (
        <div className={"artist"}>
            <h1>{artist.name}</h1>
            {artist.images && artist.images.length ?
                <img src={artist.images[0].url} alt={artist.name}/>
                : null}
        </div>
    );
};

export default Artist;
