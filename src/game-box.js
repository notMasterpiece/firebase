import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Ceil from './Ceil';

class GameBox extends Component {

    handleClick (number) {
        console.log(number);
    }

    renderCeil (number) {
        return <td className='game-td'>
            <Ceil
                number={number}
                click={this.handleClick}
            />
        </td>
    }

    render() {
        return (
            <table className='game-box'>
                <tr className='game-row'>
                    {this.renderCeil(0)}
                    {this.renderCeil(1)}
                    {this.renderCeil(2)}
                </tr>
                <tr className='game-row'>
                    {this.renderCeil(3)}
                    {this.renderCeil(4)}
                    {this.renderCeil(5)}
                </tr>
                <tr className='game-row'>
                    {this.renderCeil(6)}
                    {this.renderCeil(7)}
                    {this.renderCeil(8)}
                </tr>
            </table>
        );
    }
}

GameBox.propTypes = {};

export default GameBox;
