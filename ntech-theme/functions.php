<?php
require_once get_template_directory() . '/inc/tgmpa/class-tgm-plugin-activation.php';

/**
 * Sets up theme defaults and registers the various WordPress features
 * @uses register_nav_menu() To add support for navigation menus.
 */

// This theme uses wp_nav_menu() in one location.
register_nav_menu('primary', __('Primary Menu', 'ntech'));
register_nav_menu('secondary', __('Secondary Menu', 'ntech'));

/**
 * Makes our wp_nav_menu() fallback -- wp_page_menu() -- show a home link.
 */
function ntech_page_menu_args($args) {
  if (!isset( $args['show_home']))
    $args['show_home'] = true;
  return $args;
}
add_filter('wp_page_menu_args', 'ntech_page_menu_args');

/**
 * Enqueue React build files
 */
function enqueue_react_assets() {
    if (is_admin()) return;

    if (is_front_page() || is_page_template('front-page.php') || get_query_var('spa_mode')) {
        $theme_uri = get_stylesheet_directory_uri();
        $js_path   = get_stylesheet_directory() . '/dist/main.js';
        $css_path  = get_stylesheet_directory() . '/dist/main.css';

        $js_version  = file_exists($js_path)  ? filemtime($js_path)  : '1.0.0';
        $css_version = file_exists($css_path) ? filemtime($css_path) : '1.0.0';

        wp_enqueue_script('theme-script', $theme_uri . '/dist/main.js',  [], $js_version,  true);
        wp_enqueue_style( 'theme-style',  $theme_uri . '/dist/main.css', [], $css_version);

        wp_localize_script(
            'theme-script',
            'wp_config',
            [
                'graphqlEndpoint' => defined('GRAPHQL_ENDPOINT') ? GRAPHQL_ENDPOINT : 'http://localhost:8080/graphql',
                'restUrl'         => rest_url(),
                'nonce'           => wp_create_nonce('wp_rest'),
                'homeUrl'         => home_url(),
                'themeUrl'        => $theme_uri,
            ]
        );
    }
}

function show_admin_messages() {
    $plugin_messages = array();

    include_once(ABSPATH . 'wp-admin/includes/plugin.php');

    // WPGraphQL Plugin
    if (!is_plugin_active('wp-graphql/wp-graphql.php')) {
        $plugin_messages[] = 'This theme requires you to install the WPGraphQL plugin, <a href="https://www.wpgraphql.com/" target="_blank">download it from here</a>.';
    }

    if (count($plugin_messages) > 0) {
        echo '<div id="message" class="error">';

        foreach($plugin_messages as $message) {
            echo '<p><strong>'.$message.'</strong></p>';
        }

        echo '</div>';
    }
}

function create_post_type_attributes() {
    $labels = [
        'name'                => _x('Attributes', 'Post Type General Name', 'n-tech'),
        'singular name'       => _x('Attribute', 'Singular Name', 'n-tech'),
        'menu_name'           => __('Attributes', 'n-tech'),
        'all_items'           => __('All Attributes', 'n-tech'),
        'view_item'           => __('View Attributes', 'n-tech'),
        'add_new_item'        => __('Add New Attribute', 'n-tech'),
        'add_new'             => __('Add Attribute', 'n-tech'),
        'edit_item'           => __('Edit Attribute', 'n-tech'),
        'update_item'         => __('Update Attributes', 'n-tech'),
        'search_items'        => __('Search for Attribute', 'n-tech'),
        'not_found'           => __('Not Found', 'n-tech'),
        'not_found_in_trash'  => __('Not found in Trash', 'n-tech'),
    ];

    $args = [
        'label'               => __('Attributes', 'n-tech'),
        'description'         => __('A list of Attributes.', 'n-tech'),
        'labels'              => $labels,
        'supports'            => ['title', 'editor', 'thumbnail'],
        'hierarchical'        => true,
        'public'              => false,
        'publicly_queryable'  => true,
        'query_var'           => true,
        'show_in_rest'        => true,
        'rest_base'           => 'attributes',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => false,
        'exclude_from_search' => false,
        'capability_type'     => 'post',
        'menu_icon'           => 'dashicons-star-filled',
        'show_in_graphql'     => true,
        'graphql_single_name' => 'attribute',
        'graphql_plural_name' => 'attributes',
    ];

    register_post_type('attribute', $args);
}

function register_types() {
  register_graphql_field( 'Page', 'wpTemplate', [
    'type' => 'String',
    'resolve' => function($page) {
      return get_post_meta($page->ID, '_wp_page_template', true);
    }
  ]);
}

function force_spa_template($template) {
    if (is_admin()) {
        return $template;
    }

    $uri = trim($_SERVER['REQUEST_URI'] ?? '', '/');

    if (
        $uri === '' ||
        strpos($uri, 'wp-admin') === 0 ||
        strpos($uri, 'wp-includes') === 0 ||
        strpos($uri, 'wp-json') === 0 ||
        strpos($uri, 'wp-content') === 0 ||
        strpos($uri, 'graphql') === 0 ||
        preg_match('/\.(js|css|jpg|jpeg|png|gif|svg|webp|woff2?|ttf|eot|ico|map|json)$/i', $uri)
    ) {
        return $template;
    }

    $spa_template = locate_template('front-page.php');
    if ($spa_template) {
        set_query_var('spa_mode', true);
        return $spa_template;
    }

    return $template;
}

function my_theme_register_required_plugins() {
    $plugins = array(

        // WPGraphQL - from official directory
        array(
            'name'     => 'WPGraphQL',
            'slug'     => 'wp-graphql',
            'required' => true,
        ),

        // wp-graphql-content-blocks - via GitHub
        array(
            'name'         => 'WPGraphQL Content Blocks',
            'slug'         => 'wp-graphql-content-blocks',
            'source'       => 'https://github.com/wpengine/wp-graphql-content-blocks/releases/latest/download/wp-graphql-content-blocks.zip',
            'required'     => true,
            'external_url' => 'https://github.com/wpengine/wp-graphql-content-blocks',
            'version'      => '4.8.4',           // latest version (April 2026)
        ),

        // Optional
        array(
            'name'     => 'Essential Blocks',
            'slug'     => 'essential-blocks',
            'required' => false,
        ),
    );

    $config = array(
        'id'           => 'ntech_react_theme',
        'default_path' => '',
        'menu'         => 'tgmpa-install-plugins',
        'parent_slug'  => 'themes.php',
        'capability'   => 'edit_theme_options',
        'has_notices'  => true,
        'dismissable'  => true,
        'is_automatic' => false,
        'message'      => 'The following plugins are required for this React theme:',
    );

    tgmpa( $plugins, $config );
}

// TGMPA
add_action( 'tgmpa_register', 'my_theme_register_required_plugins' );

// Custom Post Type
add_action('init', 'create_post_type_attributes', 0);

add_action('admin_notices', 'show_admin_messages');
add_action('wp_enqueue_scripts', 'enqueue_react_assets');
add_action('graphql_register_types', 'register_types');

add_filter('template_include', 'force_spa_template', 9999);
