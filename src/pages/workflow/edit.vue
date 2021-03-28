<template>
<div>
    <a-row type="flex">
        <div class="left_right" @click="onSwitchLeft">
            <a-icon v-if="switchLeft=='open'" type="double-left" />
            <a-icon v-else-if="switchLeft=='close'" type="double-right" />
        </div>
        <a-col flex="174px" class="left_div">
            <div class="leftx">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <a-tooltip placement="top">
                                <template slot="title">
                                    <span>控制器</span>
                                </template>
                                <a-icon type="deployment-unit" />
                            </a-tooltip>
                        </span>
                        <a-row class="ssc" :gutter="[0,22]">
                            <a-col :span="12">
                                <div class="tools_div center" draggable="true" @dragend="onDragendAddNode($event,baseURL+'/app/basic/start.png','开始','start')">
                                    <a-avatar class="avatar_img" :size="55" :src="baseURL+'/app/basic/start.png'" />
                                    <div class="tools_name"><span>开始</span></div>
                                </div>
                            </a-col>

                            <a-col :span="12">
                                <div class="tools_div center" draggable="true" @dragend="onDragendAddNode($event,baseURL+'/app/basic/end.png','结束','end')">
                                    <a-avatar class="avatar_img" :size="55" :src="baseURL+'/app/basic/end.png'" />
                                    <div class="tools_name"><span>结束</span></div>
                                </div>
                            </a-col>

                            <a-col :span="12">
                                <div class="tools_div center" draggable="true" @dragend="onDragendAddNode($event,baseURL+'/app/basic/input.png','用户输入','input')">
                                    <a-avatar class="avatar_img" :size="55" :src="baseURL+'/app/basic/input.png'" />
                                    <div class="tools_name"><span>用户输入</span></div>
                                </div>
                            </a-col>

                            <a-col :span="12">
                                <div class="tools_div center" draggable="true" @dragend="onDragendAddNode($event,baseURL+'/app/basic/webhook.png','WebHook','webhook')">
                                    <a-avatar class="avatar_img" :size="55" :src="baseURL+'/app/basic/webhook.png'" />
                                    <div class="tools_name"><span>WebHook</span></div>
                                </div>
                            </a-col>

                            <a-col :span="12">
                                <div class="tools_div center" draggable="true" @dragend="onDragendAddNode($event,baseURL+'/app/basic/timer.png','定时器','timer')">
                                    <a-avatar class="avatar_img" :size="55" :src="baseURL+'/app/basic/timer.png'" />
                                    <div class="tools_name"><span>定时器</span></div>
                                </div>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <span slot="tab">
                            <a-tooltip placement="top">
                                <template slot="title">
                                    <span>应用列表</span>
                                </template>
                                <a-icon type="appstore" />
                            </a-tooltip>
                        </span>
                        <!-- <a-collapse accordion default-active-key="2" :bordered="false" expand-icon-position="right">
                            <template #expandIcon="props">
                                <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
                            </template>
                            <a-collapse-panel key="2" header="应用中心"> -->
                        <a-row class="ssc" :gutter="[0,22]">
                            <a-col :span="12" v-for="(item,index) in app_list" :key="index">
                                <div class="tools_div center" draggable="true" @dragend="onDragendAddNode($event,baseURL+'/app/'+item.icon,item.name,item.app_dir)">
                                    <a-avatar class="avatar_img" :size="55" :src="baseURL+'/app/'+item.icon" />
                                    <div class="tools_name"><span>{{item.name}}</span></div>
                                </div>
                            </a-col>
                        </a-row>
                        <!-- </a-collapse-panel> -->
                        <!-- </a-collapse> -->
                    </a-tab-pane>
                    <a-tab-pane key="3">
                        <span slot="tab">
                            <a-tooltip placement="top">
                                <template slot="title">
                                    <span>局部变量</span>
                                </template>
                                <a-icon type="thunderbolt" />
                            </a-tooltip>
                        </span>
                        <a-button class="btnLcoalVar" icon="plus-circle" type="primary" @click="onOpenLoclVarAdd">
                            添加局部变量
                        </a-button>
                        <a-list class="sscx" :data-source="local_var_data" :locale="{emptyText: '暂无数据'}">
                            <a-list-item slot="renderItem" slot-scope="item">
                                {{ item.key }}
                                <div class="local-var-actipn">
                                    <a-tooltip placement="left">
                                        <template slot="title">
                                            <span>删除</span>
                                        </template>
                                        <a-popconfirm title="是否要删除该局部变量?" ok-text="是" cancel-text="否" @confirm="delLocalVar(item.key)">
                                            <a-icon class="del" type="delete" />
                                        </a-popconfirm>
                                    </a-tooltip>

                                    <a-tooltip placement="top">
                                        <template slot="title">
                                            <span>编辑</span>
                                        </template>
                                        <a-icon class="edit" type="form" @click="onOpenLoclVarEdit(item.key,item.value,item.remarks)" />
                                    </a-tooltip>
                                </div>
                            </a-list-item>
                        </a-list>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-col>
        <a-col flex="auto">
            <a-page-header :sub-title="work_remarks">
                <template slot="title">
                    {{workflow_name}}
                </template>
                <template slot="tags">
                    <a-tag color="#7d838c">
                        <div v-for="(item,index) in type_data" :key="index">
                            <span v-if="item.id==select_type">{{item.name}}</span>
                        </div>
                    </a-tag>
                </template>
                <template slot="extra">
                    <a-tooltip placement="left">
                        <template slot="title">
                            <span>修改剧本信息</span>
                        </template>
                        <a-button size="small" shape="circle" icon="edit" @click="onShowUpdaeWorkFlow"></a-button>
                    </a-tooltip>

                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>保存剧本</span>
                        </template>
                        <a-button size="small" shape="circle" type="primary" icon="cloud" :loading="saveLoading" @click="onSave()"></a-button>
                    </a-tooltip>

                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>导出剧本</span>
                        </template>
                        <a-button style="background: #1d96b1;border-color: #1d96b1;" size="small" shape="circle" type="primary" icon="cloud-download" @click="onDown()"></a-button>
                    </a-tooltip>
                </template>
            </a-page-header>
            <div class="edit">
                <a-tooltip placement="top">
                    <template slot="title">
                        <span>执行剧本</span>
                    </template>
                    <a-button :loading="execuLoading" size="large" class="btn_run" type="primary" shape="circle" icon="play-circle" @click="onRunCheck" />
                </a-tooltip>
                <div id="container"></div>
            </div>
        </a-col>
    </a-row>

    <a-drawer class="visible_log" :closable="false" :width="700" :maskClosable="false" :visible="visible_log" @close="onCloseLog">
        <div>
            <a-tooltip placement="left">
                <template slot="title">
                    <span>关闭</span>
                </template>
                <a-icon class="pointer" type="close-circle" @click="onCloseLog" />
            </a-tooltip>

            <a-tooltip placement="top" v-if="is_btn_pdf">
                <template slot="title">
                    <span>查看报告</span>
                </template>
                <a-icon style="margin-left: 7px;" class="pointer" type="file-pdf" @click="show_report" />
            </a-tooltip>

            <a-progress :percent="run_progress " size="small" />
        </div>
        <pre class="log_div">
            <p v-for="(item,index) in execute_log" :key="index"><a-tag v-if="item.status==0" color="#469823">正常</a-tag><a-tag v-if="item.status==1" color="#9e8c0a">警告</a-tag><a-tag v-if="item.status==2" color="#9c5656">错误</a-tag><a-tag v-if="item.status==3" color="#bf0c0c">危险</a-tag><span class="appname">[{{item.app_name}}]</span> - <span class="appresult">{{item.result}}</span> - <span class="time">{{item.create_time.replace("T", " ")}}</span></p>
        </pre>
        <div class="center">
            <a-spin tip="执行中..." size="large" :spinning="run_spinning"></a-spin>
        </div>
    </a-drawer>

    <a-drawer title="节点编辑" :width="500" :visible="visible_edit" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-form :form="form" layout="vertical" @submit="onUpdate">
            <a-row :gutter="16">
                <a-col :span="24" style="margin-bottom: 20px;">
                    <span style="font-weight: bold;margin-right: 10px;">UUID : </span><span class="uuidcss">{{key}}</span>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="节点名称">
                        <a-input v-decorator="[
                  'node_name',
                  {
                    rules: [
                      { required: true, message: '请输入节点名称' },
                      { max: 20, message: '节点名称长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入节点名称" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item>
                        <span slot="label">
                            动作&nbsp;
                            <a-tooltip title="使用说明">
                                <a-icon class="pointer" @click="onShowMd" type="question-circle-o" />
                            </a-tooltip>
                        </span>
                        <a-select show-search :filter-option="onFilterOption" v-decorator="[
                  'action',
                  {
                    rules: [{ required: true, message: '请选择执行动作' }],
                  },
                ]" placeholder="请选择执行动作" @change="selectAppAction">
                            <a-select-option v-for="(item, index) in app_info.action" :key="index" :value="item.func">{{ item.name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="24" v-for="(item, index) in app_info_args" :key="index">
                    <a-form-item v-if="item.type=='text'" :label="item.key">
                        <div v-if="String(item.default)!=''">
                            <a-input v-decorator="[
                            item.key,
                            {   
                                initialValue:item.default,
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" :placeholder="'请输入 '+item.key+' 参数的内容'" />
                        </div>
                        <div v-else>
                            <a-input v-decorator="[
                            item.key,
                            {
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" :placeholder="'请输入 '+item.key+' 参数的内容'" />
                        </div>
                    </a-form-item>

                    <a-form-item v-if="item.type=='password'" :label="item.key">
                        <div v-if="String(item.default)!=''">
                            <a-input v-decorator="[
                            item.key,
                            {   
                                initialValue:item.default,
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的密码' }
                                ]
                            },
                            ]" type="password" :placeholder="'请输入 '+item.key+' 参数的内容'" />
                        </div>
                        <div v-else>
                            <a-input v-decorator="[
                            item.key,
                            {
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" type="password" :placeholder="'请输入 '+item.key+' 参数的内容'" />
                        </div>
                    </a-form-item>

                    <a-form-item v-else-if="item.type=='textarea'" :label="item.key">
                        <div v-if="String(item.default)!=''">
                            <a-textarea v-decorator="[
                            item.key,
                            {   
                                initialValue:item.default,
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" :rows="4" :placeholder="'请输入 '+item.key+' 参数的内容'" />
                        </div>
                        <div v-else>
                            <a-textarea v-decorator="[
                            item.key,
                            {
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" :rows="4" :placeholder="'请输入 '+item.key+' 参数的内容'" />
                        </div>
                    </a-form-item>

                    <a-form-item v-else-if="item.type=='number'" :label="item.key">
                        <div v-if="String(item.default)!=''">
                            <a-input-number style="width:100%;" v-decorator="[
                            item.key,
                            {
                                initialValue:item.default,
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" :rows="4" :placeholder="'请输入 '+item.key+' 参数的数字内容'" />
                        </div>
                        <div v-else>
                            <a-input-number style="width:100%;" v-decorator="[
                            item.key,
                            {
                                rules: 
                                [
                                    { required: item.required, message: '请输入 '+item.key+' 参数的内容' }
                                ]
                            },
                            ]" :rows="4" :placeholder="'请输入 '+item.key+' 参数的数字内容'" />
                        </div>

                    </a-form-item>

                    <a-form-item v-else-if="item.type=='select'" :label="item.key">
                        <div v-if="String(item.default)!=''">
                            <a-select show-search :filter-option="onFilterOption" v-decorator="[
                            item.key,
                            {
                                initialValue:item.default,
                                rules: 
                                [
                                    { required: item.required, message: '请选择 '+item.key+' 参数的类型' }
                                ]
                            },
                            ]" :placeholder="'请选择 '+item.key+' 参数的类型'">
                                <a-select-option v-for="(item, index) in item.data" :key="index" :value="item">{{ item }}</a-select-option>
                            </a-select>
                        </div>
                        <div v-else>

                            <a-select show-search :filter-option="onFilterOption" v-decorator="[
                            item.key,
                            {
                                rules: 
                                [
                                    { required: item.required, message: '请选择 '+item.key+' 参数的类型' }
                                ]
                            },
                            ]" :placeholder="'请选择 '+item.key+' 参数的类型'">
                                <a-select-option v-for="(item, index) in item.data" :key="index" :value="item">{{ item }}</a-select-option>
                            </a-select>
                        </div>

                    </a-form-item>

                </a-col>
            </a-row>

            <a-drawer :title=" app_title" :width="600" :visible="visible_md" :body-style="{ paddingBottom: '80px' }" @close="onCloseMd">
                <div class="markdown-body" v-html="html"></div>
            </a-drawer>

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
                <a-button :style="{ marginRight: '8px' }" @click="onClose">关闭</a-button>
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </div>
        </a-form>
    </a-drawer>

    <a-drawer title="链路编辑" :width="300" :visible="visible_edit_edge" :body-style="{ paddingBottom: '80px' }" @close="onCloseEdge">
        <a-form :form="form_edge" layout="vertical" @submit="onUpdateEdge">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="链路说明">
                        <a-input v-decorator="[
                  'edge_name',
                  {
                    rules: [
                      { max: 30, message: '节点名称长度不能超过30位' },
                    ],
                  },
                ]" placeholder="请输入链路说明" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="判断开关">
                        <a-switch v-decorator="['switch', { valuePropName: 'checked' }]">
                            <a-icon slot="checkedChildren" type="check" />
                            <a-icon slot="unCheckedChildren" type="close" />
                        </a-switch>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="判断动作">
                        <a-select show-search :filter-option="onFilterOption" v-decorator="[
                  'action',
                ]" placeholder="请选择判断动作">
                            <a-select-option value="1">==</a-select-option>
                            <a-select-option value="2">!=</a-select-option>
                            <a-select-option value="3">正则表达式</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="判断条件">
                        <a-input v-decorator="[
                  'ifelse',
                  {
                    rules: [
                      { max: 100, message: '条件长度不能超过100位' },
                    ],
                  },
                ]" placeholder="请输入条件" />
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
                <a-button :style="{ marginRight: '8px' }" @click="onCloseEdge">关闭</a-button>
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </div>
        </a-form>
    </a-drawer>

    <a-drawer title="定时器设定" :width="500" :visible="visible_timer_edit" :body-style="{ paddingBottom: '80px' }" @close="onCloseTimer">
        <a-form :form="form_timer" layout="vertical" @submit="onUpdateTimer">
            <a-row :gutter="16">
                <a-col :span="24" style="margin-bottom: 20px;">
                    <span style="font-weight: bold;margin-right: 10px;">UUID : </span><span class="uuidcss">{{key}}</span>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="节点名称">
                        <a-input v-decorator="[
                  'node_name',
                  {
                    rules: [
                      { required: true, message: '请输入节点名称' },
                      { max: 20, message: '节点名称长度不能超过20位' },
                    ],
                  },
                ]" placeholder="请输入节点名称" disabled="" />
                    </a-form-item>
                </a-col>
                <div class="timer_css">
                    <a-col :span="24">
                        <a-radio-group v-model="time_type" @change="onChangTimeType" button-style="solid" style="margin-bottom: 20px;">
                            <a-radio-button value="date">
                                定时执行
                            </a-radio-button>
                            <a-radio-button value="interval">
                                间隔执行
                            </a-radio-button>
                            <a-radio-button value="cron">
                                执行计划
                            </a-radio-button>
                        </a-radio-group>
                    </a-col>

                    <div v-if="time_type=='date'">
                        <a-col :span="24">
                            <a-form-item label="执行时间">
                                <a-date-picker :locale="locale" style="width: 100%;" v-decorator="[
                            'time',
                            {
                                rules: [{ required: true, message: '请选择执行时间' },],
                            },
                            ]" show-time placeholder="请选择执行时间" />
                            </a-form-item>
                        </a-col>
                    </div>
                    <div v-else-if="time_type=='interval'">
                        <a-col :span="24">
                            <a-form-item label="间隔类型">
                                <a-radio-group v-decorator="[
                            'interval_type',
                            {
                                rules: [{ required: true, message: '请选择间隔类型' },],
                            },
                            ]">
                                    <a-radio value="seconds">
                                        秒钟
                                    </a-radio>
                                    <a-radio value="minutes">
                                        分钟
                                    </a-radio>
                                    <a-radio value="hours">
                                        小时
                                    </a-radio>
                                    <a-radio value="days">
                                        天
                                    </a-radio>
                                    <a-radio value="weeks">
                                        周
                                    </a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="间隔周期">
                                <a-input-number style="width: 100%;" v-decorator="[
                            'time',
                            {
                                rules: [{ required: true, message: '请输入间隔周期' },],
                            },
                            ]" :min="1" :max="99999999" placeholder="请输入间隔周期" />

                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="开始时间">
                                <a-date-picker :locale="locale" style="width: 100%;" v-decorator="['start_date']" show-time placeholder="请选择开始时间" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="结束时间">
                                <a-date-picker :locale="locale" style="width: 100%;" v-decorator="['end_date']" show-time placeholder="请选择结束时间" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="随机浮动时间 (秒)">
                                <a-input-number style="width: 100%;" v-decorator="['jitter']" :min="0" :max="99999" placeholder="请输入浮动时间" />
                            </a-form-item>
                        </a-col>
                    </div>
                    <div v-else-if="time_type=='cron'">
                        <a-col :span="24">
                            <a-form-item>
                                <span slot="label">
                                    Cron 表达式&nbsp;
                                    <a-tooltip title="使用说明">
                                        <a-icon class="pointer" @click="onShowMdCron" type="question-circle-o" />
                                    </a-tooltip>
                                </span>
                                <a-input style="width: 100%;" v-decorator="[
                            'time',
                            {
                                rules: [{ required: true, message: '请输入 Cron 表达式' },],
                            },
                            ]" placeholder="请输入 Cron 表达式" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="开始时间">
                                <a-date-picker :locale="locale" style="width: 100%;" v-decorator="['start_date']" show-time placeholder="请选择开始时间" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="结束时间">
                                <a-date-picker :locale="locale" style="width: 100%;" v-decorator="['end_date']" show-time placeholder="请选择结束时间" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="随机浮动时间 (秒)">
                                <a-input-number style="width: 100%;" v-decorator="['jitter']" :min="0" :max="99999" placeholder="请输入浮动时间" />
                            </a-form-item>
                        </a-col>
                    </div>
                </div>
            </a-row>

            <a-drawer :title="app_title" :width="600" :visible="visible_md" :body-style="{ paddingBottom: '80px' }" @close="onCloseMd">
                <div class="markdown-body" v-html="html"></div>
            </a-drawer>

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
                <a-button :style="{ marginRight: '8px' }" @click="onClose">关闭</a-button>
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </div>
        </a-form>
    </a-drawer>

    <a-modal title="添加局部变量" cancelText="关闭" okText="确定" :visible="visible_local_var_add" @ok="onSaveLocalVar" @cancel="onCloseLoclVarAdd">
        <a-row :gutter="16">
            <a-col :span="24">
                <a-form-item label="Key">
                    <a-input v-model="curr_local_key" placeholder="请输入 Key" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Value">
                    <a-input v-model="curr_local_value" placeholder="请输入 Value" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="备注">
                    <a-textarea v-model="curr_local_remarks" placeholder="请输入备注" :rows="4" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-modal>

    <a-modal title="修改局部变量" cancelText="关闭" okText="确定" :visible="visible_local_var_edit" @ok="onUpdateLocalVar" @cancel="onCloseLoclVarEdit">
        <a-row :gutter="16">
            <a-col :span="24">
                <a-form-item label="Key">
                    <a-input :disabled="true" v-model="curr_local_key" placeholder="请输入 Key" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Value">
                    <a-input v-model="curr_local_value" placeholder="请输入 Value" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="备注">
                    <a-textarea v-model="curr_local_remarks" placeholder="请输入备注" :rows="4" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-modal>

    <a-modal title="用户输入" cancelText="关闭" okText="确定" :visible="visible_input_app_edit" @ok="onSaveInputEdit" @cancel="onCloseInputEdit">
        <a-row :gutter="16">
            <a-col :span="24" style="margin-bottom: 20px;">
                <span style="font-weight: bold;margin-right: 10px;">UUID : </span><span>{{input_app}}</span>
            </a-col>
            <a-col :span="24">
                <a-form-item>
                    <a-textarea v-model="input_text" placeholder="请输入内容" :rows="4" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-modal>

    <a-modal title="修改剧本信息" cancelText="关闭" okText="确定" :visible="visible_workflow_edit" @ok="onUpdatelWorkFlow" @cancel="onCloseLoclWorkFlow">
        <a-row :gutter="16">
            <a-col :span="24">
                <a-form-item label="剧本分类">
                    <a-select show-search :filter-option="onFilterOption" v-model="de_select_type" style="width: 100%" @change="onSelect" class="align">
                        <a-select-option v-for="(item, index) in type_data" :key="index" :value="String(item.id)">{{ item.name }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="剧本名称">
                    <a-input class="work_title" placeholder="请输入剧本名称" v-model="de_workflow_name" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="备注">
                    <a-textarea class="work_remarks" placeholder="请输入剧本备注" :rows="4" v-model="de_work_remarks" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-modal>

    <a-modal title="PDF 报告" cancelText="关闭" okText="下载" :maskClosable="false" :width="800" :visible="visible_report" @ok="onSaveReport" @cancel="onCloseReport">
        <div id="report">
            <a-row :gutter="16" class="report" style="margin: auto;">
                <a-col :span="24">
                    <div class="header">
                        <img class="logo" :src="BaseURL+'/public/logo.png'" />
                        <p class="logo_title">W5 SOAR v{{W5Version}} 执行报告 </p>
                    </div>
                </a-col>
                <a-col :span="24">
                    <div class="div1">
                        <a-descriptions :column="1" bordered size="small">
                            <div slot="title">
                                <span class="title">
                                    <span class="jing">#</span>报告介绍
                                </span>
                            </div>
                            <a-descriptions-item label="编号">
                                <b>{{report_no}}</b>
                            </a-descriptions-item>
                            <a-descriptions-item label="剧本">
                                <b>{{workflow_name}}</b>
                            </a-descriptions-item>
                            <a-descriptions-item label="执行时间">
                                {{Dayjs(report_create_time).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
                            </a-descriptions-item>
                            <a-descriptions-item label="备注">
                                {{work_remarks}}
                            </a-descriptions-item>
                        </a-descriptions>
                    </div>
                </a-col>

                <a-col :span="24" v-for="(item,index) in report_log_data" :key="index" class="div2">
                    <a-descriptions :column="1" bordered size="small">
                        <div slot="title">
                            <span class="title">
                                <span class="jing">{{index+1}}、</span>{{item.app_name}}
                            </span>
                            <span v-if="item.app_name!='开始' && item.app_name!='结束' && item.app_name!='用户输入' && item.app_name!='WebHook' && item.app_name!='定时器'" class="desc">
                                {{item.args.description}}
                            </span>
                        </div>
                        <a-descriptions-item label="UUID">
                            <b>{{item.app_uuid}}</b>
                        </a-descriptions-item>
                        <a-descriptions-item label="动作" v-if="item.app_name!='开始' && item.app_name!='结束' && item.app_name!='用户输入' && item.app_name!='WebHook' && item.app_name!='定时器'">
                            <b>{{item.args.action_name}}</b>
                        </a-descriptions-item>
                        <a-descriptions-item label="参数" v-if="item.app_name!='开始' && item.app_name!='结束' && item.app_name!='用户输入' && item.app_name!='WebHook' && item.app_name!='定时器'">
                            <div v-for="(i,key,index) in item.args" :key="index" class="args_list">
                                <div v-if="key!='action' && key!='action_name' && key!='description' && key!='node_name'">
                                    <div class="args_title"><span class="jing">|</span> {{key}}</div>
                                    <div>{{i}}</div>
                                </div>
                            </div>
                        </a-descriptions-item>
                        <a-descriptions-item label="状态">
                            <a-tag v-if="item.status==0" color="#469823">正常</a-tag>
                            <a-tag v-if="item.status==1" color="#9e8c0a">警告</a-tag>
                            <a-tag v-if="item.status==2" color="#9c5656">错误</a-tag>
                            <a-tag v-if="item.status==3" color="#bf0c0c">危险</a-tag>
                        </a-descriptions-item>
                        <a-descriptions-item label="结果" v-if="item.app_name!=='用户输入' && item.app_name!=='WebHook'">
                            <div v-html="item.html"></div>
                        </a-descriptions-item>
                        <a-descriptions-item label="输入" v-else>
                            <div v-html="item.html"></div>
                        </a-descriptions-item>
                        <a-descriptions-item label="执行时间">
                            {{Dayjs(item.create_time).subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</div>
</template>

<script>
import G6 from "@antv/g6";
import insertCss from 'insert-css';
import {
    uuid
} from 'vue-uuid';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

export default {
    name: "workflowEdit",
    data() {
        return {
            locale,
            app_title: "",
            visible_md: false,
            html: "",
            uuid: "",
            baseURL: this.BaseURL,
            app_list: [],
            graph: "",
            childNode: "",
            data: {
                nodes: [],
                edges: []
            },
            app_data: {},
            controller_data: {},
            node_color: "",
            edge_color: "",
            plug_minimap: null,
            plug_toolbar: null,
            plug_contextMenu: null,
            visible_edit: false,
            visible_log: false,
            visible_edit_edge: false,
            visible_timer_edit: false,
            form: this.$form.createForm(this),
            form_edge: this.$form.createForm(this),
            form_timer: this.$form.createForm(this),
            key: null,
            app_info: {},
            app_info_args: [],
            workflow_name: "",
            work_remarks: "",
            is_mounted: 0,
            start_app: "",
            end_app: "",
            input_app: "",
            webhook_app: "",
            timer_app: "",
            websock: null,
            ping_timetimer: null,
            execute_log: [],
            select_type: "",
            type_data: [],
            switchLeft: "open",
            visible_local_var_add: false,
            visible_local_var_edit: false,
            visible_input_app_edit: false,
            visible_workflow_edit: false,
            curr_local_key: "",
            curr_local_value: "",
            curr_local_remarks: "",
            local_var_data: [],
            input_text: "",
            saveLoading: false,
            execuLoading: false,
            de_select_type: "",
            de_workflow_name: "",
            de_work_remarks: "",
            run_progress: 0,
            pro_count: 0,
            run_spinning: false,
            visible_report: false,
            report_create_time: "",
            report_no: "",
            report_log_data: [],
            is_btn_pdf: false,
            time_type: "date",
            interval_type: "seconds",
            workflow_status: "0"
        };
    },
    created() {
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
    },
    mounted() {
        this.is_mounted++;
        this.uuid = this.$route.params.uuid;
        this.$store.commit("closeCollapsed");
        this.onLoad();
    },
    methods: {
        onLoad() {
            this.onColor();
            this.onAppList();
            this.onSelectType();
            this.onData();
            this.initWebSocket();
        },
        onReportLog(only_id) {
            this.$http
                .post("/api/v1/w5/get/report/log", {
                    only_id: only_id,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.report_log_data = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        show_report() {
            this.onReportLog(this.report_no);
            this.visible_report = true;
        },
        onSaveReport() {
            var title = this.workflow_name + "-" + this.report_no
            html2Canvas(document.querySelector('#report'), {
                allowTaint: true,
                useCORS: true
            }).then(function (canvas) {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89
                let leftHeight = contentHeight
                let position = 0
                let imgWidth = 595.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                let PDF = new JsPDF('', 'pt', 'a4')
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 841.89
                        if (leftHeight > 0) {
                            PDF.addPage()
                        }
                    }
                }
                PDF.save(title + '.pdf')
            })
        },
        onCloseReport() {
            this.visible_report = false;
        },
        onDown() {
            var file_name;

            if (this.work_remarks.trim() == "") {
                file_name = this.workflow_name;
            } else {
                file_name = this.workflow_name + "-" + this.work_remarks;
            }

            let content = {
                name: this.workflow_name,
                remarks: this.work_remarks,
                start_app: this.start_app,
                end_app: this.end_app,
                input_app: this.input_app,
                webhook_app: this.webhook_app,
                timer_app: this.timer_app,
                flow_json: this.data,
                flow_data: this.app_data,
                local_var_data: this.local_var_data,
                controller_data: this.controller_data,
            }

            let ele = document.createElement('a');
            ele.download = file_name + ".json";
            ele.style.display = 'none';
            let blob = new Blob([JSON.stringify(content)], {
                type: 'application/json'
            })
            ele.href = URL.createObjectURL(blob);
            document.body.appendChild(ele);
            ele.click();
            document.body.removeChild(ele);
        },
        onSwitchLeft() {
            if (this.switchLeft == "open") {
                document.querySelector(".left_div").style.display = "none";
                document.querySelector(".left_right").style.marginLeft = "0px";
                this.switchLeft = "close";
            } else if (this.switchLeft == "close") {
                document.querySelector(".left_div").style.display = "block";
                document.querySelector(".left_right").style.marginLeft = "174px";
                this.switchLeft = "open";
            }
        },
        onShowMd() {
            let app_info = this.app_data[this.key];

            let md_url = "/app/" + app_info["app_dir"] + "/readme.md";

            this.$http
                .get(md_url)
                .then((res) => {
                    this.app_title = app_info["name"] + " v" + app_info["version"] + " - " + app_info["description"];

                    marked.setOptions({
                        gfm: true,
                        tables: true,
                        breaks: true,
                        smartLists: true
                    });

                    this.html = marked(res);
                    this.visible_md = true;
                });
        },
        onShowMdCron() {
            this.app_title = "Cron 表达式说明"

            marked.setOptions({
                gfm: true,
                tables: true,
                breaks: true,
                smartLists: true
            });

            let res = `
> W5 S0AR Cron 表达式重新设计，和 Linux 系统的 Crontab 规则不一致

## Cron 表达式

> 长度为 5 位

- (第1位) 分 (范围0-59) 
- (第2位) 时 (范围0-23) 
- (第3位) 日 (范围1-31) 
- (第4位) 月 (范围1-12)
- (第5位) 星期几 (范围0-6)

## 列如

- **每分钟执行：** \`\* \* \* \* \*\` or \`1 \* \* \* \*\`
- **每天早上10点执行：** \`00 10 \* \* \*\`
- **每月1号早上10点执行：** \`00 10 1 \* \*\`
- **每年5月早上10点执行：** \`00 10 \* 5 \*\`
- **每周星期六下午13点30分执行：** \`30 13 * * 5\`
- **每周工作日晚上23点59分执行：** \`59 23 * * 0-5\`
- **每天10点开始1小时执行一次：** \`* 10/1 * * 0-5\`
            `

            this.html = marked(res);
            this.visible_md = true;
        },
        onCloseMd() {
            this.visible_md = false;
        },
        onSelect(value) {
            this.select_type = value;
            this.onSave();
        },
        onSelectType() {
            this.$http
                .post("/api/v1/w5/get/type/list", {
                    type: 1,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.type_data = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onSave() {
            this.saveLoading = true;
            this.data = this.graph.save();

            // 更新剧本信息
            this.$http
                .post("/api/v1/w5/post/workflow/update", {
                    uuid: this.uuid,
                    name: this.workflow_name,
                    remarks: this.work_remarks,
                    start_app: this.start_app,
                    end_app: this.end_app,
                    input_app: this.input_app,
                    webhook_app: this.webhook_app,
                    timer_app: this.timer_app,
                    flow_json: JSON.stringify(this.data),
                    flow_data: JSON.stringify(this.app_data),
                    local_var_data: JSON.stringify(this.local_var_data),
                    controller_data: JSON.stringify(this.controller_data),
                    type_id: this.select_type
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.saveLoading = false;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onRunCheck() {
            if (this.workflow_status == "1") {
                this.$message.warning("该剧本已经禁止执行");
                return false;
            }

            this.execuLoading = true;
            this.data = this.graph.save();

            let uuid_list = new Set()

            for (let i in this.data.edges) {
                uuid_list.add(this.data.edges[i].source)
                uuid_list.add(this.data.edges[i].target)
            }

            for (let i of uuid_list) {
                if (typeof this.app_data[i] != "undefined") {
                    if (this.app_data[i].hasOwnProperty("data") == false) {
                        this.$message.warning("请选择 [ " + this.app_data[i].name + " ] APP 动作");
                        this.execuLoading = false;
                        return false;
                    }
                }
            }

            if (this.input_app != "") {
                this.visible_input_app_edit = true;
                return false;
            }

            this.onRun();
        },
        onRun() {
            this.run_spinning = true;
            this.run_progress = 0;
            this.pro_count = parseInt(100 / this.data["nodes"].length);
            this.is_btn_pdf = false;
            this.onShowLog();

            // 更新剧本信息
            this.$http
                .post("/api/v1/w5/post/workflow/update", {
                    uuid: this.uuid,
                    name: this.workflow_name,
                    remarks: this.work_remarks,
                    start_app: this.start_app,
                    end_app: this.end_app,
                    input_app: this.input_app,
                    webhook_app: this.webhook_app,
                    timer_app: this.timer_app,
                    flow_json: JSON.stringify(this.data),
                    flow_data: JSON.stringify(this.app_data),
                    local_var_data: JSON.stringify(this.local_var_data),
                    controller_data: JSON.stringify(this.controller_data),
                    type_id: this.select_type
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.input_text = "";

                        let msg = JSON.stringify({
                            "method": "run",
                            "data": {
                                "uuid": this.uuid
                            }
                        })

                        this.sendMSG(msg)
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onData() {
            // 加载剧本信息
            this.$http
                .post("/api/v1/w5/post/workflow/detail", {
                    uuid: this.uuid
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.select_type = String(res.data.type_id);
                        this.workflow_name = res.data.name;
                        this.work_remarks = res.data.remarks;
                        this.workflow_status = String(res.data.status);

                        if (res.data.flow_json.trim() === "") {
                            this.data = {
                                nodes: [],
                                edges: []
                            }
                        } else {
                            this.data = JSON.parse(res.data.flow_json);
                        }

                        if (res.data.flow_data === "none" || res.data.flow_data.trim() === "" || res.data.flow_data.trim() === "{}") {
                            this.app_data = {}
                        } else {
                            this.app_data = JSON.parse(res.data.flow_data);
                        }

                        this.start_app = res.data.start_app;
                        this.end_app = res.data.end_app;
                        this.input_app = res.data.input_app;
                        this.webhook_app = res.data.webhook_app;
                        this.timer_app = res.data.timer_app;

                        if (res.data.local_var_data === "none" || res.data.local_var_data.trim() === "" || res.data.local_var_data.trim() === "[]") {
                            this.local_var_data = []
                        } else {
                            this.local_var_data = JSON.parse(res.data.local_var_data);
                        }

                        if (res.data.controller_data === "none" || res.data.controller_data.trim() === "" || res.data.controller_data.trim() === "{}") {
                            this.controller_data = {}
                        } else {
                            this.controller_data = JSON.parse(res.data.controller_data);
                        }

                        this.onFlowPlug();
                        this.onFlowChart();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onAppList() {
            // 加载 APP 列表
            this.$http
                .get("/api/v1/w5/get/app/list")
                .then((res) => {
                    if (res.code == 0) {
                        this.app_list = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },
        onThemeCss() {
            insertCss(`
                .g6-minimap-container {
                    border: 1px solid #606067;
                }

                .g6-minimap-viewport {
                    border: 2px solid #000;
                }

                .g6-minimap {
                    position: fixed;
                    right: 10px;
                    bottom: 10px;
                }

                .g6-component-toolbar li {
                    list-style-type: none !important;
                }
                
                .g6-component-contextmenu {
                    position: absolute;
                    list-style-type: none;
                    padding: 10px 8px;
                    left: -150px;
                    background-color: rgba(255, 255, 255, 0.9);
                    border: 1px solid #e2e2e2;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #3c3c3c;
                }

                .g6-component-contextmenu ul {
                    padding-left: 0px;
                    line-height: 30px;
                    margin: 0px;
                }

                .g6-component-contextmenu li {
                    cursor: pointer;
                    list-style-type:none;
                    list-style: none;
                    margin-left: 0px;
                }

                .g6-component-contextmenu li:hover {
                    color: #bd2c2d;
                }

                .g6-component-toolbar {
                    position: absolute;
                    list-style-type: none;
                    left: 20px;
                    top: 50px;
                    bottom:initial;
                    background-color: rgb(255 255 255 / 80%);
                    border: 1px solid #ccc;
                    border-radius: 25px;
                }

                .g6-component-toolbar li {
                    float: none;
                    text-align: center;
                    width: 24px;
                    height: 35px;
                }
            `);
        },
        onColor() {
            var theme = this.$store.getters.getTheme;

            if (theme == "bright") {
                this.node_color = "#000000";
                this.edge_color = "#000000";
            } else if (theme == "dark") {
                this.node_color = "#FFFFFF";
                this.edge_color = "#ccc";
                // document.querySelector(".ant-layout").style.background = "#fff";
            }
        },
        onFlowPlug() {
            this.onThemeCss();

            // 小地图
            this.plug_minimap = new G6.Minimap({
                size: [150, 100],
            });

            // 工具
            this.plug_toolbar = new G6.ToolBar();

            // 右键菜单
            this.plug_contextMenu = new G6.Menu({
                getContent(graph) {
                    return `<ul>
                <li>UUID</li>
                <li>编辑</li>
                <li>删除</li>
                </ul>`;
                },
                handleMenuClick: (target, item) => {
                    let action = target.innerHTML;

                    let type = item._cfg.type;
                    let name = item._cfg.model.label;
                    let id = item._cfg.id;

                    if (action == "编辑") {
                        if (id == this.start_app) {
                            this.$message.warning("[ 开始 ] 节点不可使用编辑功能");
                            return false;
                        } else if (id == this.end_app) {
                            this.$message.warning("[ 结束 ] 节点不可使用编辑功能");
                            return false;
                        } else if (id == this.input_app) {
                            this.$message.warning("[ 用户输入 ] 节点不可使用编辑功能");
                            return false;
                        } else if (id == this.webhook_app) {
                            this.$message.warning("[ WebHook ] 节点不可使用编辑功能");
                            return false;
                        }

                        this.onShow(id, name, type);
                    } else if (action == "删除") {
                        if (id == this.start_app) {
                            this.start_app = "";
                        } else if (id == this.end_app) {
                            this.end_app = "";
                        } else if (id == this.input_app) {
                            this.input_app = "";
                        } else if (id == this.webhook_app) {
                            this.webhook_app = "";
                        } else if (id == this.timer_app) {
                            this.timer_app = "";
                        }

                        this.graph.removeItem(item);
                    } else if (action == "UUID") {
                        let that = this;
                        that.$copyText(id).then(function (e) {
                            if (type === "edge") {
                                that.$message.info("复制链路 UUID 成功");
                            } else if (type === "node") {
                                that.$message.info("复制 APP [ " + name + " ] UUID 成功");
                            }
                        }, function (e) {
                            if (type === "edge") {
                                that.$message.warning("复制链路 UUID 失败");
                            } else if (type === "node") {
                                that.$message.warning("复制 APP [ " + name + " ] UUID 失败");
                            }
                        })
                    }
                },
                // 需要加上父级容器的 padding-left 16 与自身偏移量 10
                offsetX: 0,
                // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
                offsetY: 0,
                // 在哪些类型的元素上响应
                itemTypes: ["node", "edge"],
            });
        },
        onDragendAddNode(event, icon, name, app_dir) {
            // 坐标转换
            let point = this.graph.getPointByClient(event.screenX, event.screenY)

            let node_id = uuid.v1();

            if (name == "开始") {
                if (this.start_app != "") {
                    this.$message.warning("只能存在一个 [ 开始 ] 节点");
                    return false;
                }
                this.start_app = node_id;
            } else if (name == "结束") {
                if (this.end_app != "") {
                    this.$message.warning("只能存在一个 [ 结束 ] 节点");
                    return false;
                }
                this.end_app = node_id;
            } else if (name == "用户输入") {
                if (this.input_app != "") {
                    this.$message.warning("只能存在一个 [ 用户输入 ] 节点");
                    return false;
                }
                this.input_app = node_id;
            } else if (name == "WebHook") {
                if (this.webhook_app != "") {
                    this.$message.warning("只能存在一个 [ WebHook ] 节点");
                    return false;
                }
                this.webhook_app = node_id;
            } else if (name == "定时器") {
                if (this.timer_app != "") {
                    this.$message.warning("只能存在一个 [ 定时器 ] 节点");
                    return false;
                }
                this.timer_app = node_id;
            }

            let new_node = {
                id: node_id,
                label: name,
                img: icon,
                x: point.x,
                y: point.y
            };

            this.graph.addItem('node', new_node);

            this.data.nodes = this.graph.save().nodes;

            this.app_data[node_id] = this.app_list[app_dir]

            this.onTheme();
            this.onSave();
        },
        onFlowChart() {
            G6.registerBehavior('click-add-edge', {
                getEvents() {
                    return {
                        'node:click': 'onClick',
                        mousemove: 'onMousemove',
                        'edge:click': 'onEdgeClick'
                    };
                },
                onClick(ev) {
                    const self = this;
                    const node = ev.item;
                    const graph = self.graph;
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    const model = node.getModel();

                    if (self.addingEdge && self.edge) {
                        graph.updateItem(self.edge, {
                            target: model.id,
                            type: "polyline"
                        });

                        self.edge = null;
                        self.addingEdge = false;

                    } else {
                        let edge_id = uuid.v1();

                        self.edge = graph.addItem('edge', {
                            id: edge_id,
                            source: model.id,
                            target: model.id,
                            label: ""
                        });
                        self.addingEdge = true;
                    }
                },
                onMousemove(ev) {
                    const self = this;
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };

                    if (self.addingEdge && self.edge) {
                        self.graph.updateItem(self.edge, {
                            target: point,
                        });
                    }
                },
                onEdgeClick(ev) {
                    const self = this;
                    const currentEdge = ev.item;
                    if (self.addingEdge && self.edge === currentEdge) {
                        self.graph.removeItem(self.edge);
                        self.edge = null;
                        self.addingEdge = false;
                    }
                },
            });

            const width = document.getElementById("container").scrollWidth;
            const height = document.getElementById("container").scrollHeight;

            this.graph = new G6.Graph({
                container: "container",
                width: width,
                height: height,
                fitCenter: true,
                defaultNode: {
                    type: "image",
                    size: 60,
                    clipCfg: {
                        show: true,
                        type: 'circle',
                        r: 27
                    },
                    labelCfg: {
                        style: {
                            fill: this.node_color,
                        },
                    },
                    style: {
                        shadowColor: "#000000",
                        shadowBlur: 1
                    },
                    anchorPoints: [
                        [0, 0.25],
                        [0, 0.5],
                        [0, 0.75],
                        [1, 0.25],
                        [1, 0.5],
                        [1, 0.75],
                        [0.25, 0],
                        [0.5, 0],
                        [0.75, 0],
                        [0.25, 1],
                        [0.5, 1],
                        [0.75, 1]
                    ],
                },
                defaultEdge: {
                    type: "line",
                    labelCfg: {
                        autoRotate: true,
                        refY: 10,
                        refX: 0,
                        style: {
                            fill: this.node_color
                        }
                    },
                    style: {
                        endArrow: {
                            path: G6.Arrow.vee(6, 6, 4),
                            d: 7
                        },
                        stroke: this.edge_color,
                        lineAppendWidth: 40
                    },
                },
                modes: {
                    default: [{
                            type: 'drag-canvas',
                        }, {
                            type: 'drag-node',
                        },
                        {
                            type: 'zoom-canvas',
                            sensitivity: 0.5,
                        },
                        {
                            type: 'click-add-edge',
                        }
                    ]
                },
                plugins: [this.plug_minimap, this.plug_toolbar, this.plug_contextMenu],
                enabledStack: true,
            });

            this.graph.read(this.data);

            this.is_mounted++;

            this.onTheme();
            this.onFlowChartEvent();
        },
        onFlowChartEvent() {
            this.graph.on("dragend", (evt) => {
                this.onSave();
            });
        },
        onTheme() {
            this.data = this.graph.save();

            for (let index = 0; index < this.data.nodes.length; index++) {
                let node_id = this.data.nodes[index].id;
                let item = this.graph.findById(node_id);

                if (typeof item != "undefined") {
                    this.graph.updateItem(item, {
                        labelCfg: {
                            style: {
                                fill: this.node_color,
                            }
                        },
                    });
                }
            }

            for (let index = 0; index < this.data.edges.length; index++) {
                let edge_id = this.data.edges[index].id;
                let item = this.graph.findById(edge_id);

                if (edge_id.indexOf("edge") != -1) {
                    this.graph.removeItem(item)
                } else {
                    if (typeof item != "undefined") {
                        this.graph.updateItem(item, {
                            style: {
                                stroke: this.edge_color
                            },
                            labelCfg: {
                                style: {
                                    fill: this.node_color
                                }
                            }
                        });
                    }
                }
            }
        },
        onShow(key, name, type) {
            this.key = key;

            if (type === "node") {
                if (this.key == this.timer_app) {
                    var edit_data = this.controller_data[key];

                    if (typeof edit_data != "undefined") {
                        edit_data["node_name"] = name;
                        this.time_type = edit_data['type']

                        delete edit_data["type"];

                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.form_timer.setFieldsValue(edit_data);
                            }, 100)
                        })
                    } else {
                        if (this.time_type == "interval") {
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.form_timer.setFieldsValue({
                                        "node_name": name,
                                        "interval_type": "seconds",
                                        "jitter": 0
                                    });
                                }, 100)
                            })

                        } else if (this.time_type == "cron") {
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.form_timer.setFieldsValue({
                                        "node_name": name,
                                        "jitter": 0
                                    });
                                }, 100)
                            })

                        } else {
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.form_timer.setFieldsValue({
                                        "node_name": name,
                                    });
                                }, 100)
                            })
                        }
                    }

                    this.visible_timer_edit = true;
                } else {
                    this.app_info = this.app_data[key];
                    var edit_data = this.app_data[key]["data"];

                    if (typeof edit_data != "undefined") {
                        edit_data["node_name"] = name;
                        this.selectAppAction(edit_data.action)
                        setTimeout(() => {
                            this.form.setFieldsValue(edit_data);
                        }, 100);
                    } else {
                        this.app_info_args = [];

                        setTimeout(() => {
                            this.form.setFieldsValue({
                                "node_name": name,
                                "action": ""
                            });
                        }, 100);
                    }
                    this.visible_edit = true;
                }
            } else if (type === "edge") {
                if (typeof this.app_data[key] != "undefined") {
                    let edge_data_info = this.app_data[key];
                    setTimeout(() => {
                        this.form_edge.setFieldsValue({
                            "edge_name": name,
                            "switch": edge_data_info.switch,
                            "action": String(edge_data_info.action),
                            "ifelse": edge_data_info.ifelse,
                        });
                    }, 100);
                } else {
                    setTimeout(() => {
                        this.form_edge.setFieldsValue({
                            "edge_name": name,
                            "switch": false,
                            "action": "1",
                            "ifelse": ""
                        });
                    }, 100);
                }

                this.visible_edit_edge = true;
            }
        },
        onClose() {
            this.visible_edit = false;
        },
        onCloseEdge() {
            this.visible_edit_edge = false;
        },
        onShowLog() {
            this.visible_log = true;
        },
        onCloseLog() {
            this.execute_log = [];
            this.execuLoading = false;
            this.visible_log = false;
        },
        onCloseTimer() {
            this.visible_timer_edit = false;
        },
        selectAppAction(action) {
            this.app_info_args = this.app_info["args"][action];
        },
        onUpdate(e) {
            e.preventDefault();

            this.form.validateFields((err, values) => {
                if (!err) {
                    for (var item in values) {
                        if (typeof values[item] == "undefined") {
                            values[item] = ""
                        }
                    }

                    for (var a in this.app_info.action) {
                        if (this.app_info.action[a].func === values.action) {
                            values["action_name"] = this.app_info.action[a].name
                        }
                    }

                    values["description"] = this.app_data[this.key]["description"]

                    this.app_data[this.key]["data"] = values;

                    this.graph.updateItem(this.graph.findById(this.key), {
                        "label": values.node_name,
                    });

                    this.onSave();
                    this.onClose();
                }
            });
        },
        onUpdateEdge(e) {
            e.preventDefault();

            this.form_edge.validateFields((err, values) => {
                if (!err) {
                    this.app_data[this.key] = {
                        "action": values.action,
                        "ifelse": values.ifelse,
                        "switch": values.switch
                    }

                    this.graph.updateItem(this.graph.findById(this.key), {
                        "label": values.edge_name
                    });

                    this.onSave();
                    this.onCloseEdge();
                }
            });
        },
        onUpdateTimer(e) {
            e.preventDefault();

            this.form_timer.validateFields((err, values) => {
                if (!err) {
                    if (this.time_type == "date") {
                        values.time = this.Dayjs(values.time).format('YYYY-MM-DD HH:mm:ss')
                    } else if (this.time_type == "interval") {
                        if (typeof values.start_date != "undefined" && values.start_date != null) {
                            values.start_date = this.Dayjs(values.start_date).format('YYYY-MM-DD HH:mm:ss')
                        }

                        if (typeof values.end_date != "undefined" && values.end_date != null) {
                            values.end_date = this.Dayjs(values.end_date).format('YYYY-MM-DD HH:mm:ss')
                        }

                    } else if (this.time_type == "cron") {
                        if (typeof values.start_date != "undefined" && values.start_date != null) {
                            values.start_date = this.Dayjs(values.start_date).format('YYYY-MM-DD HH:mm:ss')
                        }
                        if (typeof values.end_date != "undefined" && values.end_date != null) {
                            values.end_date = this.Dayjs(values.end_date).format('YYYY-MM-DD HH:mm:ss')
                        }

                        let val_arr = values.time.trim().split(" ")

                        if (val_arr.length != 5) {
                            this.$message.error("Cron 表达式不正确");
                            return false;
                        }
                    }

                    this.controller_data[this.key] = values;
                    this.controller_data[this.key]["type"] = this.time_type;

                    this.graph.updateItem(this.graph.findById(this.key), {
                        "label": values.node_name,
                    });

                    this.onSave();
                    this.onCloseTimer();
                }
            });
        },
        initWebSocket() {
            //初始化weosocket
            var wsuri = this.BaseURL.replace("http", "ws").replace("https", "wss") + "/echo";
            // var wsuri = "ws://127.0.0.1:8081/logs";

            this.websock = new WebSocket(wsuri);

            // 连接成功
            this.websock.onopen = this.websocketOpen;

            // 连接异常
            this.websock.onerror = this.websocketError;

            // 接收消息
            this.websock.onmessage = this.websocketMSG;

            // 断开连接
            this.websock.onclose = this.websocketClose;
        },
        websocketPing() {
            this.ping_timetimer = setInterval(() => {

                let msg = JSON.stringify({
                    "method": "ping"
                })

                this.sendMSG(msg);
            }, 30000);
        },
        websocketOpen() {
            this.websocketPing();
            //连接建立之后执行send方法发送数据

            let msg = JSON.stringify({
                "method": "ping"
            })

            this.sendMSG(msg);
        },
        websocketError() {
            //连接建立失败重连
            this.initWebSocket();
        },
        websocketMSG(e) {
            var result = JSON.parse(e.data);

            if (result.method == "execute_log") {
                var data = result.data;
                if (data.app_name == "结束" || data.app_name == "") {
                    this.run_spinning = false;
                    this.run_progress = 100;
                    this.report_no = data.only_id
                    this.report_create_time = data.create_time
                    this.is_btn_pdf = true;
                } else {
                    this.run_progress += this.pro_count;
                }
                this.execute_log.push(data);
            } else {
                this.$message.destroy();
                this.$message.error("长连接未知错误");
            }
        },
        websocketClose(e) {
            //关闭
            console.log("已经关闭了长连接");
        },
        sendMSG(data) {
            //数据发送
            this.websock.send(data);
        },
        onFilterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        delLocalVar(key) {
            for (let index in this.local_var_data) {
                if (this.local_var_data[index].key === key) {
                    this.local_var_data.splice(index, 1);
                }
            }

            this.onSave();
        },
        onOpenLoclVarAdd() {
            this.curr_local_value = "";
            this.curr_local_key = "";
            this.curr_local_remarks = "";
            this.visible_local_var_add = true;
        },
        onOpenLoclVarEdit(key, value, remarks) {
            this.curr_local_value = value;
            this.curr_local_key = key;
            this.curr_local_remarks = remarks;
            this.visible_local_var_edit = true;
        },
        onCloseLoclVarAdd() {
            this.visible_local_var_add = false;
        },
        onCloseLoclVarEdit() {
            this.visible_local_var_edit = false;
        },
        onCloseLoclWorkFlow() {
            this.visible_workflow_edit = false;
        },
        onSaveInputEdit() {
            if (this.input_text.trim() == "") {
                this.$warning({
                    title: '错误',
                    content: '内容不能为空 ！',
                });
                return false;
            }

            this.controller_data[this.input_app] = {
                "text": this.input_text
            };

            this.visible_input_app_edit = false;
            this.onRun();
        },
        onCloseInputEdit() {
            this.execuLoading = false;
            this.visible_input_app_edit = false;
        },
        onSaveLocalVar() {
            for (let index in this.local_var_data) {
                if (this.local_var_data[index].key == this.curr_local_key) {
                    this.$error({
                        title: '错误',
                        content: 'KEY 已经存在 ！',
                    });
                    return false;
                }
            }

            if (this.curr_local_key.trim() == "") {
                this.$warning({
                    title: '错误',
                    content: 'KEY 不能为空 ！',
                });
                return false;
            }

            if (this.curr_local_value.trim() == "") {
                this.$warning({
                    title: '错误',
                    content: 'Value 不能为空 ！',
                });
                return false;
            }

            this.local_var_data.push({
                "key": this.curr_local_key,
                "value": this.curr_local_value,
                "remarks": this.curr_local_remarks
            })

            this.onSave();
            this.onCloseLoclVarAdd();
        },
        onUpdateLocalVar() {
            if (this.curr_local_value.trim() == "") {
                this.$warning({
                    title: '错误',
                    content: 'Value 不能为空 ！',
                });
                return false;
            }

            for (let index in this.local_var_data) {
                if (this.local_var_data[index].key == this.curr_local_key) {
                    this.local_var_data[index]["value"] = this.curr_local_value;
                    this.local_var_data[index]["remarks"] = this.curr_local_remarks;
                }
            }

            this.onSave();
            this.onCloseLoclVarEdit();
        },
        onUpdatelWorkFlow() {
            if (this.de_workflow_name.trim() == "") {
                this.$warning({
                    title: '错误',
                    content: '剧本名称不能为空 ！',
                });
                return false;
            }

            this.select_type = this.de_select_type;
            this.workflow_name = this.de_workflow_name;
            this.work_remarks = this.de_work_remarks;

            this.onSave();
            this.onCloseLoclWorkFlow();
        },
        onShowUpdaeWorkFlow() {
            this.de_select_type = this.select_type;
            this.de_workflow_name = this.workflow_name;
            this.de_work_remarks = this.work_remarks;
            this.visible_workflow_edit = true;
        },
        onChangTimeType(e) {
            if (e.target.value == "interval") {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.form_timer.setFieldsValue({
                            "interval_type": "seconds",
                            "jitter": 0
                        });
                    }, 100)
                })

            } else if (e.target.value == "cron") {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.form_timer.setFieldsValue({
                            "jitter": 0
                        });
                    }, 100)
                })

            }
        }
    },
    watch: {
        '$store.getters.getTheme': function (e) {
            if (this.is_mounted > 1) {
                this.onColor();
                this.onTheme();
            }
            // try {
            //     this.graph.destroy()
            // } catch (error) {
            //     console.log(error)
            // }

            // this.onFlowChart(1);
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

.edit {
    height: calc(100vh - 17px);
    height: -moz-calc(100vh - 17px);
    height: -webkit-calc(100vh - 17px);
    width: calc(100vw - 180px);
    width: -moz-calc(100vw - 180px);
    width: -webkit-calc(100vw - 180px);

    #container {
        height: 100%;
        width: 100vw;
    }

    .btn_run {
        position: absolute;
        bottom: 9px;
        cursor: pointer;
        margin-left: 20px;
    }
}

.ant-row-flex {
    -ms-flex-flow: initial;
    flex-flow: initial;
}

.leftx {
    height: calc(100vh - 7px);
    height: -moz-calc(100vh - 7px);
    height: -webkit-calc(100vh - 7px);

    .ssc {
        height: calc(100vh - 14px);
        height: -moz-calc(100vh - 14px);
        height: -webkit-calc(100vh - 14px);
        overflow-y: auto;
    }

    .ant-tabs-tabpane .sscx {
        margin-top: 15px;
        height: calc(100vh - 18px);
        height: -moz-calc(100vh - 18px);
        height: -webkit-calc(100vh - 18px);
        overflow-y: auto;
    }
}

.visible_log {
    /deep/.ant-drawer-body {
        background: #373842;
        color: #bbb;
        height: 100%;
    }

    /deep/.ant-drawer-content {
        background-color: #373842;
    }

    .appname {
        font-weight: bold;
    }

    .appresult {
        color: #c8cad6;
    }

    .time {
        color: #656565;
    }

    /deep/.ant-progress-line {
        position: relative;
        width: 94%;
        font-size: 14px;
        float: left;
        color: #fff;
        margin-left: 50px;
        margin-top: -22px;

    }

    /deep/.ant-progress-text {
        color: #ababab;
    }
}

.timer_css {
    /deep/.ant-radio-group {
        width: 100%;

        /deep/.ant-radio-button-wrapper {
            width: 33.33333333333333333%;
            text-align: center;
        }
    }
}

.uuidcss {
    font-weight: bold;
    // background: #3e5d79;
    // color: #fff;
    // padding-left: 7px;
    // padding-right: 7px;
    // border-radius: 5px;
    // padding-bottom: 1px;
}

.pointer {
    cursor: pointer;
}

.center {
    text-align: center;
}

.bright {
    .leftx {
        background: #fff;
        color: #000;
        border-top: 1px solid #dedede;
        border-right: 1px solid #dedede;

        /deep/ .ant-list-empty-text {
            margin-top: 50px;
        }

        .tools_div {
            width: 100%;
            font-size: 12px;

            .avatar_img {
                border-radius: 100%;
                border: 1px solid #cacaca;
            }

            .tools_name {
                margin-top: 5px;
            }
        }
    }

    .work_title {
        width: 200px;
        background: #0000;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        color: #27292e;
        text-align: center;
        border-radius: 0px;
        margin-left: 133px;
        position: absolute;
    }

    .work_remarks {
        width: 300px;
        background: #0000;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        color: #27292e;
        text-align: center;
        border-radius: 0px;
        margin-left: 337px;
        position: absolute;
    }

    .align {
        vertical-align: middle;
        position: absolute;
        margin-left: 10px;

        /deep/.ant-select-selection {
            display: block;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background-color: initial;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-top-width: 1.02px;
            border-radius: 4px;
            outline: none;
            -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            color: #27292e;
            border-radius: 0px;

            .ant-select-arrow {
                color: #b5b0b0;
            }
        }

        /deep/.ant-select-selection:focus {
            border-right-width: 1px !important;
            outline: 0;
            -webkit-box-shadow: 0 0 black;
            box-shadow: 0 0 black;
        }

        /deep/.ant-select-selection:active {
            border-right-width: 1px !important;
            outline: 0;
            -webkit-box-shadow: 0 0 black;
            box-shadow: 0 0 black;
        }
    }

    .work_title:focus {
        border-right-width: 1px !important;
        outline: 0;
        -webkit-box-shadow: 0 0 black;
        box-shadow: 0 0 black;
    }

    .work_remarks:focus {
        border-right-width: 1px !important;
        outline: 0;
        -webkit-box-shadow: 0 0 black;
        box-shadow: 0 0 black;
    }

    .left_right {
        width: 20px;
        position: absolute;
        top: 50%;
        text-align: center;
        border: 1px solid #dedede;
        z-index: 999;
        margin-left: 174px;
        background: #ffffff;
        color: #717171;
        line-height: 30px;
        cursor: pointer;
    }

    .local-var-actipn {
        font-size: 12px;
        position: absolute;
        right: 0;
        margin-top: -19px;
        margin-right: 15px;

        .del {
            cursor: pointer;
            color: #fb4040;
        }

        .edit {
            cursor: pointer;
        }
    }

    .btnLcoalVar {
        position: absolute;
        border-radius: 0px;
        width: 174px;
        margin-top: -15px;
    }
}

.dark {
    .leftx {
        background: #27292e;
        color: #fff;
        border-top: 1px solid #353535;

        /deep/ .ant-list-empty-text {
            padding: 16px;
            color: #989898;
            font-size: 14px;
            text-align: center;
            margin-top: 50px;
        }

        /deep/ .ant-tabs-bar {
            margin: 0 0 16px 0;
            border-bottom: 1px solid #404040;
        }

        .tools_div {
            width: 100%;
            font-size: 12px;
            color: #fff;

            .avatar_img {
                border-radius: 100%;
            }

            .tools_name {
                margin-top: 5px;
            }
        }
    }

    .work_title {
        width: 200px;
        background: #0000;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        color: #b4b4b6;
        text-align: center;
        border-radius: 0px;
        margin-left: 133px;
        position: absolute;
    }

    .work_remarks {
        width: 300px;
        background: #0000;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        color: #b4b4b6;
        text-align: center;
        border-radius: 0px;
        margin-left: 337px;
        position: absolute;
    }

    .align {
        vertical-align: middle;
        position: absolute;
        margin-left: 10px;

        /deep/.ant-select-selection {
            display: block;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background-color: initial;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-top-width: 1.02px;
            border-radius: 4px;
            outline: none;
            -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            color: #b4b4b6;
            border-radius: 0px;

            .ant-select-arrow {
                color: #b5b0b0;
            }
        }

        /deep/.ant-select-selection:focus {
            border-right-width: 1px !important;
            outline: 0;
            -webkit-box-shadow: 0 0 black;
            box-shadow: 0 0 black;
        }

        /deep/.ant-select-selection:active {
            border-right-width: 1px !important;
            outline: 0;
            -webkit-box-shadow: 0 0 black;
            box-shadow: 0 0 black;
        }

    }

    .work_title:focus {
        // border-color: #c99562;
        border-right-width: 1px !important;
        outline: 0;
        -webkit-box-shadow: 0 0 black;
        box-shadow: 0 0 black;
    }

    .work_remarks:focus {
        border-right-width: 1px !important;
        outline: 0;
        -webkit-box-shadow: 0 0 black;
        box-shadow: 0 0 black;
    }

    .left_right {
        width: 20px;
        position: absolute;
        top: 50%;
        background: #27292e;
        text-align: center;
        border: 1px solid #2d2d2d;
        z-index: 999;
        margin-left: 174px;
        color: #fff;
        line-height: 30px;
        cursor: pointer;
    }

    .local-var-actipn {
        font-size: 12px;
        position: absolute;
        right: 0;
        margin-top: -19px;
        margin-right: 15px;

        .del {
            cursor: pointer;
            color: #fb4040;
        }

        .edit {
            cursor: pointer;
        }
    }

    .btnLcoalVar {
        position: absolute;
        border-radius: 0px;
        width: 174px;
        margin-top: -15px;
    }
}

/deep/ .ant-tabs-nav .ant-tabs-tab {
    margin-right: 0px;
    margin-left: 2px;
    margin-right: 2px;
}

.report {
    width: 90%;

    .header {
        text-align: center;

        .logo_title {
            font-weight: bold;
            font-size: 24px;
            margin-top: 35px;
        }

        .logo {
            width: 250px;
            margin-top: 180px;
        }
    }

    .div1 {
        margin-top: 150px;

        .title {
            font-size: 20px;
            font-weight: bold;

            .jing {
                margin-right: 10px;
                color: #cc403c;
            }
        }
    }

    .div2 {
        margin-top: 60px;

        .title {
            font-size: 20px;
            font-weight: bold;

            .jing {
                margin-right: 10px;
                color: #cc403c;
            }
        }

        .desc {
            font-weight: 400;
            margin-left: 10px;
            font-size: 14px;
            color: #565656;
        }

        .args_list {
            margin-bottom: 20px;

            .args_title {
                font-weight: bold;
                margin-bottom: 5px;

                .jing {
                    color: #cc403c;
                    margin-right: 5px;
                }
            }
        }

    }
}
</style>
