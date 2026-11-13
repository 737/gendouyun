<template>
    <section class="quick-search">
        <h2 class="title">快搜</h2>

        <form class="search-form" role="search" @submit.prevent="submit">
            <input
                v-model="keyword"
                class="search-input"
                type="search"
                name="q"
                placeholder="输入关键词，回车搜索"
                aria-label="搜索关键词"
                autocomplete="off"
                autofocus
            />
            <button class="search-btn" type="submit" :disabled="!keyword.trim()">搜索</button>
        </form>

        <div class="engines" role="group" aria-label="选择搜索引擎">
            <button
                v-for="item in ENGINES"
                :key="item.name"
                type="button"
                class="engine"
                :class="{ active: engine.name === item.name }"
                :aria-pressed="engine.name === item.name"
                @click="engine = item"
            >
                <img :src="item.ico" alt="" width="16" height="16" />
                <span>{{ item.name }}</span>
            </button>
        </div>

        <p class="hint">在 {{ engine.name }} 中打开搜索结果（新标签页）</p>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import bingIco from '../../assets/images/bing.ico';
import baiduIco from '../../assets/images/baidu.ico';
import googleIco from '../../assets/images/google.ico';

interface Engine {
    name: string;
    ico: string;
    search: string;
}

// 用表单跳转代替原来的 iframe：bing / 百度 / 谷歌都带 X-Frame-Options，
// 嵌在页面里必然是空白，而且白拖一个第三方页面下来
const ENGINES: Engine[] = [
    { name: 'Bing', ico: bingIco, search: 'https://www.bing.com/search?q=' },
    { name: '百度', ico: baiduIco, search: 'https://www.baidu.com/s?wd=' },
    { name: '谷歌', ico: googleIco, search: 'https://www.google.com/search?q=' },
];

const engine = ref<Engine>(ENGINES[0]);
const keyword = ref('');

const submit = () => {
    const text = keyword.value.trim();

    if (!text) return;

    window.open(`${engine.value.search}${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
};
</script>

<style lang="scss" scoped>
.quick-search {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding: 2rem 1.5rem;
    background: linear-gradient(180deg, #fff 0%, #f5f7fb 100%);
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-indent: 0.12em;
    color: $color-text;
}

.search-form {
    display: flex;
    width: min(34rem, 100%);
    gap: 0.5rem;
}

.search-input {
    flex: 1;
    height: 2.75rem;
    padding: 0 1rem;
    border: 1px solid #dfe3ea;
    border-radius: 0.5rem;
    background-color: #fff;
    color: $color-text;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
        border-color: $color-primary;
        box-shadow: 0 0 0 3px rgba(51, 122, 217, 0.15);
    }
}

.search-btn {
    height: 2.75rem;
    padding: 0 1.4rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: $color-primary;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: hsl(210, 70%, 42%);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
}

.engines {
    display: flex;
    gap: 0.75rem;
}

.engine {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    border: 1px solid #e3e8f0;
    border-radius: 999px;
    background-color: #fff;
    color: #5e6673;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s, background-color 0.2s;

    img {
        width: 1rem;
        height: 1rem;
    }

    &:hover {
        border-color: #b9c9f0;
        color: $color-primary;
    }

    &.active {
        border-color: $color-primary;
        background-color: #eef3ff;
        color: $color-primary;
    }
}

.hint {
    font-size: 12px;
    color: #98a1b3;
}
</style>
