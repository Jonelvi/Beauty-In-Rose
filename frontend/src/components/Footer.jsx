import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-rose mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <h5>🎃 Beauty in Rose</h5>
            <p>Tu tienda de belleza y cuidado personal de confianza.</p>
          </div>
          <div className="col-6 col-lg-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h5>Contacto</h5>
            <address>
              Av. Esquina Blanca 501<br />
              <a href="mailto:camilavngs@gmail.com">camilavngs@gmail.com</a><br />
              <a href="tel:+56964071426">+56 9 6407 1426</a>
            </address>
          </div>
          <div className="col-12 col-lg-3">
            <h5>Síguenos</h5>
            <ul className="list-unstyled">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center border-top pt-3 mt-3 mb-0">
          &copy; 2026 Beauty in Rose. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
