import Header from './Header.js'
import { Component } from 'react';
class Layout extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        document.body.style.background = "#f2f2f2"
       }
    render(){
        return(
        <div>
      <Header />
      {this.props.children}
        </div>
        );
    }
}
export default Layout