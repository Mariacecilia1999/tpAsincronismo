const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector)
const languages = []


const showJobs = (data) => {
   for (const {id, name, image, description, location, seniority, benefits, salary, long_term, languages} of data) {
      $('.allJobs').innerHTML += `
      <div class='cardJob'>
         <h2>${name}</h2>
         <p>${description}</p>
         <a>${languages.join(', ')}</a>
      </div> 
      <div class='deleteJob' id-delete="${id}">Delete</div>
      <div class='editJob' id-edit="${id}">Editar</div>`

   }
  
   capturingDeleteBtn()
   capturingEditBtn()
}

const capturingDeleteBtn = () =>{
   for(const btn of $$('.deleteJob')){
      btn.addEventListener('click', (e) =>{
         e.preventDefault()
         const getDelete = btn.getAttribute('id-delete')
         console.log(getDelete)
         deleteJob(getDelete)
      })
   }
}

const capturingEditBtn = () =>{
   for(const btn of $$('.editJob')){
      btn.addEventListener('click', () =>{
         const get = btn.getAttribute('id-edit')
         $('#editBtn').setAttribute('id-edit', get)
         showJobsApi(get)
         isSubmit = false
         })
     
   }
   
}

const formEditJob = (job) =>{
   $('#jobTitle').value = job.name
   $('#description').value = job.description
   $('#location').value = job.location
   $('#seniority').value = job.seniority
   $('#category').value = job.categor
   $('#vacations').value = job.benefits.vacations
   $('#healthEnsurance').value = job.benefits.health_ensurance
   $('#internetPaid').value = job.benefits.internet_paid
   $('#salary').value = job.salary
   $('#longTerm').value = job.long_term
   
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
         addJobApi(urlJobs)
   });
   $('#editBtn').addEventListener('click', (e) =>{
      e.preventDefault()
      const idJob = $('#editBtn').getAttribute('id-edit')
      editJobApi(urlJobs,idJob)
   })
   
   
}

window.addEventListener('DOMContentLoaded', initialized)
