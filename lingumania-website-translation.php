<?php
/*
  Plugin Name: Lingumania Website Translation
  Version: 1.0.5
  Author: Lingumania Inc.
  Author URI: http://www.lingumania.com/
  Description: Lingumania lets you translate your website in context and launch localized versions of your WP site the quick and easy way.
 */

register_activation_hook( __FILE__, 'lingumania_install' );

function lingumania_install() {
    global $wp_version;

    if ( version_compare( $wp_version, '2.7', '<' ) ) {
        wp_die( 'This plugin requires WordPress version 2.7 or higher.' );
    }
}

add_action( 'wp_footer', 'lingumania_inject_js_for_site_admins' );

function lingumania_inject_js_for_site_admins() {
    if ( current_user_can( 'manage_options' ) ) { //this plugin will only be visible to WP site admins 
    ?>
        <script type="text/javascript">
            var pluginBaseUrl = '<?php echo plugins_url( '', __FILE__ ); ?>';
        </script>
        <script type="text/javascript" src="<?php echo plugins_url( 'js/lingumania.admin.js', __FILE__ ); ?>"></script>
    <?php
    }
}

add_action( 'wp_dashboard_setup', 'lingumania_add_dashboard_widget' );

function lingumania_add_dashboard_widget() {
    wp_add_dashboard_widget( 'lingumania_dashboard', 'Lingumania Website Translation Plugin', 'lingumania_dashboard_welcome' );
}

function lingumania_dashboard_welcome(){ 
    echo '<div style="float:right; padding: 3px 0px 0px 10px;"><img src="' .plugins_url( 'images/lingu.png', __FILE__ ). '" /></div>Your Lingumania Website Translation plugin is now installed. This plugin is only available to admin users of your website so first make sure you are logged in to wp-admin. Then <a href="'.home_url().'">visit your site</a> and you will see the plugin on the right side of your screen. Also, make sure you check out the <a href="http://www.lingumania.com/how-to-translate-a-website?demo=wp" target="_blank">plugin demo</a> to get yourself acquainted with all the features. Happy translating!'; 
}
?>