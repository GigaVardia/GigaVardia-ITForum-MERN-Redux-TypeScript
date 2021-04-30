import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons"

const FacebookIco = <FontAwesomeIcon icon={faFacebook} />
const GithubIco = <FontAwesomeIcon icon={faGithub} />
const LinkedInIco = <FontAwesomeIcon icon={faLinkedin}/>

const Footer = () => {
    return (
        <footer className="footer footer-outer">
            <div className="footer-inner container">
                <div className="footer__left">
                    IT-FORUM
                </div>
                <div className="footer__center">
                    Copyright © 2021 IT-FORUM. Designed By Giga Vardia
                </div>
                <div className="footer__right">
                    <div className="footer__right-item">
                        <a
                            className="footer__right-item-link"
                            href="https://www.linkedin.com/in/giga-vardia-087a30206/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {LinkedInIco}
                        </a>
                    </div>
                    <div className="footer__right-item">
                        <a
                            className="footer__right-item-link"
                            href="https://github.com/GigaVardia"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {GithubIco}
                        </a>
                    </div>
                    <div className="footer__right-item">
                        <a
                            className="footer__right-item-link"
                            href="https://www.facebook.com/giga.vardia"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {FacebookIco}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;