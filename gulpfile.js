/**
 * >> Carga Plugins. <<
 * Importa, Carga plugins de Gulp y asigna a variables con nombres descriptivos.
 */
const gulp = require( 'gulp' );                                 // Gulp

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

	dist: [
		'./dist/*', './dist/',
		'./style.css', './style.css.map', './style.min.css'
	],

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
			images: './src/assets/images/**/*.{png,jpg,gif,svg}',	// Ruta a todos los archivos de imagen.
			wp:			'./src/assets/wp/*.{txt,css,scss,sass}'				// Ruta Cabecera para definir un Tema en WordPress
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
	notify .onError( '\n\n❌  > ERROR: <%= error .message %>\n' )( r );
	beep();

	// this .emit( 'end' );
};

/**
 * >> Task: `styles`. <<
 * Compila Sass, Autoprefixes y Minifica CSS.
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
gulp .task( 'styles', () => {
	return gulp. src( config .style .main .src, { allowEmpty: true })
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
		.pipe( gulp .dest( config .style .main .dest ) )
		.pipe( filter( config .style .filter ) )                // Filtrado de la secuencia a sólo archivos css.
		.pipe( mmq({ log: true }) )                             // Combinar consultas de medios solo para la versión .min.css.
		.pipe( browserSync .stream() )                          // Vuelve a cargar style.css si está en cola.
		.pipe( strip_comments() )																// Despojar los comentarios de Sass
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss({ maxLineLen: 10 }) )
		.pipe( lineec() )                                       // Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( gulp .dest( config .style .main .dest ) )
		.pipe( filter( config .style .filter ) )                           // Filtrado de la secuencia a sólo archivos css.
		.pipe( browserSync .stream() )                          // Vuelve a cargar style.min.css si está en cola.
		.pipe( notify({ message: '\n\n✅ > Sass — CSS Generados con éxito!\n', onLast: true }) );
});   

/**
 * >> Task: `styles-lib`. <<
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
gulp .task( 'styles-lib', () => {
	return gulp .src( libs .src .scss )
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
		.pipe( sourcemaps .write( './' ) )
		.pipe( gulp .dest( libs .dest ) )
		.pipe( browserSync .stream() )                          // Vuelve a cargar style.css si está en cola.
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss({ maxLineLen: 10 }) )
		.pipe( gulp .dest( libs .dest ) )
		.pipe( filter( config .style .filter ) )                // Filtrado de la secuencia a sólo archivos css.
		.pipe( notify({ message: '\n\n✅ > Sass — Libs Generados con éxito!\n', onLast: true }) );
});
/**
 * >> Task: `browser-sync`. <<
 * Recargas en vivo, inyecciones de CSS, túnel localhost.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const browsersync = done => {
	browserSync .init({
		proxy: config .project .url,
		open: config .project .browserAutoOpen,
		injectChanges: config .project .injectChanges,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
	});
	done();
};

// >> Helper para permitir la recarga del navegador con Gulp 4. <<
const reload = done => {
	browserSync .reload();
	done();
};

// >> Concatena todas las rutas de directorios con archivos del mismo tipo. <<
const paths = done => {
	// Crea Array con todas las rutas de directorios que contienen archivos SCSS
	libs .src .scss = [] .concat( config .libs .bootstrap .src .scss );	
	// Crea Array con todas las rutas de directorios que contienen archivos JS
	libs .src .js   = [] .concat( config .libs .jquery .src )
											 .concat( config .libs .bootstrap .src .js );	

	//console .log( libs .src .js );
	done();
};

/**
 * >> Task: `copy_sass`. <<
 * Copia archivos directorio 'sass' a './src/assets/'.
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene el directorio donde se encuentran los archivos fuente scss
 *    2. Copia la estructura de directorios y archivos obtenidos en una ruta nueva.
 */ 
gulp .task( 'copy_sass', () => {
    return gulp .src( config .underscore .move .sass .src )
		.pipe( gulp .dest( config .underscore .move .sass .dest ) )
		.pipe( notify({ message: '\n\n✅ > Underscore — Mueve directorio "sass" con éxito!\n', onLast: true }) );
});

/**
 * >> Task: `copy_js`. <<
 * Copia archivos directorio 'js' a './src/assets/'.
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene el directorio donde se encuentran los archivos fuente js
 *    2. Copia la estructura de directorios y archivos obtenidos en una ruta nueva.
 */ 
gulp .task( 'copy_js', () => {
    return gulp .src( config .underscore .move .js .src )
		.pipe( gulp .dest( config .underscore .move .js .dest ) )
		.pipe( notify({ message: '\n\n✅ > Underscore — Mueve directorio "js" con éxito!\n', onLast: true }) );
});

/**
 * >> Task: `remove`. <<
 * Elimina directorios y archivos de los directorios 'sass' y 'js'
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene todas las rutas de los directorios y archivos a eliminar.
 *    2. Elimina todos los archivos y directorios indicados
 */ 
gulp .task( 'remove', ( done ) => {
	return del .sync( [] .concat( config .underscore .remove ) );
	done();
});

/**
 * >> Task: `remove-dist`. <<
 * Elimina directorios y archivos generados para la distribución y despliegue del proyecto.
 * 		
 *    - Directorio y archivos generados para el proyento en:
 * 				./dist
 * 	  - Hojas de estilo que define el Tema para WordPress en:
 *	      ./style.css
 *	      ./style.css.map
 *	      ./style.min.css
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene todas las rutas de los directorios y archivos a eliminar.
 *    2. Elimina todos los archivos y directorios indicados
 */ 
gulp .task( 'remove-dist', ( done ) => {
	return del .sync( [] .concat( config .dist ) );
	done();
});

