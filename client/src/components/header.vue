

<template>
    <header class="df flexRow">
        <h1><a href="/">Pagic</a></h1>
        <nav class="df">
            <ul class="df algn-center">
                <li><router-link to="/search">快搜</router-link></li>
                <li><router-link to="/navigation">导航</router-link></li>
                <li><router-link to="/tools">H5工具</router-link></li>
            </ul>
        </nav>
    </header>
</template>


<style lang="scss" scoped>
header {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $height-header;
    border-bottom: 1px solid $color-border;
    box-shadow: $box-shadow;
    background-color: $color-background;
    z-index: $z-index-header;
    
    h1 {
        margin: 0;

        a {
            display: block;
            width: $width-sidebar;
            padding-left: 2rem;
            font-size: 20px;
            line-height: $height-header;
            color: $color-text;

            &:hover {
                text-decoration: none;
            }
        }
    }

    li {
        a {
            padding: 0 1rem;
            line-height: 2rem;
            display: block;
            color: $color-text;

            &:hover {
                color: $color-primary;
                text-decoration: none;
            }
        }
    }
}
</style>