import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import LinearProgress from '@material-ui/core/LinearProgress';

const propTypes = {
  token: PropTypes.string,
  setPlayerData: PropTypes.func,
  item: PropTypes.object,
  progress: PropTypes.number
};

const PLAYER_URL = 'https://api.spotify.com/v1/me/player';

const Player = ({ token = '', setPlayerData, item, progress }) => {

    const getData = async () => {
      const rawResponse = await fetch(`${PLAYER_URL}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (rawResponse.status === 200) {
        const content = await rawResponse.json();
        setPlayerData(content);
      }
      ;
    };

    React.useEffect(() => {
      getData();

    }, [ token ]);

    return (
      <div className={styles.root}>
        <img className={styles.img} src={item.album && item.album.images && item.album.images[ 0 ].url} alt='playing'/>
        <h1
          className={styles.text}> Artist Name: {item.album && item.album.artists[ 0 ] && item.album.artists[ 0 ].name} </h1>
        <h1
          className={styles.text}> Track Name: {item.name} </h1>
        <LinearProgress variant="determinate" value={progress * 100 / item.duration_ms}/>
      </div>
    );
  }
;

const styles = {
  root: css({}),
  img: css({
    width: 200,
    height: 200,
    borderRadius: 40,
  }),
  text: css({
    color: 'white',
    fontSize: 16,
  })
};

Player.propTypes = propTypes;

export default Player;
