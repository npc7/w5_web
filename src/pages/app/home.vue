<template>
<a-layout-content>
    <div class="header_div">
        <a-select show-search :filter-option="onFilterOption" default-value="all" style="width: 120px" @change="onSelect" class="align">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option v-for="(item,index) in app_type_list" :key="index" :value="item">{{ item }}</a-select-option>
        </a-select>
        <a-input-search placeholder="请输入应用名称" style="width: 200px" @search="onSearch" class="align" />

        <a-button type="primary" icon="plus-circle" class="align btn_add" @click="showAdd">
            导入APP
        </a-button>
    </div>

    <a-row :gutter="[24,40]">
        <a-col :span="6" v-for="(item,index) in app_list" :key="index">
            <div class="app_card">
                <div class="header">
                    <div class="div1">
                        <a-avatar class="app_avatar" :size="55" :src="baseURL+'/app/'+item.icon" />
                    </div>
                    <div class="div2">
                        <div class="app_name"><span>{{ item.name }}</span><span class="app_version">v{{ item.version }}</span></div>
                        <div class="app_desc"><span>{{ item.description }}</span></div>
                    </div>
                    <div class="app_type">
                        {{ item.type }}
                    </div>
                    <div class="app_del">
                        <a-tooltip placement="left">
                            <template slot="title">
                                <span>删除</span>
                            </template>
                            <a-popconfirm title="是否要删除该 APP?" ok-text="是" cancel-text="否" @confirm="del(item.app_dir)">
                                <a-icon class="pointer" type="delete" />
                            </a-popconfirm>
                        </a-tooltip>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="look_app" @click="onShowMd(item.app_dir,item.name,item.version,item.action,item.args,item.description)">
                    <a-icon type="file-markdown" /> 查看文档
                </div>
            </div>
        </a-col>
    </a-row>

    <a-drawer :title="app_title" :width="600" :visible="visible_md" :body-style="{ paddingBottom: '80px' }" @close="onCloseMd">
        <div class="markdown-body" v-html="html"></div>
    </a-drawer>

    <a-modal title="导入 APP" cancelText="关闭" okText="确认" :footer="null" :maskClosable="false" :width="600" :visible="visible_add" @cancel="onCloseAdd">
        <a-upload-dragger name="file" :action="upload_url" :headers="headers" @change="onUpload">
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                点击或拖动文件到此区域
            </p>
            <p class="ant-upload-hint">
                只支持上传 “.zip” 格式的压缩包
            </p>
        </a-upload-dragger>
    </a-modal>
</a-layout-content>
</template>

<script>
import marked from 'marked';
import 'github-markdown-css/github-markdown.css'
import reqid from "../../utils/reqid";

