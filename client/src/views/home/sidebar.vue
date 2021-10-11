

<template>
    <div class="sidebar">
        <ol class="list_style_none">
            <li class="">
                <a href="/docs/introduction.html" class="nav_link">介绍</a>
            </li>
            <li class="">
                <a href="/docs/usage.html" class="nav_link">基本用法</a>
            </li>
            <li class="">
                <a href="/docs/config.html" class="nav_link">配置文件</a>
            </li>
            <li class="">
                <a href="/docs/content.html" class="nav_link">页面内容</a>
            </li>
            <li class="">
                <a href="/docs/layout.html" class="nav_link">_layout.tsx</a>
            </li>
            <li class="">
                <a href="/docs/themes.html" class="nav_link">主题</a>
            </li>
            <li class="">
                <a href="/docs/plugins.html" class="nav_link">插件</a>
            </li>
            <li class="">
                <a href="/docs/blog.html" class="nav_link active">博客</a>
            </li>
            <li class="">
                <a href="/docs/i18n.html" class="nav_link">国际化</a>
            </li>
            <li class="">
                <a href="/docs/deployment.html" class="nav_link">部署</a>
            </li>
            <li class="">
                <a href="/docs/demos.html" class="nav_link">示例网站</a>
            </li>
            <li class="">
                <a href="/docs/limitations.html" class="nav_link">局限性</a>
            </li>
        </ol>
    </div>
</template>


<style lang="scss" scoped>
// @import "./var.scss";

/* #region Sidebar */
.sidebar {
    position: fixed;
    top: $height-header;
    left: 0;
    width: $width-sidebar;
    height: calc(100vh - $height-header);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: $color-background-sidebar;
    border-right: 1px solid $color-border;
    font-size: 14px;
    line-height: 20px;
    z-index: $z-index-sidebar;
}
.sidebar ol {
    padding-left: 1rem;
    transition: height $transition-duration;
    overflow: hidden;
}
.sidebar > ol {
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.sidebar .nav_link {
    position: relative;
    padding: 5px 1rem;
    display: block;
    border: 1px solid transparent;
    border-right: none;
}
.sidebar .nav_link.active {
    background-color: $color-background;
    border-color: $color-border !important;
}
.sidebar .nav_link:hover {
    background-color: $color-background-faded;
}
.sidebar [class^="czs-angle-"] {
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-size: 18px;
    opacity: 0;
}
.fold > .nav_link,
.unfold > .nav_link {
    padding-right: 30px;
}
.sidebar .czs-angle-up-l {
    display: inline-block;
}
.fold .czs-angle-up-l {
    display: none;
}
.fold .czs-angle-down-l {
    display: inline-block;
}
.fold [class^="czs-angle-"],
.sidebar .nav_link:hover [class^="czs-angle-"],
.sidebar .nav_link.no_link [class^="czs-angle-"] {
    opacity: $opacity;
}
.sidebar .nav_link:hover [class^="czs-angle-"]:hover,
.sidebar .nav_link.no_link:hover [class^="czs-angle-"] {
    opacity: 1;
}
/* #endregion */
</style>