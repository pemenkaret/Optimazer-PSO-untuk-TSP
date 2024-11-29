const cities = {
    "Surabaya": { x: -7.250445, y: 112.768845 },
    "Probolinggo": { x: -7.754669, y: 113.215913 },
    "Malang": { x: -7.966620, y: 112.632632 },
    "Madiun": { x: -7.631573, y: 111.529809 },
    "Tuban": { x: -6.967195, y: 112.038849 },
    "Sumenep": { x: -7.004613, y: 113.849285 }
};

function distance(city1, city2) {
    const xDist = city1.x - city2.x;
    const yDist = city1.y - city2.y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
}

function performanceFunction(...indexes) {
    const cityNames = Object.keys(cities);
    let totalDistance = 0;
    let prevCity = cities["Surabaya"];
    let visited = new Set();
    visited.add(0); // Surabaya selalu kota pertama

    for (let i = 1; i < indexes.length; i++) {
        if (visited.has(indexes[i])) {
            return "Melwati kota yang sama"; // Nilai fitness sangat buruk jika ada kota yang dilewati lebih dari sekali
        }
        visited.add(indexes[i]);
        const city = cities[cityNames[indexes[i]]];
        totalDistance += distance(prevCity, city);
        prevCity = city;
    }

    // Kembali ke kota awal (Surabaya)
    totalDistance += distance(prevCity, cities["Surabaya"]);

    return -totalDistance; // Nilai negatif karena PSO mencari nilai maksimum
}

export { performanceFunction };
