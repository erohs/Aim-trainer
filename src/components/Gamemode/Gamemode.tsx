import React from 'react';
import Game from '../Game/Game';
import { IGamemodeProps } from './interfaces/IGamemodeProps';
import { IGamemodes } from './interfaces/IGamemodes';

const gamemodes: IGamemodes = {
    clicking: Game
}

class Gamemode extends React.Component<IGamemodeProps> {
    render() {
        if (typeof gamemodes[this.props.gamemode] !== "undefined") {
            return React.createElement(gamemodes[this.props.gamemode]);
        }

        return React.createElement(
            () => <div>The {this.props.gamemode} gamemode could not be loaded. Try clearing local storage</div>
        );
    }
}

export default Gamemode;
