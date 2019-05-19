<div class="woolook-admin">
        
    <div class="woolook-header">
        <h1>Woolook (<?php echo WOOLOOK_VERSION ?>)</h1>

        <nav class="nav-tab-wrapper woolook-nav-tab-wrapper">
            <a data-page="blocks" href="#" target="_blank" class="nav-tab nav-tab-active">Available Blocks</a>
            <a data-page="getting-started" href="#" class="nav-tab">Getting Started</a>
            <a data-page="general-settings" href="#" class="nav-tab">General Settings</a>
            <a data-page="changes-log" href="#" class="nav-tab ">Changes Log</a>
            <a href="https://delabon.com/store" target="_blank" class="nav-tab ">Get More Plugins</a>
        </nav>
    </div>

    <div class="woolook-page _open_" data-page="blocks">
        <div class="woolook-page-content">

            <h2>Available Blocks</h2>

            <div class="woolook-blocks">

                <div class="woolook-blocks-item">

                    <div class="_container_">
                        
                        <img src="<?php echo WOOLOOK_URL . '/assets/img/layout-1.png' ?>" >
                        
                        <h3><?php _e('Layout 1', 'woolook') ?></h3>
                        
                        <footer>
                            <a href="#" class="button"><?php _e('View Demo', 'woolook') ?></a>
                        </footer>

                    </div>

                </div>

            </div>

        </div>
    </div>

    <div class="woolook-page" data-page="general-settings">
        <div class="woolook-page-content">

            <h2>General Settings</h2>

            <form method="POST">

                <label>
                
                    <h4><?php _e('Select Font','woolook'); ?></h4>

                    <select name="font">
                        <?php foreach( $woolook_font_list as $key => $font ) : ?>
                            <option value="<?php echo $key; ?>" <?php if( $font_selected == $key ) echo 'selected="selected"' ?> ><?php echo $font['label']; ?></option>
                        <?php endforeach; ?>
                    </select>
                
                </label>

                <label>
                
                    <h4><?php _e('Max Width','woolook'); ?></h4>

                    <input type="text" name="max_width" value="<?php echo $max_width;?>" >

                    <span><?php _e('If you do not know what you are doing, please leave it 100%', 'woolook') ?></span>

                </label>

                <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('woolook-admin-settings');?>" >

                <button name="woolook-submit" value="processing" class="button button-primary"><?php _e('Save','woolook'); ?></button>

            </form>

        </div>
    </div>

    <div class="woolook-page" data-page="getting-started">
        <div class="woolook-page-content">

            <h2>Getting Started</h2>

            <p class="woolook-hero">
                Woolook is a collection of beautiful Woocommerce blocks. With it you can design your store or your client store without the need to hire a freelancer or a company. It's easy and enjoyable to work with.
            </p>

            <ul class="woolook-tabs">

                <li class="_open_">
                    <a href="#">What is Gutenberg?</a>
                    <div class="woolook-tabs-content">

                        <p>
                            Gutenberg is the new Wordpress Editor. it is built to simplify the creation of pages and posts by replacing shortcodes and custom HTML by Blocks.
                        </p>

                    </div>
                </li>
                
                <li>
                    <a href="#">What are Blocks?</a>
                    <div class="woolook-tabs-content">
                        <p>
                            Anything you insert into the new editor from a simple Paragraph to a Video or Image is a gutenberg block.
                        </p>


                    </div>

                </li>

                <li>
                    <a href="#">How to Add Your First Block?</a>

                    <div class="woolook-tabs-content">

                        <p>
                            First, You need to create a new post ( or page ) by going to Posts > Add New. 
                        </p>

                        <img src="<?php echo WOOLOOK_URL . '/assets/img/panel/gutenberg.png' ?>" >

                        <br>
                        <p>
                            Then, Click on the plus (+) icon and scroll down to "Woolook" section and select a block.
                        </p>

                        <img src="<?php echo WOOLOOK_URL . '/assets/img/panel/add.png' ?>" >

                        <br>
                        <p>An example of one of our blocks.</p>

                        <img src="<?php echo WOOLOOK_URL . '/assets/img/panel/block.png' ?>" >

                    </div>
                </li>


                <li>
                    <a href="#">Block Settings</a>

                    <div class="woolook-tabs-content">
                        <p>
                            Let's say that we want to change our block's background color. 
                            So in order to do that we need to click on the block and a sidebar panel will be shown. That sidebar panel is called The Inspector. 
                            <br>
                            Within that inspector, you will find the block settings.
                        </p>

                        <img src="<?php echo WOOLOOK_URL . '/assets/img/panel/block-panel.png' ?>" >

                    </div>
                </li>
            
            </ul>

            <p>If you need more explanation please read the <a href="https://delabon.com/docs" target="_blank">documentation</a>.</p>

        </div>
    </div>

    <div class="woolook-page" data-page="changes-log">
        <div class="woolook-page-content">

            <h2>Changes Log</h2>

            <?php

            $changes_log = file_get_contents( __DIR__ . '/../../readme.txt' );
            $changes_log = preg_replace( '/.*== Changelog ==/is', '', $changes_log );
            echo nl2br( $changes_log );

            ?>
        </div>
    </div>

</div>