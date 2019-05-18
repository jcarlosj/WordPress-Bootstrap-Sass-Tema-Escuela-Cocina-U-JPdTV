<?php get_header(); ?>

<?php # Open Loop WP 
    while( have_posts() ): the_post();
?>

<div class="page page-index">
    <main>

        <section class="container-fluid us">
            <div class="row us__experience">
                <div class="col-md-6 bg-primary">

                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-sm-8 col-md-6">
                            <div class="text-center text-light us__content py-3">
                                <?php echo get_post_meta( get_the_ID(), 'ec_section_us_descripcion_1', true ); ?>
                            </div>
                        </div>    
                    </div><!-- .row .justify-content-center .align-items-center -->

                </div>
                <div class="col-md-6 us__experience--bg-image" style="background-image: url( '<?php echo get_post_meta( get_the_ID(), 'ec_section_us_imagen_1', true ); ?>' );"></div>
            </div><!-- .row -->
            <div class="row us__about-us">
                <div class="col-md-6 bg-secondary">

                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-sm-8 col-md-6">
                            <div class="text-center us__content py-3">
                                <?php echo get_post_meta( get_the_ID(), 'ec_section_us_descripcion_2', true ); ?>
                            </div>
                        </div>    
                    </div><!-- .row .justify-content-center .align-items-center -->

                </div>
                <div class="col-md-6 us__about-us--bg-image" style="background-image: url( '<?php echo get_post_meta( get_the_ID(), 'ec_section_us_imagen_2', true ); ?>' );"></div>
            </div><!-- .row -->
        </section><!-- section.content-fluid -->
        
        <section class="container study-with-us my-5">
            <h2 class="text-center my-5 separator">¿Por qué estudiar con nosotros?</h2>
            <div class="row">
                <div class="col-md-4 text-center study-with-us__info">
                    <img class="img-fluid mb-3" src="<?php echo get_template_directory_uri() .'/dist/assets/images/icono_chef.png'; ?>" alt="Chef's Internacionales">
                    <h3>Chef's Internacionales</h3>
                    <p>Todo el conocimiento es impartido por los Chef's más destacados de esta industria, reconocidos internacionalmente.</p>
                </div><!-- .col-md-4 -->
                <div class="col-md-4 text-center study-with-us__info">
                    <img class="img-fluid mb-3" src="<?php echo get_template_directory_uri() .'/dist/assets/images/icono_vino.png'; ?>" alt="Todo sobre bebidas">
                    <h3>Todo sobre bebidas</h3>
                    <p>Aprenderás de catadores certificados expertos en bebidas cual es el mejor acompañante para cada plato.</p>
                </div><!-- .col-md-4 -->   
                <div class="col-md-4 text-center study-with-us__info">
                    <img class="img-fluid mb-3" src="<?php echo get_template_directory_uri() .'/dist/assets/images/icono_menu.png'; ?>" alt="Menú del mundo">
                    <h3>Platillos y técnicas</h3>
                    <p>El programa actualiza constantemente el recetario y las técnicas. Toda la puesta en escena de la gastronomía mundial.</p>
                </div><!-- .col-md-4 -->
            </div>
        </section>

        <section class="container-fluid lessons py-5">

            <div class="container">

                <h1 class="text-center separator">Próximas clases</h1>
                <div class="row">
                    <div class="col-md-6 col-lg-4">

                        <div class="card my-3">
                            <img src="<?php echo get_template_directory_uri() .'/dist/assets/images/clase-1.jpg'; ?>" class="card-img-top" alt="...">
                            <div class="card--meta bg-primary py-2 px-3 text-light d-flex justify-content-between align-items-center">
                                <p class="m-0">21 de Febrero, 3:00pm</p>
                                <span class="badge badge-secondary p-2">$ 600.000.oo</span>
                            </div><!-- .card--meta -->
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <h5 class="card-title">Dis gravida ornarec justo.</h5>
                                <p class="card--subtitle">Nam justo luctus gravida eu, commodo fringilla sem enim hac.</p>
    
                                <p class="card-text">Vulputate quam hac est porttitor placerat per posuere praesent, tristique magna pulvinar dui condimentum vitae quisque nostra, velit et hendrerit gravida tellus.</p>
                                <a href="./clase.html" class="btn btn-primary d-block d-md-inline">Más información</a>
                                
                            </div><!-- .card-body -->
                        </div><!-- .card .my-3 -->

                    </div><!-- .col-md-6 col-lg-4 -->
                    <div class="col-md-6 col-lg-4">

                        <div class="card my-3">
                            <img src="<?php echo get_template_directory_uri() .'/dist/assets/images/clase-2.jpg'; ?>" class="card-img-top" alt="...">
                            <div class="card--meta bg-primary py-2 px-3 text-light d-flex justify-content-between align-items-center">
                                <p class="m-0">28 de Mayo, 5:00pm</p>
                                <span class="badge badge-secondary p-2">$ 650.000.oo</span>
                            </div><!-- .card--meta -->
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <h5 class="card-title">Taciti lobortis metus</h5>
                                <p class="card--subtitle">Auctor conubia imperdiet aenean.</p>
    
                                <p class="card-text">Faucibus rhoncus lectus eget hendrerit cubilia mi est, placerat varius odio risus tincidunt class.</p>
                                <a href="./clase.html" class="btn btn-primary d-block d-md-inline">Más información</a>
                                
                            </div><!-- .card-body -->
                        </div><!-- .card .my-3 -->

                    </div><!-- .col-md-6 col-lg-4 -->
                    <div class="col-md-6 col-lg-4">

                        <div class="card my-3">
                            <img src="<?php echo get_template_directory_uri() .'/dist/assets/images/clase-3.jpg'; ?>" class="card-img-top" alt="...">
                            <div class="card--meta bg-primary py-2 px-3 text-light d-flex justify-content-between align-items-center">
                                <p class="m-0">8 de Abril, 10:00am</p>
                                <span class="badge badge-secondary p-2">$ 400.000.oo</span>
                            </div><!-- .card--meta -->
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <h5 class="card-title">Senectus scelerisque</h5>
                                <p class="card--subtitle">Eleifend curae vivamus.</p>
    
                                <p class="card-text">Qiquam nam consequat nulla pulvinar placerat, eros non ullamcorper ridiculus elementum euismod morbi.</p>
                                <a href="./clase.html" class="btn btn-primary d-block d-md-inline">Más información</a>
                                
                            </div><!-- .card-body -->
                        </div><!-- .card .my-3 -->

                    </div><!-- .col-md-6 col-lg-4 -->
                    <div class="col-md-6 col-lg-4">

                        <div class="card my-3">
                            <img src="<?php echo get_template_directory_uri() .'/dist/assets/images/clase-4.jpg'; ?>" class="card-img-top" alt="...">
                            <div class="card--meta bg-primary py-2 px-3 text-light d-flex justify-content-between align-items-center">
                                <p class="m-0">13 de Agosto, 9:00pm</p>
                                <span class="badge badge-secondary p-2">$ 400.000.oo</span>
                            </div><!-- .card--meta -->
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <h5 class="card-title">At nibh congue.</h5>
                                <p class="card--subtitle">Tincidunt ad interdum mauris suscipit diam dictum.</p>
    
                                <p class="card-text">Torquent luctus hac lacus malesuada euismod nam porta dignissim sagittis vivamus fringilla.</p>
                                <a href="./clase.html" class="btn btn-primary d-block d-md-inline">Más información</a>
                                
                            </div><!-- .card-body -->
                        </div><!-- .card .my-3 -->

                    </div><!-- .col-md-6 col-lg-4 -->
                    <div class="col-md-6 col-lg-4">

                        <div class="card my-3">
                            <img src="<?php echo get_template_directory_uri() .'/dist/assets/images/clase-5.jpg'; ?> " class="card-img-top" alt="...">
                            <div class="card--meta bg-primary py-2 px-3 text-light d-flex justify-content-between align-items-center">
                                <p class="m-0">21 de Septiembre, 5:00pm</p>
                                <span class="badge badge-secondary p-2">$ 460.000.oo</span>
                            </div><!-- .card--meta -->
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <h5 class="card-title">Turpis sagittis ornare leo accumsan.</h5>
                                <p class="card--subtitle">Ornare maecenas erat scelerisque.</p>
    
                                <p class="card-text">Eros aliquam at mauris a pharetra luctus urna est hendrerit sociis, ridiculus facilisis nascetur mi pretium turpis libero morbi maecenas.</p>
                                <a href="./clase.html" class="btn btn-primary d-block d-md-inline">Más información</a>
                                
                            </div><!-- .card-body -->
                        </div><!-- .card .my-3 -->

                    </div><!-- .col-md-6 col-lg-4 -->
                    <div class="col-md-6 col-lg-4">

                        <div class="card my-3">
                            <img src="<?php echo get_template_directory_uri() .'/dist/assets/images/clase-6.jpg'; ?>" class="card-img-top" alt="...">
                            <div class="card--meta bg-primary py-2 px-3 text-light d-flex justify-content-between align-items-center">
                                <p class="m-0">2 de Octubre, 10:00pm</p>
                                <span class="badge badge-secondary p-2">$ 340.000.oo</span>
                            </div><!-- .card--meta -->
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <h5 class="card-title">Magnis ridiculus.</h5>
                                <p class="card--subtitle">Aeget tempor mollis.</p>
    
                                <p class="card-text">Nascetur cursus quis fermentum himenaeos integer suspendisse, eu vulputate massa.</p>
                                <a href="./clase.html" class="btn btn-primary d-block d-md-inline">Más información</a>
                                
                            </div><!-- .card-body -->
                        </div><!-- .card .my-3 -->

                    </div><!-- .col-md-6 col-lg-4 -->
                    <div class="col-12 text-right">
                        <a href="./clases.html" class="btn btn-primary">Ver todos los cursos</a>
                    </div>
                </div><!-- .row -->

            </div><!-- container -->

        </section><!-- container-fluid .lessons -->

        <section class="container-fluid be-a-chef">
            <div class="container">
                <div class="row justify-content-center align-content-center">
                    <div class="col-md-8 text-center text-light">
                        <h2>¿Quiéres ser Chef?</h2>
                        <p class="display-4">Estudia con nosotros y conviertete en Chef al lado de los mejores.</p>
                        <a href="./contacto.html" class="btn btn-primary text-uppercase">Más información</a>
                    </div>
                </div>
            </div>
        </section>

    </main>
</div><!-- .page .page-index -->

<?php # Close Loop WP 
    endwhile;
?>

<?php get_footer(); ?>