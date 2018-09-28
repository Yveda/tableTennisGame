

cc.Class({
    extends: cc.Component,

    properties: {
        value: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //this指的就是当前的组件实例
        this.start_x = this.node.x;
        this.start_y = this.node.y;
        this.body = this.getComponent(cc.RigidBody);//刚体组件
    },
    reset() {
        this.node.active = true;
        this.node.x = this.start_x;
        this.node.y = this.start_y;
        //this.node.rotation = 0;//旋转设置为0
        this.body.linearVelocity = cc.p(0,0);//线性速度设置为0
        this.body.angularVelocity = 0;//角速度设置为0    
    },
    // update (dt) {},
    onBeginContact (contact,selfCollider,otherCollider) {
        //白球有可能碰球杆，碰球，碰边，碰球袋
        //假设碰到的是球袋，也就是2
        if (otherCollider.node.groupIndex == 2) {
            this.node.active = false;//碰到球袋之后直接把这个球隐藏； 
            return; //表示处理完了
        }
    }
});
