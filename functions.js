function generateRandomNumbers(n) {
    // vytvoří pole, naplní čísly
    const numbers = [...Array(20).keys()].map(i => i + 1);
  
    // zamíchá pořadí
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    // vrátí n prvků
    return numbers.slice(0, n);
  }


  