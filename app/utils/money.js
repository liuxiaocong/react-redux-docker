export function toMoney(amount, currencySymbol) {
  return (currencySymbol ? `${currencySymbol} ` : '') + (Number.isNaN(parseFloat(amount)) ? '' : parseFloat(amount).toFixed(2));
}

export default { toMoney };
