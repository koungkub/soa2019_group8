import { Component, Fragment } from "react"
class TextTime extends Component {
    controlPrice(){
        let total = this.state.price - this.state.discount
        if(total > 0){
            return total
        }
        else{
            return 0
        }
    }
    constructor(props){
        super(props)
        this.state = {
            price : this.props.price,
            discount: this.props.discount
        }
    }
    componentWillReceiveProps(nextprops){
        this.setState({
            price : nextprops.price,
            discount: nextprops.discount
        })
    }
    render(){
        
        return (
            <Fragment>
                {this.controlPrice()}
            </Fragment>
        )
    }
}
export default TextTime