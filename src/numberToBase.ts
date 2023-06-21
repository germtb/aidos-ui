const LETTERS_52 = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export function numberToBase(
  number: number,
  base: Array<string> = LETTERS_52
): string {
  if (number <= -1) {
    return "";
  }

  let result = [];

  while (number >= base.length) {
    const index = number % base.length;
    number = Math.floor(number / base.length) - 1;
    result.push(base[index]);
  }

  result.push(base[number]);

  return result.reverse().join("");
}
