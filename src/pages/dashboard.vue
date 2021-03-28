<template>
<a-layout-content>
    <a-row :gutter="[16,16]">
        <a-col :span="24">
            <div class="sound_div">
                <a-icon type="sound" />
                <span class="sound_text">{{w5_json.notice}}</span>
            </div>
        </a-col>
        <a-col :span="6">
            <a-card class="icondiv">
                <div class="left">
                    <a-statistic title="剧本数量" :value="sums_data['workflow_count']" />
                </div>
                <div class="right">
                    <a-icon class="icons" type="cloud-sync" />
                </div>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card class="icondiv">
                <div class="left">
                    <a-statistic title="执行次数" :value="sums_data['logs_count']" />
                </div>
                <div class="right">
                    <a-icon class="icons" type="car" />
                </div>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card class="icondiv">
                <div class="left">
                    <a-statistic title="执行异常" :value="sums_data['logs_err_count']" />
                </div>
                <div class="right">
                    <a-icon class="icons" type="warning" />
                </div>
            </a-card>
        </a-col>

        <a-col :span="6">
            <a-card class="icondiv">
                <div class="left">
                    <a-statistic title="正在执行" :value="sums_data['exec_sum']" />
                </div>
                <div class="right">
                    <a-icon class="icons" type="rocket" />
                </div>
            </a-card>
        </a-col>

        <a-col :span="16">
            <a-card size="small">
                <span slot="title" class="titlex">
                    <a-icon type="line-chart" /> 今日执行统计</span>
                <div class="tb_div" id="main2">

                </div>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card size="small">
                <span slot="title" class="titlex">
                    <a-icon type="pie-chart" /> 剧本统计</span>
                <div class="tb_div" id="main1">
                </div>
            </a-card>
        </a-col>

        <a-col :span="24">
            <a-card size="small">
                <span slot="title" class="titlex">
                    <a-icon type="bug" /> 执行日记 [ Top 100 ]
                </span>
                <!-- <span class="more" @click="onMore">
                    <a-icon type="double-right" /> 更多
                </span> -->
                <a-table rowKey="id" size="middle" :scroll="{ y: 260 }" :showHeader="false" :columns="columns" :data-source="logs_data" :loading="loading" :pagination="false">
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
                </a-table>
            </a-card>
        </a-col>

    </a-row>

</a-layout-content>
</template>

<script>
import {
    Area,
    Pie
} from '@antv/g2plot';

const columns = [{
        title: "剧本名称",
        dataIndex: "name",
        key: "name",
        scopedSlots: {
            customRender: "name",
        },
        width: 120
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
        title: "级别",
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
    }
];

