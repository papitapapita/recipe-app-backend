export function objectGenerator<T>(generator: () => T) {
  return (amount: number) => {
    const objArr: T[] = [];

    for (let i = 0; i < amount; i++) {
      objArr.push(generator());
    }

    return objArr;
  };
}
