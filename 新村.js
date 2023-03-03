auto();
// setScreenMetrics(1080, 2340);
// Author: AMII
// UpdateTime: 2023-01-20
// UpdateDesc: 日常维护
// Description: 蚂蚁新村赚豆子
var dep = 25;
var ans = 0;
var dep_kw = 17;
var hig = 2340;
var restart = 0;
var logfile = "./log/log_mi_" + new Date().toLocaleDateString() + ".txt";
var sleep_t = random(10, 180);
var nowscript = engines.myEngine().getSource();
var account_list = ["188******31", "159******39", "han***@163.com", "264***@qq.com", "myu***@163.com", "wor***@163.com", "332***@qq.com", "353***@qq.com", "gzh***@163.com", "155******34", "284***@qq.com"];
var name_list = ["QY", "奇 遇 呀", "奇188-han", "奇188-264", "奇159-my", "奇155-w", "奇159-3323", "奇159-3539", "奇155-gzhu", "奇155-155", "奇155-2842", "🎺🎺LO"];
var vil_dz = images.read("./jpg/新村-豆.jpg");
var vil_rw = images.read("./jpg/新村-任务.jpg");
var vil_bt = images.read("./jpg/新村-去摆摊.jpg");
var vil_emp = images.read("./jpg/新村-空位.jpg");
var vil_my = images.read("./jpg/新村-我的小摊.jpg");
var vil_wait = images.read("./jpg/新村-等待.jpg");
var today = new Date().getDay();
const cut_line = "==============================================================";

start();
vil_dz.recycle();
vil_rw.recycle();
vil_bt.recycle();
vil_emp.recycle();
vil_my.recycle();
vil_wait.recycle();
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
    check_depth();
    toast_log("🥜🥜🥜摆摊时间到~🥜🥜🥜");
    for (var x = 0; x < 9; x++) {
        if (x == 5) {
            switch_account(account_list[0]);
            cancel_up();
            remove_app("支付宝");
            switch_another_alipay();
        }
        switch_account(account_list[x]);
        cancel_up();
        vil_village(x);
    }
    remove_app("支付宝");
    toast_log("🥜🥜🥜Done, 美滋滋~🥜🥜🥜");
    toast_log(cut_line, 2);
    home();
    close_screen();
}

