//-----------------input and span.error-----------------\\
const day_input = document.getElementById("day_input");
const day_span = document.getElementById("day_error");

const month_input = document.getElementById("month_input");
const month_span = document.getElementById("month_error");

const year_input = document.getElementById("year_input");
const year_span = document.getElementById("year_error");
year_input.max = new Date().getFullYear();

//------------------------output spans------------------------\\
const years_output = document.getElementById("years_output");
const months_output = document.getElementById("months_output");
const days_output = document.getElementById("days_output");

//-----------------------------------anonymous functions-----------------------------------\\
const printErrorMessage = (input, span, t) => {
  span.innerText = "";

  if (input.validity.valueMissing) span.innerText = "This field is required";
  if (input.validity.rangeOverflow || input.validity.rangeUnderflow)
    span.innerText = "Must be a valid " + t;
  if (input.validity.rangeOverflow && t == "year")
    span.innerText = "Must be in the past";
};

const checkInputs = () => {
  printErrorMessage(day_input, day_span, "day");
  printErrorMessage(month_input, month_span, "month");
  printErrorMessage(year_input, year_span, "year");

  const validation =
    !day_input.checkValidity() ||
    !month_input.checkValidity() ||
    !year_input.checkValidity();

  return validation;
};

const checkDate = (date) => {
  const validation =
    date.getDate() != day_input.value ||
    date.getMonth() + 1 != month_input.value ||
    date.getFullYear() != year_input.value;

  return validation;
};

const toCalc = (date) => {
  const today = new Date();

  //05 08 2004 - 18 04 2025 = 18 days
  //05 08 2004 - 04 08 2025 = 04 days
  //05 08 2004 - 05 08 2025 = 00 days
  //05 08 2004 - 20 08 2025 = 15 days
  let day =
    today.getMonth() == date.getMonth()
      ? today.getDate() < date.getDate()
        ? today.getDate()
        : today.getDate() - date.getDate()
      : today.getDate();

  //05 08 2004 - 18 04 2025 = 8 months
  //05 08 2004 - 24 08 2025 = 0 months
  //05 08 2004 - 25 12 2025 = 4 months
  let month =
    today.getMonth() >= date.getMonth()
      ? today.getMonth() - date.getMonth()
      : 12 - date.getMonth() + today.getMonth();

  let year = today.getFullYear() - date.getFullYear();

  //05 08 2004 - 18 04 2025 = 20 years
  //05 08 2004 - 04 08 2025 = 20 years
  //05 08 2004 - 05 08 2025 = 21 years
  //05 08 2004 - 25 12 2025 = 21 years
  year =
    today.getMonth() > date.getMonth()
      ? year
      : today.getMonth() == date.getMonth()
      ? today.getDate() < date.getDate()
        ? year - 1
        : year
      : year - 1;

  return {
    years: year,
    months: month,
    days: day,
  };
};

//-----------------------button btn_calc-----------------------\\
const btn = document.getElementById("btn_calc");
btn.addEventListener("click", () => {
  const input_section = document.getElementById("input_section");
  input_section.classList.toggle("error", true);

  if (checkInputs()) return;
  const birthday = new Date();
  birthday.setFullYear(year_input.value);
  birthday.setMonth(month_input.value - 1);
  birthday.setDate(day_input.value);

  birthday.setHours(0);
  birthday.setMinutes(0);
  birthday.setSeconds(0);

  if (checkDate(birthday)) {
    day_span.innerHTML = "Must be a valid date";
    return;
  }
  input_section.classList.toggle("error", false);

  const calc = toCalc(birthday);
  years_output.innerHTML = calc.years;
  months_output.innerHTML = calc.months;
  days_output.innerHTML = calc.days;
});
