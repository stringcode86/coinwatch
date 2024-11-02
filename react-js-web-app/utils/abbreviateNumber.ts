var SYMBOL = ["", "k", "mil", "bil", "tril", "quad", "quin"];

export function abbreviateNumber(number){

  // what tier? (determines symbol)
  let tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if(tier == 0) return number;

  // get suffix and determine scale
  let suffix = SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);

  // scale the number
  let scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + ' ' + suffix;
}