import Router from 'next/router';
function checklogin(){
    if (typeof localStorage.token == "undefined") {
        if(window.location.pathname == '/signup'){
          return false
        }
        Router.push("/login")
      }
    else{
        return true
    }
}
export default checklogin