<?php get_header(); ?>
    <div>
        <div class="blog-main">
            <?php get_template_part( 'content', get_post_format() ); ?>
        </div>
        <?php get_sidebar(); ?>
    </div>
<?php get_footer(); ?>