auto();
// setScreenMetrics(1080, 2340);
// Author: AMII
// UpdateTime: 2023-01-20
// UpdateDesc: 日常维护
// Description: 记录可种树种及可保护地，并发微信消息给主号
var dep = 25;
var hig = 2340;
var restart = 0;
var logfile = "./log/log_mi_" + new Date().toLocaleDateString() + ".txt";
var plogfile = "./log/log_mi_plant.txt";
var slogfile = "./log/log_mi_plant_short.txt";
var llogfile = "./log/log_mi_plant_long.txt";
var sleep_t = random(1, 1);
var nowscript = engines.myEngine().getSource();
var account_list = ["188******31", "159******39", "han***@163.com", "264***@qq.com", "myu***@163.com", "wor***@163.com", "332***@qq.com", "353***@qq.com", "gzh***@163.com", "155******34", "284***@qq.com"];
const ADDR = ["乐山", "邯郸", "珲春", "兴安盟", "平凉", "东台", "治多", "佛坪", "张家口", "泾源", "铜川", "石家庄", "墨脱", "维西", "东宁", "新龙", "崇州", "敦煌", "临夏", "太原", "定西", "晋城", "运城", "忻州", "杂多", "凉山州", "延安", "惠东", "承德", "保定", "西宁", "赤峰", "怒江", "巴彦淖尔", "大同", "阿拉善", "白银", "北京", "称多", "大理", "德钦", "迪庆", "鄂尔多斯", "海南州", "金昌", "酒泉", "科右中旗", "丽江", "芒市", "平武", "庆阳", "通辽", "乌兰察布", "武威", "锡林郭勒", "邢台", "长治", "中卫", ""];
const PLANT = ["八月林保护地", "珲春保护地", "条子泥保护地", "亚运碳中和", "索加牙曲保护地", "大古坪保护地", "秋千架保护地", "墨脱格当保护地", "连翘", "塔城保护地", "杨柴", "东宁保护地", "新龙保护地", "鞍子河保护地", "柏林保护地", "君乃涌保护地", "东觉涌保护地", "冷杉", "然者涌保护地", "乌禽嶂保护地", "老河沟保护地", "榆树", "花棒", "梭梭树", "山杏", "京西保护地", "嘉塘保护地", "华山松", "德钦公益保护地", "云杉", "沙柳", "柠条", "胡杨", "红柳", "老君山保护地", "芒杏河保护地", "福寿保护地", "山桃", "沙棘", "樟子松", "侧柏", "油松"];
const cut_line = "=================================================";

start();
exit();


//🏝🏝开始程序🏝🏝
function start() {
    stop_other_engines();
    wake();
    thread_protect();
    request_Screen();
    screen_resolution();
    main();
}

//主程序
function main() {
    create_log(logfile);
    clean_reopen_alipay();
    cancel_up();
    switch_account(account_list[0]);
    check_depth();
    text("蚂蚁森林").depth(dep).findOne(3000).parent().parent().click();
    sleep(2000);
    check_elements("去保护", 1);
    var chk = className("android.view.View").clickable(true).depth(17).findOne(3000);
    while (!chk) {
        backto("生活", "扫一扫");
        reject_update();
        text("蚂蚁森林").depth(dep).findOne(3000).parent().parent().click();
        sleep(2000);
        check_elements("去保护", 1);
        chk = className("android.view.View").clickable(true).depth(17).findOne(3000);
    }
    chk.click();
    toast_log("🏕🏕🏕种啥好捏~🏕🏕🏕");
    sleep(2000);
    check_elements("保护森林", 1);
    rem = plants();
    backto("生活", "扫一扫");
    if (rem) {
        toast(rem);
        remind(rem);
    }
    toast_log("🏕🏕🏕记录完毕🏕🏕🏕");
    toast_log(cut_line, 2);
    remove_app("支付宝");
    home();
    close_screen();
}