/**
 * >> Task: `jsFiles`. <<
 * Compila JavaScript a ES8 y Minifica JS.
 *
 * Esta tarea hace lo siguiente:
 *    1. Obtiene los archivos fuente js.
 *    2. Compila JavaScript a ES8.
 *    3. Genera archivos JavaScript sin Minificación.
 *    4. Elimina declaraciones de consola, alertas y de depuración de todos los archivos
 *    5. Minimiza todos los archivos JavaScript
 *    5. Renombra todos los archivos JavaScript con el sufijo .min.js
 *    6. Genera archivos JavaScript con Minificación.
 */ 
gulp .task( 'jsFiles', () => {
	return gulp .src( config .js .src, { since: gulp .lastRun( 'jsFiles' ) }) 	// Sólo se ejecuta en archivos modificados.
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
		.pipe( remember( config .js .src ) ) 							// Trae todos los archivos de nuevo a la corriente.
		.pipe( lineec() ) 																// Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( gulp .dest( config .js .dest ) )
		.pipe( stripdebug() )															// Elimina declaraciones de consola, alerta y depuración en JavaScript (Código listo para producción)
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( lineec() )   															// Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( gulp .dest( config .js .dest ) )
		.pipe( notify({ message: '\n\n✅ > ES8 — JS Generados con éxito!\n', onLast: true }) );
});

/**
 * >> Task: `jsLib`. <<
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
gulp .task( 'jsLib', () => {
	return gulp .src( libs .src .js, { since: gulp .lastRun( 'jsLib' ) }) 	// Sólo se ejecuta en archivos modificados.
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
		.pipe( gulp .dest( libs .dest ) )
		.pipe( stripdebug() )															// Elimina declaraciones de consola, alerta y depuración en JavaScript (Código listo para producción)
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( lineec() )   															// Terminaciones de línea consistentes para sistemas no UNIX.
		.pipe( gulp .dest( libs .dest ) )
		.pipe( notify({ message: '\n\n✅  > ES8 —  Libs Generados con éxito!!\n', onLast: true }) );
});

/**
 * >> Task: `jsLib`. <<
 * Minimiza imágenes PNG, JPEG, GIF y SVG
 */ 
gulp .task( 'images', () => {
	return gulp .src( './src/assets/images/**/*.{png,jpg,gif,svg}' )
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
		.pipe( gulp .dest( './dist/assets/images/' ) )
		.pipe( notify({ message: '\n\n✅  > Imagenes optimizadas con éxito!!\n', onLast: true }) );
});

/**
 * >> Task: `wp-style`. <<
 * Concatena cabecera de definición de Tema para WordPress a su hoja de estilos 'style.css'
 */
gulp .task( 'wp-style', () => {
	return gulp .src([ './src/assets/wp/style.{txt,css,scss,sass}', './style.css' ], { allowEmpty: true })
			.pipe( concatFiles( './style.css' ) )
			.pipe( gulp .dest( './' ) )
			.pipe( notify({ message: '\n\n✅ "style.css" > Tema WordPress \n', onLast: true }) );
});

/**
 * >> Task: `wp-style`. <<
 * Concatena cabecera de definición de Tema para WordPress a su hoja de estilos 'style.min.css'
 */
gulp .task( 'wp-style-min', () => {
	return gulp .src([ './src/assets/wp/style.{txt,css,scss,sass}', './style.min.css' ], { allowEmpty: true })
			.pipe( concatFiles( './style.min.css' ) )
			.pipe( gulp .dest( './' ) )
			.pipe( notify({ message: '\n\n✅  "style.min.css" > Tema WordPress \n', onLast: true }) );
});

/**
 * >> Watch Tasks. <<
 * Observa cambios de archivos y ejecuta tareas específicas.
 */
gulp.task(
	'default',
	gulp .series(
		gulp .series( 
			'images',
			paths, gulp .parallel( 'jsLib', 'styles-lib' ), 
			gulp .series( 'jsFiles', 'styles' ), 
			gulp .series( 'wp-style', 'wp-style-min' ),
			browsersync, 
			() => {
				gulp .watch( config .project .files .php, reload );                  																						// Recargar archivos PHP que cambien.
				gulp .watch( 
					[ config .project .files .scss ,config .project .files .wp ],
					gulp .series( 'styles', gulp .series( 'wp-style', 'wp-style-min' ) ) )																				// Recargar archivos SCSS que cambien.
						.on( 'change', browserSync .reload ); 												
				gulp .watch( config .project .files .js, gulp .series( 'jsFiles', reload ) );																		// Recargar archivos JavaScript que cambien.
				gulp .watch( config .project .files .images, gulp .series( 'images' ) ) .on( 'change', browserSync .reload );		// Recargar navegador cuando los archivos de imagen cambien.
			}
		)
	)
);

/**
 * >> Task: `underscore` <<
 * Modifica estructura de directorios del Tema de inicio 'Underscore'
 * moviendo los directorios 'sass' y 'js' del raíz a las rutas 
 * './src/assets/sass' y './src/assets/sass' respectivamente.
 * 
 *  Esta tarea hace lo siguiente:
 *    1. Obtiene rutas de directorios 'sass' y 'js' del directorio raíz del tema
 *    2. Copia dichos directorios a la ruta './src/assets/'
 *    3. Elimina los archivos y directorios en el directorio raíz del tema
 */
gulp .task( 
	'underscore', 
	gulp .series ( 'images', 'copy_sass', 'copy_js', 'remove' ) 
);

gulp .task( 
	'paths', 
	gulp .series ( paths ) 
);

gulp .task(
	'remove-dist',
	gulp .series( 'remove-dist' )
);