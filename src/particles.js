import { } from 'particles.js'
import PARTICLES_CONFIG_JSON from './particlesConfig.json'

export class ppmVisualizer {
    constructor(containerElementId) {
        window.particlesJS(containerElementId, PARTICLES_CONFIG_JSON);
        this.pJSViz = window.pJSDom[0].pJS;
    }

    setParticleCount(count) {
        const startParticleCount = 278;

        // copy-paste on https://desmos.com/calculator 2^{\left(-0.007x\ +10\right)}+3
        const x = (count - startParticleCount);
        const xScale = -0.007 // controls the rate at which particles get added
        const xOffset = 10; // controls the inital number of particles (but it's math, look at the desmos)
        const particleInverseDensity = Math.pow(2, x * xScale + xOffset) + 3

        this.pJSViz.particles.number.density.value_area = particleInverseDensity
        this.pJSViz.fn.vendors.densityAutoParticles(); // library function here: https://github.com/VincentGarreau/particles.js/blob/d01286d6dcd61f497d07cc62bd48e692f6508ad5/particles.js#L1164
    }

    resizeCanvas(width, height) {
        // this code from library here: https://github.com/VincentGarreau/particles.js/blob/d01286d6dcd61f497d07cc62bd48e692f6508ad5/particles.js#L198
        this.pJSViz.canvas.w = width;
        this.pJSViz.canvas.h = height;

        /* resize canvas */
        if (this.pJSViz.tmp.retina) {
            this.pJSViz.canvas.w *= this.pJSViz.canvas.pxratio;
            this.pJSViz.canvas.h *= this.pJSViz.canvas.pxratio;
        }

        this.pJSViz.canvas.el.width = this.pJSViz.canvas.w;
        this.pJSViz.canvas.el.height = this.pJSViz.canvas.h;

        /* repaint canvas on anim disabled */
        if (!this.pJSViz.particles.move.enable) {
            this.pJSViz.fn.particlesEmpty();
            this.pJSViz.fn.particlesCreate();
            this.pJSViz.fn.particlesDraw();
            this.pJSViz.fn.vendors.densityAutoParticles();
        }

        /* density particles enabled */
        this.pJSViz.fn.vendors.densityAutoParticles();
    }
}
