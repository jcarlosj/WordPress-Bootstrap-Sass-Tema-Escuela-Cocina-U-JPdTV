/**
 * >> Carga Plugins. <<
 * Importa, Carga plugins de Gulp y asigna a variables con nombres descriptivos.
 */
const { src, dest, series, parallel, lastRun, watch } = require( 'gulp' );                                 // Gulp

// Complementos relacionados con CSS.
const sass = require( 'gulp-sass' ),                            // Gulp plugin para la compilación de Sass.
      minifycss = require( 'gulp-uglifycss' ),                  // Minimiza los archivos CSS.
      autoprefixer = require( 'gulp-autoprefixer' ),            // Agrega prefijos CSS automática.
      mmq = require( 'gulp-merge-media-queries' );              // Combine las consultas de medios coincidentes en uno.

// Complementos relacionados con JavaScript
const uglify = require( 'gulp-uglify' ), 												// Minimiza archivos JavaScript.
      babel = require( 'gulp-babel' ); 													// Compila "ESNext" para hacer JavaScript complatible con los navegadores. 

// Complementos relacionados con imagenes			
const imagemin = require( 'gulp-imagemin' );										// Minimiza y optimiza imagenes.

// Complementos utilitarios.
const rename = require( 'gulp-rename' ),                        // Renombra archivos E.g. style.css -> style.min.css.
      lineec = require( 'gulp-line-ending-corrector' ),         // Terminaciones de línea consistentes para sistemas no UNIX. Complemento de Gulp para corrector de final de línea (una utilidad que se asegura de que sus archivos tengan finales de línea consistentes).
      filter = require( 'gulp-filter' ),                        // Le permite trabajar en un subconjunto de los archivos originales al filtrarlos usando un globo.
      sourcemaps = require( 'gulp-sourcemaps' ),                // Asigna el código en un archivo comprimido (por ejemplo, style.css) a su posición original en un archivo de origen (por ejemplo, structure.scss, que luego se combinó con otros archivos css para generar style.css).
      notify = require( 'gulp-notify' ),                        // Te envía un mensaje de notificación.
      browserSync = require( 'browser-sync' ) .create(),        // Recarga el navegador e inyecta CSS. Prueba del navegador sincronizada que ahorra tiempo.
      plumber = require( 'gulp-plumber' ),                      // Prevenga la rotura de la tubería causada por errores de los complementos de Gulp.
	  beep = require( 'beepbeep' ),
	  del = require( 'del' ),
	  remember = require( 'gulp-remember' ),                    // Recuerda todos los archivos que ha visto de nuevo en la transmisión.
	  stripdebug = require( 'gulp-strip-debug' ),								// Eliminar las declaraciones de consola, alerta y depurador del código JavaScript. Útil para asegurarse de que no dejó ningún registro en el código de producción.
	  cache = require( 'gulp-cache' ) 													// Archivos de caché en secuencia para su uso posterior.
	  strip_comments = require( 'gulp-strip-json-comments' ),		// Elimina comentarios de JSON con strip-json-comments. También permite usar comentarios en tus archivos JSON!
	  concatFiles = require( 'gulp-concat' );

/**
 * >> Archivo de configuración de Gulp para WordPress <<
 * 1. Edite las variables según los requisitos de su proyecto.
 * 2. En las rutas puede agregar << glob o matriz de globs >>.
 */
