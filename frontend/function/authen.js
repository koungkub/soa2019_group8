import Router from 'next/router';
function checklogin(){
  try{
    token = localStorage.token
    if (token == "undefined") {
        if(location.pathname == '/scan'){
         Router.push("/scan")
        }
      }
      else {
        return true
      }
  }catch(e){
    console.log(location.pathname)
    if(location.pathname == '/scan'){
      Router.push("/scan")
     }
  }
}
export default checklogin