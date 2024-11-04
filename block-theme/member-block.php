function register_team_member_block() {
    wp_register_script(
        'team-member-block',
        get_template_directory_uri() . '/blocks/team-member.js', // Adjust the path as needed
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(get_template_directory() . '/blocks/team-member.js')
    );

    register_block_type('custom/team-member', array(
        'editor_script' => 'team-member-block',
        'render_callback' => 'render_team_member_block',
        'attributes' => array(
            'imageURL' => array('type' => 'string'),
            'name' => array('type' => 'string'),
            'subtitle' => array('type' => 'string'),
        ),
    ));
}

add_action('init', 'register_team_member_block');

function render_team_member_block($attributes) {
    $imageURL = esc_url($attributes['imageURL']);
    $name = esc_html($attributes['name']);
    $subtitle = esc_html($attributes['subtitle']);

    ob_start();
    ?>
    <div style="display: flex; align-items: center;">
        <div style="flex: 1;">
            <img src="<?php echo $imageURL; ?>" alt="<?php echo $name; ?>" style="border-radius: 50%; width: 100px; height: 100px;" />
        </div>
        <div style="flex: 2; padding-left: 20px;">
            <h2 style="font-family: 'Roboto', sans-serif; font-size: 36px; font-weight: 700;"><?php echo $name; ?></h2>
            <h3 style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 500;"><?php echo $subtitle; ?></h3>
            <button style="border: 1px solid #222222; color: #222222; background: transparent; padding: 8px 12px; cursor: pointer;">Toggle</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
