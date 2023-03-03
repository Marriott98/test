auto();
// setScreenMetrics(1080, 2340);
// Author: AMII
// UpdateTime: 2023-01-20
// UpdateDesc: 日常维护
// Description: 记录所有人微信运动情况
var dep = 25;
var hig = 2340;
var restart = 0;
var logfile = "./log/log_mi_" + new Date().toLocaleDateString() + ".txt";
var stepLog = "./log/log_mi_WeChat_Step_ALL_NAME.txt";
var sleep_t = random(10, 30);
var nowscript = engines.myEngine().getSource();
var account_list = ["188******31", "159******39", "han***@163.com", "264***@qq.com", "myu***@163.com", "wor***@163.com", "332***@qq.com", "353***@qq.com", "gzh***@163.com", "155******34", "284***@qq.com"];
const cut_line = "==============================================================";

start();
exit();

//🏝🏝开始程序🏝🏝
function start() {
    stop_other_engines();
    let tod = new Date().getDate();
    if (tod == 30 || (tod - 1) % 5 == 0) {
        wake();
        thread_protect();
        request_Screen();
        screen_resolution();
        main();
    } else toast_log("🏃🏃🏃 改日 🏃🏃🏃");
}

//主程序
function main() {
    create_log(logfile);
    create_log(stepLog);
    wechat_sport_all_cli();
    toast_log("🏃🏃🏃Done, 美滋滋~🏃🏃🏃");
    toast_log(cut_line, 2);
    home();
    close_screen();
}

