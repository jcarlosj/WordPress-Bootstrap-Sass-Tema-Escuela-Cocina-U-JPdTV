<footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <?php # Define zona de menú en el tema 
                        $args = array(
                            'theme_location'  => 'main_menu',    # Nombre de la ubicación del tema
                            'container'       => 'nav',
                            'container_class' => 'navbar-light',
                            'items_wrap'      => '<ul id="%1$s" class="%2$s navbar navbar-nav d-flex flex-column flex-md-row text-center text-md-left text-uppercase">%3$s</ul>'
                        );
                        wp_nav_menu( $args );
                    ?>
                </div>
                <div class="col-md-6">
                    <p class="text-center text-md-right mt-1 mt-md-0 pt-2 copyright">Todos los derechos reservados &copy; <?php echo date( 'Y' ) ?> </p>
                </div>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>