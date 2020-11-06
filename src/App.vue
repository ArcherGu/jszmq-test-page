<template>
    <div id="app">
        <el-row style="height: 100%">
            <el-col
                :span="12"
                class="bd-r"
                style="height: 100%"
            >
                <request-response-mode />
            </el-col>
            <el-col
                :span="12"
                style="height: 100%"
            >
                <publish-subscribe-mode />
            </el-col>
        </el-row>

    </div>
</template>

<script>
import RequestResponseMode from "components/RequestResponseMode";
import PublishSubscribeMode from "components/PublishSubscribeMode";

export default {
    name: "app",
    components: {
        RequestResponseMode,
        PublishSubscribeMode,
    },
    props: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    computed: {},
};
</script>

<style>
html {
    height: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    height: 100%;
    margin: 0px;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
}
.bd-r {
    border-right: 1px solid #dcdfe6;
}
</style>



