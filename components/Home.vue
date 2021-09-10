<template>
<div>
    <h1>禊掲示板</h1>
    <div class="post">
        <p>投稿しよう</p>
        <textarea name="post" v-model="message" id="" cols="30" rows="10" class="form"></textarea>
        <button label="投稿" @click>投稿！</button>
    </div>
</div>
</template>
<script>
import { defineComponent, ref } from "@vue/composition-api"

export default defineComponent({
    components: {

    },
    setup () {
        const message = ref("")
        const addMisogi = () => {
            if(message.length > 0) {
                console.log("ok")
            }
        }
    }
})
</script>
<style scoped>
.form{
    background-color: red;
    border: radius
}
button {
    background-color: aqua;
}
</style>