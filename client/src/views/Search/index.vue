
<template>
    <section class="main">
        <div class="main_article">
            <article>
                <h1>博客11</h1>
                <p>
                    搭配 <code>blog</code> 插件与
                    <code>blog</code> 主题后，Pagic 可以用来写博客。
                </p>
                <pre
                    class="language-ts"
                ><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'blog'</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'blog'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                <h2 id="%E9%85%8D%E7%BD%AE">
                    配置<a class="anchor" href="#%E9%85%8D%E7%BD%AE">§</a>
                </h2>
                <p>
                    博客的配置集中在 <code>pagic.config.ts</code> 的
                    <code>blog</code> 字段中，它的配置如下：
                </p>
                <pre
                    class="language-ts"
                ><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'blog'</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'blog'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="highlighted-line">  blog<span class="token operator">:</span> <span class="token punctuation">{</span></span><span class="highlighted-line">    root<span class="token operator">:</span> <span class="token string">'/posts/'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    social<span class="token operator">:</span> <span class="token punctuation">{</span></span><span class="highlighted-line">      github<span class="token operator">:</span> <span class="token string">'xcatliu/blog'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      email<span class="token operator">:</span> <span class="token string">'<a class="token email-link" href="mailto:xcatliu@gmail.com">xcatliu@gmail.com</a>'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      twitter<span class="token operator">:</span> <span class="token string">'xcatliu'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                <p>
                    其中
                    <code>root</code> 表示存储博客文章的根目录，它的默认值是
                    <code>/posts/</code>，表示所有
                    <code>${srcDir}/posts/</code> 目录下的页面（除了
                    <code>README.md</code>
                    之外）都会被识别为博客文章。注意，它的值应当总是以斜杠开始，并以斜杠结束。
                </p>
                <p>
                    <code>social</code>
                    表示不同的社交网络账号，会展示在博客的导航栏中。
                </p>
                <p>
                    效果可以在<a href="https://blog.xcatliu.com/">我的博客</a
                    >中看到。
                </p>
                <h3 id="%E5%AF%BC%E8%88%AA%E6%A0%8F">
                    导航栏<a class="anchor" href="#%E5%AF%BC%E8%88%AA%E6%A0%8F"
                        >§</a
                    >
                </h3>
                <p>
                    博客的导航栏会展示 <code>title</code>,
                    <code>description</code>, <code>blog.social</code> 和
                    <code>nav</code> 中的内容。
                </p>
                <pre
                    class="language-ts"
                ><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'blog'</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'blog'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="highlighted-line">  title<span class="token operator">:</span> <span class="token string">'流浪小猫的博客'</span><span class="token punctuation">,</span></span><span class="highlighted-line">  description<span class="token operator">:</span> <span class="token string">'欢迎来到我的博客，这里搜集了我的技术文章和生活感悟，欢迎一起交流成长。'</span><span class="token punctuation">,</span></span>  blog<span class="token operator">:</span> <span class="token punctuation">{</span>
    root<span class="token operator">:</span> <span class="token string">'/posts/'</span><span class="token punctuation">,</span>
    social<span class="token operator">:</span> <span class="token punctuation">{</span>
      github<span class="token operator">:</span> <span class="token string">'xcatliu/blog'</span><span class="token punctuation">,</span>
      email<span class="token operator">:</span> <span class="token string">'<a class="token email-link" href="mailto:xcatliu@gmail.com">xcatliu@gmail.com</a>'</span><span class="token punctuation">,</span>
      twitter<span class="token operator">:</span> <span class="token string">'xcatliu'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="highlighted-line">  nav<span class="token operator">:</span> <span class="token punctuation">[</span></span><span class="highlighted-line">    <span class="token punctuation">{</span></span><span class="highlighted-line">      text<span class="token operator">:</span> <span class="token string">'首页'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      link<span class="token operator">:</span> <span class="token string">'/index.html'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      icon<span class="token operator">:</span> <span class="token string">'czs-home-l'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">{</span></span><span class="highlighted-line">      text<span class="token operator">:</span> <span class="token string">'分类'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      link<span class="token operator">:</span> <span class="token string">'/categories/index.html'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      icon<span class="token operator">:</span> <span class="token string">'czs-category-l'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">{</span></span><span class="highlighted-line">      text<span class="token operator">:</span> <span class="token string">'标签'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      link<span class="token operator">:</span> <span class="token string">'/tags/index.html'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      icon<span class="token operator">:</span> <span class="token string">'czs-tag-l'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">{</span></span><span class="highlighted-line">      text<span class="token operator">:</span> <span class="token string">'关于'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      link<span class="token operator">:</span> <span class="token string">'/about/index.html'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      icon<span class="token operator">:</span> <span class="token string">'czs-about-l'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">{</span></span><span class="highlighted-line">      text<span class="token operator">:</span> <span class="token string">'归档'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      link<span class="token operator">:</span> <span class="token string">'/archives/index.html'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      icon<span class="token operator">:</span> <span class="token string">'czs-box-l'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">{</span></span><span class="highlighted-line">      text<span class="token operator">:</span> <span class="token string">'友情链接'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      link<span class="token operator">:</span> <span class="token string">'/links/index.html'</span><span class="token punctuation">,</span></span><span class="highlighted-line">      icon<span class="token operator">:</span> <span class="token string">'czs-link-l'</span><span class="token punctuation">,</span></span><span class="highlighted-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span><span class="highlighted-line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                <p>
                    以上的博客的配置适用于官方的
                    <code>blog</code> 主题，第三方主题的配置可能有所不同。
                </p>
                <h2 id="%E5%8D%9A%E5%AE%A2%E6%96%87%E7%AB%A0">
                    博客文章<a
                        class="anchor"
                        href="#%E5%8D%9A%E5%AE%A2%E6%96%87%E7%AB%A0"
                        >§</a
                    >
                </h2>
                <p>
                    <code>blog</code> 插件会扫描所有
                    <code>/posts/</code>
                    目录下的文章，将它们按照创建的时间进行排序，这些文章会被视为一种特殊的文章——博客文章（posts）。
                </p>
                <h3 id="%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE">
                    分类和标签<a
                        class="anchor"
                        href="#%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE"
                        >§</a
                    >
                </h3>
                <p>
                    博客文章有两个特殊的头信息——<code>categories</code>（分类）和
                    <code>tags</code>（标签），它们的取值均为字符串数组：
                </p>
                <pre
                    class="language-md"
                ><code class="language-md"><span class="token hr punctuation">---</span>
categories:
  <span class="token list punctuation">-</span> 编程世界
tags:
  <span class="token list punctuation">-</span> 代码质量
  <span class="token title important">- 代码复杂度
<span class="token punctuation">---</span></span>

<span class="token title important"><span class="token punctuation">#</span> 博客的标题</span>

博客的正文
</code></pre>
                <p>
                    所有的博客文章会根据其分类和标签进行聚类，然后针对每个分类或标签都会生成一个
                    <code>/categories/${categoriyName}/index.html</code> 或
                    <code>/tags/${tagName}/index.html</code> 页面。
                </p>
                <p>
                    另外，你可能还需要一个
                    <code>/categories/index.html</code>
                    页面用于展示所有分类，为了生成这个页面，你需要创建一个
                    <code>categories/README.md</code
                    >，它只需要包含一个标题即可：
                </p>
                <pre
                    class="language-md"
                ><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> 分类</span>
</code></pre>
                <p>
                    同样的，为了生成一个
                    <code>/tags/index.html</code> 页面，你需要创建一个
                    <code>tags/README.md</code>，它只需要包含一个标题即可：
                </p>
                <pre
                    class="language-md"
                ><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> 标签</span>
</code></pre>
                <h3 id="%E5%BD%92%E6%A1%A3">
                    归档<a class="anchor" href="#%E5%BD%92%E6%A1%A3">§</a>
                </h3>
                <p>
                    归档页面也是一个博客系统中常见的页面，它用列表的形式展示出了所有博客文章。
                </p>
                <p>
                    要创建一个归档页面，你需要创建一个
                    <code>archives/README.md</code>：
                </p>
                <pre
                    class="language-md"
                ><code class="language-md"><span class="token title important"><span class="token punctuation">#</span> 归档</span>
</code></pre>
                <h2
                    id="%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98"
                >
                    写一个博客主题<a
                        class="anchor"
                        href="#%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98"
                        >§</a
                    >
                </h2>
                <p>
                    写一个博客主题与写一个普通主题类似，只是多了一个
                    <code>props</code> 需要处理。
                </p>
                <h3 id="props">
                    <code>props</code><a class="anchor" href="#props">§</a>
                </h3>
                <p>
                    博客主题多了一个名为 <code>blog</code> 的
                    <code>prop</code>，它的类型如下：
                </p>
                <pre
                    class="language-ts"
                ><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">PagePropsBlog</span> <span class="token punctuation">{</span>
  isPost<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  posts<span class="token operator">:</span> <span class="token punctuation">{</span>
    pagePath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    link<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    date<span class="token operator">:</span> Date <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    updated<span class="token operator">:</span> Date <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    author<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    contributors<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    tags<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    categories<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    excerpt<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    cover<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  categories<span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    count<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  tags<span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    count<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                <p>其中 <code>isPost</code> 表示当前页面是否为一个博客文章。</p>
                <p>
                    <code>posts</code>
                    表示所有的博客文章列表，不过只包含了标题、链接、摘要等信息，用于方便的生成文章列表页。
                </p>
                <p>
                    <code>categories</code> 和
                    <code>tags</code> 是整个站点的分类和标签列表，用于生成
                    <code>/categories/index.html</code> 页面以及
                    <code>/tags/index.html</code> 页面。
                </p>
                <p>
                    注意，写一个博客主题时，你还需要创建以下几个
                    <code>_layout.tsx</code>：
                </p>
                <ul>
                    <li><code>archives/_layout.tsx</code> 用于展示文章归档</li>
                    <li>
                        <code>categories/_layout.tsx</code> 用于展示分类列表
                    </li>
                    <li><code>tags/_layout.tsx</code> 用于展示标签列表</li>
                    <li>
                        <code>posts/_layout.tsx</code>
                        用于展示文章列表（包含摘要）
                    </li>
                </ul>
                <p>
                    具体请参考<a
                        href="https://github.com/xcatliu/pagic/tree/master/src/themes/blog"
                        >官方的博客主题</a
                    >。
                </p>
            </article>
            <div class="prev_next">
                <a class="prev button" href="/docs/plugins.html"
                    >«&nbsp;&nbsp;<!-- -->插件</a
                ><a class="next button" href="/docs/i18n.html"
                    >国际化<!-- -->&nbsp;&nbsp;»</a
                >
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.main {
    margin: $height-header 0 0 0;
    display: flex;
    justify-content: center;
}
.sidebar + .main,
.sidebar ~ footer {
    margin-left: $width-sidebar;
}
.main_article {
    overflow: auto;
    padding: 0 1rem;
    width: 44rem;
    max-width: 44rem;
    word-wrap: break-word;
}

.main_post_meta {
    margin: 1rem 0 2rem;
    color: $color-text-muted;
    font-size: $font-size-small;
}
</style>