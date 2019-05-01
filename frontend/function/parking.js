import authen from './authen'
import axios from 'axios'
const _authen = authen.apply()

function getCurrentTime(){
    axios.get().then(
        res=>{
            return res.data
        }
    )
}