

<template>
    <header class="df flexRow">
        <h1><a href="/">Pagic</a></h1>
        <nav>
            <ul>
                <li><a href="/themes/">主题</a></li>
                <li><a href="/plugins/">插件</a></li>
                <li><a href="/blog/">博客</a></li>
                <li><a href="/about/">关于</a></li>
                <li style="flex-grow: 1"></li>
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
    width: 100vw;
    height: $height-header;
    border-bottom: 1px solid $color-border;
    box-shadow: $box-shadow;
    background-color: $color-background;
    z-index: $z-index-header;
}
header h1 {
    margin: 0;
}
header h1 a {
    display: block;
    width: $width-sidebar;
    padding-left: 2rem;
    font-size: 20px;
    line-height: $height-header;
    color: $color-text;
}
header h1 a:hover {
    text-decoration: none;
}
header nav {
    flex-grow: 1;
}
header ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}
header li {
    margin: 0.5rem 0 0.5rem 1rem;
}
header li:last-child {
    margin-right: 1.5rem;
}
header li a {
    padding: 0 1rem;
    line-height: 2rem;
    display: block;
    color: $color-text;
}
header li a:hover {
    color: $color-primary;
    text-decoration: none;
}
header select {
    background: transparent;
    color: $color-text;
    font-size: $font-size;
    border: 0;
    height: 2rem;
}

.toggle_dark {
    cursor: pointer;
}
.toggle_dark [class^="czs-moon"] {
    margin-left: -0.75rem;
}
.toggle_dark .czs-sun-l,
.toggle_dark .czs-moon {
    display: none;
}
.is_dark .toggle_dark .czs-sun-l,
.is_dark .toggle_dark .czs-moon {
    display: inline-block;
}
.is_dark .toggle_dark .czs-sun,
.is_dark .toggle_dark .czs-moon-l {
    display: none;
}
</style>