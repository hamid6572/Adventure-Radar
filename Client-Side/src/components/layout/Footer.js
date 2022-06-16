/* eslint-disable jsx-a11y/anchor-is-valid */
function Footer() {
  return (
    <div
      className="footer"
      style={{
        position: 'absolute',
        padding: '0px',
        bottom: '0',
        width: '100%',
      }}
    >
      <div className="footer__logo">
        <img src="/assets/img/logo-green-small.png" alt="Radar" />
      </div>
      <ul className="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download apps</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
