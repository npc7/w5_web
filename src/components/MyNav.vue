<template>
<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
    <div class="logos" v-if="collapsed">
        <a-avatar class="logo_imgs" :src="baseURL + '/public/logo.png'" />
    </div>
    <div class="logo" v-else>
        <img class="limg" :src="baseURL + '/public/logo.png'" />
        <div class="ltxt">
            <span class="title">W5</span><span>SOAR</span>
        </div>
    </div>
    <a-menu :theme="theme" mode="inline" :default-selected-keys="defaultSelectedKeys" @click="click">
        <a-menu-item key="Dashboard">
            <a-icon type="dashboard" />
            <span>仪表盘</span>
        </a-menu-item>
        <a-menu-item key="WorkflowHome">
            <a-icon type="cloud-sync" />
            <span>剧本列表</span>
        </a-menu-item>
        <a-menu-item key="TimerHome">
            <a-icon type="cluster" />
            <span>任务调度</span>
        </a-menu-item>
        <a-menu-item key="LogsHome">
            <a-icon type="bug" />
            <span>执行日记</span>
        </a-menu-item>
        <a-menu-item key="ReportHome">
            <a-icon type="file-pdf" />
            <span>执行报告</span>
        </a-menu-item>
        <a-menu-item key="AppHome">
            <a-icon type="appstore" />
            <span>应用中心</span>
        </a-menu-item>
        <a-menu-item key="VariablenHome">
            <a-icon type="gold" />
            <span>全局变量</span>
        </a-menu-item>
        <a-menu-item key="ClassificationHome">
            <a-icon type="folder-open" />
            <span>分类管理</span>
        </a-menu-item>
        <a-menu-item key="UserHome">
            <a-icon type="user" />
            <span>用户管理</span>
        </a-menu-item>
        <!-- <a-menu-item key="User">
            <a-icon type="team" />
            <span>角色管理</span>
        </a-menu-item> -->
        <a-menu-item key="SystemHome">
            <a-icon type="setting" />
            <span>系统管理</span>
        </a-menu-item>
    </a-menu>

    <div class="nav_footer" v-if="collapsed">
        <div>W5 v{{W5Version}}</div>
    </div>
    <div class="nav_footer" v-else>
        <div>Copyright © W5 v{{W5Version}}</div>
    </div>
</a-layout-sider>
</template>

<script>
export default {
    name: "MyNav",
    data() {
        return {
            baseURL: this.BaseURL,
            defaultSelectedKeys: ["Dashboard"],
            theme: "dark"
        };
    },
    computed: {
        collapsed() {
            return this.$store.getters.getCollapsed;
        },
    },
    mounted() {
        this.setDefaultSelectedKeys();
    },
    methods: {
        setDefaultSelectedKeys() {
            let router_key = this.$router.history.current.name;

            if (router_key == null) {
                this.defaultSelectedKeys = ["Dashboard"];
            }

            if (router_key === "WorkflowEdit") {
                this.defaultSelectedKeys = ["WorkflowHome"];
            } else {
                this.defaultSelectedKeys = [router_key];
            }
        },
        click(e) {
            this.$router.push({
                name: e.key,
            });
        },
    },
    watch: {
        '$store.getters.getTheme': function (e) {
            if (e === "dark") {
                this.theme = e;
            } else {
                this.theme = "light";
            }

        }
    }
};
</script>

<style lang="less" scoped>
@import url("../theme/style.less");

.ant-menu-dark {
    background: inherit;
}

.bright {
    .logo {
        // margin: 16px;
        text-align: center;
        // font-size: 20px;
        // background: #f3f2f2;
        padding-top: 10px;
        padding-bottom: 5px;
        // border-radius: 3px;
        border-bottom: 1px solid #dedede;
        margin-bottom: 10px;
        margin-left: 30px;
        margin-right: 30px;

        .limg {
            width: 100px;
        }

        .ltxt {
            font-size: 25px;
            font-weight: bold;
            margin-top: 5px;

            .title {
                color: #e45450;
                margin-right: 5px;
            }
        }
    }

    .logos {
        margin: 16px;
        text-align: center;

        .logo_img {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            vertical-align: bottom;
        }

        .logo_imgs {
            width: 30px;
            height: 30px;
        }
    }

    .ant-layout-sider {
        background: #fff;
        border-right: 1px solid #efefef;
    }

    .ant-menu-item-selected {
        background-color: inherit;
        border-left: 2px solid @color1;
        color: @color1;
    }

    .ant-menu-item:hover {
        color: @color1;
    }

    .ant-menu-inline .ant-menu-item::after {
        border: 0px;
    }
}

.dark {
    .logo {
        // margin: 16px;
        text-align: center;
        // background: #27292d;
        padding-top: 10px;
        padding-bottom: 5px;
        // border-radius: 3px;
        border-bottom: 1px solid #353535;
        margin-bottom: 10px;
        margin-left: 30px;
        margin-right: 30px;

        .limg {
            width: 100px;
        }

        .ltxt {
            font-size: 25px;
            font-weight: bold;
            color: #fff;
            margin-top: 5px;

            .title {
                color: #e45450;
                margin-right: 5px;
            }
        }
    }

    .logos {
        margin: 16px;
        text-align: center;

        .logo_img {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            vertical-align: bottom;
        }

        .logo_imgs {
            width: 30px;
            height: 30px;
        }
    }

    .ant-layout-sider {
        background: @dark-nav-bg-color;
        border-right: @border;
    }

    .ant-menu.ant-menu-dark .ant-menu-item-selected {
        background-color: inherit;
        border-left: 2px solid @color1;
    }

    .ant-menu-dark .ant-menu-item-selected .anticon {
        color: @dark-nav-bg-color1;
    }
}

.nav_footer {
    color: #a0a0a0;
    text-align: center;
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
    font-size: 12px;
}
</style>
