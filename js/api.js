const  urlJobs = 'https://640d6a8f1a18a5db837656bc.mockapi.io/api/jobs'

const addJobApi = (url) =>{
fetch(url,{
   method: 'POST', 
   headers:{
      'Content-Type' : 'Application/json'
   },
   body: JSON.stringify(addJobForm())
})
}