export default {
    name: "appHome",
    data() {
        return {
            baseURL: this.BaseURL,
            app_list: [],
            visible_md: false,
            html: "",
            app_title: "",
            app_type_list: null,
            select_type: "all",
            so_text: "",
            visible_add: false,
            upload_url: this.BaseURL + "/api/v1/w5/post/app/import",
            headers: {
                token: this.$cookies.get("token"),
                requestId: reqid.GetRequestId(),
                timestamp: new Date().getTime()
            },
        };
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad() {
            this.onAppList();
        },
        onUpload(info) {
            if (info.file.status === 'done') {
                if (info.file.response.code != 0) {
                    this.$message.error(info.file.response.msg);
                } else {
                    this.$message.success(`${info.file.name} 上传成功`);
                    this.onLoad();
                }
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} 上传失败`);
            }
        },
        onRegExp(text, str) {
            let strx = ['', ...text, ''].join('.*');
            let reg = new RegExp(strx);
            return reg.test(str)
        },
        onAppList(type = "all", so_text = "") {
            this.app_list = [];
            this.app_type_list = new Set();

            this.$http
                .get("/api/v1/w5/get/app/list")
                .then((res) => {
                    if (res.code == 0) {
                        let xdata = res.data;

                        for (var item in xdata) {
                            this.app_type_list.add(xdata[item].type)
                        }

                        if (type === "all") {
                            if (so_text === "") {
                                this.app_list = xdata;
                            } else {
                                for (var item in xdata) {
                                    if (this.onRegExp(so_text, xdata[item].name)) {
                                        this.app_list.push(xdata[item]);
                                    }
                                }
                            }
                        } else {
                            for (var item in xdata) {
                                if (type === xdata[item].type) {
                                    if (so_text === "") {
                                        this.app_list.push(xdata[item]);
                                    } else {
                                        if (this.onRegExp(so_text, xdata[item].name)) {
                                            this.app_list.push(xdata[item]);
                                        }
                                    }
                                }
                            }
                        }

                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onShowMd(app_dir, name, version, action, args, description) {
            let md_url = "/app/" + app_dir + "/readme.md";

            this.$http
                .get(md_url)
                .then((res) => {
                    this.app_title = name + " v" + version + " - " + description;

                    marked.setOptions({
                        renderer: new marked.Renderer(),
                        gfm: true,
                        tables: true,
                        smartLists: true
                    });

                    this.html = marked(res);
                    this.visible_md = true;
                });
        },
        del(app_dir) {
            this.$http
                .post("/api/v1/w5/post/app/del", {
                    app_dir: app_dir,
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
            this.onAppList(this.select_type, this.so_text);
        },
        onSelect(value) {
            this.select_type = value;
            this.onAppList(this.select_type, this.so_text);
        },
        onCloseMd() {
            this.visible_md = false;
        },
        onFilterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        showAdd() {
            this.visible_add = true;
        },
        onCloseAdd() {
            this.visible_add = false;
        }
    }
};
</script>

<style lang="less" scoped>
@import url("../../theme/style.less");

.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    font-size: 13px;
}

.pointer {
    cursor: pointer;
}

.center {
    text-align: center;
}

.clear {
    clear: both;
}

.div1 {
    float: left;
}

.div2 {
    margin-top: 23px;
    margin-left: 70px;
    text-align: left;
}

.bright {
    .header_div {
        width: 100%;
        background: #fafafa;
        margin-bottom: 20px;
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

    .app_card {
        background: #fafafa;
        width: 100%;
        border-radius: 3px;
        border: 1px solid #efefef;

        .header {
            text-align: center;
            padding: 20px;
            height: 115px;

            .app_avatar {
                margin-top: 20px;
            }

            .app_name {
                text-align: left;
            }

            .app_desc {
                margin-top: 5px;
                font-size: 12px;
                color: #989898;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .app_version {
                padding-left: 5px;
                font-size: 12px;
                color: #b1b1b1;
            }

            .app_type {
                position: absolute;
                background: #eaeaea;
                top: 0;
                left: 0;
                margin-left: 12px;
                margin-top: 20px;
                border-top-left-radius: 3px;
                padding: 2px 10px;
            }

            .app_del {
                position: absolute;
                background: #eaeaea;
                top: 0;
                right: 0;
                margin-right: 12px;
                margin-top: 20px;
                border-top-right-radius: 3px;
                padding: 2px 10px;
            }
        }

        .look_app {
            width: 100%;
            background: #eaeaea;
            text-align: center;
            line-height: 29px;
            cursor: pointer;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }
}

.dark {
    .header_div {
        width: 100%;
        background: #202225;
        margin-bottom: 20px;
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

    .app_card {
        background: #202225;
        width: 100%;
        border-radius: 3px;

        .header {
            text-align: center;
            padding: 20px;
            height: 115px;

            .app_avatar {
                margin-top: 20px;
            }

            .app_name {
                text-align: left;
            }

            .app_desc {
                margin-top: 5px;
                font-size: 12px;
                color: #989898;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .app_version {
                padding-left: 5px;
                font-size: 12px;
                color: #cccccc;
            }

            .app_type {
                position: absolute;
                background: #3b3d42;
                top: 0;
                left: 0;
                margin-left: 12px;
                margin-top: 20px;
                border-top-left-radius: 3px;
                padding: 2px 10px;
            }

            .app_del {
                position: absolute;
                background: #3b3d42;
                top: 0;
                right: 0;
                margin-right: 12px;
                margin-top: 20px;
                border-top-right-radius: 3px;
                padding: 2px 10px;
            }
        }

        .look_app {
            width: 100%;
            background: #3b3d42;
            text-align: center;
            line-height: 29px;
            cursor: pointer;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }
}
</style>
