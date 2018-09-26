cc.Class({
    extends: cc.Component,

    properties: {
        cue: {
            type:cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, function () {

        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation()//获得触摸位置
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);//白球位置转局部坐标
            var src = this.node.getPosition();//src就是台球的位置
            var dir = cc.pSub(dst,src);//方向就是目标点减去原点,向量
            var len = cc.pLength(dir);//求这个向量的长度，又叫求模

            var r = Math.atan2(dir.y,dir.x);//弧度
            var degree = r * 180 / Math.PI;//度，弧度转成度
            degree = 360 - degree;//编辑器和数学上旋转的角度不一样
            this.cue.rotation = degree;//球杆的旋转

            var cue_pos = dst//球杆的位置等于触摸的位置
            var cue_len_half = this.cue.width * 0.5//移动球杆的一半
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);
            this.cue.setPosition(cue_pos);
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {

        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {

        }.bind(this), this);
    },

    // update (dt) {},
});