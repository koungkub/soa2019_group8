import PropTypes from 'prop-types';
import Link from 'next/link'
const Footer = (props) => (
    <footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
        <p className="copyright">&copy; EZ SOA <Link href="https://github.com/koungkub/soa2019_group8" ><a>Project Link</a></Link></p>
    </footer>
)

Footer.propTypes = {
    timeout: PropTypes.bool
}

export default Footer
