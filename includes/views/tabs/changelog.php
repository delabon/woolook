<div class="sog_panel_tab">

    <header>
        <h3>Change Log</h3>
    </header>

    <div>
            <?php
                $changes_log = file_get_contents( __DIR__ . '/../../../readme.txt' );
                $changes_log = preg_replace( '/.*== Changelog ==/is', '', $changes_log );
                echo nl2br( $changes_log );
            ?>
    </div>

</div>