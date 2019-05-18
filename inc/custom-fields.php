<?php 
    # Campos personalizados específicos de CMB2 (v2.6.0) para el Tema.

    /** Home Page > front-page.php 
     * Metaboxes for the section us 
     */
    function escuelacocina_custom_fields_section_us() {
        $prefix = 'ec_section_us_';
        $home_id = get_option( 'page_on_front' );       # Get ID Page

        # Metabox que se mostrará en una sola página ID
        $cmb_section_us = new_cmb2_box(
            array(
                'id' => $prefix .'metabox',
                'title' => esc_html__( 'Sección Nosotros', 'escuelacocina' ),
                'object_types'  => array( 'page' ),         # Post type
                'show_on' => array( 'id' => $home_id ),     # Only show on the "home" page
                'show_names' => true, # Show field names on the left
                'context'    => 'normal',
                'priority'   => 'high',
                'mb_callback_args' => [ '__block_editor_compatible_meta_box' => true ],
            )
        );
        # Campo cargar imagen: Experiencia
        $cmb_section_us -> add_field( 
            array(
                'name' => esc_html__( 'Imagen 1:', 'cmb2' ),
                'desc' => esc_html__( 'Sube una imágen o ingresa una URL (Experiencia)', 'cmb2' ),
                'id'   => $prefix . 'imagen_1',
                'type' => 'file',
                'text' => array(
                    'add_upload_file_text' => esc_html__( 'Agregar imagen', 'cmb2' ), # Change upload button text. Default: "Add or Upload File"
                ),
                 // query_args are passed to wp.media's library query.
                'query_args' => array(
                    //'type' => 'application/pdf', // Make library only display PDFs.
                    // Or only allow gif, jpg, or png images
                    'type' => array(
                        'image/gif',
                        'image/jpeg',
                        'image/png',
                    ),
                ),
                'preview_size' => array( '341', '256' ), // Image size to use when previewing in the admin.
                'mb_callback_args' => ['__block_editor_compatible_meta_box' => true]
            ) 
        );
        # Campo textarea: Experiencia
        $cmb_section_us -> add_field( 
            array(
                'name'    => esc_html__( 'Descripción 1:', 'cmb2' ),
                'desc'    => esc_html__( 'Breve enunciado  (Experiencia)', 'cmb2' ),
                'id'      => $prefix . 'descripcion_1',
                'type'    => 'wysiwyg',
                'options' => array(
                    'textarea_rows' => 2,
                ),
            ) 
        );
        # Campo cargar imagen: Somos nosotros
        $cmb_section_us -> add_field( 
            array(
                'name' => esc_html__( 'Imagen 2:', 'cmb2' ),
                'desc' => esc_html__( 'Sube una imágen o ingresa una URL (Sobre nosotros)', 'cmb2' ),
                'id'   => $prefix . 'imagen_2',
                'type' => 'file',
                'text' => array(
                    'add_upload_file_text' => esc_html__( 'Agregar imagen', 'cmb2' ), # Change upload button text. Default: "Add or Upload File"
                ),
                 // query_args are passed to wp.media's library query.
                'query_args' => array(
                    //'type' => 'application/pdf', // Make library only display PDFs.
                    // Or only allow gif, jpg, or png images
                    'type' => array(
                        'image/gif',
                        'image/jpeg',
                        'image/png',
                    ),
                ),
                'preview_size' => array( '341', '256' ), // Image size to use when previewing in the admin.
                'mb_callback_args' => ['__block_editor_compatible_meta_box' => true]
            ) 
        );
        #Campo textarea: Somos nosotros
        $cmb_section_us -> add_field( 
            array(
                'name'    => esc_html__( 'Descripción 2:', 'cmb2' ),
                'desc'    => esc_html__( 'Breve enunciado (Sobre nosotros)', 'cmb2' ),
                'id'      => $prefix . 'descripcion_2',
                'type'    => 'wysiwyg',
                'options' => array(
                    'textarea_rows' => 2,
                ),
            ) 
        );

    }
    add_action( 'cmb2_admin_init', 'escuelacocina_custom_fields_section_us' );
?>