//🏕🏕记录可种树种||可保护地🏕🏕
function plants() {
    var data = [];
    var plant = {};
    var myState = {};
    var mn = 0;
    plant["trees"] = [];
    plant["lands"] = [];
    text("申请种树").waitFor();
    var pat = text("我的能量").findOne().parent().parent();
    for (let i = 0; i < pat.childCount(); i++) {
        if (pat.child(i).childCount() == 2) {
            if (pat.child(i).child(0).text().slice(0, 1) == "我") {
                mn = i - 1;
                break;
            }
        }
    }
    // log(mn);
    myState["我的能量"] = pat.child(mn).text();
    for (let i = 0; i < 6; i++) {
        if (pat.child(mn + i + 2).childCount() == 2){
            let val = pat.child(mn + i + 2).child(1).child(0).text();
            myState[val] = pat.child(mn + i + 2).child(0).text();
        }
    }
    // log(myState);
    for (let i = mn + 8; i < pat.childCount() - 1; i++) {
        let dat = {};

        function get_dat(dat_up, dat_dn, flag) {
            dat["name"] = dat_up.child(0).getText();
            dat["state"] = dat_up.child(1).getText();
            if (dat_dn.childCount() > 4) {
                dat["eng"] = dat_dn.child(dat_dn.childCount() - 3).getText().split("/")[1].trim();
                dat["loc"] = dat_dn.child(dat_dn.childCount() - 4).getText();
            } else {
                dat["eng"] = dat_dn.child(0).getText().split("/")[1].trim();
                dat["loc"] = "";
            }
            dat["func"] = [];
            for (let i = 0; i < dat_dn.childCount() - 4; i++) {
                let func_txt = dat_dn.child(i).getText();
                if (func_txt && func_txt.length < 10 && func_txt != "original") {
                    dat["func"].push(func_txt.trim());
                }
            }
            ot = [];
            if (!flag) {
                for (let j = 0; j < pat.child(i).child(1).childCount(); j++) pat.child(i).child(1).child(j).getText() ? ot.push(pat.child(i).child(1).child(j).getText()) : "";
            }
            dat["now"] = flag;
            dat["other"] = flag ? "" : ot.join(",");
            dat["name"].includes("保护地") ? plant["lands"].push(dat) : plant["trees"].push(dat);
        }

        if (pat.child(i).childCount() == 3) {
            // log(3);
            let dat_up = pat.child(i).child(1);
            let dat_dn = pat.child(i).child(2);
            // log(dat_up);
            // log(dat_dn);
            get_dat(dat_up, dat_dn, true);
        } else if (pat.child(i).childCount() == 2) {
            // log(2);
            let dat_up = pat.child(i).child(0).child(1);
            let dat_dn = pat.child(i).child(0).child(2);
            // log(dat_up);
            // log(dat_dn);
            get_dat(dat_up, dat_dn, false);
        }
        // log(dat);
    }

    data.push(myState, plant);
    toast_log(JSON.stringify(data), 1, llogfile);
    var rem = [];
    var plog = [];
    var slog = [];
    for (let i = 0; i < 2; i++) {
        let key = Object.keys(plant)[i];
        for (let j = 0; j < plant[key].length; j++) {
            if (plant[key][j]["now"]) {
                if (ADDR.indexOf(plant[key][j]["loc"]) == -1) rem.push(plant[key][j]["loc"]);
                if (PLANT.indexOf(plant[key][j]["name"]) == -1) rem.push(plant[key][j]["name"]);
                if (PLANT.indexOf(plant[key][j]["name"]) == -1 || ADDR.indexOf(plant[key][j]["loc"]) == -1) {
                    let tmp = [];
                    tmp.push(plant[key][j]["name"], plant[key][j]["eng"], plant[key][j]["loc"]);
                    plog.push(tmp.join(" "));
                }
            }
            if (plant[key][j]["other"].includes("上线") || plant[key][j]["now"]) slog.push(plant[key][j]);
        }
    }
    if (plog.length) {
        plog.unshift(rem);
        toast_log(JSON.stringify(plog), 1, plogfile);
        toast_log(cut_line, 2, plogfile);
        log(plog);
    }
    toast_log("", 1, slogfile);
    for (var i in slog) {
        let tmp = [];
        tmp.push(slog[i]["name"], slog[i]["eng"], slog[i]["loc"]);
        toast_log(JSON.stringify(tmp), 2, slogfile);
    }
    toast_log(cut_line, 2, slogfile);
    return plog.length ? plog : false;
}

