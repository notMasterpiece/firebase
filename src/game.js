import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GameBox from './game-box';

class Game extends Component {
    render() {
        return (
            <div className='game-wrap'>
                <GameBox />
            </div>
        );
    }
}

Game.propTypes = {};

export default Game;
