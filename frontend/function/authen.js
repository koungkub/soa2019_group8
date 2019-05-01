import Router from 'next/router';
function checklogin(pathname){
  console.log(pathname)
  try{
    token = localStorage.token
    if (token == "undefined") {
        if(!window.location.pathname == '/scan'){
         Router.push("/login")
        }
   
      }
      else {
        return true
      }
  }catch(e){
  }
}
export default checklogin