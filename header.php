<!DOCTYPE html>
<html <?php language_attributes(); ?> >
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?> >
    <header class="header py-5">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-8 col-sm-6 col-md-4 mb-4 mb-md-0">
                    <a href="<?php echo esc_url( home_url( './' ) ); ?>">
                        <img class="img-fluid" src="<?php echo get_template_directory_uri() .'/dist/assets/images/logo.svg'; ?>" alt="Escuela de Cocina">
                    </a>
                </div>  <!-- .col-md-4 -->
                <div class="col-md-8">
                    <nav class="navbar navbar-expand-md navbar-light justify-content-center">
                        <button class="navbar-toggler mb-4" type="button" data-toggle="collapse" data-target="#menu-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <?php # Define zona de menú en el tema 
                            $args = array(
                                'theme_location'  => 'main_menu',    # Nombre de la ubicación del tema
                                'container_id'    => 'menu-main',
                                'container_class' => 'collapse navbar-collapse justify-content-center justify-content-lg-end',
                                'items_wrap'      => '<ul id="%1$s" class="%2$s navbar-nav text-center text-uppercase">%3$s</ul>'
                            );
                            wp_nav_menu( $args );
                        ?>
                    </nav>  <!-- .nav -->
                </div>  <!-- .col-md-8 -->
            </div>  <!-- .row -->
        </div>  <!-- .container -->
    </header>  <!-- .header .py-5 -->