//🏕🏕发送消息给主号🏕🏕
function remind(rem) {
    var tmp = "";
    for (var i in rem) {
        tmp += rem[i] + '\n';
    }
    home();
    sleep(1000);
    launchApp("微信");
    // var wx = text("微信").depth(13).findOne(1000);
    // if (wx) click(wx.bounds().centerX(), wx.bounds().centerY() - 80);
    sleep(2000);
    remove_app("微信");
    sleep(1000);
    launchApp("微信");
    // click(wx.bounds().centerX(), wx.bounds().centerY() - 80);
    // textContains("微信").depth(21).waitFor();
    sleep(3000);
    click(540, 160);
    sleep(50);
    click(540, 160);
    sleep(2000);
    setClip(tmp);
    let h = id("hg4").className("android.view.View").text("哈").findOne();
    h.parent().parent().parent().parent().parent().click();
    // click(540, 320);
    sleep(1000);
    let ed = id("b4a").className("android.widget.EditText").findOne();
    ed.setText(tmp);
    goback(2);
    // send = id("com.tencent.mm:id/iki").findOne(3000);
    // if (send) {
    //     longClick(send.bounds().centerX(), send.bounds().centerY());
    //     sleep(1000);
    //     click(128, 2150);
    // }
    // sleep(2000);
    // if (!text("发送").findOne(2000).click()) toast_log("发送失败");
    // sleep(1000);
    // goback(2);
    // remove_app("微信");
}

//🧭🧭寻找并进入指定位置
function goto_somewhere(name, distan, tim, slp) {
    if (!distan) distan = 800;
    if (!tim) tim = 500;
    if (!slp) slp = 2000;
    sleep(1500);
    toast_log("😏😏寻找" + name + "😏😏", 1);
    if (text("总排行榜").exists()) click("总排行榜");
    for (var i = 0; i < 50; i += 1) {
        sleep(slp);
        if (text(name).exists()) {
            if (text(name).findOne(3000).bounds().centerY() < 2333) break;
        }
        gesture(tim, [540, 2000], [540, 2000 - distan], [300, 2000 - distan], [800, 2000 - distan]);
        if (text("查看更多好友").exists()) click("查看更多好友");
    }
    sleep(slp);
    cl = text(name).findOne(10000);
    toast_log("😏😏goto " + name + "😏😏", 1);
    if (!click(name, 0)) {
        toast_log("点击" + name + "失败", 1);
        sleep(1000);
        if (cl) {
            toast_log("改为点击坐标：" + cl.bounds().centerX() + " " + cl.bounds().centerY(), 1);
            click(cl.bounds().centerX(), cl.bounds().centerY());
        } else { toast_log("找不到:" + name, 1); }
    }
    sleep(slp);
    click_close();
}

//⚓⚓确定首页蚂蚁森林等控件深度
function check_depth() {
    var sy = ["蚂蚁森林", "蚂蚁庄园", "芭芭农场", "运动"]
    for (x = 0; x < sy.length; x++) {
        chk = text(sy[x]).findOne(1000);
        if (chk && chk.bounds().centerY() > 500 && chk.bounds().centerY() <= 1300) {
            dep = chk.depth();
            toast_log("dep:" + dep, 1);
            return true;
        }
    }
}

//🆔🆔切换账号
function switch_account(account) {
    toast_log("切换至" + account);
    check_elements("我的", 1);
    className("android.widget.TextView").text("我的").findOne().parent().click();
    sleep(1500);
    if (textStartsWith(account.slice(0, 3)).exists()) {
        click("首页");
        sleep(1500);
        reject_update();
        return true;
    }
    className("android.widget.TextView").text("我的").findOne().parent().click();
    check_elements("设置", 2);
    desc("设置").depth(14).findOne(1000).parent().click();
    sleep(1000);
    check_elements("登录其他账号", 1);
    click("登录其他账号");
    sleep(1000);
    check_elements(account, 1);
    click(account);
    sleep(1500);
    click_close();
    reject_update();
    toast_log("切换成功", 1);
}

//⏰⏰唤醒屏幕及解锁
function wake() {
    toast_log(nowscript);
    device.wakeUp();
    sleep(1500);
    for (x = 0; x < 10; x++) {
        toast_log("第" + (x + 1) + "次解锁", 1);
        cup = currentPackage();
        toast_log(cup, 1);
        if (cup == 'com.miui.aod' || cup == 'com.android.systemui') {
            device.wakeUp();
            swipe(540, 1500, 540, 800, 200);
            sleep(500);
            // gesture(500, [830, 970], [540, 1260], [540, 1550], [830, 1550]); // 2200
            gesture(500, [830, 1086], [540, 1376], [540, 1666], [830, 1666]); // 2340
        }
        sleep(2500);
        home();
        sleep(1500);
        home();
        sleep(1000);
        if (currentPackage() == "com.miui.home") {
            toast_log("解锁成功", 1);
            toast(nowscript);
            // 定时4秒后点“否”
            let csl = threads.start(function() {
                setInterval(() => {
                    // id("md_buttonDefaultNegative").findOne().click();
                    click(673, 1324);
                    sleep(500);
                    csl.interrupt();
                }, 4000);
            });
            // 检测是否点击
            var waitThread = threads.start(function() {
                while (1) {
                    if (isWait != undefined) {
                        waitThread.interrupt();
                        csl.interrupt();
                    }
                    sleep(500);
                }
            });
            var isWait = confirm("立即运行？");
            waitThread.join(500);
            if (!isWait) {
                toast_log("缓冲" + sleep_t + "秒");
                for (var z = 0; z < sleep_t; z += 10) {
                    if ((sleep_t - z) < 10) {
                        toast(z + " / " + sleep_t);
                        sleep((sleep_t - z) * 1000);
                    } else {
                        toast(z + " / " + sleep_t);
                        sleep(10 * 1000);
                    }
                }
            }
            return true;
        }
    }
    toast_log("解锁失败，退出脚本", 1);
    exit();
}

