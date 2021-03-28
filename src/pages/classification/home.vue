<template>
<a-layout-content>
    <div class="header_div">
        <a-select show-search :filter-option="onFilterOption" default-value="0" style="width: 120px" @change="onSelect" class="align">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">剧本分类</a-select-option>
            <a-select-option value="2">变量分类</a-select-option>
        </a-select>
        <a-input-search placeholder="请输入名称" style="width: 200px" @search="onSearch" class="align" />
        <a-button type="primary" icon="plus-circle" class="align btn_add" @click="showAdd">
            添加
        </a-button>
    </div>
    <a-table rowKey="id" :columns="columns" :data-source="data" :loading="loading">
        <span slot="name" slot-scope="text">
            <b>{{ text }}</b>
        </span>

        <a-tag slot="type" slot-scope="text" color="#7d838c">
            <b v-if="text == 1">剧本分类</b>
            <b v-else-if="text == 2">变量分类</b>
        </a-tag>

        <span slot="update_time" slot-scope="text">
            {{Dayjs(text).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
        </span>

        <span slot="create_time" slot-scope="text">
            {{Dayjs(text).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
        </span>

        <span slot="action" slot-scope="text, record">
            <a-space size="small">
                <a-tooltip placement="left">
                    <template slot="title">
                        <span>删除</span>
                    </template>
                    <a-popconfirm title="是否要删除该分类?" ok-text="是" cancel-text="否" @confirm="del(record.id, record.type)">
                        <a-icon class="pointer" type="delete" />
                    </a-popconfirm>
                </a-tooltip>

                <span>|</span>

                <a-tooltip placement="top">
                    <template slot="title">
                        <span>编辑</span>
                    </template>
                    <a-icon class="pointer" type="form" @click="showEdit(record.id, record.type, record.name)" />
                </a-tooltip>
            </a-space>
        </span>
    </a-table>

    <a-drawer title="添加新分类" :width="300" :visible="visible_add" :body-style="{ paddingBottom: '80px' }" @close="onCloseAdd">
        <a-form :form="formAdd" layout="vertical" @submit="onAdd">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="分类类型">
                        <a-select show-search :filter-option="onFilterOption" v-decorator="[
                  'type',
                  {
                    rules: [{ required: true, message: '请选择分类类型' }],
                  },
                ]" placeholder="请选择分类类型">
                            <a-select-option value="1">剧本分类</a-select-option>
                            <a-select-option value="2">变量分类</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="分类名称">
                        <a-input v-decorator="[
                  'name',
                  {
                    rules: [
                      { required: true, message: '请输入分类名称' },
                      { max: 20, message: '分类名称长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入分类名称" />
                    </a-form-item>
                </a-col>
            </a-row>

            <div :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }">
                <a-button :style="{ marginRight: '8px' }" @click="onCloseAdd">关闭</a-button>
                <a-button type="primary" html-type="submit" :loading="loadingAdd">
                    添加
                </a-button>
            </div>
        </a-form>
    </a-drawer>

    <a-drawer title="更新分类信息" :width="300" :visible="visible_edit" :body-style="{ paddingBottom: '80px' }" @close="onCloseEdit">
        <a-form :form="formUpdate" layout="vertical" @submit="onUpdate">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="分类类型">
                        <a-select show-search :filter-option="onFilterOption" v-decorator="[
                  'type',
                  {
                    rules: [{ required: true, message: '请选择分类类型' }],
                  },
                ]" placeholder="请选择分类类型">
                            <a-select-option value="1">剧本分类</a-select-option>
                            <a-select-option value="2">变量分类</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="分类名称">
                        <a-input v-decorator="[
                  'name',
                  {
                    rules: [
                      { required: true, message: '请输入分类名称' },
                      { max: 20, message: '分类名称长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入分类名称" />
                    </a-form-item>
                </a-col>
            </a-row>

            <div :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }">
                <a-button :style="{ marginRight: '8px' }" @click="onCloseEdit">关闭</a-button>
                <a-button type="primary" html-type="submit" :loading="loadingUpdate">
                    更新
                </a-button>
            </div>
        </a-form>
    </a-drawer>
</a-layout-content>
</template>

<script>
const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        scopedSlots: {
            customRender: "type",
        },
    },
    {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
        scopedSlots: {
            customRender: "name",
        },
    },
    {
        title: "更新时间",
        key: "update_time",
        dataIndex: "update_time",
        scopedSlots: {
            customRender: "update_time",
        },
    },
    {
        title: "创建时间",
        key: "create_time",
        dataIndex: "create_time",
        scopedSlots: {
            customRender: "create_time",
        },
    },
    {
        title: "操作",
        key: "action",
        scopedSlots: {
            customRender: "action",
        },
        width: 60,
    },
];

export default {
    name: "classificationHome",
    data() {
        return {
            columns,
            loading: false,
            data: [],
            formAdd: this.$form.createForm(this),
            visible_add: false,
            formUpdate: this.$form.createForm(this),
            visible_edit: false,
            key: 0,
            loadingUpdate: false,
            loadingAdd: false,
            so_text: "",
            select_type: 0,
        };
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad(keywords = "", type = 0) {
            this.loading = true;
            this.$http
                .post("/api/v1/w5/get/type/list", {
                    type: type,
                    keywords: keywords,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.data = res.data;
                        this.loading = false;
                    } else {
                        this.$message.error(res.msg);
                        this.loading = false;
                    }
                });
        },
        del(id, type) {
            this.$http
                .post("/api/v1/w5/post/type/del", {
                    id: id,
                    type: type,
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
        onAdd(e) {
            e.preventDefault();

            this.formAdd.validateFields((err, values) => {
                if (!err) {
                    this.loadingAdd = true;

                    this.$http
                        .post("/api/v1/w5/post/type/add", {
                            type: values.type,
                            name: values.name,
                        })
                        .then((res) => {
                            if (res.code == 0) {
                                this.$message.success("添加成功");
                                this.loadingAdd = false;
                                this.onCloseAdd();
                                this.onLoad();
                            } else {
                                this.$message.error(res.msg);
                                this.loadingAdd = false;
                            }
                        });
                }
            });
        },
        onUpdate(e) {
            e.preventDefault();

            this.formUpdate.validateFields((err, values) => {
                if (!err) {
                    this.loadingUpdate = true;

                    this.$http
                        .post("/api/v1/w5/post/type/update", {
                            id: this.key,
                            type: values.type,
                            name: values.name,
                        })
                        .then((res) => {
                            if (res.code == 0) {
                                this.$message.success("更新成功");
                                this.loadingUpdate = false;
                                this.onCloseEdit();
                                this.onLoad();
                            } else {
                                this.$message.error(res.msg);
                                this.loadingUpdate = false;
                            }
                        });
                }
            });
        },
        showEdit(key, type, name) {
            setTimeout(() => {
                this.formUpdate.setFieldsValue({
                    type: String(type),
                    name: name,
                });
            }, 100);

            this.key = key;

            this.visible_edit = true;
        },
        onCloseEdit() {
            this.visible_edit = false;
        },
        showAdd() {
            setTimeout(() => {
                this.formAdd.setFieldsValue({
                    name: "",
                });
            }, 100);

            this.visible_add = true;
        },
        onCloseAdd() {
            this.visible_add = false;
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
};
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
