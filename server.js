const express = require('express')
const app = express()
const port = 3000 || 4500
const cors = require('cors')

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Defining a get route that listens for get request and extract query parameters
app.get('/api', (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;
  const statusCode = res.statusCode

  // Get the current day of the week
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time with a +/-2 minute window
  const timeNow = new Date();
  const utcTime = new Date(timeNow.getTime() - timeNow.getTimezoneOffset() * 60000).toISOString();

  // Construct GitHub URLs
  const githubFileUrl = "https://github.com/UniqueEl/hngx/server.js";
  const githubRepoUrl = "https://github.com/UniqueEl/hngx";

  // Create the JSON response
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: statusCode,
  };

  // Sending the response as JSON
  res.json(response);
});

// connecting to the server
app.listen(port, () => console.log(`App is listening on port ${port}!`))