<template>
    <div class = "legend" @click="legendOpen" :class="{'active':index==0}">
            <img src="../assets/images/legend.png"  v-if="index ==1">
            <img src="../assets/images/legend-active.png"  v-if="index !=1">
            <p>图例</p>
    </div>
</template>

<script setup name="BottonTool">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const index = ref(1);
const emit = defineEmits(['legendOpen'])
const legendOpen = () => {
    if (index.value == 1) {
        index.value = 0;
    } else {
        index.value = 1;
    }
    emit('legendOpen', index);
};

</script>

<style lang="less" scoped>

</style>