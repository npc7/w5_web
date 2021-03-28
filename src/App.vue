<template>
<div id="app">
    <a-layout class="layout" v-if="is_login == false">
        <my-nav />
        <a-layout>
            <my-header />
            <router-view />
        </a-layout>
    </a-layout>
    <a-layout class="layout" v-else>
        <router-view />
    </a-layout>
</div>
</template>

<script>
import MyNav from "@/components/MyNav";
import MyHeader from "@/components/MyHeader";

export default {
    name: "App",
    components: {
        MyNav,
        MyHeader,
    },
    data() {
        return {
            is_login: true,
        };
    },
    created() {
        this.boolPage();
    },
    methods: {
        boolPage() {
            var key = this.$router.history.current.name;
            if (key == "Login") {
                if (this.isToken() == true) {
                    this.is_login = true;
                } else {
                    this.is_login = false;
                }
            } else {
                if (this.isToken() == true) {
                    this.is_login = true;
                } else {
                    this.is_login = false;
                }
            }
        },
        isToken() {
            var isToken = $cookies.isKey("token");

            if (isToken) {
                // var token = this.$cookies.get("token");
                return false;
            } else {
                return true;
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import url("./theme/style.less");

body,
* {
    margin: 0px;
}

#app {
    @font-family: -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
    height: 100%;
}

.bright {
    .ant-layout {
        background: none;
    }

    .layout {
        height: 100%;

        .ant-layout-content {
            margin: 24px 16px;
            padding: 10px;
            background: @background;
            border-radius: 5px;
            min-height: auto;
            box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.05);
        }

        /deep/ .ant-collapse-borderless {
            background-color: #fff;
            border: 0;
            height: 100%;
            overflow: auto;
        }

        /deep/ .ant-btn-primary {
            color: #fff;
            background-color: #d43232;
            border-color: #d43232;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
            -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        }

        /deep/ .ant-switch-checked {
            background-color: #3ac529;
        }

        /deep/.ant-tabs-nav .ant-tabs-tab-active {
            color: #e24540;
            font-weight: 500;
        }

        /deep/.ant-tabs-ink-bar {
            background-color: #060606;
            height: 0px;
        }

        /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
            color: #e24540;
        }

        /deep/ .ant-list {
            margin-top: -16px;
            padding-left: 5px;
            padding-right: 5px;
        }

        /deep/ .ant-page-header-ghost {
            border-bottom: 1px solid #dedede;
            padding: 5px 24px;
        }

        /deep/ .ant-page-header-heading-extra {
            float: none;
            position: fixed;
            right: 0;
            margin-right: 20px;
            margin-top: 4px;
        }
    }

    /deep/ .descx {
        .ant-descriptions-item-label {
            color: #333;
            font-weight: bold;
        }

        .ant-descriptions-item-content {
            color: #333;
        }

        .ant-page-header-back-button {
            color: #333;
        }
    }
}

.dark {
    .ant-layout {
        background: @dark-background1;
    }

    .layout {
        height: 100%;

        .ant-layout-content {
            margin: 24px 16px;
            padding: 10px;
            background: @dark-background;
            border-radius: 5px;
            min-height: auto;
            box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.05);
            color: @dark-text-color;
        }
    }

    /deep/ .ant-table {
        color: #e2e0e0;
    }

    /deep/ .ant-table-thead>tr>th {
        color: #e2e0e0;
        background: #202225;
        border-bottom: 1px solid #353535;
    }

    /deep/ .ant-table-tbody>tr>td {
        border-bottom: 1px solid #353535;
    }

    /deep/ .ant-table-tbody>tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)>td {
        background: #292d38;
    }

    /deep/ .ant-table-tbody>tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)>td {
        background: #292d38;
    }

    /deep/ .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
        display: block;
        height: 100%;
        font-size: 12px;
        text-align: center;
        background-color: #202225;
        border: 1px solid #353535;
        border-radius: 4px;
        outline: none;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    /deep/ .ant-pagination-disabled a,
    .ant-pagination-disabled:hover a,
    .ant-pagination-disabled:focus a,
    .ant-pagination-disabled .ant-pagination-item-link,
    .ant-pagination-disabled:hover .ant-pagination-item-link,
    .ant-pagination-disabled:focus .ant-pagination-item-link {
        color: #ffffff61;
    }

    /deep/ .ant-pagination-next a {
        color: #ffffff61;
    }

    /deep/ .ant-pagination-prev a,
    .ant-pagination-next a {
        color: #ffffff61;
    }

    /deep/ .ant-pagination-item-link {
        display: block;
        height: 100%;
        font-size: 12px;
        text-align: center;
        background-color: #202225;
        border: 1px solid #353535;
        border-radius: 4px;
        outline: none;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    /deep/ .ant-pagination-item-active {
        font-weight: 500;
        background: #202225;
        border-color: #353535;
    }

    /deep/ .ant-pagination-item {
        background: #202225;
        border-color: #353535;
    }

    /deep/ .ant-pagination-item a {
        display: block;
        padding: 0 6px;
        color: #a7a7a7a6;
        -webkit-transition: none;
        transition: none;
    }

    /deep/ .ant-pagination-item-active a {
        color: #fff;
    }

    /deep/ .ant-btn-primary {
        color: #fff;
        background-color: #d43232;
        border-color: #d43232;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    }

    /deep/ .ant-switch-checked {
        background-color: #3ac529;
    }

    /deep/ .ant-table-placeholder {
        position: relative;
        z-index: 1;
        margin-top: -1px;
        padding: 16px 16px;
        color: rgba(0, 0, 0, 0.25);
        font-size: 14px;
        text-align: center;
        background: #27292e;
        border-top: 1px solid #353535;
        border-bottom: 1px solid #353535;
        border-radius: 0 0 4px 4px;
    }

    /deep/ .ant-empty-normal {
        margin: 32px 0;
        color: #ccc;
    }

    /deep/ .ant-collapse>.ant-collapse-item>.ant-collapse-header {
        color: #e4e4e4;
    }

    /deep/ .ant-collapse-borderless {
        background-color: #27292e;
        border: 0;
        height: 100%;
        overflow: auto;
    }

    /deep/ .ant-collapse-borderless>.ant-collapse-item {
        border-bottom: 1px solid #353535;
    }

    /deep/ .ant-collapse-borderless>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box {
        padding-top: 16px;
    }

    /deep/ .ant-menu-item-selected .anticon {
        color: @color1;
    }

    /deep/ .ant-table-fixed-header>.ant-table-content>.ant-table-scroll>.ant-table-body {
        background: none;
    }

    /deep/.ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
        text-align: right;
        color: #c7c7c7;
    }

    /deep/.ant-tabs .ant-tabs-nav .ant-tabs-tab-active {
        color: #e24540;
        font-weight: 500;
    }

    /deep/.ant-tabs-ink-bar {
        background-color: #e24540;
        height: 0px;
    }

    /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        color: #e24540;
    }

    /deep/ .ant-tabs .ant-tabs-left-bar {
        float: left;
        margin-right: -1px;
        margin-bottom: 0;
        border-right: 1px solid #5d5d5d;
    }

    /deep/ .ant-tabs .ant-tabs-left-content {
        padding-left: 24px;
        border-left: 1px solid #5d5d5d;
    }

    /deep/ .ant-list-item-meta-title {
        margin-bottom: 4px;
        color: #dedede;
        font-size: 14px;
        line-height: 22px;
    }

    /deep/ .ant-list-item-meta-description {
        color: #909090;
        font-size: 13px;
        line-height: 22px;
        letter-spacing: 1px;
        font-weight: 400;
    }

    /deep/ .ant-list-split .ant-list-item {
        border-bottom: 1px solid #5d5d5d;
    }

    /deep/ .ant-list-split .ant-list-item:last-child {
        border-bottom: none;
    }

    /deep/ .ant-tabs-nav .ant-tabs-tab {
        color: #ccc;
    }

    /deep/ .ant-list {
        color: #c7c7c7;
        margin-top: -16px;
        padding-left: 5px;
        padding-right: 5px;
    }

    /deep/ .ant-statistic-title {
        color: #fff;
    }

    /deep/ .ant-statistic-content {
        color: #fff;
    }

    /deep/ .ant-page-header-ghost {
        background-color: inherit;
        border-bottom: 1px solid #404040;
        padding: 5px 24px;
    }

    /deep/ .ant-page-header-heading-title {
        color: #fff;
    }

    /deep/ .ant-page-header-heading-sub-title {
        color: #a0a0a0;
    }

    /deep/ .ant-page-header-heading-extra {
        float: none;
        position: fixed;
        right: 0;
        margin-right: 20px;
        margin-top: 4px;
    }

    /deep/ .descx {
        .ant-descriptions-item-label {
            color: #fff;
            font-weight: bold;
        }

        .ant-descriptions-item-content {
            color: #ffffffdb;
        }

        .ant-page-header-back-button {
            color: #fff;
        }
    }
}
</style>
