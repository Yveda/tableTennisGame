
cc.Class({
    extends: cc.Component,

    properties: {
       
        cue: {
            type: cc.Node,
            default: null,
        },

        min_dis: 20, // 如果拖动的距离到白球的中心 < 这个距离，那么我们就隐藏球杆，否者的话，显示球杆;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);//获得刚体组件

        this.cue_inst = this.cue.getComponent("cue");
        this.start_x = this.node.x;
        this.start_y = this.node.y;

        // START(点击下去), MOVED（触摸移动）, ENDED(触摸在节点范围内弹起), CANCEL（节点范围外弹起）
        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {

        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            var w_pos = e.getLocation();//获得触摸位置
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);//白球位置转局部坐标
            var src = this.node.getPosition();//src就是台球的位置
            var dir = cc.pSub(dst, src);//方向就是目标点减去原点,向量
            var len = cc.pLength(dir);//求这个向量的长度，又叫求模

            //小于这个距离不显示球杆
            if (len < this.min_dis) {
                this.cue.active = false; // 设置球杆为隐藏;
                return;
            }

            this.cue.active = true;

            var r = Math.atan2(dir.y, dir.x);//弧度
            var degree = r * 180 / Math.PI;//度，弧度转成度
            degree = 360 - degree;//编辑器和数学上旋转的角度不一样
            
            this.cue.rotation = degree + 180; //球杆的旋转，为了不让球杆的头太大，所以还要再调个方向

            var cue_pos = dst;//球杆的位置等于触摸的位置
            var cue_len_half = this.cue.width * 0.5;//移动球杆的一半
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);

            this.cue.setPosition(cue_pos);
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(e) {//如果没有显示表示没有发杆，否则的话就调用cue.js的代码
            if(this.cue.active === false) {
                return;
            }
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {//如果没有显示表示没有发杆，否则的话就调用cue.js的代码
            if(this.cue.active === false) {
                return;
            }
            this.cue_inst.shoot_at(this.node.getPosition());//发射球杆
        }.bind(this), this);
    },

    reset: function() {
         //初始化白球
        this.node.scale = 1;
        this.node.x = this.start_x;
        this.node.y = this.start_y;

        this.body.linearVelocity = cc.p(0, 0);//线性速度设置为0
        this.body.angularVelocity = 0;//角速度设置为0   
    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        // 白球有可能，碰球杆，碰球，碰边,球袋
        //假设碰到的是球袋，也就是2
        if(otherCollider.node.groupIndex == 2) {
           // 隔1秒一种，要把白球放回原处;
           this.node.scale = 0;
           this.scheduleOnce(this.reset.bind(this), 1);
           // end  
           return;//表示处理完了
        }
    },
    // update (dt) {},
});
