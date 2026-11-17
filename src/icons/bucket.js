export function bucket(name) {
  let value = 0;
  for (const character of name)
    value = (value * 31 + character.charCodeAt(0)) & 31;
  return value;
}
