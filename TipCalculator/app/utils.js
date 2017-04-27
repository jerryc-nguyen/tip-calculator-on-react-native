Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

let currencies = { 
  dong:     { label: "Viet Nam Dong", locale: "vi-VN", option: { style: 'currency', currency: 'VND' }},
  usdollar: { label: "US Dollar",     locale: "en-US", option: { style: 'currency', currency: 'USD' }},
  euro:     { label: "Euro",          locale: "en-US", option: { style: 'currency', currency: 'EUR' }}
}

let formatNumber = (value, currency) => {
  if (Object.keys(currencies).indexOf(currency) == -1) {
    return 0;
  }

  let locale = currencies[currency].locale;
  let option = currencies[currency].option;
  return value.toLocaleString(locale, option);
}

export default {
  currencies: currencies,
  formatNumber: formatNumber
}