// 🎞🎞请求截图权限🎞🎞
function request_Screen() {
    var screenT = threads.start(function() {
        if (text("立即开始").depth(6).findOne(3000).click()) {
            toast_log("请求截图成功", 1);
            screenT.interrupt();
        } else {
            toast_log("请求失败");
            exit();
        }
    });
    requestScreenCapture(false);
}

// 📱📱检测屏幕分辨率📱📱
function screen_resolution() {
    let img = captureScreen();
    let wid = img.width;
    hig = img.height;
    toast_log("分辨率为：" + wid.toString() + " * " + hig.toString(), 1);
}

// ♨♨脚本保护线程，避免长时间运行♨♨
function thread_protect(tim) {
    if (!tim) tim = 35;
    threads.start(function() {
        setInterval(() => {
            toast_log("♨♨♨运行超 " + tim + " 分钟，退出脚本♨♨♨");
            exit();
        }, tim * 60 * 1000);
    })
}

//📜📜创建日志文件
function create_log(logname) {
    if (files.createWithDirs(logname)) toast("创建" + logname + "成功");
}

//❌👆支付宝取消升级
function cancel_up() {
    let a = threads.start(function() { // 关闭信息提示进程
        setInterval(() => {
            let chk = id("update_cancel_tv").findOne(200);
            if (chk) chk.child(1).click();
        }, 100);
        setTimeout(() => {
            a.interrupt();
        }, 2000);
    });
}

//❌🔁打开支付宝并清除重新打开
function clean_reopen_alipay() {
    let x = 0;
    launchApp("支付宝");
    sleep(1000);
    remove_app("支付宝");
    home();
    sleep(1000);
    while (!open_alipay()) {
        toast_log("启动支付宝失败");
        x += 1;
        check_dead_loops(x);
    }
    click("首页");
    click_close();
    reject_update();
}

//🔁🔁打开支付宝
function open_alipay() {
    launchApp("支付宝");
    sleep(1000);
    if (check_elements("生活", 1)) toast_log("启动支付宝成功");
    return true;
}

//🔀🔁切换至双开支付宝
function switch_another_alipay() {
    home();
    sleep(1500);
    home();
    sleep(1000);
    var ali = text("支付宝").depth(13).findOne(2000);
    if (ali) {
        click(ali.bounds().centerX(), ali.bounds().centerY() - 100);
    } else {
        toast_log("桌面找不到支付宝");
        exit();
    }
    sleep(3000);
    check_elements("生活", 1);
    click("首页", 0);
}

//❌❌移除app
function remove_app(appname) {
    home();
    sleep(1000);
    recents();
    sleep(1500);
    if (text(appname).exists()) {
        var app = text(appname).findOne(3000);
        swipe(app.bounds().centerX(), app.bounds().centerY(), 1080, app.bounds().centerY(), 300);
    }
    sleep(1000);
    home();
}

//⏪⏪返回至某处
function backto(one, two, times) {
    if (!times) times = 20;
    for (var y = 0; y < times; y += 1) {
        sleep(500);
        reject_update();
        if (text(one).exists()) {
            if (text(two).exists()) {
                return true;
            } else {
                click(one);
                sleep(1000);
            }
        }
        goback(1);
    }
}

//💢💢拒绝更新
function reject_update() {
    sleep(500);
    if (text("稍后再说").exists()) click("稍后再说");
}

