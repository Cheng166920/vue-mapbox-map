<template>
<div class="top-popup">
    <div class="title-content" >
        <p>{{ title }}</p>
        <img src="../assets/images/jn_title.png">
    </div>
</div>
</template>

<script setup name='TitlePop'>
import { defineProps } from 'vue';
import { toRefs } from 'vue';

const props = defineProps({
    title: String
});
const { title } = toRefs(props);
</script>