const config = {

	// Opciones para Underscore Theme
	underscore: {
		move: {
			sass: {
				src:  './sass/**/*',
				dest: './src/assets/sass/'
			},
			js: {
				src:  './js/**/*',
				dest: './src/assets/js/'
			}
		},
		remove: [ 
			'./sass/*', './sass/',
			'./js/*', './js/'
		]
	},

	dist: [ './dist/*', './dist/' ],

	// Opciones de Proyecto.
	project: {
		url: 'http://localhost/projects/escuelacocina.wp/',   // URL del proyecto local de su sitio de WordPress que ya se está ejecutando. Podría ser algo como wpgulp.local o localhost: 3000 dependiendo de la configuración de WordPress local.
		path: './',                                           // Tema/URL del complemento. Déjelo como está, ya que nuestro gulpfile.js vive en la carpeta raíz.
		browserAutoOpen: true,
		injectChanges: true,

		// Rutas de seguimiento de archivos.
		files: {
			scss: 	'./src/assets/sass/**/*.scss',                // Ruta a todos los archivos * .scss dentro de la carpeta css y dentro de ellos.
			js:   	'./src/assets/js/**/*.js',                    // Ruta a todos los archivos JavaScript.
			php:  	'./**/*.php',                                 // Ruta a todos los archivos PHP.
			images: {
				src: './src/assets/images/**/*.{png,jpg,gif,svg}', // Ruta a todos los archivos de imagen.
				dest: './dist/assets/images/'
			},
			wp:		'./src/assets/wp/*.{txt,css,scss,sass}'       // Ruta Cabecera para definir un Tema en WordPress
		}
	},

	// Opciones de estilo.
	style: {
		filter: '**/*.css',
		main: {
			src: './src/assets/sass/style.scss',                // Ruta al archivo principal .scss.
			dest: './',                                         // Ruta para colocar el archivo CSS compilado. Predeterminado establecido en la carpeta raíz.
			outputStyle: 'compact',                             // Opciones disponibles → 'compact' or 'compressed' or 'nested' or 'expanded'
			errLogToConsole: true,
			precision: 10
		},
		temp: {
			src: {
				css: './dist/temp/css/style.css',
				cssmap: './dist/temp/css/style.css.map',
				mincss: './dist/temp/css/style.min.css'
			},
			dest: './dist/temp/css/'
		},
		root: './' 	
	},

	// Opciones de JavaScript
	js: {
		src:  './src/assets/js/**/*.js',
		dest: './dist/assets/js/'
	},

	// Opciones de Librerías externas
	libs: {
		jquery: {
			src: './node_modules/jquery/dist/jquery.js',
		},
		bootstrap: {
			src: {
				scss: './node_modules/bootstrap/scss/bootstrap.scss',
				js:   './node_modules/bootstrap/dist/js/bootstrap.js'
			}
		}
	},

	// Los navegadores que te interesan para la revisión automática. Lista de navegadores https://github.com/ai/browserslist
    // La siguiente lista se establece según los requisitos de WordPress. Aunque, siéntase libre de cambiar.
	BROWSERS_LIST: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
		'last 1 Android versions',
		'last 1 ChromeAndroid versions',
		'last 2 Chrome versions',
		'last 2 Firefox versions',
		'last 2 Safari versions',
		'last 2 iOS versions',
		'last 2 Edge versions',
		'last 2 Opera versions'
	]
};

let libs = {
	src: {
		scss: [],
		js: []
	},
	dest: './dist/libs',
	config: {
		outputStyle: 'compact',                             // Opciones disponibles → 'compact' or 'compressed' or 'nested' or 'expanded'
		errLogToConsole: true,
		precision: 10
	}
};

/**
 * >> Manejador de Errores Personalizado. <<
 * @param Mixed err
 */
const errorHandler = r => {
	notify .onError( '  ❌ERROR: <%= error .message %>\n' )( r );
	beep();

	// this .emit( 'end' );
};

/**
 * >> Task: `images`. <<
 * Minimiza imágenes PNG, JPEG, GIF y SVG
 */ 
function images () {
	return src( config .project .files .images .src, { since: lastRun( images ) } )
		.pipe(
			cache(
				imagemin([
					imagemin .gifsicle({ interlaced: true }),
					imagemin .jpegtran({ progressive: true }),
					imagemin .optipng({ optimizationLevel: 3 }), // 0-7 low-high.
					imagemin .svgo({
						plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
					})
				])
			)
		)
		.pipe( dest( config .project .files .images .dest ) )
		.pipe( notify({ message: '  ✅ Imagenes optimizadas con éxito!! ', onLast: true }) );
}

// >> Concatena todas las rutas de directorios con archivos del mismo tipo. <<
const paths = done => {
	// Crea Array con todas las rutas de directorios que contienen archivos SCSS
	libs .src .scss = [] .concat( config .libs .bootstrap .src .scss );	
	// Crea Array con todas las rutas de directorios que contienen archivos JS
	libs .src .js   = [] .concat( config .libs .jquery .src )
						 .concat( config .libs .bootstrap .src .js );	
	
	console .group( ' * Paths Generados' );
		libs .src .scss .forEach( path => {
			console .log( '  ✅ scss > ', path );
		});
		libs .src .js .forEach( path => {
			console .log( '  ✅ js   > ', path );
		});
	console .groupEnd();
	done();
};

/**
 * >> Task: `styles`. <<
 * Compila Sass, Autoprefixes y Minifica CSS.
 * 	Extrae el archivo style.scss procesa y envia la ruta del directorio de distribución
 * 
 * Esta tarea hace lo siguiente:
 *    1. Obtiene el archivo fuente scss
 *    2. Compila Sass a CSS
 *    3. Escribe Sourcemaps para ello.
 *    4. Autoprefixea y genera style.css
 *    5. Renombra el archivo CSS con el sufijo .min.css
 *    6. Minimiza el archivo CSS y genera style.min.css
 *    7. Inyecta CSS o vuelve a cargar el navegador a través de browserSync
 */  