//🤔🤔检查元素是否存在
function check_elements(mess, typ, tim) {
    if (!tim) tim = 3000;
    if (!typ) typ = 1;
    var x = 0;
    switch (typ) {
        case 5:
            while (!packageName(mess).exists()) {
                x += 1;
                check_elements_sub(x, mess, tim);
            }
            return true;
        case 4:
            while (!className(mess).exists()) {
                x += 1;
                check_elements_sub(x, mess, tim);
            }
            return true;
        case 3:
            while (!id(mess).exists()) {
                x += 1;
                check_elements_sub(x, mess, tim);
            }
            return true;
        case 1:
            while (!text(mess).exists()) {
                x += 1;
                check_elements_sub(x, mess, tim);
            }
            return true;
        case 2:
            while (!desc(mess).exists()) {
                x += 1;
                check_elements_sub(x, mess, tim);
            }
            return true;
    }
}

//🤔🤔查看元素是否存在_子模块
function check_elements_sub(num, mess, tim) {
    click_close();
    toast_log("不存在：" + mess + "，等待" + tim / 1000 + "秒");
    if (num == 6) {
        images.save(captureScreen(), "./jpg/log/err_" + get_time().replace(new RegExp(":", "g"), "-").trim() + "_CheckEle.jpg", "jpg", 60);
        reject_update();
        goback(1);
    }
    check_dead_loops(num);
    sleep(tim);
}

//👉👉按类型点击元素
function clk(mess, typ, slp) {
    if (!slp) slp = 0;
    if (!typ) typ = 1;
    sleep(slp);
    switch (typ) {
        case 0:
            bnd = id(mess).findOne(2000);
            break;
        case 1:
            bnd = text(mess).findOne(2000);
            break;
        case 2:
            bnd = desc(mess).findOne(2000);
            break;
    }
    if (bnd) {
        if (!click(mess, 0)) {
            click(bnd.bounds().centerX(), bnd.bounds().centerY());
            return true;
        } else { return true; }
    } else { toast_log("寻找 " + mess + " 失败"); }
}

//📝📝输出日志
function toast_log(mess, num, logname) {
    if (!num) num = 0;
    logname = logname ? logname : logfile;
    dat = get_time();
    switch (num) {
        case 0:
            toastLog(mess);
            files.append(logname, dat + mess + "\n", encoding = 'utf-8');
            break;
        case 1:
            files.append(logname, dat + mess + "\n", encoding = 'utf-8');
            break;
        case 2:
            files.append(logname, mess + "\n", encoding = 'utf-8');
            break;
    }
}

//⌚⌚获取当前时间
function get_time() {
    var tim = new Date();
    date = tim.toLocaleDateString();
    time = tim.toTimeString().split("GMT")[0];
    return (date + time);
}

//♾♾循环返回
function goback(num, tim) {
    if (!tim) tim = 1500;
    for (var i = 0; i < num; i += 1) {
        back();
        sleep(tim);
    }
}

//👉❌点击关闭按钮
function click_close() {
    sleep(500);
    while (text("关闭").findOne(1000)) {
        click("关闭");
        return true;
    }
}

//🕳🕳死循环退出机制
function check_dead_loops(num) {
    if (num > 10) {
        images.save(captureScreen(), "./jpg/log/err_" + get_time().replace(new RegExp(":", "g"), "-").trim() + "_DeadLoops.jpg", "jpg", 60);
        toast_log("🤔🤔🤔死循环，强制退出！！！咱们日志见🌚🌚🌚");
        home();
        openAppSetting(getPackageName("支付宝"));
        while (!click("结束运行"));
        sleep(2000);
        click("确定");
        sleep(500);
        remove_app("支付宝");
        home();
        sleep(2000);
        check_ending_js(restart);
        restart += 1;
        toast_log(">>>！！【重启脚本第" + restart + "次】！！<<<");
        main();
    }
}

//⛔⛔停止其他脚本
function stop_other_engines() {
    var num = engines.all().length;
    var engines_list = engines.all();
    for (var x = 0; x < num; x += 1) {
        if (engines_list[x] != engines.myEngine()) engines_list[x].forceStop();
    }
}

//🛑🛑结束脚本
function check_ending_js(ending) {
    if (ending > 2) {
        home();
        toast_log(">>>！！！【多次出错，退出脚本】！！！<<<");
        exit();
    }
}

//🔒🔒锁屏
function close_screen() {
    sleep(1500);
    quickSettings();
    sleep(1500);
    swipe(1000, 1920, 200, 1920, 300);
    sleep(1000);
    var w = desc("锁屏").findOne(3000);
    if (w) click(w.bounds().centerX(), w.bounds().centerY());
}