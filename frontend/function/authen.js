import Router from 'next/router';

function checklogin(){
  try{
    const token = localStorage.token
    if (typeof(token) == "undefined") {
        if(location.pathname != '/scan'){
          if(location.pathname != '/scanlegacy'){
            Router.push("/scan")
          }
        }
        return false
      }
      else {
        return true
      }
  }catch(e){
    console.log(e)
    if(location.pathname != '/scan'){
      if(location.pathname != '/scanlegacy'){
        Router.push("/scan")
      }
    }
     return false
  }
}
export default (checklogin)