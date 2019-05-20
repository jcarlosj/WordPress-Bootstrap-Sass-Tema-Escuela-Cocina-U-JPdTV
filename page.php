<?php get_header(); ?>

<?php # Open Loop WP 
    while( have_posts() ): the_post();
?>

    <?php #
        $page_image = escuelacocina_featured_image_of_page( get_the_ID() ); 
        /** 
         * $page_image[ 0 ] > true/false indicando si existe o no una imagen asociada a la página
         * $page_image[ 1 ] > Contiene plantilla de despliege de imagen (siempre que esta última exista)
        */
        echo $page_image[ 1 ];
    ?>

    <main class="container">
        <div class="row justify-content-center">
            <div class="col-12 px-5 py-3 page-content <?php echo $page_image[ 0 ] ? 'col-md-8 with-image' : 'col-md-12 without-image'; ?>">
                <h1 class="text-center my-5 separator"><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </div><!-- .col-8 -->
        </div><!-- .row -->

        <section class="study-with-us my-5">
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
    </main><!-- .container -->    

<?php # Close Loop WP 
    endwhile;
?>    

<?php get_footer(); ?>