const $ = selector => document.querySelector(selector)
$('#jobTitle').value

const addJobForm = () =>{
   return {
      name: $('#jobTitle').value,
      description:$('#description').value,
      location: $('#location').value,
      seniority: $('#seniority').value,
      category: $('#category').value,
      benefits: {
         vacations: $('#vacations').value,
         health_ensurance: $('#healthEnsurance').value,
         internet_paid: $('#internetPaid').value
      },
      salary: $('#salary').value,
      long_term:$('#longTerm').value,
      languages: [
         $('#languages').value
      ]
   }
}


const initialized = () =>{
   $('#addJobBtn').addEventListener('submit', (e) =>{
      e.preventDefault()
      addJobApi(urlJobs)
   })
}

document.addEventListener('DOMContentLoaded', initialized)