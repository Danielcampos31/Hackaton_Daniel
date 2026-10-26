// Una partida jugada: quién, cuántos puntos, cuándo y cuánto tardó.
class Partida {
  constructor(nombre, puntos, total, fecha, segundos) {
    this.nombre = nombre;
    this.puntos = puntos;
    this.total = total;
    this.fecha = fecha;          // texto en formato ISO, por ejemplo "2026-03-15T12:00:00.000Z"
    this.segundos = segundos;
  }

  porcentaje() {
    return Math.round(this.puntos / this.total * 100);
  }

  resumen() {
    return this.nombre + ": " + this.puntos + "/" + this.total + " (" + this.porcentaje() + " %) · " +
           formatearFecha(this.fecha) + " · " + this.segundos + " s";
  }
}

function formatearFecha(textoISO) {
  const f = new Date(textoISO);
  return f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
}

// Las partidas se guardan en una cookie como un array en JSON.
function cargarPartidas() {
  const datos = leerCookie("partidas", []);
  return datos.map(d => new Partida(d.nombre, d.puntos, d.total, d.fecha, d.segundos));
}

function guardarPartida(partida) {
  const partidas = cargarPartidas();
  partidas.push(partida);
  guardarCookie("partidas", partidas.slice(-5), 30);   // solo las 5 últimas
}

// Ranking: las 3 mejores partidas (más puntos; si empatan, menos segundos).
function cargarRanking() {
  return leerCookie("ranking", []);
}

function actualizarRanking(partida) {
  const ranking = cargarRanking();
  ranking.push({ nombre: partida.nombre, puntos: partida.puntos, total: partida.total, segundos: partida.segundos });
  ranking.sort((a, b) => b.puntos - a.puntos || a.segundos - b.segundos);
  guardarCookie("ranking", ranking.slice(0, 3), 30);
}

function mediaPuntos(partidas) {
  if (partidas.length === 0) return 0;
  return partidas.reduce((suma, p) => suma + p.puntos, 0) / partidas.length;
}
