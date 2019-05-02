class Parking {
    getCurrentTime(){
        axios.get((localStorage.rootapi + 'parking') ,{
            headers: {
              'Authorization': localStorage.token
            }
          })
    }
}
export default Parking