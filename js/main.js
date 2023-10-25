const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector)
const languages = []
const categories = []
const locations = []
const senioritys = []

const showJobs = (data) => {
   
   data.forEach(item => {
     if (!categories.includes(item.category)) {
       categories.push(item.category)
     }
     if (!locations.includes(item.location)) {
       locations.push(item.location)
     }
     if (!senioritys.includes(item.seniority)) {
       senioritys.push(item.seniority)
     }
   });
   
   optionSearch(categories, locations, senioritys)
   $('.allJobs').innerHTML = ''
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

const optionSearch = (categories,locations, senioritys) =>{
   $('#searchCategory').innerHTML = `<option value=''>Category</option>`
   for(const category of categories){
      $('#searchCategory').innerHTML += `<option value='${category}'>${category}</option>`
   }
   $('#searchLocation').innerHTML = `<option value=''>Location</option>`
   for(const location of locations){
      $('#searchLocation').innerHTML += `<option value='${location}'>${location}</option>`
   }
   $('#searchSeniority').innerHTML = `<option value=''>Seniority</option>`
   for(const seniority of senioritys){
      $('#searchSeniority').innerHTML += `<option value='${seniority}'>${seniority}</option>`
   }
}

const urlParams = () => {
   const seniority = $('#searchSeniority').value
   const location = $('#searchLocation').value
   const category = $('#searchCategory').value
 
   const params = {}
 
   if (seniority) {
     params.seniority = seniority
   }
   if (location) {
     params.location = location
   }
   if (category) {
     params.category = category
   }
 
   const queryString = new URLSearchParams(params).toString()
   searchPararmsApi(queryString)
 }
 
 const filtersSearchs = (data) => {
   const seniorityFilter = $('#searchSeniority').value
   const locationFilter = $('#searchLocation').value
   const categoryFilter = $('#searchCategory').value
 
   const filteredData = data.filter((job) => {
     const matchSeniority = seniorityFilter === "" || job.seniority === seniorityFilter
     const matchLocation = locationFilter === "" || job.location === locationFilter
     const matchCategory = categoryFilter === "" || job.category === categoryFilter
 
     return matchSeniority && matchLocation && matchCategory
   })
 
   console.log(filteredData)
   showJobs(filteredData)
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
   $('#category').value = job.category
   $('#vacations').value = job.benefits.vacations,
   $('#healthEnsurance').value = job.benefits.health_ensurance,
   $('#internetPaid').value = job.benefits.internet_paid,
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
   $('#searchParams').addEventListener('click', (e) =>{
      e.preventDefault()
      urlParams()
   })
   setTimeout(showJobsApi, 2000);
   $('#addLanguage').addEventListener('click', (e) => {
      e.preventDefault()
      addLanguajes()
   })
   $('#jobForm').addEventListener('submit', (e) => {
      e.preventDefault()
         addJobApi(urlJobs)
   })
   $('#editBtn').addEventListener('click', (e) =>{
      e.preventDefault()
      const idJob = $('#editBtn').getAttribute('id-edit')
      editJobApi(urlJobs,idJob)
   })
   
   $('#clearResults').addEventListener('click', (e) =>{
      e.preventDefault()
      location.reload()
   })
}

window.addEventListener('DOMContentLoaded', initialized)
