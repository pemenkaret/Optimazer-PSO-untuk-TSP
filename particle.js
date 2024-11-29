class Particle {
    constructor(nDimensi, objFunction) {
        this.objFunction = objFunction;
        this.nDimensi = nDimensi;
        this.position = Array(nDimensi).fill(0);
        this.velocity = Array(nDimensi).fill(0);
        this.pbest = Array(nDimensi).fill(0);
        this.pbestFitness = -Infinity; // Inisialisasi dengan nilai yang sangat rendah
        this.fitness = -Infinity; // Inisialisasi dengan nilai yang sangat rendah
    }

    inisialisasiPosisi(min, max) {
        this.position[0] = 0; // Surabaya sebagai kota pertama
        for (let i = 1; i < this.nDimensi; i++) {
            this.position[i] = Math.floor(Math.random() * (max - min + 1)) + min;
            this.velocity[i] = 0; // Velocity juga dirandom
            this.pbest[i] = this.position[i];
        }
    }

    calculateFitness() {
        this.fitness = this.objFunction(...this.position);
        console.log(`Posisi: ${this.position}, Fitness: ${this.fitness}`);
    }

    updatePbest() {
        if (this.fitness > this.pbestFitness) {
            this.pbestFitness = this.fitness;
            this.pbest = [...this.position];
        }
    }

    updatePosition() {
        for (let i = 1; i < this.nDimensi; i++) { // Kota pertama tetap Surabaya
            this.position[i] += this.velocity[i];
            this.position[i] = Math.max(Math.round(this.position[i]), 1);
            this.position[i] = Math.min(this.position[i], 5); // Indeks 1 sampai 5 (untuk 5 kota selain Surabaya)
        }
    }
}

export { Particle };
