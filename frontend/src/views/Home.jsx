import { faClock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../App.css';


const Home = () => {
    return (
        <div>
        <div>
          <div className="work-hours">
          <FontAwesomeIcon icon={faClock} />
          <span>Lundi/Vendredi 09:00-18:00</span>
          <FontAwesomeIcon icon={faPhone} />
          <span>01321009</span>
          </div>
        </div>
        <header className="navbar">
          <div className="logo">
            <span className="logo-text"><h2>E-Bank</h2></span>
          </div>
          <nav>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Découvrir</a></li>
              <li><a href="#">Nos Services</a></li>
              <li><a href="#">Nous Contacter</a></li>
              <li class="nav-item"><a href="http://localhost:5173/login" class="filled-button">Déja Client</a></li>
            </ul>
          </nav>
        </header>
      <main>
        <div className="background-image">
          <div className="text-container">
            <h2>La rapidité à portée de clic avec E-Bank</h2>
              <a href="http://localhost:5173/register" className="filled-button">Devenir client</a>
          </div>
        </div>
      <br></br>
      <div id="nosServices" className="services">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Nos<em> Services</em></h2>
                <span>Nous avons une solution pour chacun de vos problèmes</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-item">
                <img src="/service_01.jpg" alt="" />
                <div className="down-content">
                  <h4>Virements &amp; Transferts</h4>
                  <p>Découvrez notre service de virements et de transferts rapides, conçu pour vous offrir une expérience bancaire sans tracas. Avec notre plateforme en ligne sécurisée, vous pouvez effectuer des virements et des transferts instantanés en toute simplicité, où que vous soyez et à tout moment.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-item">
                <img src="/service_02.jpg" alt="" />
                <div className="down-content">
                  <h4>Cartes Bancaires Personnalisées</h4>
                  <p>Que vous choisissiez la carte Visa Express, la carte Visa E-Premium, vous pourrez bénéficier d’avantages communs. Le plus dur sera de choisir ! Profitez également de fonctionnalités avancées telles que la sécurité renforcée, le suivi des dépenses en temps réel et bien plus encore. Obtenez dès maintenant votre carte bancaire personnalisée et commencez à vivre une expérience bancaire qui vous ressemble.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-item">
                <img src="/service_03.jpg" alt="" />
                <div className="down-content">
                  <h4>Epargne &amp; Prêts</h4>
                  <p>Découvrez nos solutions d'épargne et de prêt flexibles pour façonner un avenir financier plus prometteur. Économisez en toute sécurité et accédez rapidement aux fonds dont vous avez besoin pour concrétiser vos projets. Explorez nos options dès aujourd'hui !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-form">
        <div className="container">
          <div className="section-heading">
            <h2>Nous <em>Contacter</em></h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form id="contact" action="" method="post">
                <div className="row">
                  <div className="col-md-12">
                    <fieldset>
                      <input name="name" type="text" className="form-control" id="name" placeholder="Votre Nom" required=""/>
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="email" placeholder="Votre Adresse Email" required=""/>
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <textarea
                        name="message" rows="6" className="form-control" id="message" placeholder="Votre Message" required=""
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="filled-button">
                        Envoyer
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </main>
      <footer>
        <p>&copy; 2024 E-Bank. Tous droits réservés.</p>
      </footer>
    </div>




)
};

export default Home