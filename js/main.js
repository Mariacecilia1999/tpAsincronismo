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
         <div class='editDelete'>
            <img class='editJob imgEdit' id-edit="${id}"  src='../img/lapiz.png'/>
            <img class='deleteJob'  id-delete="${id}" src='../img/eliminar.png'/>
         </div>
         <h2>${name}</h2>
         <p>${description}</p>
         <a>${languages.map(language => `<span class='languageStyle'>${language}</span>`).join(' ')}</a>
         <div id='containerMore'>
            <a class='more' id-more='${id}'>Ver más<a/>
         </div>
      </div> 
      `

      $$('.more').forEach(btnMore =>{
         btnMore.addEventListener('click', () =>{
            const idMore = btnMore.getAttribute('id-more')
            console.log(idMore)
            $('#seeMoreContainer').classList.remove('hidden')
            showJobsApiId(idMore)
         })
      })

   }
  if(data.length === 0){
      $('.textResult').innerText = 'No hay resultados'
      $('#chargind').style.backgroundColor ='red'
      showJobsApi()
  }else{
   $('.textResult').innerText = 'Cargando resultados'
   $('#chargind').style.backgroundColor ='rgb(148, 216, 148)'
  }
   capturingDeleteBtn()
   capturingEditBtn()
  
}

const optionSearch = (categories,locations, senioritys) =>{
   $('#searchCategory').innerHTML = `<option value=''>Categoría</option>`
   for(const category of categories){
      $('#searchCategory').innerHTML += `<option value='${category}'>${category}</option>`
   }
   $('#searchLocation').innerHTML = `<option value=''>Lugar</option>`
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
   $('#searchSeniority').value = seniorityFilter
   $('#searchLocation').value = locationFilter
   $('#searchCategory').value = categoryFilter
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
         $('.allJobs').style.display='none'
         $('#editForm').style.display=''
         $('#editForm').classList.remove('hidden')
         $('#editForm').style.display='flex'
         $('#jobForm').style.display='flex'
         $('#editBtn').classList.remove('hidden')
         $('#submit').classList.add('hidden')
         $('.filters').classList.add('hidden')
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

const loading = () =>{
   //setTimeout(showJobsApi, 2000);
   $('.allJobs').classList.remove('hidden')
   $('#editForm').classList.remove('hidden')
   $('#chargind').style.display='none'
  
}

const showFormNewJob = () =>{
   $('.allJobs').classList.add('hidden')
   $('.allJobs').classList.add('hidden')
   $('#editForm').classList.remove('hidden')
   $('#editForm').classList.remove('hidden')
   $('#editForm').style.display='flex'
   $('#jobForm').style.display='flex'
   $('#containerForm').classList.remove('hidden')
   $('#jobForm').classList.remove('hidden')
}

const showAllJobsLink = () =>{
   $('.allJobs').classList.remove('hidden')
   $('.allJobs').classList.remove('hidden')
   $('#editForm').classList.add('hidden')
   $('#jobForm').classList.add('hidden')
   $('#editForm').style.display='none'
   $('.allJobs').style.display=''
}
const clearValue = () =>{
   $('#jobTitle').value = ''
   $('#description').value = ''
   $('#location').value = ''
   $('#seniority').value = ''
   $('#category').value = ''
   $('#vacations').value = ''
   $('#healthEnsurance').value = ''
   $('#internetPaid').value = ''
   $('#salary').value = ''
   $('#longTerm').value = ''
   
}

const seeMore = ({name, description, languages, salary,benefits,category, seniority, location})=>{
   $('.allJobs').classList.add('hidden')
   $('#editForm').classList.add('hidden')
   $('#jobForm').classList.add('hidden')
   $('#editForm').style.display='none'
   $('#seeMoreContainer').innerHTML= `<div class='cardJobMore'>
   <h2>Nombre: ${name}</h2>
   <p>Categoría: ${category}</p>
   <p>Seniority: ${seniority}</p>
   <p>Lugar: ${location}</p>
   <p>${description}</p>
   <p>Sueldo: ${salary}</p>
   <div>
      <a>Vacaciones: ${benefits.vacations}</a>
      <a>Seguro medico: ${benefits.health_ensurance}</a>
      <a>Internet pago: ${benefits.internet_paid}</a>
   </div>
   <a>${languages.map(language => `<span class='languageStyle'>${language}</span>`).join(' ')}</a>
</div> `

}

const initialized = () => {
   $('#cancell').addEventListener('click', (e) =>{
      showAllJobsLink()
      clearValue()
   })
   $('#linkNewJob').addEventListener('click', (e) =>{
      e.preventDefault()
      showFormNewJob()
      clearValue()
      $('#editBtn').classList.add('hidden')
      $('#submit').classList.remove('hidden')
      $('.filters').classList.add('hidden')
      $('#seeMoreContainer').classList.add('hidden')
   })
   $('#linkAllJobs').addEventListener('click', (e) =>{
      e.preventDefault()
      showAllJobsLink()
      $('.filters').classList.remove('hidden')
      $('#seeMoreContainer').classList.add('hidden')
      showJobsApi()
   })



   setTimeout(loading, 2000);
   showJobsApi()
   $('#searchParams').addEventListener('click', (e) =>{
      e.preventDefault()
      //loading()
      $('.allJobs').classList.add('hidden')
      $('#editForm').classList.add('hidden')
      $('#chargind').style.display='block'
       setTimeout(loading, 2000);
       urlParams()
   })
   $('#addLanguage').addEventListener('click', (e) => {
      e.preventDefault()
      addLanguajes()
   })
   $('#jobForm').addEventListener('submit', (e) => {
      e.preventDefault()
      addJobApi(urlJobs)
      showJobsApi()
      showAllJobsLink()
   })
   $('#editBtn').addEventListener('click', (e) =>{
      e.preventDefault()
      const idJob = $('#editBtn').getAttribute('id-edit')
      editJobApi(urlJobs,idJob)
      showAllJobsLink()
   })
   
   $('#clearResults').addEventListener('click', (e) =>{
      e.preventDefault()
      $('#searchSeniority').value = ''
      $('#searchLocation').value = ''
      $('#searchCategory').value = ''
      location.reload()
   })

   
}

window.addEventListener('DOMContentLoaded', initialized)
