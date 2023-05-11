Acceptance criteria goit-js-hw-09 repository created. In your submitted
homework, there are two links for each project: to the source files and your
working page on GitHub Pages. During live page visits, there are no errors or
warnings generated in the console. Project built with parcel-project-template.
Code formatted with Prettier. Start files Download the startup files with the
layout, styles, and attached script files for each task. Copy them to your
project, completely overwriting the src folder in parcel-project-template.

Task 1 - color switcher Do this task in the 01-color-switcher.html and
01-color-switcher.js files. Check out the demo video of the switcher.

In HTML, there are "Start" and "Stop" buttons.

<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>

Write a script that, after clicking the "Start" button, changes the <body>
background color once a second to a random value using the inline style. When
clicking on the "Stop" button, background color change must stop.

ATENTION Please note that the «Start» button can be clicked an infinite number
of times. Make sure that the «Start» button is disabled while the theme change
is running.

Use the getRandomHexColor function to generate a random color.

function getRandomHexColor() { return
`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`; }

Task 2 - countdown timer Do this task in the 02-timer.html and 02-timer.js
files. Write a timer script that counts down to a specific date. Such a timer
can be used in blogs and online stores, event-logging pages, during maintenance,
etc. Watch a demo video of the timer.

Interface elements In HTML, there is ready-made markup for the timer, end date
selection field and a button that should trigger the timer when clicked. Add at
least some decoration to the interface elements.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>

flatpickr library Use the flatpickr library to allow cross-browser selection of
the end date and time in a single UI element. In order to add the CSS code of
the library to the project, you need to add one more import, aside from the one
described in the documentation.

// Described in documentation import flatpickr from "flatpickr"; // Additional
styles import import "flatpickr/dist/flatpickr.min.css";

The library expects to be initialized on the input[type="text"] element, so
there is an input#datetime-picker field added to the HTML document.

<input type="text" id="datetime-picker" />

An optional parameter object can be passed as the second argument to the
flatpickr(selector, options) function. We have prepared an object for you that
you need to complete the task. Find about the role of each property in the
Options documentation and use it in your code.

const options = { enableTime: true, time_24hr: true, defaultDate: new Date(),
minuteIncrement: 1, onClose(selectedDates) { console.log(selectedDates[0]); },
};

Date selection The onClose() method is called from the parameter object every
time the interface element that creates flatpickr is closed. It should be used
to handle the date selected by the user. The selectedDates parameter is an array
of the selected dates, so the first element is taken.

If the user selects a date from the past, show window.alert() with the text
"Please choose a date in the future". If the user has selected a valid date (in
the future), the "Start" button becomes active. The "Start" button must be
inactive until the user has selected a date in the future. When you click the
"Start" button, the countdown to the selected date starts from the time of
clicking. Countdown When you click on the "Start" button, the script must
calculate once a second how much time is left until the specified date and
update the timer interface, showing four numbers: days, hours, minutes and
seconds in the following format: xx:xx:xx:xx.

The number of days can be more than two digits. The timer must stop when it
reaches the end date, that is, 00:00:00:00. LET'S NOT COMPLICATE THINGS If the
timer is running, in order to select a new date and restart it, you need to
reload the page.

To calculate the values, use the ready-made function, convertMs, where ms is the
difference between the end and current date in milliseconds.

function convertMs(ms) { // Number of milliseconds per unit of time const second
= 1000; const minute = second _ 60; const hour = minute _ 60; const day =
hour \* 24;

// Remaining days const days = Math.floor(ms / day); // Remaining hours const
hours = Math.floor((ms % day) / hour); // Remaining minutes const minutes =
Math.floor(((ms % day) % hour) / minute); // Remaining seconds const seconds =
Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds }; }

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds:
20}

Time formatting The convertMs() function returns an object with the calculated
time remaining until the end date. Note that it does not format the result. That
is, if there are 4 minutes (or any other time unit) left, the function will
return 4, not 04. In the timer interface, you need to add 0 if there are less
than two digits in the number. Write an addLeadingZero(value) function that uses
the padStart() method and format the value before rendering the interface.

Notification library ATTENTION The following features are optional, but they
will be a good additional practice.

Use the notiflix library to display notifications to the user instead of
window.alert().

Task 3 - promise generator Do this task in the 03-promises.html and
03-promises.js files. Watch a demo video of the promise generator.

In HTML, there is form markup; in its fields, the user will enter the first
delay in milliseconds, the delay increment for each promise after the first one
and the number of promises to be created.

<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>

