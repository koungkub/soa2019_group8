import authen from './authen'
import axios from 'axios'

class Parking {
    getCurrentTime(){
        if(authen.apply() == true){
            axios.get(localStorage.rootapi + 'parking').then(
                res=>{
                    return res.data
                }
            )
        } 
    }
}
export default Parking