<template>

    <div>
        <div class="palette-box">
            <template v-for="pk in ['primary', 'secondary', 'tertiary', 'error', 'neutral', 'neutral-variant']">
                <template v-for="pl in [...Array(101).keys()]">
                    <div :style="`background: var(--md-sys-ref-${pk}-${pl});`"></div>
                </template>
            </template>
        </div>

        <div class="color-box" style="background: var(--md-sys-color-background);">
            <div style="background: var(--md-sys-color-primary-palette-key-color);"></div>
            <div style="background: var(--md-sys-color-secondary-palette-key-color);"></div>
            <div style="background: var(--md-sys-color-tertiary-palette-key-color);"></div>
            <div style="background: var(--md-sys-color-neutral-palette-key-color);"></div>
            <div style="background: var(--md-sys-color-neutral-variant-palette-key-color);"></div>
            <div style="background: var(--md-sys-color-on-background);"></div>
            <div style="background: var(--md-sys-color-surface);"></div>
            <div style="background: var(--md-sys-color-surface-dim);"></div>
            <div style="background: var(--md-sys-color-surface-bright);"></div>
            <div style="background: var(--md-sys-color-surface-container-lowest);"></div>
            <div style="background: var(--md-sys-color-surface-container-low);"></div>
            <div style="background: var(--md-sys-color-surface-container);"></div>
            <div style="background: var(--md-sys-color-surface-container-high);"></div>
            <div style="background: var(--md-sys-color-surface-container-highest);"></div>
            <div style="background: var(--md-sys-color-on-surface);"></div>
            <div style="background: var(--md-sys-color-surface-variant);"></div>
            <div style="background: var(--md-sys-color-on-surface-variant);"></div>
            <div style="background: var(--md-sys-color-inverse-surface);"></div>
            <div style="background: var(--md-sys-color-inverse-on-surface);"></div>
            <div style="background: var(--md-sys-color-outline);"></div>
            <div style="background: var(--md-sys-color-outline-variant);"></div>
            <div style="background: var(--md-sys-color-shadow);"></div>
            <div style="background: var(--md-sys-color-scrim);"></div>
            <div style="background: var(--md-sys-color-surface-tint);"></div>
            <div style="background: var(--md-sys-color-primary);"></div>
            <div style="background: var(--md-sys-color-on-primary);"></div>
            <div style="background: var(--md-sys-color-primary-container);"></div>
            <div style="background: var(--md-sys-color-on-primary-container);"></div>
            <div style="background: var(--md-sys-color-inverse-primary);"></div>
            <div style="background: var(--md-sys-color-secondary);"></div>
            <div style="background: var(--md-sys-color-on-secondary);"></div>
            <div style="background: var(--md-sys-color-secondary-container);"></div>
            <div style="background: var(--md-sys-color-on-secondary-container);"></div>
            <div style="background: var(--md-sys-color-tertiary);"></div>
            <div style="background: var(--md-sys-color-on-tertiary);"></div>
            <div style="background: var(--md-sys-color-tertiary-container);"></div>
            <div style="background: var(--md-sys-color-on-tertiary-container);"></div>
            <div style="background: var(--md-sys-color-error);"></div>
            <div style="background: var(--md-sys-color-on-error);"></div>
            <div style="background: var(--md-sys-color-error-container);"></div>
            <div style="background: var(--md-sys-color-on-error-container);"></div>
            <div style="background: var(--md-sys-color-primary-fixed);"></div>
            <div style="background: var(--md-sys-color-primary-fixed-dim);"></div>
            <div style="background: var(--md-sys-color-on-primary-fixed);"></div>
            <div style="background: var(--md-sys-color-on-primary-fixed-variant);"></div>
            <div style="background: var(--md-sys-color-secondary-fixed);"></div>
            <div style="background: var(--md-sys-color-secondary-fixed-dim);"></div>
            <div style="background: var(--md-sys-color-on-secondary-fixed);"></div>
            <div style="background: var(--md-sys-color-on-secondary-fixed-variant);"></div>
            <div style="background: var(--md-sys-color-tertiary-fixed);"></div>
            <div style="background: var(--md-sys-color-tertiary-fixed-dim);"></div>
            <div style="background: var(--md-sys-color-on-tertiary-fixed);"></div>
            <div style="background: var(--md-sys-color-on-tertiary-fixed-variant);"></div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { Hct, TonalPalette } from '@material/material-color-utilities'
import { onMounted } from 'vue'
import { MaterialColor, Serialization } from '../../build/index.js'

onMounted(() => {
    const mdt = MaterialColor.Create({
        sourceColor: Hct.from(180, 65, 50)
    })
    console.log(mdt)

    const s = Serialization.ToCSS(mdt)
    console.log(s)


    const sheet = new CSSStyleSheet()
    sheet.replaceSync(s)
    document.adoptedStyleSheets.push(sheet)

})
</script>

<style scoped>
.color-box {
    display: flex;
    flex-direction: column;
}
.color-box > div {
    display: block;
    height: 20px;
}

.palette-box {
    display: grid;
    grid-template-columns: repeat(101, 1fr);

    &>div {
        display: block;
        width: 100%;
        height: 20px;
    }
}
</style>
