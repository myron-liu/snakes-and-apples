import './overlayScreenStyles.css';

import ARROW_KEYS_TUTORIAL from './assets/arrow-keys-tutorial.png';

function GameOverScreenComponent(props) {
    return (
        <section className="start-screen">
            <div className="vertical-center">
                <h1>GAME OVER</h1>
                <img src={ARROW_KEYS_TUTORIAL} className="key-tutorial" alt=""></img>
                <p><b>Press any key to restart.</b></p>
            </div>
        </section>
    );
}

export default GameOverScreenComponent;