export const insertByPosition = (arr: number[], id: number, anchor?: number, position?: string) => {
  if (anchor && position) {
    return arr.reduce((prev: number[], item) => {
      if (item === anchor) {
        if (position === 'BEFORE') {
          return [...prev, id, item];
        } else {
          return [...prev, item, id];
        }
      }

      return [...prev, item]
    }, []);
  } else {
    return [
      ...arr,
      id
    ]
  }
};
