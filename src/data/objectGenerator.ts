export function objectGenerator<T>(generator: (index?: number) => T) {
  return (amount: number) => {
    const objArr: T[] = [];

    for (let i = 0; i < amount; i++) {
      objArr.push(generator(i));
    }

    return objArr;
  };
}

// Utilizar el mismo objectGenerator y cambiar el método para que inserte los datos en la base de dato
// Solo se va utilizar una vez ya que los datos no se van a repetir
// Necesito tener datos que no importan?
