// src/pages/Home.jsx
import React from 'react';
import './Home.css'; // Asegúrate de tener este archivo CSS

const Home = () => {
    return (
        <div>
            {/* Sección Hero */}
            <section id="inicio" className="hero">
                <div className="hero-content">
                    <h1>Descubre el Encanto de Nuestras Cabañas</h1>
                    <p>Relájate en un entorno natural con todas las comodidades.</p>
                    <button className="btn-reservar">Reservar Ahora</button> {/* Añadido botón de reservar */}
                </div>
            </section>

            {/* Sección de Características */}
            <section id="caracteristicas" className="caracteristicas">
                <div className="features-list">
                    <div className="feature-item">
                        <h3>Confort y Relax</h3>
                        <p>Disfruta de nuestras cabañas completamente equipadas.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Entorno Natural</h3>
                        <p>Ubicación en un entorno natural que te hará sentirte en paz.</p>
                    </div>
                </div>
            </section>

            {/* Galería */}
            <section id="galeria" className="galeria">
                <div className="slider">
                    <div className="slide">
                        <img src="../Imgn/CAB1.jpg" alt="Cabaña 1" />
                        <img src="../Imgn/CAB2.jpg" alt="Cabaña 2" />
                    </div>
                    {/* Añade más imágenes como desees */}
                </div>
                <div className="slider-controls">
                    <button className="slider-btn prev">Previo</button>
                    <button className="slider-btn next">Siguiente</button>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section id="servicios" className="servicios">
                <div className="servicios-etiquetas">
                    <div className="etiqueta">Piscina</div>
                    <div className="etiqueta">Quincho para asados</div>
                    <div className="etiqueta">Jardín</div>
                    <div className="etiqueta">Sala de juegos</div>
                </div>
            </section>

            {/* Sección de Testimonios */}
            <section id="testimonios" className="testimonios">
                <div className="container">
                    <div className="testimonios-grid">
                        <h3>Testimonios de nuestros clientes:</h3>
                        <div className="testimonio">
                            <p>"La mejor experiencia de mi vida. ¡Volveremos seguro!"</p>
                            <p>- Juan Pérez</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Contacto */}
            <section id="contacto" className="contacto">
                <div className="contacto-form">
                    <h3>Contacto</h3>
                    <form action="#" method="POST">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" required></textarea>
                        </div>
                        <button type="submit" className="btn-enviar">Enviar</button>
                    </form>
                </div>
            </section>

            {/* Pie de Página */}
            <footer className="footer">
                <p>&copy; 2024 Cabañas María Elena. Todos los derechos reservados.</p>
            </footer>

            {/* Scripts */}
            {/* Asegúrate de que el script sea necesario, de lo contrario, elimínalo */}
            <script src="../components/ManejoSlides.jsx"></script>
        </div>
    );
};

export default Home;
