import React from 'react';
import './startScreen.css'

import ARROW_KEYS_TUTORIAL from './assets/arrow-keys-tutorial.png';

export default class StartScreen extends React.Component {
    render() {
        return (
            <section className="start-screen" style={{ "width": this.props.width, "height": this.props.height, "marginTop": -this.props.height - 2 }}>
                <div class="vertical-center">
                    <img src={ARROW_KEYS_TUTORIAL} className="key-tutorial" alt=""></img>
                    <p><b>Arrow Keys to Move</b></p>
                    <p> The more apples you eat, the longer you grow (or so it seems). </p>
                    <p> Beware running into yourself or the walls for certain death will follow. </p>
                    <button className="start-button" onClick={this.props.onPlayClicked}>Play!</button>
                </div>
            </section>
        );
    }
}