function scss() {
	return src( config .style .main .src, { allowEmpty: true })
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps .init() )
		.pipe(
			sass({
				errLogToConsole: config .style .main .errLogToConsole,
				outputStyle: config .style .main .outputStyle,
				precision: config .style .main .precision
			})
		)
		.on( 'error', sass .logError )
		.pipe( sourcemaps .write({ includeContent: false }) )
		.pipe( sourcemaps .init({ loadMaps: true }) )
		.pipe( autoprefixer( config .BROWSERS_LIST ) )
		.pipe( sourcemaps .write( './' ) )
		.pipe( lineec() )                                       // Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( dest( config .style .temp .dest ) )
		.pipe( filter( config .style .filter ) )                // Filtrado de la secuencia a sólo archivos css.
		.pipe( mmq({ log: true }) )                             // Combinar consultas de medios solo para la versión .min.css.
		.pipe( browserSync .stream() )                          // Vuelve a cargar style.css si está en cola.
		.pipe( strip_comments() )								// Despoja los comentarios de Sass
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss({ maxLineLen: 10 }) )
		.pipe( lineec() )                                       // Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( dest( config .style .temp .dest ) )
		.pipe( filter( config .style .filter ) )                // Filtrado de la secuencia a sólo archivos css.
		.pipe( browserSync .stream() )                          // Vuelve a cargar style.min.css si está en cola.
		.pipe( notify({ message: '  ✅ Sass — CSS Generados con éxito! ', onLast: true }) );
}

/**
 * >> Task: `library_styles`. <<
 * Compila Sass, Autoprefixes y Minifica CSS de:
 * 	- Boostrap 4
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene el archivo fuente scss de la librería
 *    2. Compila Sass a CSS
 *    3. Escribe Sourcemaps para ello.
 *    4. Renombra el archivo CSS con el sufijo .min.css
 *    5. Minimiza el archivo CSS y genera style.min.css
 *    6. Inyecta CSS o vuelve a cargar el navegador a través de browserSync
 */
function library_styles() {
	return src( libs .src .scss )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps .init() )
		.pipe(
			sass({
				errLogToConsole: config .style .main .errLogToConsole,
				outputStyle: config .style .main .outputStyle,
				precision: config .style .main .precision
			})
		) .on( 'error', sass .logError )
		.pipe( sourcemaps .write({ includeContent: false }) )
		.pipe( sourcemaps .init({ loadMaps: true }) )
		.pipe( sourcemaps .write( './' ) )
		.pipe( dest( libs .dest ) )
		.pipe( browserSync .stream() )                          // Vuelve a cargar style.css si está en cola.
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss({ maxLineLen: 10 }) )
		.pipe( dest( libs .dest ) )
		.pipe( filter( config .style .filter ) )                // Filtrado de la secuencia a sólo archivos css.
		.pipe( notify({ message: '  ✅ Sass — Libs Generados con éxito! ', onLast: true }) );
}

/**
 * >> Task: `library_scripts`. <<
 * Compila JavaScript a ES8 y Minifica JS.
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene los archivos fuente js de la librería
 *    2. Compila JavaScript a ES8.
 *    3. Genera archivos JavaScript sin Minificación.
 *    4. Minimiza todos los archivos JavaScript
 *    5. Renombra todos los archivos JavaScript con el sufijo .min.js
 *    6. Genera archivos JavaScript con Minificación.
 */
function library_scripts() {
	return src( libs .src .js ) 	// Sólo se ejecuta en archivos modificados.
		.pipe( plumber( errorHandler ) )
		.pipe(
			babel({
				presets: [
					[
						'@babel/env', 														// Preset para compilar su JavaScript Moderno a ES8.
						{
							targets: { browsers: config .BROWSERS_LIST } 				// Lista de navegadores que se desean soportar.
						}
					]
				]
			})
		)
		.pipe( lineec() ) 																// Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( dest( libs .dest ) )
		.pipe( stripdebug() )															// Elimina declaraciones de consola, alerta y depuración en JavaScript (Código listo para producción)
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( lineec() )   															// Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( dest( libs .dest ) )
		.pipe( notify({ message: '  ✅ ES8 —  Libs Generados con éxito!! ', onLast: true }) );
}

