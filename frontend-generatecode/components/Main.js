import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import axios from 'axios'
class Main extends React.Component {
  
  handleName(event){
    this.setState(
      {
        name: event.target.value
      }
    )
  }
  handlePrice(event){
    this.setState(
      {
        price: parseInt(event.target.value)
      }
    )
  }
  reset(){
    this.setState({
        name: "",
        price: 0
    })
  }
  handleSubmit(event){
    axios.post("https://soa.smartfishermans.com:1323/discount/code",
    {
      store: this.state.name,
      amount: this.state.price
    }).then(res=>{
      this.setState({
        code: res.data.code,
        page: "success",
      })
    }).catch(err=>{
      this.setState({
        page: 'fail',
      })
    })
    event.preventDefault();
  }
  state ={
    name: "",
    price: 0,
    code:"Please Enter Detail",
    page:this.props.article,
    status:""
  }
  constructor(props){
    super(props)
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState ({
      page:nextProps.article,
  })
  }
  
  render() {
    let close = <div className="close" name="closeBtn" onClick={() => {this.props.onCloseArticle()}}></div>
    return (
      <div id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>
        <article id="intro" className={`${this.props.article === 'intro' && this.state.page === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Generate Discount Code</h2>
          <span className="image main">

          </span>
          <form onSubmit={this.handleSubmit}>
            <div className="field half first">
              <label htmlFor="name">STORE NAME</label>
              <input type="text" name="name" id="name"  value={this.state.name} onChange={this.handleName} />
            </div>
            <div className="field half">
              <label htmlFor="text">Price</label>
              <input min="0" type="number" name="price" value={this.state.price} onChange={this.handlePrice} id="price" />
            </div>
            <ul className="actions">
              <li><input name="submitcode" value="Generate" className="special" type="submit"/></li>
              <li><input name="reset"type="reset" value="Reset" onClick={this.reset}/></li>
            </ul>
          </form>
          {close}
        </article>

        <article id="statussucess" className={`${this.state.page === 'success' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major" style={{color:"green"}}>Success</h2>
          
          <h2 style={{textAlign:'center'}}>Your code is: </h2><p style={{fontSize:'3rem', textAlign:'center'}}>{this.state.code}</p>
          
          {close}
        </article>
        <article id="statusfail" className={`${this.state.page === 'fail' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major" style={{color:"red"}}>Error</h2>
          <h2 style={{textAlign:'center'}}>Have something error ? Please try again.</h2> {this.state.status}
          {close}
        </article>
        
        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Contact</h2>
          <h3> Jirasak Jungburapa 59070025  <a href="https://github.com/koungkub"><FontAwesomeIcon icon={faGithub} /> </a> <a href="https://www.facebook.com/koung11"><FontAwesomeIcon icon={faFacebook} /></a></h3>
          <h3>Chansin Thongkum 59070038<a href="https://github.com/startmt"><FontAwesomeIcon icon={faGithub} /> </a> <a href="https://www.facebook.com/startkmitl"><FontAwesomeIcon icon={faFacebook} /></a></h3>
          <h3>Tanatch Bumrungthaichaichan 59070073 <a href="https://github.com/it59070073"><FontAwesomeIcon icon={faGithub} /> </a> <a href="https://www.facebook.com/ppinnpipo"><FontAwesomeIcon icon={faFacebook} /></a></h3>
          <h3>Phuthanarat Kongkietvanitch 59070134 <a href="https://github.com/bestkmitl"><FontAwesomeIcon icon={faGithub} /> </a> <a href="https://www.facebook.com/phuthanarat.kong"><FontAwesomeIcon icon={faFacebook} /></a></h3>
          <ul className="icons">
          <h2>Visit our project >>>> <li><a href="https://github.com/koungkub/soa2019_group8">
              <FontAwesomeIcon icon={faGithub} />
            </a></li></h2>
            
          </ul>
          {close}
        </article>

      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool
}

export default Main