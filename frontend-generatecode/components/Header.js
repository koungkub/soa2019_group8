import PropTypes from 'prop-types';
const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="content">
            <div className="inner">
                <h1>Discount Generator</h1>
                <p>welcome! this website use to generate discount code</p>
            </div>
        </div>
        <nav>
            <ul>
                <li name = "intro"><a href="javascript:;" onClick={() => {props.onOpenArticle('intro')}}>Start</a></li>
                <li name = "contact"><a href="javascript:;" onClick={() => {props.onOpenArticle('contact')}}>Contact</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
