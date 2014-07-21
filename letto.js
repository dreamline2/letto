var LETTO = LETTO || {};

LETTO = {
    totalNum: [],
    selectedNum: [],


    Init: function(o){
        LETTO.tN = o.totalNumber;
        LETTO.nL = o.numberLength;

        for(var i = 0;i<LETTO.tN;i++) {
            LETTO.totalNum.push(i+1);
        }
    },

    Utils: {
        newNumber: function(start,end){
            return Math.round(Math.random()*(end-start)+start);
        },

        isHaveThisNumber: function(para,num){

            if(typeof(para) == "object"){
                if(para.length == 0){
                    console.log("空陣列!");
                    return false;
                }
            }

            for(var i=0;i<para.length;i++){
                if(para[i] == num){
                    console.log("第【"+(i+1)+"】個元素重複，正在重新生成...");
                    return true;
                }
            }

            return false;
        },

        newRandomNumbersWithNoRepeat: function(start,end,size){
            var para = new Array(), // 最後結果
                currentIndex = 0, // 目前隨機數索引
                rnum; // 目前隨機數

            if(start>end||start<0||end<0||size<0){
                console.log("無效參數!");
                return;
            }

            if(end-start+1<size){ // 驗證數量是否超出範圍
                console.log("數量大於範圍!");
                return;
            }

            for(var i=0;i<size;i++){
                rnum = LETTO.Utils.newNumber(start,end);
                if(LETTO.Utils.isHaveThisNumber(para,rnum)){ // 檢查是否重複
                    rnum = LETTO.Utils.newNumber(start,end); // 重新選取
                    console.log("重新選取號碼：" + rnum);
                }
                para[currentIndex++] = rnum;//添加到现有数字集合中
            }

            return para;
        }

    },

    Event: {
        auto: function() {
            var result = LETTO.Utils.newRandomNumbersWithNoRepeat(1, LETTO.tN, LETTO.nL);
            console.log(result)
            return result
        },

        active: function() {
            var selectNum = $('#input').val();



            if(selectNum > LETTO.tN){
                console.log('別亂選好嗎!你不想中獎了?')
            }else if(!Number(selectNum)){
                console.log('你是外星人「都」教授噢!都亂填就對了?你不想中獎了?')
            }else if(LETTO.Utils.isHaveThisNumber(LETTO.selectedNum, selectNum)){
                console.log('笨蛋!你已經選過了!有沒有買過彩卷啊')
            }else {

                if(LETTO.selectedNum.length < LETTO.nL) {
                    LETTO.selectedNum.push(selectNum);
                    console.log('選號成功!')
                    console.log(LETTO.selectedNum)
                }else {
                    console.log(LETTO.selectedNum)
                    console.log('笨蛋，你已經選'+LETTO.nL+'個了!快付錢!')
                }

            }

            return LETTO.selectedNum
        },

        restart: function (){
            LETTO.selectedNum = [];
            console.log('請重新購買你的號碼!os:(這個凱子錢多噢)')
        }
    }
}