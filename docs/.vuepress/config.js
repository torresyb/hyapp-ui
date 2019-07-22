module.exports = {
    title: 'App开发部',
    base: '/examples/docs-examples/',
    description: 'vue 组件库',
    dest: './docs-examples',
    port: 19000,
    // markdown配置
    markdown: {
        lineNumbers: false // 代码展示行号
    },
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '使用说明', link: '/baseComponents/' },
            { text: '发布日志', link: '/baseComponents/base/_changelog' },
            {
                text: 'gitLab',
                items: [
                    {
                        text: 'hyapp-ui',
                        link: 'http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui'
                    },
                    { text: 'gitLab', link: 'http://172.16.0.245:2345/' }
                ]
            }
        ],
        sidebar: {
            '/baseComponents/': [
                {
                    title: '入门',
                    collapsable: true,
                    children: ['base/_changelog', 'base/_usage']
                },
                {
                    title: '配置参考',
                    collapsable: true,
                    children: ['base/basic-config', 'base/_base']
                },
                {
                    title: 'Basic基础组件',
                    collapsable: true,
                    children: ['base/button', 'base/cell', 'base/scroll']
                },
                {
                    title: 'Notice弹框组件',
                    collapsable: true,
                    children: ['base/action-sheet', 'base/confirm', 'base/mask', 'base/popup']
                },
                {
                    title: 'Others组件',
                    collapsable: true,
                    children: ['base/textarea', 'base/address', 'base/date-picker', 'base/picker', 'base/index-list', 'base/pull-down', 'base/swiper']
                },
                {
                    title: '活动类组件',
                    collapsable: true,
                    children: ['base/scratch-card']
                },
                {
                    title: 'Hyapp-Utils',
                    collapsable: true,
                    children: ['base/hyapp-utils']
                }
            ]
        }
    }
};