export default {
    name: 'dashboard',
    data() {
        return {
            sums_data: {},
            logs_data: [],
            workflow_data: [],
            columns,
            loading: false,
            exec_data: [],
            theme: "dark",
            w5_json: {},
            piePlot: ""
        }
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad() {
            this.theme = this.$cookies.get("theme");
            this.onLoadSums();
            this.onLoadLogs();
            this.onLoadWorkflow();
            this.onLoadExec();
            this.onW5Json();
        },
        gd() {
            this.$router.push({
                name: "LogsHome"
            });
        },
        onLoadSums() {
            this.$http
                .post("/api/v1/w5/get/dashboard/sums")
                .then((res) => {
                    if (res.code == 0) {
                        this.sums_data = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onLoadLogs() {
            this.$http
                .post("/api/v1/w5/get/dashboard/logs")
                .then((res) => {
                    if (res.code == 0) {
                        this.logs_data = res.data;

                        setTimeout(function () {
                            var t = document.querySelector(".ant-table-body");
                            t.scrollTop = t.scrollHeight;
                        }, 100);
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onLoadWorkflow() {
            this.$http
                .post("/api/v1/w5/get/dashboard/workflow")
                .then((res) => {
                    if (res.code == 0) {
                        this.workflow_data = res.data;
                        this.onLoadMain1();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onLoadExec() {
            this.$http
                .post("/api/v1/w5/get/dashboard/exec")
                .then((res) => {
                    if (res.code == 0) {
                        this.exec_data = res.data;
                        this.onLoadMain2();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onLoadMain1() {
            if (this.theme === "bright") {
                this.piePlot = new Pie('main1', {
                    appendPadding: 10,
                    data: this.workflow_data,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 0.8,
                    label: {
                        type: 'outer',
                        content: '{name}\n{percentage}',
                        style: {
                            fill: '#000',
                        },
                    },
                    legend: false,
                    interactions: [{
                        type: 'element-active'
                    }],
                });

                this.piePlot.render();
            } else if (this.theme === "dark") {
                this.piePlot = new Pie('main1', {
                    appendPadding: 10,
                    data: this.workflow_data,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 0.8,
                    label: {
                        type: 'outer',
                        content: '{name}\n{percentage}',
                        style: {
                            fill: '#fff',
                        },
                    },
                    legend: false,
                    interactions: [{
                        type: 'element-active'
                    }],
                });

                this.piePlot.render();
            }
        },
        onLoadMain2() {
            let areaPlot = new Area('main2', {
                data: this.exec_data,
                xField: 'time',
                yField: 'value',
                xAxis: {
                    range: [0, 1],
                    tickCount: 5,
                },
                areaStyle: () => {
                    return {
                        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
                    };
                },
            });
            areaPlot.render();
        },
        onW5Json() {
            this.$http
                .post("/api/v1/w5/get/system/w5json")
                .then((res) => {
                    if (res.code == 0) {
                        this.w5_json = res.data;
                    }
                });
        }
    },
    watch: {
        '$store.getters.getTheme': function (e) {
            this.theme = this.$store.getters.getTheme;
            if (this.theme === "bright") {
                this.piePlot.update({
                    label: {
                        style: {
                            fill: '#000',
                        }
                    }
                });
            } else if (this.theme === "dark") {
                this.piePlot.update({
                    label: {
                        style: {
                            fill: '#fff',
                        }
                    }
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tb_div {
    height: 250px;
}

.log_div {
    background: #151719;
    color: #bbb;
    height: 180px;
    margin: -10px;
    border-radius: 5px;
    padding-left: 30px;
    line-height: 15px;
    font-size: 14px;
    overflow-y: auto;
    margin-top: 0px;
}

.more {
    position: absolute;
    top: 18px;
    right: 0;
    margin-right: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #d45050;
}

.bright {
    .sound_div {
        background: #ffffff;
        line-height: 40px;
        padding-left: 10px;
        border-radius: 3px;
        border: 1px solid #e8e8e8;
        font-size: 13px;

        .sound_text {
            font-size: 14px;
            margin-left: 6px;
            font-size: 12px;
            letter-spacing: 1px;
        }
    }

    .heng {
        color: #636363;
        margin-left: 15px;
        margin-right: 15px;
    }

    .ant-card {
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 10px;
    }

    .icondiv {
        .left {
            float: left;
        }

        .right {
            float: right;

            .icons {
                font-size: 30px;
                vertical-align: middle;
                background: #e8e8e8;
                padding: 15px;
                border-radius: 100%;
                color: #565656;
            }
        }
    }
}

.dark {
    .icondiv {
        .left {
            float: left;
        }

        .right {
            float: right;

            .icons {
                font-size: 30px;
                vertical-align: middle;
                vertical-align: middle;
                background: #38393c;
                padding: 15px;
                border-radius: 100%;
                color: #e0e0e0;
            }
        }
    }

    .sound_div {
        background: #202225;
        line-height: 40px;
        padding-left: 10px;
        border-radius: 5px;
        font-size: 13px;

        .sound_text {
            font-size: 14px;
            margin-left: 6px;
            font-size: 12px;
            letter-spacing: 1px;
        }
    }

    .heng {
        color: #636363;
        margin-left: 15px;
        margin-right: 15px;
    }

    .ant-card {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
        font-feature-settings: 'tnum';
        position: relative;
        border-radius: 2px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        border: 0px;
        border-radius: 5px;
        background: #202225;
        margin-bottom: 10px;
        padding: 10px;
        color: #cacaca;

        /deep/.ant-card-head {
            border-bottom: 1px solid #353535;
        }

    }

    .titlex {
        color: #cacaca;
    }
}
</style>
