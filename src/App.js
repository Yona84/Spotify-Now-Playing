import React from 'react';
import { css } from 'emotion';
import background from './spotify-theme-music-bkg-dark.png';
import Player from './components/Player';

export const authEndpoint = 'https://accounts.spotify.com/authorize?';

// Replace with your app's client ID, redirect URI and desired scopes

const clientId = 'f8a918d65fbf4aab85e9afc90e65816f';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[ parts[ 0 ] ] = decodeURIComponent(parts[ 1 ]);
    }
    return initial;
  }, {});
window.location.hash = '';

const App = () => {

  const [ token, setToken ] = React.useState('');
  const [item, setItem ] = React.useState({
    item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms:0,
    },
  });

  const [ progress , setProgress ] = React.useState(0);


  React.useEffect(() => {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      setToken(_token);
    }
  }, []);

  const setPlayerData = React.useCallback((data) => {
    setItem(data.item);
    setProgress(data.progress_ms);
  },[token]);

  console.log('item', item);

  return (
    <div className={styles.app({ background })}>
      {!token && (
        <a
          className={styles.spotifyButton}
          href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {
        token &&
        <Player token={token} setPlayerData={setPlayerData} item={item} progress={progress}/>
      }
    </div>
  );
};

const styles = {
  app: ({ background }) => css({
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundImage: `url(${background})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundPosition: 'left',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#1b1e21'
  }),
  spotifyButton: css({
    width: 200,
    height: 40,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 40,
    padding: 20,
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 600
  })
};

export default App;