Write a script that, when submitting the form, calls the createPromise(position,
delay) function as many times as you entered in the amount field. On each call,
pass it the number of the promise to be created (position) and the delay given
the first delay (delay) and step (step) entered by the user.

function createPromise(position, delay) { const shouldResolve = Math.random() >
0.3; if (shouldResolve) { // Fulfill } else { // Reject } }

Supplement the code of the createPromise function so that it returns one promise
that will be fulfilled or rejected after delay time. The value of the promise
must be an object containing the position and delay properties with the values
of these parameters. Use the initial function code to choose whether to fulfill
or reject the promise.

createPromise(2, 1500) .then(({ position, delay }) => {
console.log(`✅ Fulfilled promise ${position} in ${delay}ms`); }) .catch(({
position, delay }) => {
console.log(`❌ Rejected promise ${position} in ${delay}ms`); });

Notification library ATTENTION The following features are optional, but they
will be a good additional practice.

Use the notiflix library to display notifications to the user instead of
console.log().

Parcel template This project was created with Parcel. For familiarization and
setting additional features refer to documentation.

This project was created with Parcel. For familiarization and setting additional
features [refer to documentation](https://parceljs.org/).

## Preparing a new project

1. Make sure you have an LTS version of Node.js installed on your computer.
   [Download and install](https://nodejs.org/en/) if needed.
2. Clone this repository.
3. Change the folder name from `parcel-project-template` to the name of your
   project.
4. Create a new empty GitHub repository.
5. Open the project in VSCode, launch the terminal and link the project to the
   GitHub repository
   [by instructions](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).
6. Install the project's dependencies in the terminal with the `npm install`
   command.
7. Start development mode by running the `npm start` command.
8. Go to [http://localhost:1234](http://localhost:1234) in your browser. This
   page will automatically reload after saving changes to the project files.

## Files and folders

- All stylesheet parshas should be in the `src/sass` folder and imported into
  the page stylesheets. For example, for `index.html` the style file is named
  `index.scss`.
- Add images to the `src/images` folder. The assembler optimizes them, but only
  when deploying the production version of the project. All this happens in the
  cloud so as not to burden your computer, as it can take a long time on weak
  machines.

## Deploy

To set up a project deployment, you need to perform a few additional steps to
set up your repository. Go to the `Settings` tab and in the `Actions` subsection
select the `General` item.

![GitHub actions settings](./assets/actions-config-step-1.png)

Scroll the page to the last section, in which make sure the options are selected
as in the following image and click `Save`. Without these settings, the build
will not have enough rights to automate the deployment process.

![GitHub actions settings](./assets/actions-config-step-2.png)

The production version of the project will be automatically built and deployed
to GitHub Pages, in the `gh-pages` branch, every time the `main` branch is
updated. For example, after a direct push or an accepted pull request. To do
this, you need to edit the `homepage` field and the `build` script in the
`package.json` file, replacing `your_username` and `your_repo_name` with your
own, and submit the changes to GitHub.

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
Next, you need to go to the settings of the GitHub repository (Settings > Pages) and set the distribution of the production version of files from the /root folder of the gh-pages branch, if this was not done automatically.

Next, you need to go to the settings of the GitHub repository (`Settings` > `Pages`) and set the distribution of the production version of files from the `/root` folder of the `gh-pages` branch, if this was not done automatically.

Deployment status
The deployment status of the latest commit is displayed with an icon next to its ID.

### Deployment status

The deployment status of the latest commit is displayed with an icon next to its ID.

- **Yellow color** - the project is being built and deployed.
- **Green color** - deployment completed successfully.
- **Red color** - an error occurred during linting, build or deployment.

More detailed information about the status can be viewed by clicking on the icon, and in the drop-down window, follow the link `Details`.

How it works
How it works

### Live page

After some time, usually a couple of minutes, the live page can be viewed at the address specified in the edited `homepage` property. For example, here is a link to a live version for this repository
https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

If a blank page opens, make sure there are no errors in the `Console` tab related to incorrect paths to the CSS and JS files of the project (**404**). Most likely you have the wrong value for the `homepage` property or the `build` script in the `package.json` file.

## How it works

![How it works](./assets/how-it-works.png)

1. After each push to the `main` branch of the GitHub repository, a special script (GitHub Action) is launched from the `.github/workflows/deploy.yml` file.
2. All repository files are copied to the server, where the project is initialized and built before deployment.
3. If all steps are successful, the built production version of the project files is sent to the `gh-pages` branch. Otherwise, the script execution log will indicate what the problem is.
```