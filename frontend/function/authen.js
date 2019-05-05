import Router from 'next/router';
import axios from 'axios'
function checklogin(){
  try{
    const token = localStorage.token
    axios.get(rootapi+ 'parking',{headers:{
      headers: {
        'Authorization': localStorage.token
      }
    }}).then(res=>{
      return true
    }).catch(e=>{
      localStorage.clear()
      if(location.pathname != '/scan'){
        if(location.pathname != '/scanlegacy'){
          Router.push("/scan")
        }
      }
      return false;
    })
  }catch(e){
    localStorage.clear()
    if(location.pathname != '/scan'){
      if(location.pathname != '/scanlegacy'){
        Router.push("/scan")
      }
    }
     return false
  }
}
export default (checklogin)