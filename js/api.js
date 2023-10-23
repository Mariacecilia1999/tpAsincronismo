const  urlJobs = 'https://640d6a8f1a18a5db837656bc.mockapi.io/api/jobs'

fetch(urlJobs)
.then(response => response.json())
.then(data => showJobs(data))

