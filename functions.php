<?php 

/** Integración del Plugin CMB2 al Tema */
require_once dirname( __FILE__ ) .'/integrated-plugins/example-functions.php';      # Archivo de campos de ejemplo de CMB2.
require_once dirname( __FILE__ ) .'/inc/custom-fields.php';                         # Archivo de configuración de campos personalizados de CMB2 (v2.6.0) disponibles para el tema.

/** Enqueue scripts and styles. */
function escuelacocina_scripts() {
    // wp_enqueue_style( 'escuelacocina-style', get_stylesheet_uri() );										// Enlaza automáticamente hoja de estilos style.css en el raíz del tema
    wp_enqueue_style( 'escuelacocina-style-min', get_template_directory_uri() . '/style.min.css' );			// Enlaza hoja de estilos style.min.css en el raíz del tema
    wp_enqueue_style( 'bootstrap', get_template_directory_uri(). '/dist/libs/bootstrap.min.css', false );	// Enlaza hola de estilos 'Bootstrap'

    //wp_enqueue_script( 'jquery' );																										// Enlaza versión de jQuery disponible de WordPress
    wp_enqueue_script( 'escuelacocina-jquery', get_template_directory_uri() . '/dist/libs/jquery.min.js', array(), 'v4.3.1', true );		// Enlaza versión de jQuery 

    wp_enqueue_script( 'escuelacocina-bootstrap', get_template_directory_uri() . '/dist/libs/bootstrap.min.js', array( 'escuelacocina-jquery' ), 'v4.3.1', true );	// Enlaza JS 'Bootstrap'
}
add_action( 'wp_enqueue_scripts', 'escuelacocina_scripts' );

/** Define  */
function escuelacocina_featured_image_of_page( $id ) {
    
    $template = '';
    $image_exists = false;
    $image = get_the_post_thumbnail_url( $id, 'full' );

    if( $image ) {
        $image_exists = true;
        $template .= '
            <div class="container">
                <div class="row page outstanding-image"></div><!-- .row -->
            </div><!-- .container -->
        ';

        # Registra hoja de estilos "virtual" linealmente
        wp_register_style( 'custom', false );       # false: Registra una clase que no va a existir como archivo (temporal).
        wp_enqueue_style( 'custom' );

        # Estilos que se aplicarán al template para desplegar imagen destacada
        $styles = "
            .page .outstanding-image {
                background-image: url( {$image} );
                background-size: cover;
                height: 24rem;
            }
        ";
        wp_add_inline_style( 'custom', $styles );      # Manejador (como fue registrada la clase)
    }

    return array(  
        'exists' => $image_exists, 
        'image'  => $template
    );
}
add_action( 'init', 'escuelacocina_featured_image_of_page' );

/** Crea las zonas de ubicación de menú disponibles para el tema. 
 * 
 *  1. Define la ubicación llamada:
 *     - main_menu
*/
function escuelacocina_setup_theme() {
    # Agrega soporte imagen destacada a los post tipo página
    add_theme_support( 'post-thumbnails' );
    # Regitra menú
    register_nav_menus( array(
        'main_menu' => esc_html__( 'Menú Principal', 'escuelacocina' )
    ) );
}
add_action( 'after_setup_theme', 'escuelacocina_setup_theme' );

/** Modifica atributos de items de lista de menu 
 * 
 * Agrega la clase 'nav-link' al elemento li del menú principal
*/
function escuelacocina_modify_attributes_list_items_menu( $attrs, $items, $args ) {
    # Valida la existencia de una ubicación de menú llamada 'main_menu'
    if( $args -> theme_location == 'main_menu' ) {
        $attrs[ 'class' ] = 'nav-link';
    }
    return $attrs;
}
add_filter( 'nav_menu_link_attributes', 'escuelacocina_modify_attributes_list_items_menu', 10, 3 );

?>