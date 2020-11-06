<template>
    <div class="pub-sub-mode">
        <h2 style="text-align: center">Publish-Subscribe</h2>

        <el-form
            label-width="40px"
            style="padding: 0 20px"
        >
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="IP">
                        <el-input
                            placeholder="IP Address"
                            v-model="urlInfo.ip"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Port">
                        <el-input
                            placeholder="Port"
                            v-model="urlInfo.port"
                        />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Topic">
                        <el-input
                            placeholder="Topic"
                            v-model="topic"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="12"
                    style="text-align: center"
                >
                    <el-button
                        type="success"
                        @click="subscribe"
                    >Subscribe</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-row style="padding:0px 20px">
            <h3>Message:</h3>
            <el-input
                v-model="message"
                type="textarea"
                :autosize="{ minRows: 13}"
                readonly
            >
            </el-input>
        </el-row>
    </div>
</template>

<script>
import { subSomeTopic } from "@/plugins/jszmq";

export default {
    name: "PublishSubscribMode",
    components: {},
    props: {},
    data() {
        return {
            urlInfo: {
                ip: "127.0.0.1",
                port: "8084",
            },
            topic: "MyTopic",
            message: "",
            currentSock: null,
        };
    },
    mounted() {},
    methods: {
        subscribe() {
            if (!this.urlInfo.ip || !this.urlInfo.port || !this.topic) {
                this.$message({
                    message:
                        "Please Input IP Address, Port And Subscribe Topic First！",
                    type: "error",
                });
                return;
            }

            if (
                this.currentSock &&
                typeof this.currentSock.removeAllListeners == "function" &&
                typeof this.currentSock.close == "function"
            ) {
                this.currentSock.removeAllListeners("message");
                this.currentSock.close();
                console.log("Old Sock Closed");
            }

            let url = `${this.urlInfo.ip}:${this.urlInfo.port}`;
            this.currentSock = subSomeTopic(url, this.topic, this.subCallback);

            this.$message({
                message: `Subscribe to ws://${"ws://" + url} ${this.topic}`,
                type: "success",
            });
        },

        subCallback(message) {
            this.message = message;
        },
    },
    computed: {},
};
</script>

<style>
</style>