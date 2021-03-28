<template>
    <a-layout-content>
        <div class="header_div">
            <a-select show-search :filter-option="onFilterOption" default-value="0" style="width: 120px" @change="onSelect" class="align">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option v-for="(item, index) in type_data" :key="index" :value="item.uuid">{{ item.name }}</a-select-option>
            </a-select>
            <a-input-search placeholder="请输入关键字" style="width: 200px" @search="onSearch" class="align" />
        </div>
        <a-table rowKey="id" :columns="columns" :data-source="data" :loading="loading">
            <span slot="name" slot-scope="text">
                <b>{{ text }}</b>
            </span>

            <span slot="app_name" slot-scope="text, record" v-if="text=='开始'">
                <a-avatar :size="22" style="margin-right:3px;" :src="BaseURL+'/app/basic/start.png'" />
                <a-tag color="#1863d4">{{ text }} </a-tag>
            </span>
            <span slot="app_name" slot-scope="text, record" v-else-if="text=='结束'">
                <a-avatar :size="22" style="margin-right:3px;" :src="BaseURL+'/app/basic/end.png'" />
                <a-tag color="#b92525">{{ text }} </a-tag>
            </span>
            <span slot="app_name" slot-scope="text, record" v-else-if="text=='定时器'">
                <a-avatar :size="22" style="margin-right:3px;" :src="BaseURL+'/app/basic/timer.png'" />
                <a-tag color="#3ca03b">{{ text }} </a-tag>
            </span>
            <span slot="app_name" slot-scope="text, record" v-else-if="text=='用户输入'">
                <a-avatar :size="22" style="margin-right:3px;" :src="BaseURL+'/app/basic/input.png'" />
                <a-tag color="#b628da">{{ text }} </a-tag>
            </span>
            <span slot="app_name" slot-scope="text, record" v-else-if="text=='WebHook'">
                <a-avatar :size="22" style="margin-right:3px;" :src="BaseURL+'/app/basic/webhook.png'" />
                <a-tag color="#53b0b5">{{ text }} </a-tag>
            </span>
            <span slot="app_name" slot-scope="text, record" v-else>
                <a-avatar :size="22" style="margin-right:3px;" :src="BaseURL+'/app/'+JSON.parse(record.args).app_dir+'/icon.png'" />
                <a-tag color="#7d838c">{{ text }} </a-tag>
            </span>

            <span slot="status" slot-scope="text">
                <a-tag v-if="text==0" color="#469823">正常</a-tag>
                <a-tag v-if="text==1" color="#9e8c0a">警告</a-tag>
                <a-tag v-if="text==2" color="#9c5656">错误</a-tag>
                <a-tag v-if="text==3" color="#bf0c0c">危险</a-tag>
            </span>

            <di slot="create_time" slot-scope="text">
                {{Dayjs(text).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
            </di>

            <div slot="action" slot-scope="text, record" style="text-align: center;">
                <a-space size="small">
                    <a-tooltip placement="left">
                        <template slot="title">
                            <span>删除</span>
                        </template>
                        <a-popconfirm title="是否要删除该日记?" ok-text="是" cancel-text="否" @confirm="del(record.id)">
                            <a-icon class="pointer" type="delete" />
                        </a-popconfirm>
                    </a-tooltip>
                </a-space>
            </div>
        </a-table>
    </a-layout-content>
</template>

<script>
const columns = [{
        title: "剧本名称",
        dataIndex: "name",
        key: "name",
        scopedSlots: {
            customRender: "name",
        },
        width: 150
    },
    {
        title: "APP 名称",
        dataIndex: "app_name",
        key: "app_name",
        scopedSlots: {
            customRender: "app_name",
        },
        width: 160
    },
    {
        title: "执行结果",
        dataIndex: "result",
        key: "result",
        scopedSlots: {
            customRender: "result",
        },
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
        scopedSlots: {
            customRender: "status",
        },
        width: 60
    },
    {
        title: "创建时间",
        key: "create_time",
        dataIndex: "create_time",
        scopedSlots: {
            customRender: "create_time",
        },
        width: 190
    },
    {
        title: "操作",
        key: "action",
        scopedSlots: {
            customRender: "action",
        },
        width: 60
    },
];
export default {
    name: 'logsHome',
    data() {
        return {
            columns,
            loading: false,
            data: [],
            type_data: [],
            so_text: ""
        }
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad(keywords = "", select_type = 0) {
            this.loading = true;
            this.$http
                .post("/api/v1/w5/get/logs/list", {
                    keywords: keywords,
                    type: select_type,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.data = res.data;
                        this.onSelectType();
                        this.loading = false;
                    } else {
                        this.$message.error(res.msg);
                        this.loading = false;
                    }
                });
        },
        onSelectType() {
            this.$http
                .post("/api/v1/w5/get/workflow/list", {
                    type: 0,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.type_data = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        del(id) {
            this.$http
                .post("/api/v1/w5/post/logs/del", {
                    id: id,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success("删除成功");
                        this.onLoad();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onSearch(value) {
            this.so_text = value;
            this.onLoad(this.so_text, this.select_type);
        },
        onSelect(value) {
            this.select_type = value;
            this.onLoad(this.so_text, this.select_type);
        },
        onFilterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
    },
}
</script>

<style lang="less" scoped>
@import url("../../theme/style.less");

.pointer {
    cursor: pointer;
}

.center {
    text-align: center;
}

.bright {
    .header_div {
        width: 100%;
        background: #fafafa;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #f5f5f5;
        border-radius: 5px;

        .align {
            vertical-align: middle;
        }

        .btn_add {
            float: right;
        }
    }
}

.dark {
    .header_div {
        width: 100%;
        background: #202225;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #353535;
        border-radius: 5px;

        .align {
            vertical-align: middle;
        }

        .btn_add {
            float: right;
        }
    }
}
</style>
