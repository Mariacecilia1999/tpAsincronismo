const  urlJobs = 'https://640d6a8f1a18a5db837656bc.mockapi.io/api/jobs'

const showJobsApi = (id = '') =>{
   fetch(`${urlJobs}/${id}`)
   .then(response => response.json())
   .then(data => {
      if(id == ''){
         showJobs(data)
      }else{
         formEditJob(data)
      }
   })
   
}

const addJobApi = (url) =>{
fetch(url,{
   method: 'POST', 
   headers:{
      'Content-Type' : 'Application/json'
   },
   body: JSON.stringify(addJobForm())
})
}

const editJobApi = (url, id) =>{
   fetch(`${url}/${id}`,{
      method: 'PUT', 
      headers:{
         'Content-Type' : 'Application/json'
      },
      body: JSON.stringify(addJobForm())
   })
   }
   

const deleteJob = (id) =>{
   fetch(`${urlJobs}/${id}`,{
      method: 'DELETE', 
   })
}

const searchPararmsApi = (params) => {
   const apiUrlWithParams = `${urlJobs}${params ? `?${params}` : ""}`;
   console.log(apiUrlWithParams)
   fetch(apiUrlWithParams)
     .then((response) => response.json())
     .then((data) => filtersSearchs(data))
     .catch((error) => console.error('Error al obtener datos de la API:', error));
 }


 