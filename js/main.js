const $ = selector => document.querySelector(selector)
const showJobs = (data) =>{
   for(const {name, image, description, location,seniority,benefits,salary, long_term, languages, id} of data){
      $('.allJobs').innerHTML += `
      <div class='cardJob'>
         <h2>${name}</h2>
         <p>${description}</p>
         <a>${languages}</a>
      </div>`

      console.log(benefits)
   }
}

