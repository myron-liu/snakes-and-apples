import PropTypes from 'prop-types';
import './startScreen.css'

import ARROW_KEYS_TUTORIAL from './assets/arrow-keys-tutorial.png';

function StartScreenComponent(props) {
        return (
            <section className="start-screen" style={{ "width": props.width, "height": props.height, "marginTop": -props.height - 2 }}>
                <div class="vertical-center">
                    <img src={ARROW_KEYS_TUTORIAL} className="key-tutorial" alt=""></img>
                    <p><b>Arrow Keys to Move</b></p>
                    <p>The more red apples you eat, the longer you will grow.</p>
                    <p>Beware of running into yourself or walls. Certain death will follow.</p>
                    <button className="start-button" onClick={props.onPlayClicked}>Play!</button>
                </div>
            </section>
        );
}

StartScreenComponent.propTypes = {
    onPlayClicked: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default StartScreenComponent