// 🥜🥜蚂蚁新村🥜🥜
function vil_village(index) {
    text("蚂蚁新村").depth(dep).findOne(3000).parent().parent().click();
    toast_log("🥜🥜进入蚂蚁新村🥜🥜");
    // var color_emp = "#fff2e2a1";
    var color_pic = "#ff000000";
    var clk = [
        [230, 2000],
        [675, 1800],
        [400, 1830],
        [830, 1640]
    ];
    let close_mess = threads.start(function() { // 关闭信息提示进程
        while (true) {
            let chk = className("android.view.View").depth(14).findOne(200);
            if (chk) chk.child(1).click();
            let cc = chk = depth(15).clickable(true).row(-1).findOne(200);
            if (cc && cc.bounds().centerX() == 1010) cc.click();
        }
    })
    chk_in();
    click_close();
    sleep(500);
    close_mess.interrupt();
    // 送走模块
    if (index < 2) {
        for (var x = 0; x < clk.length / 2; x++) {
            if (check_color(captureScreen(), color_pic, clk[x][0], clk[x][1], 100)) {
                click(clk[x + 2][0], clk[x + 2][1]);
                text("请走TA").waitFor();
                click("请走TA");
                sleep(1000);
            }
        }
        toast_log("🥜送走小号🥜");
    }
    sleep(2000);
    click(610, 935); // 点击自己的豆子
    // 收摊模块
    sleep(2000);
    click(516, 2150); // 点击我的小摊
    chk = text("我的摊位").depth(16).findOne(2000);
    i = 0;
    if (chk) {
        // 旧版收摊
        /*sleep(2000);
        while (chk = text("收摊").findOne(800)) {
            if (i >= 4) break;
            chk.click();
            i += 1;
            text("确认收摊").waitFor();
            text("确认收摊").findOne().click();
            sleep(1000);
        }
        text("我的摊位").findOne(2000).parent().child(1).click();
        toast_log("🥜收摊 * " + i + "🥜");*/
        // 新版收摊
        className("android.view.View").text("全部收摊").findOne().click();
        if (className("android.view.View").text("确认收摊").findOne(2000)) {
            let tw = className("android.view.View").text("预计收取").findOne(2000);
            if (tw) {
                let dd = tw.parent().child(tw.indexInParent() + 1).text();
                let ts = tw.parent().child(tw.indexInParent() + 3).text().replace(new RegExp("个.*"), " ");
                toast_log("🥜收摊 * " + ts + dd + "颗🥜");
            }
            className("android.view.View").text("确认收摊").findOne().click();
        } else toast_log("🥜无摊可收🥜")
        text("我的摊位").findOne(2000).parent().child(1).click();
    } else toast_log("🥜收摊失败🥜");
    sleep(2000);
    // 摆摊模块
    if (index > 1) {
        click(516, 2150); // 点击我的小摊
        chk = text("我的摊位").depth(16).findOne(2000);
        className("android.view.View").text("随机摆摊").findOne().click();
        if (className("android.view.View").text("待会再说").findOne(1000)) {
            let wait = className("android.view.View").text("待会再说").findOne().parent().parent();
            wait.child(1).click();
        }
        // let top = className("android.widget.Image").text("弹窗头图").findOne().parent();
        // top.child(top.childCount() - 1).child(0).click();
        chk = className("android.widget.Image").text("关闭").findOne(2000);
        if (chk) {
            chk.click();
            toast_log("🥜随机摆摊成功🥜");
        } else toast_log("🥜无摊可摆🥜");
        text("我的摊位").findOne(2000).parent().child(1).click();
    } else {
        click(850, 2150)
        chk = className("android.view.View").text("去好友家摆摊").findOne(2000); // 摆摊界面
        if (chk) {
            chk = className("android.view.View").scrollable(true).findOne(1000); // 好友列表
            let name_l = name_list; // 复制名称列表
            name_l.shift(); // 删除前两个名字
            name_l.shift();
            if (chk) {
                let times = 0;
                chk.children().forEach((child) => {
                    if (child.childCount() == 8 && times < 4) {
                        let nick = child.child(2).text(); // 获取昵称
                        let myFlag = name_l.indexOf(nick) == -1 ? false : true;
                        if (myFlag) {
                            child.click();
                            sleep(3000);
                            click(830, 1630); // 点击+号
                            sleep(100);
                            click(380, 1850); // 点击+号
                            text("我的摊位").waitFor();
                            if (text("去摆摊").findOne(1000)) {
                                text("去摆摊").findOne().click();
                                times++;
                            }
                            goback(1);
                            sleep(500);
                        }
                    }
                });
                toast_log("🥜摆摊 * " + times + "🥜");
                text("去好友家摆摊").findOne(2000).parent().child(1).click();
            } else toast_log("🥜摆摊失败🥜");
        } else toast_log("🥜摆摊失败🥜");
    }
    sleep(2000);
    // 领取工人模块
    click(326, 2150);
    chk = text("加速产豆").depth(16).findOne(2000);
    if (chk) {
        var pat = textContains("每日去好友家摆摊").findOne(500).parent();
        i = 1;
        // 寻找课堂位置
        for (x = 0; x < pat.childCount(); x++) {
            if (pat.child(x).getText().slice(0, 7) == "乡村知识小课堂") {
                i = x + 2;
                break;
            }
        }
        // 进入课堂，开始答题
        if (pat.child(i).childCount()) {
            sleep(1500);
            pat.child(i).children().click();
            text("奖励规则").waitFor();
            sleep(800);
            if (ans) {
                click(540, 1466);
            } else click(540, 1650);
            text("去领取").findOne(1500)
            goback(1);
            pat = textContains("每日去好友家摆摊").findOne(2000).parent();
            // 检测答题得分，并修改ans
            for (x = 0; x < pat.childCount(); x++) {
                if (pat.child(x).getText().slice(0, 7) == "乡村知识小课堂") {
                    i = x + 3;
                }
            }
            if (pat.child(i).getText() != "×3") {
                if (ans == 0) {
                    ans = 1;
                } else and = 0;
            }
        }
        // 其他加速模块
        pat = textContains("每日去好友家摆摊").findOne(500).parent();
        for (x = 0; x < pat.childCount(); x++) {
            // 有“小时”字样，无“助力”字样的进行加速
            if (pat.child(x).text().includes("小时") && !pat.child(x).text().includes("助力") && !pat.child(x - 1).text().includes("摆摊")) {
                if (pat.child(x + 1).childCount()) {
                    pat.child(x + 1).children().click();
                    sleep(1000);
                    if (pat.child(x) && pat.child(x).text().includes("邀请")) {
                        chk = text("邀请开通").depth(16).findOne(2000).parent();
                        if (random(0, 10) % 2) {
                            let flag = 0;
                            for (let i = 9; i < 12; i++) {
                                for (let j = 0; j < chk.childCount() / 3; j++) {
                                    if (chk.child(j * 3 + 1).text() == name_list[i]) {
                                        flag = 1;
                                        chk.child(j * 3 + 2).click();
                                        toast_log("🥜邀请：" + chk.child(j * 3 + 1).text());
                                        break;
                                    }
                                }
                                if (flag) break;
                            }
                        } else {
                            let rand_up = chk.childCount() / 3 >= 7 ? 7 : chk.childCount() / 3
                            let rand = random(1, rand_up);
                            chk.child(rand * 3 - 1).click();
                            toast_log("🥜邀请：" + chk.child(rand * 3 - 2).text());
                        }
                        chk.parent().child(1).child(1).click();
                    } else {
                        if (pat.child(x - 1) && pat.child(x - 1).text().includes("翻翻卡")) sleep(2000);
                        for (let i = 0; i < 2; i++) {
                            goback(1);
                            let chk = text("加速产豆").depth(16).findOne(1500);
                            if (chk) break;
                        }
                    }
                    // 上一步若回退至支付宝首页，重新进入蚂蚁新村
                    if (text("首页").findOne(1000)) {
                        text("蚂蚁新村").depth(dep).findOne(3000).parent().parent().click();
                        sleep(1000);
                        check_elements("关闭", 2);
                        click_close();
                        let chk = images.matchTemplate(captureScreen(), vil_rw, { region: [200, 2000, 800, 330], max: 1 });
                        if (chk.matches.length) {
                            click(chk.matches[0].point.x + 60, chk.matches[0].point.y + 60);
                            text("加速产豆").depth(16).waitFor();
                        }
                    }
                    pat = textContains("每日去好友家摆摊").findOne().parent();
                }
            }
        }
        pat = textContains("每日去好友家摆摊").findOne(500).parent();
        click("领取");
        for (x = 0; x < pat.childCount(); x++) {
            if (pat.child(x).text().includes("小时") && !pat.child(x).text().includes("助力") && !pat.child(x - 1).text().includes("摆摊")) {
                if (today < 5 && pat.child(x).text().includes("周末三")) continue;
                for (i = 1; i < 4; i++) {
                    if ((x + i) < pat.childCount() && pat.child(x + i).text().includes("领取")) {
                        pat.child(x + i).click();
                        sleep(500);
                        break;
                    }
                }
                pat = textContains("每日去好友家摆摊").findOne(500).parent();
            }
        }
        toast_log("🥜加速成功🥜");
        let a = className("android.view.View").clickable(true).depth(16).findOne(1000);
        if (a) a.click();
    } else toast_log("🥜加速失败🥜");
    sleep(1500);
    click(610, 935); // 点击自己的豆子
    backto("首页", "首页");

    // 进入蚂蚁新村确认模块
    function chk_in() {
        chk = images.matchTemplate(captureScreen(), vil_wait, { region: [350, 1000, 350, 300], max: 1 });
        while (chk.matches.length) {
            toast_log("🥜网络差，请等待🥜", 1);
            sleep(500);
            chk = images.matchTemplate(captureScreen(), vil_wait, { region: [350, 1000, 350, 300], max: 1 });
        }
    }
}

//🐤🐤颜色判断🐤🐤
function check_color(img, color, x, y, dis) {
    for (i = 0; i < dis; i++) {
        col = colors.toString(images.pixel(img, (x + i), y));
        if (col == color) {
            return (x + i);
        }
    }
    return 0;
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
    let num = engines.all().length;
    let engines_list = engines.all();
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