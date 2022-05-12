import React, { useEffect, useState } from 'react';

import classes from "./styles.module.css";

const albumUrl = "http://demo.subsonic.org/rest/getAlbumList2.view";
const coverArtUrl = "http://demo.subsonic.org/rest/getCoverArt.view?u=guest&p=guest&v=1.16.1&c=myapp";

const Home = () => {
    const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
    const [state, setState] = useState({
        loading: true,
        data: []
    });

    useEffect(() => {
        fetch(`${albumUrl}?u=guest&p=guest&v=1.16.1&c=myapp&f=json&type=newest`)
            .then(resp => resp.json())
            .then(res => {
                setState({
                    loading: false,
                    data: res['subsonic-response'].albumList2.album
                })
            })
    }, []);
    return (
        <>
           {
               state.loading ? "Loading" : (
                   <>
                   <div className={classes.imgContainer}>
                    { state.data.map((album, index) => (
                        <div
                          key={album.id}
                          className={currentAlbumIndex === index && classes.currentAlbum}>
                            <img src={`${coverArtUrl}&id=${album.id}`} alt="album image" />
                        </div>
                    ))}
                   </div>
                    <div className={classes.albumDetails}>
                        <div className={classes.albumName}>{state.data[currentAlbumIndex].name}</div>
                        <div>{state.data[currentAlbumIndex].artist}</div>
                        <div>{state.data[currentAlbumIndex].genre}</div>
                    </div>
                    <div onClick={() => setCurrentAlbumIndex(currentAlbumIndex > 0 ? currentAlbumIndex - 1 : currentAlbumIndex)} className={classes.leftArrow}>{"<"}</div>
                    <div onClick={() => setCurrentAlbumIndex(currentAlbumIndex < state.data.length ? currentAlbumIndex + 1 : currentAlbumIndex)}  className={classes.rightArrow}>{">"}</div>
                </>
               )
              
           }
        </>
    )
}
export default Home;
