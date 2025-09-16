import { useState, useEffect } from "react";
import { addSongToDB, getAllSongsFromDB } from "./indexedDB";
import Player from "./Components/Player";
import Library from "./Components/Library";
import TopBar from "./Components/TopBar";
import NowPlaying from "./Components/NowPlaying";
import Feed from "./Components/Feed.jsx";
import hotelCaliforniaPic from "./songs/hotelCalifornia.jpg";
import feelingGoodPic from "./songs/feelingGood.jpg";
import swayPic from "./songs/swayPic.webp";
import hotelcalifornia from "./songs/Hotel-California.mp3";
import feelingGood from "./songs/Feeling-Good.mp3";
import sway from "./songs/Sway.mp3";
import keepOnRolling from "./songs/keepOnRolling.mp3";
import keepOnRollingPic from "./songs/keepOnRolling.jpg";
import SouthrenMan from "./songs/southrenMan.mp3";
import SouthrenManPic from "./songs/southrenMan.jpg";
import whenImGone from "./songs/WhenImGone.mp3";
import whenImGonePic from "./songs/whenImGone.jpg";
import stargazing from "./songs/stargazing.mp3";
import stargazingPic from "./songs/Stargazing.jpg";
import "./App.scss";
import { deleteSongFromDB } from "./indexedDB";
import Loading from "./Components/Loading.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(3);
  const [dominantColor, setDominantColor] = useState([])
  const [switcher, setSwitcher] = useState(true)
  const[filteredPlaylist, setFilteredPlaylist] = useState(
    [
      {
        title: "Hotel California",
        author: "Eagles",
        link: hotelcalifornia,
        cover: hotelCaliforniaPic,
      },
      {
        title: "Feeling Good",
        author: "Michel bubble",
        link: feelingGood,
        cover: feelingGoodPic,
      },
      {
        title: "Sway",
        author: "Michel Bubble",
        link: sway,
        cover: swayPic,
      },
      {
        title: "Keep on rolling",
        author: "King George",
        link: keepOnRolling,
        cover: keepOnRollingPic,
      },
      {
        title: "Stargazing",
        author: "Myles Smith",
        link: stargazing,
        cover: stargazingPic,
      },
      {
        title: "When Im Gone",
        author: "Lecade",
        link: whenImGone,
        cover: whenImGonePic,
      },
      {
        title: "Southren man",
        author: "Cecily Wilborn",
        link: SouthrenMan,
        cover: SouthrenManPic,
      },
    ]
  )
  const [playlist, setPlaylist] = useState([
    {
      title: "Hotel California",
      author: "Eagles",
      link: hotelcalifornia,
      cover: hotelCaliforniaPic,
    },
    {
      title: "Feeling Good",
      author: "Michel bubble",
      link: feelingGood,
      cover: feelingGoodPic,
    },
    {
      title: "Sway",
      author: "Michel Bubble",
      link: sway,
      cover: swayPic,
    },
    {
      title: "Keep on rolling",
      author: "King George",
      link: keepOnRolling,
      cover: keepOnRollingPic,
    },
    {
      title: "Stargazing",
      author: "Myles Smith",
      link: stargazing,
      cover: stargazingPic,
    },
    {
      title: "When Im Gone",
      author: "Lecade",
      link: whenImGone,
      cover: whenImGonePic,
    },
    {
      title: "Southren man",
      author: "Cecily Wilborn",
      link: SouthrenMan,
      cover: SouthrenManPic,
    },
  ]);
  
  const handleCardClick = (index) => {
    if(isPlaying){
      setSwitcher(!switcher);
    setSongIndex(index);
    // setIsPlaying(!isPlaying);
    }
    else if(!isPlaying){
      setSwitcher(!switcher);
      setSongIndex(index);
    // setIsPlaying(!isPlaying);

    }
  };

  const handleDeleteSong = async (indexToDelete) => {
    const songToDelete = playlist[indexToDelete];

    // Delete from IndexedDB if song has an id (user-added songs)
    if (songToDelete.id) {
      await deleteSongFromDB(songToDelete.id);
    }

    // Update playlist state
    setPlaylist((prev) => {
      const newPlaylist = prev.filter((_, idx) => idx !== indexToDelete);

      // Adjust songIndex if needed
      if (songIndex >= newPlaylist.length) {
        setSongIndex(Math.max(0, newPlaylist.length - 1));
      }
      return newPlaylist;
    });
  };

  useEffect(() => {
    (async () => {
      const storedSongs = await getAllSongsFromDB();

      const formatted = storedSongs.map((song) => ({
        id: song.id,
        title: song.title,
        author: song.author,
        link: URL.createObjectURL(
          new Blob([song.fileData], { type: song.fileType })
        ),
        cover: song.cover
          ? URL.createObjectURL(new Blob([song.cover], { type: "image/jpeg" }))
          : "",
      }));
      // Combine default playlist with stored songs once
      setPlaylist((prev) => {
        // To avoid duplicates, filter out stored songs already in default playlist by title & author
        const filteredStored = formatted.filter(
          (fs) =>
            !prev.some((p) => p.title === fs.title && p.author === fs.author)
        );
        return [...prev, ...filteredStored];
      });
    })();
  }, []);

  const handleAddSong = async ({ file, author, title, cover }) => {
    // Optional: process cover file into Blob URL or store it similarly
    // let coverBlob = "";
    // if (cover) {
    //   coverBlob = await cover.arrayBuffer(); // store as arrayBuffer or Blob URL
    // }

    const saved = await addSongToDB({
      file,
      title: title,
      author: author,
      cover: cover,
    });

    const link = URL.createObjectURL(
      new Blob([saved.fileData], { type: saved.fileType })
    );
    setFilteredPlaylist((prev) => [
      ...prev,
      {
        id: saved.id,
        title: saved.title,
        author: saved.author,
        link,
        cover: saved.cover
          ? URL.createObjectURL(new Blob([saved.cover], { type: "image/jpeg" }))
          : swayPic,
      },
    ]);
    setPlaylist((prev) => [
      ...prev,
      {
        id: saved.id,
        title: saved.title,
        author: saved.author,
        link,
        cover: saved.cover
          ? URL.createObjectURL(new Blob([saved.cover], { type: "image/jpeg" }))
          : swayPic,
      },
    ]);
  };


  return (
    <>
      <div className="main">
        <Loading
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
         />

        <TopBar 
        filteredPlaylist ={filteredPlaylist}
        setFilteredPlaylist = {setFilteredPlaylist}
        playList = {playlist}
        />
        <div className="middleContainer">
          <Library playlist={playlist} onAddSong={handleAddSong} />
          <Feed
            filteredPlaylist ={filteredPlaylist}
            songIndex={songIndex}
            setSongIndex={setSongIndex}
            dominantColor={dominantColor}
            onCardClick={handleCardClick}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <NowPlaying
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songIndex={songIndex}
            setSongIndex={setSongIndex}
            playlist={playlist}
            setDominantColor = {setDominantColor}
          />
        </div>
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songIndex={songIndex}
          setSongIndex={setSongIndex}
          playlist={playlist}
          onDeleteSong={handleDeleteSong}
          switcher={switcher}
          // setPausePlayThroughFeed = {setPausePlayThroughFeed}
        />
      </div>
    </>
  );
}

export default App;