//🏃🏃微信运动统计—所有人
function wechat_sport_all_cli() {
    // 排名 c6_ 昵称 c6d 步数 c5a 点赞数 c5t 爱心 c5u 老版本 c5s
    let now = new Date();
    launchApp("微信");
    sleep(1000);
    remove_app("微信");
    sleep(1000);
    launchApp("微信");
    id("hg4").className("android.view.View").text("哈").waitFor();
    sleep(2000);

    // 进入微信，点击微信运动
    let go_step = threads.start(function() {
        let flag = 0;
        while (true) {
            let chk = id("gkp").findOne();
            chk.children().forEach(function(child) {
                if (child.childCount() && child.className() == "android.widget.LinearLayout") {
                    if (child.child(0).child(1).childCount() && child.child(0).child(1).child(0).child(0).child(0).text() == "微信运动") {
                        child.click();
                        if (id("gru").findOne(1500)) go_step.interrupt();
                        if (id("f2s").className("android.widget.TextView").text("通讯录").exists()) swipe(540, 2000, 540, 500, 200);
                    }
                }
            })
            gesture(500, [540, 1920], [540, 600], [300, 600], [800, 600]);
            flag++;
            if (flag == 10 || flag == 30) {
                for (let i = 0; i < 3; i++) {
                    click(540, 150);
                    sleep(50);
                }
                sleep(1000);
            }
        }
    });
    go_step.join();
    // gesture(1000, [540, 600], [540, 2000], [200, 2000], [540, 2000]);

    // 进入今日步数排行
    let yst = textContains("步数排行榜").findOne(2000);

    if (yst) {
        // yst.parent().parent().click(); // 点击今日步数排行
        // className("android.widget.FrameLayout").clickable(true).findOne().click(); // 点击今日步数排行
        for (let i = 1; i < 5; i++) {
            let sdate = new Date(now.getTime() - i * 24 * 3600 * 1000); // 设置某天日期
            log(sdate);
            // sdate = sdate.toLocaleDateString().split('年')[1]; // 转换为月日
            sm = sdate.getMonth() + 1;
            sd = sdate.getDate();
            if (sd < 10) {
                sd = '0' + sd;
            }
            sdate = sm + '月' + sd + '日';
            log(sdate);
            yst = textContains(sdate).findOne(1000);
            if (yst) {
                yst.parent().click();
                break;
            }
        }
        if (yst) {
            id("cmi").waitFor();
        } else exit();
        let chk = 0;
        // 确保点赞数存在
        for (let i = 0; i < 10; i++) {
            let top = id("cmi").findOne(1000);
            if (top) {
                top.children().forEach(function(child) {
                    if (child.childCount() == 3) {
                        chd = child.child(1).child(1).child(1).child(0).child(0).text();
                        if (chd != "") chk++;
                    }
                });
                if (chk >= 6) break;
            }
            chk = 0;
            sleep(2000);
        }
        sleep(2000);

        // 部分变量设置
        var stepRecord = {};
        chk = 0;
        let date_f = [];
        for (let i = 1; i < 7; i++) {
            let sdate = new Date(now.getTime() - i * 24 * 3600 * 1000); // 设置某天日期
            sdate = sdate.toLocaleDateString().split('年')[1]; // 转换为月日
            date_f.push(sdate);
        }
        stepRecord[0] = date_f;
        let top = id("cmi").findOne(1000);

        // 遍历所有人并记录
        for (let i = 1; i < 300;) {
            if (chk == i) break;
            chk = i;
            top = id("cmi").findOne(1000);
            log(i);
            top.children().forEach(function(child) {
                if (child.childCount() == 3) {
                    let ap = child.child(1);
                    let rank = parseInt(ap.child(0).child(0).child(0).text()); // 排名
                    let nick = ap.child(1).child(0).child(0).child(0).text(); // 昵称
                    // log([i, rank, nick]);
                    if (rank == i) {
                        ap.child(0).click(); // 点击头像
                        id("clm").waitFor(); // 等待主页
                        id("bz7").findOne().click(); // 点击日期
                        id("iiq").waitFor(); // 等待列表
                        sleep(1000);
                        id("k1r").waitFor(); // 等待步数
                        let full = id("iiq").findOne();
                        let stepObj = {}; // 步数数据
                        for (let j = 1; j < full.childCount(); j++) {
                            let dat = full.child(j).findOne(id("bz7")).text(); // 日期
                            let step_data_top = full.child(j).child(0).child(1).child(0);
                            let step = parseInt(step_data_top.child(1).text()); // 步数
                            let like = parseInt(step_data_top.child(3).text()); // 点赞数
                            let apt = full.child(j).findOne(id("jzq")); // 手表大框
                            if (apt.childCount()) {
                                let yt = apt.findOne(id("x3")).text() + ":"; // 手表类型
                                let allTXT = apt.find(className("android.widget.TextView")); // 所有文本控件
                                for (let i = 0; i < allTXT.length - 1; i++) {
                                    if ((i + 1) % 3) {
                                        yt += allTXT[i].text() + ' '
                                    } else yt += allTXT[i].text() + ','
                                }
                                if (yt.slice(-1) == ",") {
                                    stepObj[dat] = [step, like, yt.slice(0, -1)]; // 存入数据
                                } else stepObj[dat] = [step, like, yt]; // 存入数据
                            } else stepObj[dat] = [step, like]; // 存入数据
                        }
                        let stl = Object.keys(stepObj).length
                        while ((nick != "奇遇" && Object.keys(stepObj).length < 6) || (nick == "奇遇" && Object.keys(stepObj).length < 30)) {
                            if (stl < 5) {
                                gesture(300, [540, 1920], [540, 300], [200, 300], [540, 300]);
                            } else gesture(300, [540, 1920], [540, 1060], [200, 1060], [540, 1060]);
                            sleep(200);
                            full = id("iiq").findOne();
                            for (let j = 0; j < full.childCount(); j++) {
                                let dat = full.child(j).findOne(id("bz7")).text(); // 日期
                                let step_data_top = full.child(j).child(0).child(1).child(0);
                                let step = parseInt(step_data_top.child(1).text()); // 步数
                                let like = parseInt(step_data_top.child(3).text()); // 点赞数
                                let apt = full.child(j).findOne(id("jzq")); // 手表大框
                                if (apt.childCount()) {
                                    let yt = apt.findOne(id("x3")).text() + ":"; // 手表类型
                                    let allTXT = apt.find(className("android.widget.TextView")); // 所有文本控件
                                    for (let i = 0; i < allTXT.length - 1; i++) {
                                        if ((i + 1) % 3) {
                                            yt += allTXT[i].text() + ' '
                                        } else yt += allTXT[i].text() + ','
                                    }
                                    if (yt.slice(-1) == ",") {
                                        stepObj[dat] = [step, like, yt.slice(0, -1)]; // 存入数据
                                    } else stepObj[dat] = [step, like, yt]; // 存入数据

                                } else stepObj[dat] = [step, like]; // 存入数据
                            }
                        }
                        let steps = [];
                        for (j in stepObj) {
                            steps.push(stepObj[j])
                        }
                        stepRecord[nick] = steps;
                        toast_log([rank, nick, steps], 1);
                        back();
                        sleep(200);
                        back();
                        sleep(500);
                        i++;
                    }
                }
            });
            gesture(500, [540, 1920], [540, 200], [200, 200], [540, 200]);
        }
        toast_log(JSON.stringify(stepRecord), 1, stepLog);
    }
}

//🧭🧭寻找并进入指定名字
function goto_name(name, distan, tim, slp) {
    if (!distan) distan = 800;
    if (!tim) tim = 500;
    if (!slp) slp = 2000;
    sleep(slp);
    // toast_log("😏😏寻找" + name + "😏😏",1);
    for (var i = 0; i < 50; i += 1) {
        sleep(slp);
        if (textContains(name).exists()) {
            if (textContains(name).findOne(3000).bounds().centerY() < 2333) break;
        }
        gesture(tim, [540, 2000], [540, 2000 - distan], [300, 2000 - distan], [800, 2000 - distan]);
    }
    sleep(slp);
    cl = textContains(name).findOne(10000);
    // toast_log("😏😏goto " + name + "😏😏",1);
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