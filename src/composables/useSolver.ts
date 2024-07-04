export default function () {
  const OPS = ["+", "-", "*", "/"];

  function applyOp(n1: any, n2: any, op: any) {
    switch (op) {
      case "+":
        return n1 + n2;
      case "-":
        return Math.abs(n1 - n2);
      case "*":
        return n1 * n2;
      case "/":
        if (n2 !== 0 && n1 % n2 === 0) {
          return Math.floor(n1 / n2);
        } else if (n1 !== 0 && n2 % n1 === 0) {
          return Math.floor(n2 / n1);
        }
        break;
      default:
        return null;
    }
  }

  function findSolution(numbers: any, target: any) {
    if (numbers.includes(target)) {
      return [target.toString()];
    }

    const queue = [];
    queue.push([numbers, []]);
    const seen = new Set();

    while (queue.length > 0) {
      const [currentNumbers, steps] = queue.shift();
      const currentNumbersTuple = currentNumbers
        .slice()
        .sort((a: any, b: any) => a - b)
        .toString();

      if (seen.has(currentNumbersTuple)) {
        continue;
      }
      seen.add(currentNumbersTuple);

      for (let i = 0; i < currentNumbers.length; i++) {
        for (let j = i + 1; j < currentNumbers.length; j++) {
          for (let op of OPS) {
            const newNumbers = currentNumbers.filter(
              (_: any, index: any) => index !== i && index !== j
            );
            const res = applyOp(currentNumbers[i], currentNumbers[j], op);

            if (res !== null) {
              const newSteps = steps.concat([
                `${currentNumbers[i]} ${op} ${currentNumbers[j]} = ${res}`,
              ]);
              if (res === target) {
                return newSteps;
              }
              queue.push([newNumbers.concat([res]), newSteps]);
            }
          }
        }
      }
    }

    return null;
  }

  return { findSolution };

  //   // Ejemplo de uso
  //   const numbers = [1, 3, 7, 10, 25, 50];
  //   const target = 765;
  //   const solution = findSolution(numbers, target);

  //   if (solution) {
  //     console.log("Solución encontrada:");
  //     for (let step of solution) {
  //       console.log(step);
  //     }
  //   } else {
  //     console.log("No se encontró una solución.");
  //   }
}
