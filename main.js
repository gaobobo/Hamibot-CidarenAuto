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

    
    console.show();
    console.verbose("脚本已启动。");
    toast("预想打开调试台，请开启Hamibot的悬浮窗权限。");

    if(auto.service === null) {
        console.warn("无障碍服务未启动，等待启动。");
        auto.waitFor();
        console.verbose("已启动无障碍服务。");
    }

    if (!selector().id('android:id/text1').text('练习').exists()){
        programEnds("错误：没有找到页面。程序退出。","error");
    }    

	while(true){

	var selections = new Array(0);

    var webUIObject = selector()
        .className("android.webkit.WebView")
        .findOnce()
    		.children()
    		.find(className("android.view.View"))
    		.forEach((child) => {
        	if (child.childCount() === 1 && child.parent().childCount() === 2 &&child.children().findOne(className("TextView")) !== null) { selections.push(child.children().findOne(className("TextView")).text()); return;}
        });

		console.info("获取到的选项：");
		console.info(selections);

		console.info("点击的选项：");
		console.info(selections[1]);
		console.info("点击结果：");
		if (click(selections[0]) === true) {console.info("成功！");sleep(2000)}
        else {programEnds("点击失败。程序将在3秒钟后退出。");}

        if (click("继续")) {console.info("检测到继续按钮，此题作答正确，2秒后进入下一题") ; sleep(2000);}
        else {
            console.error("选项错误，等待刷新。"); sleep(2000);
            if (!desc("更多信息").findOnce().click()) {programEnds("无法点击更多按钮。程序将在3秒后退出。","error");}
            if (!click("刷新")) {programEnds("无法点击刷新按钮。程序将在3秒后退出。","error");}
            console.info("网页刷新成功。等待2秒后重试。")
            sleep(2000);
        }

  }

    /*		
    .forEach(function (child) {
        	if (child.childCount() === 1 && child.children().findOne(className("TextView")) !== null) { console.info(child.children().findOne(className("TextView")).text()); return;}
        });
*/
    
    
				


/*
		var opionTheFirstItemUiObject = webUIObject.child(0).children().find(className("android.view.View")).forEach(function (child) {
    		if (child.childCount() === 2 ) {return child;}
    });
*/
		//console.info(opionTheFirstItemUiObject.child(0).child(0).text());
	//	console.info(opionTheFirstItemUiObject);


		//UiObject item = getTheFirstOpionItemUIObject(webUIObject);

		//console.info(getTheFirstOpionItemUIObject(webUIObject).childCount());
		//console.info(webUIObject.child(0).childCount());

		//console.info(getTheFirstOpionItemUiObject(webUIObject));

/*    
var optionItemUIObject = getTheFirstOpionItemUIObject(webUIObject);

    if (optionItemUIObject === null) {programEnds("未找到选项。程序在3秒钟后退出。","error");}

		click(getTheFirstOpionItemUIObject(webUIObject).text());
    
    
*/
    //programEnds("脚本运行完成。3秒后退出。","info");




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
    

function refreshWebView () {

}

/**
     * Exit this program before send message to console.
     * @param message <string> Tne message to send.
     * @param type <string> The grade of console log. With error, info.
     */
function programEnds(message,type) {

    switch (type) {
        case "error":
            console.error(message);
            sleep(3000);
            console.hide();
            exit();
            break;
    
        case "info" :
            console.info(message);
            sleep(3000);
            console.hide();
            exit();
            break;

        default:
            exit();
            break;
    }

}

function programEnds(message) {
    console.verbose(message);
    sleep(3000);
    console.hide();
    exit();
}
