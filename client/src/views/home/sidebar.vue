

<template>
    <div class="sidebar">
        <ol>
            <li class=""><a class="nav_link active">电影资源</a></li>
            <li class=""><a class="nav_link">电视剧资源</a></li>
            <li class=""><a class="nav_link">影视周边</a></li>
            <li class=""><a class="nav_link">阅读</a></li>
            <li class=""><a class="nav_link">音乐</a></li>
            <li class=""><a class="nav_link">学习园地</a></li>
            <li class=""><a class="nav_link">模板素材</a></li>
            <li class=""><a class="nav_link">软件工具</a></li>
            <li class=""><a class="nav_link">福利小站</a></li>
        </ol>
    </div>
</template>


<style lang="scss" scoped>
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