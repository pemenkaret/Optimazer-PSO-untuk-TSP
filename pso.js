import { Particle } from "./particle.js";
import { performanceFunction } from './fitness.js'; 

class PSO {
    constructor(nParticles, nDimension) {
        this.nParticles = nParticles;
        this.particles = [];
        this.nDimension = nDimension;
        this.gbestFitness = -Infinity; // Inisialisasi dengan nilai yang sangat rendah
        this.gbestPosition = Array(nDimension).fill(0);
        this.init_particles();
    }

    init_particles() {
        for (let i = 0; i < this.nParticles; i++) {
            const particle = new Particle(this.nDimension, performanceFunction);
            particle.inisialisasiPosisi(1, 5); // 1-5 untuk setiap kota selain Surabaya
            this.particles.push(particle);
        }
    }

    evaluateFitness() {
        this.particles.forEach(particle => {
            particle.calculateFitness();
        });
    }

    updatePbest() {
        this.particles.forEach((particle) => {
            particle.updatePbest();
        });
    }

    updateGbest() {
        this.particles.forEach((particle) => {
            if (particle.pbestFitness > this.gbestFitness) {
                this.gbestFitness = particle.pbestFitness;
                this.gbestPosition = [...particle.pbest];
            }
        });
    }

    updateVelocity(c1 = 1, c2 = 1, w = 0.7) {
        this.particles.forEach((particle) => {
            for (let i = 1; i < this.nDimension; i++) {
                const r1 = Math.random();
                const r2 = Math.random();
                particle.velocity[i] = Math.round(
                    w * particle.velocity[i] +
                    c1 * r1 * (particle.pbest[i] - particle.position[i]) +
                    c2 * r2 * (this.gbestPosition[i] - particle.position[i])
                );
            }
        });
    }

    updatePosition() {
        this.particles.forEach((particle) => {
            particle.updatePosition();
        });
    }

    mainPSO() {
        this.evaluateFitness();
        this.updatePbest();
        this.updateGbest();
        this.updateVelocity();
        this.updatePosition();
    }
}

export { PSO };
