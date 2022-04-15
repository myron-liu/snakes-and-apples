import './overlayScreenStyles.css';

import SPACE_RESTART_TUTORIAL from './assets/space-restart-tutorial.png';

function GameOverScreenComponent(props) {
    return (
        <section className="start-screen">
            <div className="vertical-center">
                <h1>GAME OVER</h1>
                <img src={SPACE_RESTART_TUTORIAL} className="space-key-tutorial" alt=""></img>
                <h3 style={{ marginTop: 0, marginBottom: '1.5em' }}>or click</h3>
                <h2><b>To restart</b></h2>
            </div>
        </section>
    );
}

export default GameOverScreenComponent;