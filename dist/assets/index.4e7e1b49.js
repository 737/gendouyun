import{_ as e}from"./index.d1ba8bf1.js";import{o as t,c as p,f as i,g as r,h as f,i as a,n as k,u as c,j as g,p as E,k as x,r as v,a as b,F as A}from"./vendor.addaab3b.js";const B={},y={class:"df flexRow"},C=i('<h1 data-v-8480f07a><a href="/" data-v-8480f07a>Pagic</a></h1><nav class="df" data-v-8480f07a><ul class="df algn-center" data-v-8480f07a><li data-v-8480f07a><a href="/themes/" data-v-8480f07a>\u5FEB\u641C</a></li><li data-v-8480f07a><a href="/plugins/" data-v-8480f07a>\u5BFC\u822A</a></li></ul></nav>',2),D=[C];function $(n,s){return t(),p("header",y,D)}var w=e(B,[["render",$],["__scopeId","data-v-8480f07a"]]),F="/assets/google.6da56208.ico",I="/assets/baidu.c7008807.ico";const z=n=>(E("data-v-854f8a22"),n=n(),x(),n),N={class:"sidebar"},P={class:"tab-box"},R={key:0,class:"search-box"},S=z(()=>a("ul",null,[a("li",{class:""},[a("img",{src:F}),a("a",{data:"https://www.google.com/"},"\u8C37\u6B4C")]),a("li",{class:"current"},[a("img",{src:I}),a("a",{data:"https://www.baidu.com/"},"\u767E\u5EA6")])],-1)),j=[S],M={key:1,class:"nav-box df just-center"},V=i('<dl data-v-854f8a22><dt style="top:11px;" data-v-854f8a22><span class="show-list" data-v-854f8a22></span></dt><dd class="current" data-v-854f8a22><a href="#web" class="auto-scroll" data-offset="-20" data-speed="500" data-v-854f8a22>\u70ED\u95F9\u63A8\u8350</a></dd><dd class="" data-v-854f8a22><a href="#icon" class="auto-scroll" data-offset="-20" data-speed="500" data-v-854f8a22>\u56FE\u6807ICON</a></dd><dd class="" data-v-854f8a22><a href="#brush" class="auto-scroll" data-offset="-20" data-speed="500" data-v-854f8a22>\u7B14\u5237\u7EB9\u7406</a></dd><dd data-v-854f8a22><a href="#logo" class="auto-scroll" data-offset="-20" data-speed="500" data-v-854f8a22>Logo\u8BBE\u8BA1</a></dd><dd data-v-854f8a22><a href="#infographic" class="auto-scroll" data-offset="-20" data-speed="500" data-v-854f8a22>\u4FE1\u606F\u56FE</a></dd><dd data-v-854f8a22><a href="#company" class="auto-scroll" data-offset="-20" data-speed="500" data-v-854f8a22>\u8BBE\u8BA1\u516C\u53F8</a></dd></dl>',1),H=[V],L=r({setup(n){var s=f("search");const d=l=>{s.value=l};return(l,o)=>(t(),p("div",N,[a("div",P,[a("a",{class:k({active:c(s)==="search"}),onClick:o[0]||(o[0]=u=>d("search"))},"\u5FEB\u641C",2),a("a",{class:k({active:c(s)==="nav"}),onClick:o[1]||(o[1]=u=>d("nav"))},"\u5BFC\u822A",2)]),c(s)==="search"?(t(),p("div",R,j)):g("",!0),c(s)==="nav"?(t(),p("div",M,H)):g("",!0)]))}});var O=e(L,[["__scopeId","data-v-854f8a22"]]);const T={},q={class:"main"},G=i(`<div class="main_article" data-v-36b035a4><article data-v-36b035a4><h1 data-v-36b035a4>\u535A\u5BA211</h1><p data-v-36b035a4> \u642D\u914D <code data-v-36b035a4>blog</code> \u63D2\u4EF6\u4E0E <code data-v-36b035a4>blog</code> \u4E3B\u9898\u540E\uFF0CPagic \u53EF\u4EE5\u7528\u6765\u5199\u535A\u5BA2\u3002 </p><pre class="language-ts" data-v-36b035a4><code class="language-ts" data-v-36b035a4><span class="token keyword" data-v-36b035a4>export</span> <span class="token keyword" data-v-36b035a4>default</span> <span class="token punctuation" data-v-36b035a4>{</span>
  theme<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;blog&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
  plugins<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>[</span><span class="token string" data-v-36b035a4>&#39;blog&#39;</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>,</span>
<span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>;</span>
</code></pre><h2 id="%E9%85%8D%E7%BD%AE" data-v-36b035a4> \u914D\u7F6E<a class="anchor" href="#%E9%85%8D%E7%BD%AE" data-v-36b035a4>\xA7</a></h2><p data-v-36b035a4> \u535A\u5BA2\u7684\u914D\u7F6E\u96C6\u4E2D\u5728 <code data-v-36b035a4>pagic.config.ts</code> \u7684 <code data-v-36b035a4>blog</code> \u5B57\u6BB5\u4E2D\uFF0C\u5B83\u7684\u914D\u7F6E\u5982\u4E0B\uFF1A </p><pre class="language-ts" data-v-36b035a4><code class="language-ts" data-v-36b035a4><span class="token keyword" data-v-36b035a4>export</span> <span class="token keyword" data-v-36b035a4>default</span> <span class="token punctuation" data-v-36b035a4>{</span>
  theme<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;blog&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
  plugins<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>[</span><span class="token string" data-v-36b035a4>&#39;blog&#39;</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>,</span>
<span class="highlighted-line" data-v-36b035a4>  blog<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>    root<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/posts/&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    social<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      github<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;xcatliu/blog&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      email<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;<a class="token email-link" href="mailto:xcatliu@gmail.com" data-v-36b035a4>xcatliu@gmail.com</a>&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      twitter<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;xcatliu&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>  <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>;</span>
</code></pre><p data-v-36b035a4> \u5176\u4E2D <code data-v-36b035a4>root</code> \u8868\u793A\u5B58\u50A8\u535A\u5BA2\u6587\u7AE0\u7684\u6839\u76EE\u5F55\uFF0C\u5B83\u7684\u9ED8\u8BA4\u503C\u662F <code data-v-36b035a4>/posts/</code>\uFF0C\u8868\u793A\u6240\u6709 <code data-v-36b035a4>\${srcDir}/posts/</code> \u76EE\u5F55\u4E0B\u7684\u9875\u9762\uFF08\u9664\u4E86 <code data-v-36b035a4>README.md</code> \u4E4B\u5916\uFF09\u90FD\u4F1A\u88AB\u8BC6\u522B\u4E3A\u535A\u5BA2\u6587\u7AE0\u3002\u6CE8\u610F\uFF0C\u5B83\u7684\u503C\u5E94\u5F53\u603B\u662F\u4EE5\u659C\u6760\u5F00\u59CB\uFF0C\u5E76\u4EE5\u659C\u6760\u7ED3\u675F\u3002 </p><p data-v-36b035a4><code data-v-36b035a4>social</code> \u8868\u793A\u4E0D\u540C\u7684\u793E\u4EA4\u7F51\u7EDC\u8D26\u53F7\uFF0C\u4F1A\u5C55\u793A\u5728\u535A\u5BA2\u7684\u5BFC\u822A\u680F\u4E2D\u3002 </p><p data-v-36b035a4> \u6548\u679C\u53EF\u4EE5\u5728<a href="https://blog.xcatliu.com/" data-v-36b035a4>\u6211\u7684\u535A\u5BA2</a>\u4E2D\u770B\u5230\u3002 </p><h3 id="%E5%AF%BC%E8%88%AA%E6%A0%8F" data-v-36b035a4> \u5BFC\u822A\u680F<a class="anchor" href="#%E5%AF%BC%E8%88%AA%E6%A0%8F" data-v-36b035a4>\xA7</a></h3><p data-v-36b035a4> \u535A\u5BA2\u7684\u5BFC\u822A\u680F\u4F1A\u5C55\u793A <code data-v-36b035a4>title</code>, <code data-v-36b035a4>description</code>, <code data-v-36b035a4>blog.social</code> \u548C <code data-v-36b035a4>nav</code> \u4E2D\u7684\u5185\u5BB9\u3002 </p><pre class="language-ts" data-v-36b035a4><code class="language-ts" data-v-36b035a4><span class="token keyword" data-v-36b035a4>export</span> <span class="token keyword" data-v-36b035a4>default</span> <span class="token punctuation" data-v-36b035a4>{</span>
  theme<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;blog&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
  plugins<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>[</span><span class="token string" data-v-36b035a4>&#39;blog&#39;</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>,</span>
<span class="highlighted-line" data-v-36b035a4>  title<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u6D41\u6D6A\u5C0F\u732B\u7684\u535A\u5BA2&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>  description<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u6B22\u8FCE\u6765\u5230\u6211\u7684\u535A\u5BA2\uFF0C\u8FD9\u91CC\u641C\u96C6\u4E86\u6211\u7684\u6280\u672F\u6587\u7AE0\u548C\u751F\u6D3B\u611F\u609F\uFF0C\u6B22\u8FCE\u4E00\u8D77\u4EA4\u6D41\u6210\u957F\u3002&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span>  blog<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span>
    root<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/posts/&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
    social<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span>
      github<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;xcatliu/blog&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
      email<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;<a class="token email-link" href="mailto:xcatliu@gmail.com" data-v-36b035a4>xcatliu@gmail.com</a>&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
      twitter<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;xcatliu&#39;</span><span class="token punctuation" data-v-36b035a4>,</span>
    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span>
  <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span>
<span class="highlighted-line" data-v-36b035a4>  nav<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>[</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      text<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u9996\u9875&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      link<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/index.html&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      icon<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;czs-home-l&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      text<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u5206\u7C7B&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      link<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/categories/index.html&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      icon<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;czs-category-l&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      text<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u6807\u7B7E&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      link<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/tags/index.html&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      icon<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;czs-tag-l&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      text<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u5173\u4E8E&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      link<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/about/index.html&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      icon<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;czs-about-l&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      text<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u5F52\u6863&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      link<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/archives/index.html&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      icon<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;czs-box-l&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>{</span></span><span class="highlighted-line" data-v-36b035a4>      text<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;\u53CB\u60C5\u94FE\u63A5&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      link<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;/links/index.html&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>      icon<span class="token operator" data-v-36b035a4>:</span> <span class="token string" data-v-36b035a4>&#39;czs-link-l&#39;</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>    <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="highlighted-line" data-v-36b035a4>  <span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>,</span></span><span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>;</span>
</code></pre><p data-v-36b035a4> \u4EE5\u4E0A\u7684\u535A\u5BA2\u7684\u914D\u7F6E\u9002\u7528\u4E8E\u5B98\u65B9\u7684 <code data-v-36b035a4>blog</code> \u4E3B\u9898\uFF0C\u7B2C\u4E09\u65B9\u4E3B\u9898\u7684\u914D\u7F6E\u53EF\u80FD\u6709\u6240\u4E0D\u540C\u3002 </p><h2 id="%E5%8D%9A%E5%AE%A2%E6%96%87%E7%AB%A0" data-v-36b035a4> \u535A\u5BA2\u6587\u7AE0<a class="anchor" href="#%E5%8D%9A%E5%AE%A2%E6%96%87%E7%AB%A0" data-v-36b035a4>\xA7</a></h2><p data-v-36b035a4><code data-v-36b035a4>blog</code> \u63D2\u4EF6\u4F1A\u626B\u63CF\u6240\u6709 <code data-v-36b035a4>/posts/</code> \u76EE\u5F55\u4E0B\u7684\u6587\u7AE0\uFF0C\u5C06\u5B83\u4EEC\u6309\u7167\u521B\u5EFA\u7684\u65F6\u95F4\u8FDB\u884C\u6392\u5E8F\uFF0C\u8FD9\u4E9B\u6587\u7AE0\u4F1A\u88AB\u89C6\u4E3A\u4E00\u79CD\u7279\u6B8A\u7684\u6587\u7AE0\u2014\u2014\u535A\u5BA2\u6587\u7AE0\uFF08posts\uFF09\u3002 </p><h3 id="%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE" data-v-36b035a4> \u5206\u7C7B\u548C\u6807\u7B7E<a class="anchor" href="#%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE" data-v-36b035a4>\xA7</a></h3><p data-v-36b035a4> \u535A\u5BA2\u6587\u7AE0\u6709\u4E24\u4E2A\u7279\u6B8A\u7684\u5934\u4FE1\u606F\u2014\u2014<code data-v-36b035a4>categories</code>\uFF08\u5206\u7C7B\uFF09\u548C <code data-v-36b035a4>tags</code>\uFF08\u6807\u7B7E\uFF09\uFF0C\u5B83\u4EEC\u7684\u53D6\u503C\u5747\u4E3A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1A </p><pre class="language-md" data-v-36b035a4><code class="language-md" data-v-36b035a4><span class="token hr punctuation" data-v-36b035a4>---</span>
categories:
  <span class="token list punctuation" data-v-36b035a4>-</span> \u7F16\u7A0B\u4E16\u754C
tags:
  <span class="token list punctuation" data-v-36b035a4>-</span> \u4EE3\u7801\u8D28\u91CF
  <span class="token title important" data-v-36b035a4>- \u4EE3\u7801\u590D\u6742\u5EA6
<span class="token punctuation" data-v-36b035a4>---</span></span>

<span class="token title important" data-v-36b035a4><span class="token punctuation" data-v-36b035a4>#</span> \u535A\u5BA2\u7684\u6807\u9898</span>

\u535A\u5BA2\u7684\u6B63\u6587
</code></pre><p data-v-36b035a4> \u6240\u6709\u7684\u535A\u5BA2\u6587\u7AE0\u4F1A\u6839\u636E\u5176\u5206\u7C7B\u548C\u6807\u7B7E\u8FDB\u884C\u805A\u7C7B\uFF0C\u7136\u540E\u9488\u5BF9\u6BCF\u4E2A\u5206\u7C7B\u6216\u6807\u7B7E\u90FD\u4F1A\u751F\u6210\u4E00\u4E2A <code data-v-36b035a4>/categories/\${categoriyName}/index.html</code> \u6216 <code data-v-36b035a4>/tags/\${tagName}/index.html</code> \u9875\u9762\u3002 </p><p data-v-36b035a4> \u53E6\u5916\uFF0C\u4F60\u53EF\u80FD\u8FD8\u9700\u8981\u4E00\u4E2A <code data-v-36b035a4>/categories/index.html</code> \u9875\u9762\u7528\u4E8E\u5C55\u793A\u6240\u6709\u5206\u7C7B\uFF0C\u4E3A\u4E86\u751F\u6210\u8FD9\u4E2A\u9875\u9762\uFF0C\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A <code data-v-36b035a4>categories/README.md</code>\uFF0C\u5B83\u53EA\u9700\u8981\u5305\u542B\u4E00\u4E2A\u6807\u9898\u5373\u53EF\uFF1A </p><pre class="language-md" data-v-36b035a4><code class="language-md" data-v-36b035a4><span class="token title important" data-v-36b035a4><span class="token punctuation" data-v-36b035a4>#</span> \u5206\u7C7B</span>
</code></pre><p data-v-36b035a4> \u540C\u6837\u7684\uFF0C\u4E3A\u4E86\u751F\u6210\u4E00\u4E2A <code data-v-36b035a4>/tags/index.html</code> \u9875\u9762\uFF0C\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A <code data-v-36b035a4>tags/README.md</code>\uFF0C\u5B83\u53EA\u9700\u8981\u5305\u542B\u4E00\u4E2A\u6807\u9898\u5373\u53EF\uFF1A </p><pre class="language-md" data-v-36b035a4><code class="language-md" data-v-36b035a4><span class="token title important" data-v-36b035a4><span class="token punctuation" data-v-36b035a4>#</span> \u6807\u7B7E</span>
</code></pre><h3 id="%E5%BD%92%E6%A1%A3" data-v-36b035a4> \u5F52\u6863<a class="anchor" href="#%E5%BD%92%E6%A1%A3" data-v-36b035a4>\xA7</a></h3><p data-v-36b035a4> \u5F52\u6863\u9875\u9762\u4E5F\u662F\u4E00\u4E2A\u535A\u5BA2\u7CFB\u7EDF\u4E2D\u5E38\u89C1\u7684\u9875\u9762\uFF0C\u5B83\u7528\u5217\u8868\u7684\u5F62\u5F0F\u5C55\u793A\u51FA\u4E86\u6240\u6709\u535A\u5BA2\u6587\u7AE0\u3002 </p><p data-v-36b035a4> \u8981\u521B\u5EFA\u4E00\u4E2A\u5F52\u6863\u9875\u9762\uFF0C\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A <code data-v-36b035a4>archives/README.md</code>\uFF1A </p><pre class="language-md" data-v-36b035a4><code class="language-md" data-v-36b035a4><span class="token title important" data-v-36b035a4><span class="token punctuation" data-v-36b035a4>#</span> \u5F52\u6863</span>
</code></pre><h2 id="%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98" data-v-36b035a4> \u5199\u4E00\u4E2A\u535A\u5BA2\u4E3B\u9898<a class="anchor" href="#%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98" data-v-36b035a4>\xA7</a></h2><p data-v-36b035a4> \u5199\u4E00\u4E2A\u535A\u5BA2\u4E3B\u9898\u4E0E\u5199\u4E00\u4E2A\u666E\u901A\u4E3B\u9898\u7C7B\u4F3C\uFF0C\u53EA\u662F\u591A\u4E86\u4E00\u4E2A <code data-v-36b035a4>props</code> \u9700\u8981\u5904\u7406\u3002 </p><h3 id="props" data-v-36b035a4><code data-v-36b035a4>props</code><a class="anchor" href="#props" data-v-36b035a4>\xA7</a></h3><p data-v-36b035a4> \u535A\u5BA2\u4E3B\u9898\u591A\u4E86\u4E00\u4E2A\u540D\u4E3A <code data-v-36b035a4>blog</code> \u7684 <code data-v-36b035a4>prop</code>\uFF0C\u5B83\u7684\u7C7B\u578B\u5982\u4E0B\uFF1A </p><pre class="language-ts" data-v-36b035a4><code class="language-ts" data-v-36b035a4><span class="token keyword" data-v-36b035a4>interface</span> <span class="token class-name" data-v-36b035a4>PagePropsBlog</span> <span class="token punctuation" data-v-36b035a4>{</span>
  isPost<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>boolean</span><span class="token punctuation" data-v-36b035a4>;</span>
  posts<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span>
    pagePath<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    title<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    link<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    date<span class="token operator" data-v-36b035a4>:</span> Date <span class="token operator" data-v-36b035a4>|</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    updated<span class="token operator" data-v-36b035a4>:</span> Date <span class="token operator" data-v-36b035a4>|</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    author<span class="token operator" data-v-36b035a4>?</span><span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    contributors<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>[</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>;</span>
    tags<span class="token operator" data-v-36b035a4>?</span><span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>[</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>;</span>
    categories<span class="token operator" data-v-36b035a4>?</span><span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>[</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>;</span>
    excerpt<span class="token operator" data-v-36b035a4>?</span><span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    cover<span class="token operator" data-v-36b035a4>?</span><span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
  <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>[</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>;</span>
  categories<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span>
    name<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    count<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>number</span><span class="token punctuation" data-v-36b035a4>;</span>
  <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>[</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>;</span>
  tags<span class="token operator" data-v-36b035a4>:</span> <span class="token punctuation" data-v-36b035a4>{</span>
    name<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>string</span><span class="token punctuation" data-v-36b035a4>;</span>
    count<span class="token operator" data-v-36b035a4>:</span> <span class="token builtin" data-v-36b035a4>number</span><span class="token punctuation" data-v-36b035a4>;</span>
  <span class="token punctuation" data-v-36b035a4>}</span><span class="token punctuation" data-v-36b035a4>[</span><span class="token punctuation" data-v-36b035a4>]</span><span class="token punctuation" data-v-36b035a4>;</span>
<span class="token punctuation" data-v-36b035a4>}</span>
</code></pre><p data-v-36b035a4>\u5176\u4E2D <code data-v-36b035a4>isPost</code> \u8868\u793A\u5F53\u524D\u9875\u9762\u662F\u5426\u4E3A\u4E00\u4E2A\u535A\u5BA2\u6587\u7AE0\u3002</p><p data-v-36b035a4><code data-v-36b035a4>posts</code> \u8868\u793A\u6240\u6709\u7684\u535A\u5BA2\u6587\u7AE0\u5217\u8868\uFF0C\u4E0D\u8FC7\u53EA\u5305\u542B\u4E86\u6807\u9898\u3001\u94FE\u63A5\u3001\u6458\u8981\u7B49\u4FE1\u606F\uFF0C\u7528\u4E8E\u65B9\u4FBF\u7684\u751F\u6210\u6587\u7AE0\u5217\u8868\u9875\u3002 </p><p data-v-36b035a4><code data-v-36b035a4>categories</code> \u548C <code data-v-36b035a4>tags</code> \u662F\u6574\u4E2A\u7AD9\u70B9\u7684\u5206\u7C7B\u548C\u6807\u7B7E\u5217\u8868\uFF0C\u7528\u4E8E\u751F\u6210 <code data-v-36b035a4>/categories/index.html</code> \u9875\u9762\u4EE5\u53CA <code data-v-36b035a4>/tags/index.html</code> \u9875\u9762\u3002 </p><p data-v-36b035a4> \u6CE8\u610F\uFF0C\u5199\u4E00\u4E2A\u535A\u5BA2\u4E3B\u9898\u65F6\uFF0C\u4F60\u8FD8\u9700\u8981\u521B\u5EFA\u4EE5\u4E0B\u51E0\u4E2A <code data-v-36b035a4>_layout.tsx</code>\uFF1A </p><ul data-v-36b035a4><li data-v-36b035a4><code data-v-36b035a4>archives/_layout.tsx</code> \u7528\u4E8E\u5C55\u793A\u6587\u7AE0\u5F52\u6863</li><li data-v-36b035a4><code data-v-36b035a4>categories/_layout.tsx</code> \u7528\u4E8E\u5C55\u793A\u5206\u7C7B\u5217\u8868 </li><li data-v-36b035a4><code data-v-36b035a4>tags/_layout.tsx</code> \u7528\u4E8E\u5C55\u793A\u6807\u7B7E\u5217\u8868</li><li data-v-36b035a4><code data-v-36b035a4>posts/_layout.tsx</code> \u7528\u4E8E\u5C55\u793A\u6587\u7AE0\u5217\u8868\uFF08\u5305\u542B\u6458\u8981\uFF09 </li></ul><p data-v-36b035a4> \u5177\u4F53\u8BF7\u53C2\u8003<a href="https://github.com/xcatliu/pagic/tree/master/src/themes/blog" data-v-36b035a4>\u5B98\u65B9\u7684\u535A\u5BA2\u4E3B\u9898</a>\u3002 </p></article><div class="prev_next" data-v-36b035a4><a class="prev button" href="/docs/plugins.html" data-v-36b035a4>\xAB\xA0\xA0\u63D2\u4EF6</a><a class="next button" href="/docs/i18n.html" data-v-36b035a4>\u56FD\u9645\u5316\xA0\xA0\xBB</a></div></div>`,1),J=[G];function K(n,s){return t(),p("section",q,J)}var Q=e(T,[["render",K],["__scopeId","data-v-36b035a4"]]);const U=r({components:{HeaderComponent:w,SideBarComponent:O,ContentComponent:Q},setup(){}});function W(n,s,d,l,o,u){const h=v("header-component"),_=v("side-bar-component"),m=v("content-component");return t(),p(A,null,[b(h),b(_),b(m)],64)}var Z=e(U,[["render",W],["__scopeId","data-v-6ca6fbae"]]);export{Z as default};
