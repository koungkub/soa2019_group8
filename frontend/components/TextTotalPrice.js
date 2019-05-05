import { Component, Fragment } from "react"
class TextTime extends Component {
    constructor(props){
        super(props)
        this.state = {
            totalPrice: "Please wait"
        }
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.price - nextprops.discount > 0){
            this.setState({
            totalPrice: nextprops.price - nextprops.discount
            })
        }
        else{
            this.setState({
                totalPrice: 0
            })
        }
    
    }
    render(){
        
        return (
            <Fragment>
                {this.state.totalPrice}
            </Fragment>
        )
    }
}
export default TextTime