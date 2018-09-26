cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        is_debug: false, // 是否显示调试信息;
        // 重力加速度是一个向量, 有方向的,2D, Vec重力加速度的大小;
        gravity: cc.p(0, -320), // 系统默认的
    },

    // use this for initialization
    onLoad: function () {
        // 游戏引擎的总控制
        // cc.Director, cc.director 区别呢？
        // 大写的cc.Director是一个类, 小写cc.direcotr全局的实例
        cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎
        // 独立的形状，打开一个调试区域,游戏图像的，逻辑区域;
        // 开始调试模式:
        if (this.is_debug) { // 开启调试信息
            var Bits = cc.PhysicsManager.DrawBits; // 这个是我们要显示的类型
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }
        else { // 关闭调试信息
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        // 重力加速度的配置
        cc.director.getPhysicsManager().gravity = this.gravity;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
