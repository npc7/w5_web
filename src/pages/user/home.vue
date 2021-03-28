<template>
<a-layout-content>
    <div class="header_div">
        <a-input-search placeholder="请输入账号/昵称/邮箱" style="width: 200px" @search="onSearch" class="align" />
        <a-button type="primary" icon="plus-circle" class="align btn_add" @click="showAdd">
            添加
        </a-button>
    </div>
    <a-table rowKey="id" :columns="columns" :data-source="data" :loading="loading">
        <span slot="nick_name" slot-scope="text">
            <b>{{ text }}</b>
        </span>

        <a-tag slot="account" slot-scope="text" color="#7d838c">
            {{ text }}
        </a-tag>

        <span slot="update_time" slot-scope="text">
            {{Dayjs(text).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
        </span>

        <span slot="create_time" slot-scope="text">
            {{Dayjs(text).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
        </span>

        <div slot="status" slot-scope="text,record">
            <a-switch default-checked v-if="text===0" @click="onSwitch($event,record.id)">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
            <a-switch v-else @click="onSwitch($event,record.id)">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
        </div>

        <span slot="action" slot-scope="text, record">
            <a-space size="small">
                <a-tooltip placement="left">
                    <template slot="title">
                        <span>删除</span>
                    </template>
                    <a-popconfirm title="是否要删除该用户?" ok-text="是" cancel-text="否" @confirm="del(record.id)">
                        <a-icon class="pointer" type="delete" />
                    </a-popconfirm>
                </a-tooltip>

                <span>|</span>

                <a-tooltip placement="top">
                    <template slot="title">
                        <span>编辑</span>
                    </template>
                    <a-icon class="pointer" type="form" @click="showEdit(record.id, record.account, record.nick_name, record.email)" />
                </a-tooltip>
            </a-space>
        </span>
    </a-table>

    <a-drawer title="添加新用户" :width="300" :visible="visible_add" :body-style="{ paddingBottom: '80px' }" @close="onCloseAdd">
        <a-form :form="formAdd" layout="vertical" @submit="onAdd">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="账号">
                        <a-input v-decorator="[
                  'account',
                  {
                    rules: [
                      { required: true, message: '请输入用户账号' },
                      { min: 2, message: '账号长度不能少于2位' },
                      { max: 20, message: '账号长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入用户账号" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="昵称">
                        <a-input v-decorator="[
                  'nick_name',
                  {
                    rules: [
                      { required: true, message: '请输入用户昵称' },
                      { min: 2, message: '昵称长度不能少于2位' },
                      { max: 20, message: '昵称长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入用户昵称" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="E-Mail">
                        <a-input v-decorator="[
                  'email',
                  {
                    rules: [
                      { required: true, message: '请输入用户 E-Mail' },
                      { min: 6, message: '邮箱长度不能少于6位' },
                      { max: 50, message: '邮箱长度不能超过50位' },
                    ],
                  },
                ]" placeholder="请输入用户 E-Mail" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="密码">
                        <a-input-password v-decorator="[
                  'passwd',
                  {
                    rules: [
                      { required: true, message: '请输入用户密码' },
                      { min: 8, message: '密码长度不能少于8位' },
                      { max: 16, message: '密码长度不能超过16位' },
                    ],
                  },
                ]" placeholder="请输入用户密码" type="password" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="确认密码">
                        <a-input-password v-decorator="[
                  'repasswd',
                  {
                    rules: [
                      { required: true, message: '请确认用户密码' },
                      { min: 8, message: '密码长度不能少于8位' },
                      { max: 16, message: '密码长度不能超过16位' },
                    ],
                  },
                ]" placeholder="请确认用户密码" type="password" />
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

    <a-drawer title="更新用户信息" :width="300" :visible="visible_edit" :body-style="{ paddingBottom: '80px' }" @close="onCloseEdit">
        <a-form :form="formUpdate" layout="vertical" @submit="onUpdate">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="账号">
                        <a-input v-decorator="[
                  'account',
                  {
                    rules: [{ required: true, message: '请输入用户账号' }],
                  },
                ]" placeholder="请输入用户账号" :disabled="true" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="昵称">
                        <a-input v-decorator="[
                  'nick_name',
                  {
                    rules: [
                      { required: true, message: '请输入用户昵称' },
                      { min: 2, message: '昵称长度不能少于2位' },
                      { max: 20, message: '昵称长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入用户昵称" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="E-Mail">
                        <a-input v-decorator="[
                  'email',
                  {
                    rules: [
                      { required: true, message: '请输入用户 E-Mail' },
                      { min: 6, message: '邮箱长度不能少于6位' },
                      { max: 50, message: '邮箱长度不能超过50位' },
                    ],
                  },
                ]" placeholder="请输入用户 E-Mail" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="密码">
                        <a-input-password v-decorator="[
                        'passwd',{
                        rules: [
                            { min: 8, message: '密码长度不能少于8位' },
                            { max: 16, message: '密码长度不能超过16位' },
                        ]}]" placeholder="请输入用户密码" type="password" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="确认密码">
                        <a-input-password v-decorator="[
                        'repasswd',{
                        rules: [
                            { min: 8, message: '密码长度不能少于8位' },
                            { max: 16, message: '密码长度不能超过16位' },
                        ]}]" placeholder="请确认用户密码" type="password" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <p class="center">提示：密码不填写，默认不修改密码</p>
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
    //     title: "ID",
    //     dataIndex: "id",
    //     key: "id",
    // },
    {
        title: "账号",
        dataIndex: "account",
        key: "account",
        scopedSlots: {
            customRender: "account",
        },
    },
    {
        title: "昵称",
        dataIndex: "nick_name",
        key: "nick_name",
        scopedSlots: {
            customRender: "nick_name",
        },
    },
    {
        title: "E-Mail",
        dataIndex: "email",
        key: "email",
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
        title: "状态",
        key: "status",
        dataIndex: "status",
        scopedSlots: {
            customRender: "status",
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
    name: "userHome",
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
            loadingAdd: false
        };
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad(keywords = "") {
            this.loading = true;
            this.$http
                .post("/api/v1/w5/get/user/list", {
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
        del(id) {
            this.$http
                .post("/api/v1/w5/post/user/del", {
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
        onAdd(e) {
            e.preventDefault();

            this.formAdd.validateFields((err, values) => {
                if (!err) {
                    this.loadingAdd = true;

                    if (values.passwd !== values.repasswd) {
                        this.$message.warning("两次密码不相同");
                        this.loadingAdd = false;
                        return false;
                    }

                    this.$http
                        .post("/api/v1/w5/post/user/add", {
                            account: values.account,
                            passwd: values.passwd,
                            nick_name: values.nick_name,
                            email: values.email,
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

                    var passwd = "";

                    if (typeof values.passwd == "undefined") {
                        values.passwd = ""
                    }

                    if (typeof values.repasswd == "undefined") {
                        values.repasswd = ""
                    }

                    if (values.passwd !== values.repasswd) {
                        this.$message.warning("两次密码不相同");
                        this.loadingUpdate = false;
                        return false;
                    } else {
                        passwd = values.passwd;
                    }

                    this.$http
                        .post("/api/v1/w5/post/user/update", {
                            id: this.key,
                            nick_name: values.nick_name,
                            email: values.email,
                            passwd: passwd,
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
        showEdit(key, account, nick_name, email) {
            setTimeout(() => {
                this.formUpdate.setFieldsValue({
                    account: account,
                    nick_name: nick_name,
                    email: email,
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
                    account: "",
                    nick_name: "",
                    email: "",
                });
            }, 100);

            this.visible_add = true;
        },
        onCloseAdd() {
            this.visible_add = false;
        },
        onSearch(value) {
            this.onLoad(value);
        },
        onSwitch(bool, id) {
            var status = 1;
            if (bool) {
                status = 0
            }

            this.$http
                .post("/api/v1/w5/post/user/status", {
                    id: id,
                    status: status
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success("操作成功");
                        this.onLoad();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        }
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
