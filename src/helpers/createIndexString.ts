export default function createIndexString(number: number) {
  return `${number < 10 ? '0' : ''}${number}`;
}
