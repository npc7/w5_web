<template>
<a-layout-content>
    <a-tabs default-active-key="1" tab-position="left">
        <a-tab-pane key="1" tab="基本设置">

            <!-- <div class="kuang">
                <a-alert class="alertx" message="提示" type="info" show-icon>
                    <span slot="description">想开发使用私有 APP 请填入 70 位长度的 <b>W5 KEY</b>。
                        <a href="https://wj.qq.com/s2/7738395/48a6/" target="_bank">申请 KEY</a> | <a href="https://w5.io/help/dev/dev4.html" target="_bank">帮助文档</a>
                    </span>
                </a-alert>

                <a-row type="flex">
                    <a-col flex="80px">
                        <span class="title">W5 KEY :</span>
                    </a-col>
                    <a-col flex="auto">
                        <a-input v-model="w5_key" placeholder="请输入 W5 KEY">
                            <a-icon slot="prefix" type="key" />
                        </a-input>
                    </a-col>
                    <a-col flex="120px">
                        <a-button class="btnx" type="primary" icon="check-circle" @click="onUpdateKey">更新秘钥</a-button>
                    </a-col>
                </a-row>
            </div> -->

            <div class="kuang">
                <a-alert class="alertx" message="提示" type="info" show-icon>
                    <span slot="description">API KEY 用于请求平台接口使用，点击按钮会随机生成。</span>
                </a-alert>

                <a-row type="flex">
                    <a-col flex="80px">
                        <span class="title">API KEY :</span>
                    </a-col>
                    <a-col flex="auto">
                        <a-tag color="green" style="margin-top:1px;">{{api_key}}</a-tag>
                    </a-col>
                    <a-col flex="120px">
                        <a-button class="btnx" type="primary" icon="key" @click="onUpdateApiKey">生成 KEY</a-button>
                    </a-col>
                </a-row>
            </div>
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="剧本设置" force-render>
            Content of Tab Pane 2
        </a-tab-pane> -->
        <a-tab-pane key="2" tab="危险设置">
            <div class="kuang">
                <a-alert class="alertx" message="警告" description="数据一经删除，不可恢复." type="warning" show-icon />
                <a-list item-layout="horizontal">
                    <a-list-item>
                        <a-list-item-meta title="清空剧本" description="清空剧本数据不可恢复，剧本数据很重要，请谨慎操作"></a-list-item-meta>
                        <a-popconfirm slot="actions" title="是否要清空剧本数据?" ok-text="是" cancel-text="否" @confirm="del(1)">
                            <a-button type="primary" icon="delete">清空剧本</a-button>
                        </a-popconfirm>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta title="清空日记" description="清空日记数据不可恢复，请谨慎操作"></a-list-item-meta>
                        <a-popconfirm slot="actions" title="是否要清空日记数据?" ok-text="是" cancel-text="否" @confirm="del(2)">
                            <a-button type="primary" icon="delete">清空日记</a-button>
                        </a-popconfirm>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta title="清空报告" description="清空报告数据不可恢复，请谨慎操作"></a-list-item-meta>
                        <a-popconfirm slot="actions" title="是否要清空报告数据?" ok-text="是" cancel-text="否" @confirm="del(5)">
                            <a-button type="primary" icon="delete">清空报告</a-button>
                        </a-popconfirm>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta title="清空变量" description="清空变量数据不可恢复，会造成剧本不可以状态，请谨慎操作"></a-list-item-meta>
                        <a-popconfirm slot="actions" title="是否要清空变量数据?" ok-text="是" cancel-text="否" @confirm="del(3)">
                            <a-button type="primary" icon="delete">清空变量</a-button>
                        </a-popconfirm>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta title="清空缓存" description="清空缓存，W5 将会让你重新登录"></a-list-item-meta>
                        <a-popconfirm slot="actions" title="是否要清空缓存?" ok-text="是" cancel-text="否" @confirm="del(4)">
                            <a-button type="primary" icon="delete">清空缓存</a-button>
                        </a-popconfirm>
                    </a-list-item>
                </a-list>
            </div>
        </a-tab-pane>
    </a-tabs>
</a-layout-content>
</template>

<script>
export default {
    name: 'systemHome',
    data() {
        return {
            data: {},
            w5_key: "",
            api_key: ""
        }
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad() {
            this.$http
                .post("/api/v1/w5/get/system/list")
                .then((res) => {
                    if (res.code == 0) {
                        this.data = res.data;
                        this.w5_key = this.data.w5_key;
                        this.api_key = this.data.api_key;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        del(type) {
            this.$http
                .post("/api/v1/w5/post/system/del", {
                    type: type
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success("清空成功");
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onUpdateKey() {
            this.$http
                .post("/api/v1/w5/post/system/w5key", {
                    w5key: this.w5_key
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success("更新成功");
                        this.onLoad();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onUpdateApiKey() {
            this.$http
                .post("/api/v1/w5/post/system/apikey")
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success("更新成功");
                        this.onLoad();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        }
    }
}
</script>

<style lang="less" scoped>
.bright {
    .kuang {
        border: 1px solid #e8e8e8;
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 20px;

        .alertx {
            margin-bottom: 40px;
        }

        .title {
            font-weight: bold;
            line-height: 27px;
        }

        .text {
            font-weight: bold;
            line-height: 27px;
        }

        .btnx {
            margin-left: 15px;
        }

        .ant-list {
            margin-top: -10px;
        }
    }

}

.dark {
    .kuang {
        border: 1px solid #5d5d5d;
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 20px;

        .alertx {
            margin-bottom: 40px;
        }

        .title {
            font-weight: bold;
            line-height: 27px;
            color: #dedede;
        }

        .text {
            font-weight: bold;
            line-height: 27px;
            color: #dedede;
        }

        .btnx {
            margin-left: 15px;
        }

        .ant-list {
            margin-top: -10px;
        }
    }

}
</style>
