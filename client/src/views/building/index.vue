<template>
    <div class="building-page">
        <div class="grid-bg" aria-hidden="true"></div>

        <main class="card">
            <div class="orbit" aria-hidden="true">
                <span class="ring ring-outer"></span>
                <span class="ring ring-inner"></span>
                <span class="core"></span>
            </div>

            <p class="eyebrow">Gendouyun · 跟斗云</p>
            <h1>网站制作中</h1>
            <p class="lede">
                跟斗云导航正在重新搭建，内容与功能还在整理中。
                <br />
                上线后会第一时间在这里开放，欢迎稍后再来看看。
            </p>

            <div class="progress" role="progressbar" aria-label="网站制作进度">
                <div class="progress-bar"></div>
            </div>
        </main>

        <p class="footline">gendouyun.cn · 敬请期待</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const previousTitle = document.title;

onMounted(() => {
    document.title = '网站制作中 · 跟斗云';
});

onUnmounted(() => {
    document.title = previousTitle;
});
</script>

<style lang="scss" scoped>
.building-page {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 32px 24px;
    text-align: center;
    color: #e8eeff;
    background:
        radial-gradient(900px 520px at 18% 6%, rgba(91, 140, 255, 0.22), transparent 62%),
        radial-gradient(760px 460px at 84% 94%, rgba(34, 211, 238, 0.16), transparent 60%),
        #060913;
}

/* 细网格 + 中心渐隐，避免大面积纯色显得空 */
.grid-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: radial-gradient(70% 62% at 50% 46%, #000 0%, transparent 100%);
    mask-image: radial-gradient(70% 62% at 50% 46%, #000 0%, transparent 100%);
}

.card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 560px;
}

/* 双层虚线环 + 呼吸光点 */
.orbit {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 36px;

    .ring {
        position: absolute;
        border-radius: 50%;
        border: 1px dashed rgba(148, 178, 255, 0.4);
    }

    .ring-outer {
        inset: 0;
        animation: spin 18s linear infinite;
    }

    .ring-inner {
        inset: 18px;
        border-color: rgba(120, 220, 255, 0.45);
        animation: spin 12s linear infinite reverse;
    }

    .core {
        position: absolute;
        inset: 44px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #a8c8ff, #5b8cff 45%, #3b5bdb);
        box-shadow:
            0 0 32px rgba(91, 140, 255, 0.55),
            inset 0 1px 2px rgba(255, 255, 255, 0.6);
        animation: breathe 3.4s ease-in-out infinite;
    }
}

.eyebrow {
    margin: 0 0 14px;
    font-size: 11px;
    letter-spacing: 0.42em;
    text-indent: 0.42em;
    text-transform: uppercase;
    color: #7f90bb;
}

h1 {
    margin: 0 0 16px;
    font-size: clamp(28px, 5vw, 42px);
    font-weight: 600;
    letter-spacing: 0.16em;
    text-indent: 0.16em;
    color: #f2f6ff;
}

.lede {
    margin: 0 auto 30px;
    max-width: 30em;
    font-size: 15px;
    line-height: 1.9;
    color: #a8b6d8;
}

.progress {
    position: relative;
    width: min(320px, 72vw);
    height: 4px;
    margin: 0 auto;
    border-radius: 999px;
    overflow: hidden;
    /* 轨道本身带一点冷色渐变，扫描条移到两端时也不会显得空 */
    background: linear-gradient(90deg, rgba(91, 140, 255, 0.22), rgba(34, 211, 238, 0.18));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.progress-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 46%;
    border-radius: inherit;
    background: linear-gradient(90deg, transparent, #cfe0ff 25%, #5b8cff 55%, #22d3ee 85%, transparent);
    filter: drop-shadow(0 0 6px rgba(91, 140, 255, 0.65));
    animation: sweep 2.6s ease-in-out infinite;
}

.footline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 26px;
    z-index: 1;
    font-size: 12px;
    letter-spacing: 0.18em;
    color: #5f6f96;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes breathe {
    0%,
    100% {
        transform: scale(1);
        box-shadow:
            0 0 28px rgba(91, 140, 255, 0.45),
            inset 0 1px 2px rgba(255, 255, 255, 0.6);
    }

    50% {
        transform: scale(1.06);
        box-shadow:
            0 0 44px rgba(91, 140, 255, 0.7),
            inset 0 1px 2px rgba(255, 255, 255, 0.6);
    }
}

@keyframes sweep {
    0% {
        transform: translateX(-110%);
    }

    100% {
        transform: translateX(320%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .ring,
    .core,
    .progress-bar {
        animation: none;
    }
}
</style>
