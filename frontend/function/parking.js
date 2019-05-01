import axios from 'axios'

class Parking {
    getCurrentTime(){
        axios.get(localStorage.rootapi + 'parking').then(
            res=>{
                return res.data
            }
        ) 
    }
}
export default Parking