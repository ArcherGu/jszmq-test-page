<template>
    <div class="req-res-mode">

        <h2 style="text-align: center">Request-Response</h2>

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

            <el-row
                :gutter="20"
                style="height: 62px"
            >

            </el-row>
        </el-form>

        <el-row style="padding:0px 20px">
            <h3>Request:</h3>
            <el-input
                v-model="reqMsg"
                type="textarea"
                :autosize="{ minRows: 5}"
                readonly
            >
            </el-input>

            <h3>Response:</h3>
            <el-input
                v-model="resMsg"
                type="textarea"
                :autosize="{ minRows: 5}"
                readonly
            >
            </el-input>

            <el-divider />

            <el-input
                v-model="inputMsg"
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="Something to send..."
            >
            </el-input>

            <div style="width: 100%; text-align: center">
                <el-button
                    type="primary"
                    style="margin-top: 10px;"
                    @click="sendRequest"
                >Send</el-button>
            </div>

        </el-row>

    </div>
</template>

<script>
import { sendRequestMsg } from "@/plugins/jszmq";

export default {
    name: "RequestResponseMode",
    components: {},
    props: {},
    data() {
        return {
            urlInfo: {
                ip: "127.0.0.1",
                port: "8083",
            },
            reqMsg: "",
            resMsg: "",
            inputMsg: "",
        };
    },
    mounted() {},
    methods: {
        sendRequest() {
            if (!this.urlInfo.ip || !this.urlInfo.port) {
                this.$message({
                    message: "Please Input IP Address And Port First！",
                    type: "error",
                });
                return;
            }

            let url = `${this.urlInfo.ip}:${this.urlInfo.port}`;
            this.reqMsg = this.inputMsg;
            sendRequestMsg(url, this.inputMsg)
                .then((response) => {
                    this.resMsg = response;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    computed: {},
};
</script>

<style>
</style>