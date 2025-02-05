import React from "react";
import "./contact.css";
import avatar from "../../assets/creator/avatar.png"

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <div className="contact__container">
                <h1 className="section__title creators">Minds Behind Genimation</h1>
                <div className="creators">
                    <div className="contact__box">
                        <div className="avatar">
                            <img
                            src={avatar}
                            alt="avatar"
                            />
                        </div>
                        <div className="creators box">
                            <h2 className="section__subtitle contact">Shashank</h2>
                            <h3 className="section__subtitle creators"><span>Full Stack AI Engineer</span></h3>
                            <div className="social-icons">
                                <a
                                    href='https://www.linkedin.com/in/shashankrajashekar/'
                                    className='avatar-name'
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className='bx bxl-linkedin'></i>
                                </a>
                                <a
                                    href='https://shashanks.netlify.app/'
                                    className='portfolio'
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="contact__box">
                        <div className="avatar">
                            <img
                            src={avatar}
                            alt="avatar"
                            />
                        </div>
                        <div className="creators box">
                            <h2 className="section__subtitle contact">Sarika</h2>
                            <h3 className="section__subtitle creators"><span>Full Stack AI Engineer</span></h3>
                            <div className="social-icons">
                                <a
                                    href='https://www.linkedin.com/in/sarika-m-n/'
                                    className='avatar-name'
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className='bx bxl-linkedin'></i>
                                </a>
                                <a
                                    href='https://sarikamn-362.netlify.app'
                                    className='portfolio'
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
