import "./NowPlaying.scss";
import { useEffect, useRef } from "react";
import ColorThief from 'colorthief';
export default function NowPlaying({ playlist, songIndex, setDominantColor }) {
  const imageRef = useRef(null);
  const ref = useRef(null);
  let listenerCount = 100;
  const getColorFromImage = () => {
    const img = imageRef.current;
    // Ensure image is loaded
    if (img && img.complete) {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      console.log("Dominant color:", color);
      setDominantColor(color)
    }
  };
  useEffect(()=>{
    getColorFromImage()
  },[songIndex])
  const provideNextSongCover = () => {
    if (songIndex + 1 < playlist.length) {
      return playlist[songIndex + 1].cover;
    }
    return playlist[songIndex].cover;
  };
  const provideNextSongTitle = () => {
    if (songIndex + 1 < playlist.length) {
      return playlist[songIndex + 1].title;
    }
    return playlist[songIndex].title;
  };
  
  const provideNextSongArtist = () => {
    
    if (songIndex + 1 < playlist.length) {
      return playlist[songIndex + 1].author;
    }
    
    return playlist[songIndex].author;
  };
  return (
    <>
      <div id="nowPlaying">
        <div id="info">
          <div id="topSection">
            <span id="paylistTitle">custom 1</span>
            <div id="iconGroup">
              <div id="dottedOptions">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                </svg>
              </div>
              <div id="closeIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div id="songInfo">
            <img ref={imageRef} src={playlist[songIndex].cover} alt="song pic" />
            <div id="textInfo">
              <div id="title">
                <span id="songTitle">{playlist[songIndex].title}</span>
                <span id="author">{playlist[songIndex].author}</span>
              </div>
              <div id="icons">
                <div id="copyLink-icon" ref={ref}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path>
                  </svg>
                </div>
                <div id="add-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div id="aboutArtist">
  <div
    id="top"
    style={{
      position: "relative",
      width: "100%",
      height: "25vh",
      overflow: "hidden",
    }}
  >
    <img
      src={playlist[songIndex].cover}
      alt={`${playlist[songIndex].author} cover`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.2rem",
      }}
    >
      <span 
      style={{
        position: "absolute",
        top: 0,
        left: 0,}}
      >About the artist</span>
    </div>
  </div>
  <div id="bottom">
    <span id="name">{playlist[songIndex].author}</span>
    <div id="section">
      <span id="listenerCount">{listenerCount} Monthly listeners</span>
      <button id="follow" onClick={() => console.log(playlist)}>
        Follow
      </button>
    </div>
  </div>
  <div id="artist-dis">
    <span>
      Lorem ipsum dolor site lit. elit. amet consectetur adipisicing elit.
      Tenetur mollitia dolores{" "}
    </span>
  </div>
</div>

          <div id="credits">
            <div id="top">
              <span>Credits</span> <button>Show all</button>
            </div>
            <div className="artist">
              <span id="name">{playlist[songIndex].author}</span>

              <section>
                <span id="roles">
                  Main Artist, Composer, Writer,
                  <br /> Producer, Author
                </span>
                <button type="button">follow</button>
              </section>
            </div>
            <div className="artist">
              <span id="name">Mr. Nobody</span>
              <section>
                <span id="roles">Producer</span>
              </section>
            </div>
          </div>
          <div id="on-tour">
            <span id="title">On Tour</span>
            <section>
            <div id="left">
              <span id="month">May</span>
              <span id="day">10</span>
            </div>
            <div id="right">
              <span id="location">Pune</span>
              <span id="names">Anuv Jain,Zaeden</span>
              <span id="details">
                Sat 7:00 PM <div id="circle"></div>Pheonix Marketcity
              </span>
            </div>
            </section>
          </div>
          <div id="next">
          <div id="top">
              <span>Next in queue</span> <button>Open queue</button>
            </div>
          <section>
            <div id="left">
              <img src={provideNextSongCover()} />
            </div>
            <div id="right">
              <span id="title">{provideNextSongTitle()}</span>
              <span id="names">{provideNextSongArtist()}</span>
            </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

