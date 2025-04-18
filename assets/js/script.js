//-----------------input and span.error-----------------
const day_input = document.getElementById("day_input");
const day_span = document.getElementById("day_error");

const month_input = document.getElementById("month_input");
const month_span = document.getElementById("month_error");

const year_input = document.getElementById("year_input");
const year_span = document.getElementById("year_error");
year_input.max = new Date().getFullYear();

//------------------------output spans------------------------
const years_output = document.getElementById("years_output");
const months_output = document.getElementById("months_output");
const days_output = document.getElementById("days_output");

//-----------------------------------anonymous functions-----------------------------------\\
const printMessage = (input, span, t) => {
  if (input.validity.valueMissing) {
    span.innerText = "This field is required";
  } else if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
    span.innerText = "Must be a valid " + t;
  } else if (checkYear(input) && t == "year") {
    span.innerText = "Must be in the past";
  } else {
    span.innerText = "";
  }
};

const checkYear = (input) => {
  const check =
    Number.parseInt(input.value) > Number.parseInt(new Date().getFullYear());

  return check ? true : false;
};

//button btn_calc
const btn = document.getElementById("btn_calc");
btn.addEventListener("click", () => {
  printMessage(day_input, day_span, "day");
  printMessage(month_input, month_span, "month");
  printMessage(year_input, year_span, "year");

  const validation =
    !day_input.checkValidity() ||
    !month_input.checkValidity() ||
    !year_input.checkValidity();
  if (validation) {
    document.getElementById("input_section").classList.toggle("error", true);
    return;
  }

  const birthday = new Date();
  birthday.setFullYear(year_input.value);
  birthday.setMonth(month_input.value - 1);
  birthday.setDate(day_input.value);

  birthday.setHours(0);
  birthday.setMinutes(0);
  birthday.setSeconds(0);

  if (
    birthday.getDate() != day_input.value ||
    birthday.getMonth() + 1 != month_input.value ||
    birthday.getFullYear() != year_input.value
  ) {
    document.getElementById("input_section").classList.toggle("error", true);
    day_span.innerHTML = "Must be a valid date";
    return;
  }

  document.getElementById("input_section").classList.toggle("error", false);
  const calce = calc(birthday);
  printOutput(calce);
});

const calc = (date) => {
  const today = new Date();

  //05 08 2004 - 18 04 2025 = 18 days
  //05 08 2004 - 04 08 2025 = 04 days
  //05 08 2004 - 05 08 2025 = 00 days
  //05 08 2004 - 20 08 2025 = 15 days
  let days =
    today.getMonth() == date.getMonth()
      ? today.getDate() < date.getDate()
        ? today.getDate()
        : today.getDate() - date.getDate()
      : today.getDate();

  //05 08 2004 - 18 04 2025 = 8 months
  //05 08 2004 - 24 08 2025 = 0 months
  //05 08 2004 - 25 12 2025 = 4 months
  let months =
    today.getMonth() >= date.getMonth()
      ? today.getMonth() - date.getMonth()
      : 12 - date.getMonth() + today.getMonth();

  let years = today.getFullYear() - date.getFullYear();

  //05 08 2004 - 18 04 2025 = 20 years
  //05 08 2004 - 04 08 2025 = 20 years
  //05 08 2004 - 05 08 2025 = 21 years
  //05 08 2004 - 25 12 2025 = 21 years
  years =
    today.getMonth() > date.getMonth()
      ? years
      : today.getMonth() == date.getMonth()
      ? today.getDate() < date.getDate()
        ? years - 1
        : years
      : years - 1;

  return {
    year: years,
    month: months,
    day: days,
  };
};

const printOutput = (out) => {
  years_output.innerHTML = out.year;
  months_output.innerHTML = out.month;
  days_output.innerHTML = out.day;
};
