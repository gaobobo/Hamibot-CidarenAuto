/**
    Hamibot-CidarenAuto
    Copyright (C) 2023  Gao Shibo

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */



/*
var saveTheSelection = {
    currentSelections : {
        selectionContents : new Array(0),
    },

    historySelections : {
        selectionContents : new Array(0),
    },

    clearHistorySelections : function () {
      this.historySelections.selectionContents = new Array(0);
    },

    tryToFindTheMostPossiableAnswer : function(currentSelections) {

        this.currentSelections.selectionContents = currentSelections

        var theMostPossibleAnswer = {
            selectionContent : null,
            showTimes : 0,
        };

        this.currentSelections.selectionContent.forEach(

            (currentSelectionContent) => {

                var currentSelectionShowTimes = this.historySelections.selectionContents.reduce(

                    (historySelectionTotalShowTimes,historySelectionContent)=> {

                        const currentCount = historySelectionTotalShowTimes ?? 0;

                        if (historySelectionContent === currentSelectionContent) return currentCount + 1;
                        return currentCount;

                    },

                );

                if (currentSelectionShowTimes > theMostPossibleAnswer.showTimes) {

                    theMostPossibleAnswer.selectionContent = currentSelectionContent;
                    theMostPossibleAnswer.showTimes = currentSelectionShowTimes;

                }

            }

        );
        
        return theMostPossibleAnswer;

    }

};
*/

/*
function getPossiableAnswer (currentSelections) {

    var selectionTemp = {

        selectionShowTimes : new Array(0),
    
        statisticSelectionShowTimes : function(currentSelection) {
    
            this.selectionShowTimes.forEach (
                (currentSelectionShowTime) => {
                    if (currentSelectionShowTime.selection === currentSelection) {
                        this.selectionShowTimes.showTimes += 1;
                        return true;
                    }
                }
             );
    
             return false;
    
        },
    
    };

    currentSelections.forEach (
        (currentSelection) => {

            var ifExistSelection = selectionTemp.statisticSelectionShowTimes(currentSelection);

            if (! ifExistSelection) {
                selectionTemp.selectionShowTimes.push({selection : currentSelection,showTimes : 1});
            }

        }
    );

    var possiableAnswer = selectionTemp.selectionShowTimes[0];
    selectionTemp.selectionShowTimes.forEach(
        (selectionShowTime) => {
            if (selectionShowTime.showTimes > possiableAnswer.showTimes) {
                possiableAnswer = selectionShowTime;
            }
        }
    );

    return possiableAnswer.selection;
    
}
*/

var getPossiableAnswer_Temp = {
    lastSelections : new Array(0),
    possiableAnswerHistory : new Array(0),
    clearPossiableAnwerHistory : function () {
        this.possiableAnswerHistory = new Array(0);
        this.lastSelections = new Array(0);
    }
}

function getPossiableAnswer (currentSelections) {

    for (var i=0; i<currentSelections.length;i++) {
        var sameSelectionIndex = getPossiableAnswer_Temp.lastSelections.indexOf(currentSelections[i]);
        var sameHistorySelectionsIndex = getPossiableAnswer_Temp.possiableAnswerHistory.indexOf(currentSelections[i]);
        if( sameHistorySelectionsIndex === -1 && sameSelectionIndex !== -1) {
            getPossiableAnswer_Temp.possiableAnswerHistory.push(currentSelections[i]);
            getPossiableAnswer_Temp.lastSelections = currentSelections;
            return currentSelections[i];
        }
    }

    getPossiableAnswer_Temp.lastSelections = currentSelections;
    getPossiableAnswer_Temp.possiableAnswerHistory.push(currentSelections[0]);
    return currentSelections[0];

}


function getCurrentSelections () {

    var currentSelections = new Array(0);

    var webUIObject = selector()
        .className("android.webkit.WebView")
        .findOnce()
            .children()
            .find(className("android.view.View"))
            .forEach((child) => {
            if (child.childCount() === 1 && child.parent().childCount() === 2 &&child.children().findOne(className("TextView")) !== null) { currentSelections.push(child.children().findOne(className("TextView")).text()); return;}
        });

        return currentSelections;
};

/*
function getTheFirstOpionItemUIObject(webUIObject) {
    
    if (webUIObject !== null)
        webUIObject
            .child(0)
            .children()
            .forEach(function (child) {
                if (child.className() === "android.view.View" //Items Layouts:android.view.View
                    && child.childCount() === 2 //                  --> android.view.View         
                    && child.child(0).childCount === 1 //                          --> TextView
                    && child.child(0).child(0).text() !== "undefined" //               -->TextView
                    && child.child(1).text() === "undefined") {
                    ){
                    return child.child(0).child(0).text();
                }
    
    });
}
*/

/*
var userConfig = {
    storages : storage.create("XueXitongAuto_UserConfig"),
};
*/

function refreshWebView () {

    var clickSuccess = desc("更多信息").findOnce().click();
    if (! clickSuccess) return false;
    var clickSuccess = click("刷新");
    if (! clickSuccess) return false;

    return true;

}


var exitThisProgram = {

    occuredErrorToExit : function (message) {
        console.error(message);
        sleep(3000);
        console.hide();
        exit();

    },

    occuredNoErrorToExit : function (message) {
        console.info(message);
        sleep(3000);
        console.hide();
        exit();
    },

};







//=============== Program Start Here ===============

if(auto.service === null) {
    console.warn("无障碍服务未启动，等待启动。");
    toast("未启动无障碍服务，等待启动。");
}

auto.waitFor();

console.verbose("已启动无障碍服务。");
toast("已启动无障碍服务");

console.show();
console.verbose("脚本已启动。");
toast("预想打开调试台，请开启Hamibot的悬浮窗权限。");

if (!selector().id('android:id/text1').text('练习').exists()){
    exitThisProgram.occuredErrorToExit("错误：未找到页面。程序将于3秒后退出。");
}    

for(;;) {

    var currentSelections = getCurrentSelections();

    console.info("获取到的选项：");
    console.info(currentSelections);

    var possiableAnswer = getPossiableAnswer(currentSelections);

    console.info("点击选项：");
    console.info(possiableAnswer);

    console.info("点击结果：");
    if (click(possiableAnswer)) {
        console.info("成功！");
        sleep(500);
    } else {
        exitThisProgram.occuredErrorToExit("点击失败。程序将于3秒后退出。");
    }

    if (click("继续")) {
        getPossiableAnswer_Temp.clearPossiableAnwerHistory();
        console.info("检测到继续按钮，此题作答正确，500毫秒后进入下一题"); 
        sleep(500);
    } else {
        console.error("选项错误。500毫秒后刷新。");
        sleep(500);

        if (refreshWebView()) {
            console.info("刷新成功。等待两秒后继续。");
        } else {
            exitThisProgram.occuredErrorToExit("刷新失败。程序将于3秒后退出。")
        }
    }

    sleep(500);

}

