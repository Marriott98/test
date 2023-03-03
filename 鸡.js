auto();
// setScreenMetrics(1080, 2340);
// Author: AMII
// UpdateTime: 2023-01-20
// UpdateDesc: 日常维护
// Description: 喂鸡并拿肥料、逛金币等
var dep = 25;
var hig = 2340;
var restart = 0;
var logfile = "./log/log_mi_" + new Date().toLocaleDateString() + ".txt";
var sleep_t = random(10, 180);
var nowscript = engines.myEngine().getSource();
var account_list = ["188******31", "159******39", "han***@163.com", "264***@qq.com", "myu***@163.com", "wor***@163.com", "332***@qq.com", "353***@qq.com", "gzh***@163.com", "155******34", "284***@qq.com"];
var PIC_SPORT = images.read("./jpg/庄园-运动会.jpg");
var PIC_BALL = images.read("./jpg/庄园-星星球.jpg");
var PIC_RED = images.read("./jpg/庄园-红.jpg");
var PIC_STD = images.read("./jpg/庄园-课堂.jpg");
var PIC_WIN = images.read("./jpg/庄园-橱窗.jpg");
var PIC_GET = images.read("./jpg/庄园-领取.jpg");
var PIC_GOLD = images.read("./jpg/庄园-逛金币.jpg");
const cut_line = "==============================================================";

start();
PIC_SPORT.recycle();
PIC_BALL.recycle();
PIC_RED.recycle();
PIC_GOLD.recycle();
PIC_WIN.recycle();
PIC_GET.recycle();
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
    var x = 0;
    create_log(logfile);
    clean_reopen_alipay();
    cancel_up();
    switch_account(account_list[0]);
    check_depth();
    toast_log("🐤🐤🐤喂鸡时间到~🐤🐤🐤");
    feed();
    remove_app("支付宝");
    toast_log("🐤🐤🐤Done, 美滋滋~🐤🐤🐤");
    toast_log(cut_line, 2);
    home();
    close_screen();
}

//🐤🐤喂鸡🐤🐤
function feed() {
    sleep(2000);
    text("蚂蚁庄园").depth(dep).findOne(3000).parent().parent().click();
    toast_log("🐤🐤进入蚂蚁庄园🐤🐤");
    sleep(2000);
    check_elements("关闭", 2);
    click_close();
    sleep(3000);
    feed_gohome(); //确保小鸡在家
    sleep(1500);
    click(930 + random(-20, 20), hig - 190 + random(-20, 20)); //喂饲料
    sleep(1500);
    click_close();
    toast_log("🐤🐤成功喂养🐤🐤");
    sleep(1500);
    click(750 + random(-20, 20), hig / 2 + 700 + random(-20, 20)); //点铲子
    sleep(1500);
    click(256 + random(-70, 90), hig / 2 + 170 + random(-50, 50)); //领肥料
    toast_log("🐤🐤领取肥料🐤🐤");
    goback(1);
    sleep(2000);
    if (new Date().getHours() == 21) { //特定时间答题、逛橱窗
        click(330, hig - 190);
        sleep(3000);
        let clist = className("android.widget.ListView").findOne(1000);
        let listCount = clist.childCount();
        for (let i = 0; i < listCount; i++) {
            // 点击饲料任务
            function middle_click(num) {
                sleep(1500);
                clist = className("android.widget.ListView").findOne(1000);
                if (num == 5 && clist.child(i).childCount() == 6) return false;
                tmp = clist.child(i).child(num);
                dis = tmp.bounds().centerY() - 1500;
                while (Math.abs(dis) > 500) {
                    gesture(500, [540, 1500], [540, 1500 - dis], [100, 1500 - dis], [800, 1500 - dis]);
                    clist = className("android.widget.ListView").findOne(1000);
                    tmp = clist.child(i).child(num);
                    dis = tmp.bounds().centerY() - 1500;
                }
                click(tmp.bounds().centerX(), tmp.bounds().centerY());
                sleep(1500);
                if (num == 5) feed_full();
                clist = className("android.widget.ListView").findOne(1000);
            }
            // 饲料满否检测
            function feed_full() {
                let chk = className("android.view.View").textContains("饲料袋").findOne(2000);
                if (chk) {
                    goback(1);
                    i++;
                }
                if (i > 0) i--;
                if (i > 0) i--;
            }
            let tmp = 0;
            let dis = 0;
            if (clist.child(i).childCount() == 0) continue;
            if (i == 0 && clist.child(0).childCount() == 5) {
                tmp = clist.child(0).child(4);
                click(tmp.bounds().centerX(), tmp.bounds().centerY());
                feed_full();
            }
            if (clist.child(i).child(2).text().includes("金币") && clist.child(i).child(4).text() == "去完成") {
                middle_click(4);
                sleep(5000);
                goback(2);
                // goback(1);
                // if (!text("蚂蚁庄园").exists()) goback(1);
                toast_log("🐤🐤金币🐤🐤");
                middle_click(5);
            };
            if (clist.child(i).child(2).text().includes("课堂") && clist.child(i).child(4).text() == "去答题") {
                middle_click(4);
                textContains("题目").waitFor();
                sleep(1000);
                let a = random(1, 10);
                if (a > 5) {
                    click(540, 1420);
                } else click(540, 1620);
                toast_log("🐤🐤" + a + "🐤🐤", 1);
                sleep(1000);
                goback(1);
                toast_log("🐤🐤答题🐤🐤");
                middle_click(5);
            };
            if (clist.child(i).child(2).text().includes("施肥") && clist.child(i).child(4).text() == "去完成") {
                middle_click(4);
                // id("tmfarm-game-box").waitFor();
                sleep(4000);
                let a = className("android.view.View").textContains("抽取今日").findOne(1000);
                if (a) a.click();
                click(540, hig - 420);
                sleep(500);
                click(540, hig - 420);
                sleep(1000);
                goback(1);
                toast_log("🐤🐤施肥🐤🐤");
                middle_click(5);
            };
            if (clist.child(i).find(text("领取")).length) {
                middle_click(5);
            };
        }
    }
    backto("生活", "扫一扫");
}

//🐤🐤寻找并找回小鸡🐤🐤
function feed_gohome() {
    var chk = images.matchTemplate(captureScreen(), PIC_SPORT, { region: [900, 750, 150, 150], max: 1 });
    while (!chk.matches.length) { //确保在庄园
        backto("生活", "扫一扫");
        text("蚂蚁庄园").depth(dep).findOne(3000).parent().parent().click();
        sleep(2000);
        check_elements("关闭", 2);
        click_close();
        sleep(1500);
        chk = images.matchTemplate(captureScreen(), PIC_SPORT, { region: [900, 750, 150, 150], max: 1 });
    }
    click(540, hig / 2 + 150);
    sleep(2000);
    if (textEndsWith("的蚂蚁庄园").exists()) {
        img = captureScreen();
        chk = check_color(img, "#ffffde00", 300, hig / 2 + 185, 700);
        if (chk) {
            if (chk > 540) {
                click(850, hig / 2 + 430);
            } else click(400, hig / 2 + 430);
        } else {
            click(850, hig / 2 + 430);
            click(400, hig / 2 + 430);
        }
        sleep(1500);
        for (j = 0; j < 2; j++) {
            img = captureScreen();
            red = "#FFFF3C45";
            chk = findColorEquals(img, red, 450, hig / 2 + 230, 200, 150);
            if (chk) click(chk.x + 10, chk.y + 10);
            sleep(1500);
        }
        sleep(1500);
        toast_log("🐤🐤小鸡回到家咯~🐤🐤");
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