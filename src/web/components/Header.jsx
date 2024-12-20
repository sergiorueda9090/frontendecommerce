import logoDefault from "../../assets/img/plantilla/logo.png";
export const Header = () => {

    return (
        <>
            {/* TOP */}
            <div className="container-fuild barraSuperior" id="top">

                <div className="container">

                    <div className="row">

                        {/* REDES SOCIALES */}
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12 social">

                            <ul>

                            <ul>	

                                    <li>
                                        <a href="http://facebook.com/" target="_blank">
                                            <i className="fa fa-facebook redSocial facebookBlanco" aria-hidden="true"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="http://youtube.com/" target="_blank">
                                            <i className="fa fa-youtube redSocial youtubeBlanco" aria-hidden="true"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="http://twitter.com/" target="_blank">
                                            <i className="fa fa-twitter redSocial twitterBlanco" aria-hidden="true"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="http://google.com/" target="_blank">
                                            <i className="fa fa-google-plus redSocial googleBlanco" aria-hidden="true"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="http://instagram.com/" target="_blank">
                                            <i className="fa fa-instagram redSocial instagramBlanco" aria-hidden="true"></i>
                                        </a>
                                    </li>

                                </ul>
                            
                            </ul>

                        </div>

                         {/*
                            <!--=====================================
                                REGISTRO
                                ======================================-->
                        */}

                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 registro">
                            
                            <ul>
                                
                                <li><a href="#modalIngreso" data-toggle="modal">Ingresar</a></li>
                                <li>|</li>
                                <li><a href="#modalRegistro" data-toggle="modal">Crear una cuenta</a></li>

                            </ul>

                        </div>	

                    </div>

                </div>

            </div>


            {
                /*<!--=====================================
                    HEADER
                ======================================-->*/
            }
            <header className="container-fluid">
                
                <div className="container">
                    
                    <div className="row" id="cabezote">

                        {/*<!--=====================================
                        LOGOTIPO
                        ======================================-->*/}
                        
                        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-12" id="logotipo">
                            
                            <a href="#">
                                    
                                <img src={logoDefault} className="img-responsive" />

                            </a>
                            
                        </div>

                        {/*<!--=====================================
                        BLOQUE CATEGORÍAS Y BUSCADOR
                        ======================================-->*/}

                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                
                            {/*<!--=====================================
                            BOTÓN CATEGORÍAS
                            ======================================-->*/}

                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 backColor" id="btnCategorias">
                                
                                <p>CATEGORÍAS
                                
                                    <span className="pull-right">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </span>
                                
                                </p>

                            </div>

                            {/*<!--=====================================
                            BUSCADOR
                            ======================================-->*/}
                            
                            <div className="input-group col-lg-8 col-md-8 col-sm-8 col-xs-12" id="buscador">
                                
                                <input type="search" name="buscar" className="form-control" placeholder="Buscar..." />	

                                <span className="input-group-btn">
                                    
                                    <a href="#">

                                        <button className="btn btn-default backColor" type="submit">
                                            
                                            <i className="fa fa-search"></i>

                                        </button>

                                    </a>

                                </span>

                            </div>
                        
                        </div>

                        {/*<!--=====================================
                        CARRITO DE COMPRAS
                        ======================================-->*/}

                        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-12" id="carrito">
                            
                            <a href="#">

                                <button className="btn btn-default pull-left backColor"> 
                                    
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                
                                </button>
                            
                            </a>	

                            <p>TU CESTA <span className="cantidadCesta">3</span> <br/> USD $ <span className="sumaCesta">20</span></p>	

                        </div>

                    </div>

                    {/*<!--=====================================
                    CATEGORÍAS
                    ======================================-->*/}
                    
                    <div className="row backColor" id="categorias">
                        
                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                            
                            <h4>
                                <a href="#" className="pixelCategorias">Lorem Ipsum</a>
                            </h4>
                            
                            <hr/>

                            <ul>
                                
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                            
                            </ul>

                        </div>

                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                            
                            <h4>
                                <a href="#" className="pixelCategorias">Lorem Ipsum</a>
                            </h4>
                            
                            <hr/>

                            <ul>
                                
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                            
                            </ul>

                        </div>	

                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                            
                            <h4>
                                <a href="#" className="pixelCategorias">Lorem Ipsum</a>
                            </h4>
                            
                            <hr/>

                            <ul>
                                
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                            
                            </ul>

                        </div>	

                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                            
                            <h4>
                                <a href="#" className="pixelCategorias">Lorem Ipsum</a>
                            </h4>
                            
                            <hr/>

                            <ul>
                                
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                            
                            </ul>

                        </div>	

                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                            
                            <h4>
                                <a href="#" className="pixelCategorias">Lorem Ipsum</a>
                            </h4>
                            
                            <hr/>

                            <ul>
                                
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                <li><a href="#" className="pixelSubCategorias">Lorem Ipsum</a></li>
                                            
                            </ul>

                        </div>	

                    </div>
                  


                </div>

            </header>

        </>
    )

}