/**
 * >> Task: `wp-style`. <<
 * Concatena cabecera de definición de Tema para WordPress a su hoja de estilos 'style.css'
 */
function wp_style() {
	return src(
			[ 
				config .project .files .wp, 
				config .style .temp .src .css 
			], { allowEmpty: true })
			.pipe( concatFiles( './style.css' ) )
			.pipe( dest( config .style .root ) )
			.pipe( notify({ message: '  ✅ "style.css" Tema WordPress ', onLast: true }) );
}

/**
 * >> Task: `wp-style-min`. <<
 * Concatena cabecera de definición de Tema para WordPress a su hoja de estilos 'style.min.css'
 */
function wp_style_min() {
	return src(
			[ 
				config .project .files .wp, 
				config .style .temp .src .mincss 
			], { allowEmpty: true })
			.pipe( concatFiles( './style.min.css' ) )
			.pipe( dest( config .style .root ) )
			.pipe( browserSync.reload( { stream: true } ) ) // prompts a reload after compilation
			.pipe( notify({ message: '  ✅ "style.min.css" Tema WordPress ', onLast: true }) );
}

/**
 * >> Task: `wp-style-map`. <<
 * Copia el archivo './style.css.map' al raiz del proyecto
 */
function wp_style_map() {
	return src(
			[ config .style .temp .src .cssmap ], { allowEmpty: true })
			.pipe( dest( config .style .root ) )
			.pipe( notify({ message: '  ✅ "style.css.map" Tema WordPress ', onLast: true }) );
}

/**
 * >> Task: `rmdist`. <<
 * Elimina directorios y archivos generados para la distribución del proyecto.
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene todas las rutas de los directorios y archivos a eliminar.
 *    2. Elimina todos los archivos y directorio ./dist
 */ 
const remove_dist = done => {
	return del .sync( [] .concat( config .dist ) );
}

// >> Helper para permitir la recarga del navegador con Gulp 4. <<
const browserSyncReload = ( value = null ) => {
	console .log( '  ✅ Genera ' + value + ' [ Reload Browser ]' );
	browserSync .reload( { stream: true } );

	/*
	setTimeout( () => { 
		console .log( 'Entró css!' );
		browserSyncReload( '3000' );
	}, 3000 )
	*/
};

/**
 * >> Task: `server`. <<
 * Recargas en vivo, inyecciones de CSS, túnel localhost.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const server = done => {

	browserSync .init({
		proxy: config .project .url,
		open: config .project .browserAutoOpen,
		injectChanges: config .project .injectChanges,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
	});

	/*
	const tempcss = watch( [ './dist/temp/css/style.min.css' ] ),
	      rootcss = watch( [ './style.min.css' ] );

	tempcss .on( 'change', ( path, stats ) => {
		console .log( `  ✅ Archivo ${path} en ./temp ha cambiado` );	
		wp_style_min();
	});
	
	rootcss .on( 'change', ( path, stats ) => {
		//browserSync .reload();
		console .log( `  ✅ Archivo ${path} en ./ ha cambiado` );
	});
	*/
	

	watch( './src/assets/sass/*.scss', series( scss ) ); 
	watch( './dist/temp/css/*.css', series( wp_style_map, wp_style, wp_style_min ) );

	watch([ config .project .files .images. src ]) .on( 'change', browserSync .reload );    
	watch([ config .project .files .php ]) .on( 'change', browserSync .reload );    
	watch([ './*.html' ]) .on( 'change', browserSync .reload );    
	
	// To Fix: No regarga navegadores cuando cambia './style.css', './style.min.css'
	watch([ './style.min.css' ]) .on( 'change', browserSync .reload );

	console .log( '  ✅ Watching Server!' ); 

	done();
};

// Exports
module .exports = {
	default: series( 
		paths, 
		images, 
		library_scripts, 
		library_styles, 
		scss,
		wp_style_map,  
		wp_style, 
		wp_style_min, 
		server,
		() => {
			watch( './src/assets/sass/*.scss', series( scss ) ); 
			watch( './dist/temp/css/*.css', series( wp_style_map, wp_style, wp_style_min ) );

			watch([ config .project .files .images .src ]) .on( 'change', browserSync .reload );    
			watch([ config .project .files .php ]) .on( 'change', browserSync .reload );    
			watch([ './*.html' ]) .on( 'change', browserSync .reload );    
			watch([ './style.min.css' ]) .on( 'change', browserSync .reload );
			console .log( '  ✅ Watching Default!' ); 
		} ),	
	scss,
	rmdist: series( remove_dist ),
	cpmap: series( wp_style_map )
} 