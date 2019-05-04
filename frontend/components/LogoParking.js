import Image from 'react-bootstrap/Image'
import React, { Component, Fragment } from 'react'

class LogoParking extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
    render(){
        const logo = {
            width: '100%'
        }
        return(
                <Fragment>
                <Image name="logo" src="../static/logo.png" style={logo}/>
                </Fragment>
        )
    }
}
export default LogoParking