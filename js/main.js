const $ = selector => document.querySelector(selector);
const languages = []

const showJobs = (data) => {
   for (const { name, image, description, location, seniority, benefits, salary, long_term, languages, id } of data) {
      $('.allJobs').innerHTML += `
      <div class='cardJob'>
         <h2>${name}</h2>
         <p>${description}</p>
         <a>${languages.join(', ')}</a>
      </div>`
   }
}

const addJobForm = () => {
   return {
      name: $('#jobTitle').value,
      description: $('#description').value,
      location: $('#location').value,
      seniority: $('#seniority').value,
      category: $('#category').value,
      benefits: {
         vacations: $('#vacations').value,
         health_ensurance: $('#healthEnsurance').value,
         internet_paid: $('#internetPaid').value
      },
      salary: $('#salary').value,
      long_term: $('#longTerm').value,
      languages: languages
   }
}

const addLanguajes = () => {
   const language = $('#languages').value
   languages.push(language)
   console.log(languages)
   return languages
}

const initialized = () => {
   showJobsApi()
   $('#addLanguage').addEventListener('click', (e) => {
      e.preventDefault()
      addLanguajes()
   })
   $('#jobForm').addEventListener('submit', (e) => {
      e.preventDefault()
      console.log('clic')
      addJobApi(urlJobs)
   });
}

window.addEventListener('DOMContentLoaded', initialized)
