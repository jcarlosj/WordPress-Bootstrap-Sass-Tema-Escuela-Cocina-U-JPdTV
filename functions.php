<?php 
/**
 * Enqueue scripts and styles.
 */

function escuelacocina_scripts() {
    // wp_enqueue_style( 'escuelacocina-style', get_stylesheet_uri() );										// Enlaza automáticamente hoja de estilos style.css en el raíz del tema
    wp_enqueue_style( 'escuelacocina-style-min', get_template_directory_uri() . '/style.min.css' );			// Enlaza hoja de estilos style.min.css en el raíz del tema
    wp_enqueue_style( 'bootstrap', get_template_directory_uri(). '/dist/libs/bootstrap.min.css', false );	// Enlaza hola de estilos 'Bootstrap'

    //wp_enqueue_script( 'jquery' );																										// Enlaza versión de jQuery disponible de WordPress
    wp_enqueue_script( 'escuelacocina-jquery', get_template_directory_uri() . '/dist/libs/jquery.min.js', array(), 'v4.3.1', true );		// Enlaza versión de jQuery 

    wp_enqueue_script( 'escuelacocina-bootstrap', get_template_directory_uri() . '/dist/libs/bootstrap.min.js', array( 'escuelacocina-jquery' ), 'v4.3.1', true );	// Enlaza JS 'Bootstrap'
}
add_action( 'wp_enqueue_scripts', 'escuelacocina_scripts' );

?>