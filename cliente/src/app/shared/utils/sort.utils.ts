export function sortByPrecioAsc<T extends { precio: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.precio - b.precio);
}

export function sortByPrecioDesc<T extends { precio: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => b.precio - a.precio);
}

export function sortByNombreAsc<T extends { nombre: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

export function sortByNombreDesc<T extends { nombre: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => b.nombre.localeCompare(a.nombre));
}