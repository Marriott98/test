auto();
// setScreenMetrics(1080, 2340);
// Author: AMII
// UpdateTime: 2023-01-20
// UpdateDesc: 日常维护
// Description: 收取能量
var dep = 25;
var hig = 2340;
var restart = 0;
var logfile = "./log/log_mi_" + new Date().toLocaleDateString() + ".txt";
var sleep_t = random(10, 180);
var nowscript = engines.myEngine().getSource();
var account_list = ["188******31", "159******39", "han***@163.com", "264***@qq.com", "myu***@163.com", "wor***@163.com", "332***@qq.com", "353***@qq.com", "gzh***@163.com", "155******34", "284***@qq.com"];

var PIC_ENERGY = images.read("./jpg/森林-能量.jpg");
var PIC_FREE = images.read("./jpg/森林-浇.jpg");
var PIC_HELP = images.read("./jpg/森林-提醒.jpg");
var PIC_WAIT_1 = images.read("./jpg/森林-00.01.jpg");
var PIC_WAIT_2 = images.read("./jpg/森林-00.02.jpg");
var PIC_JOB = images.read("./jpg/森林-任务.jpg");
var PIC_L = images.read("./jpg/森林-左翅.jpg");
var PIC_R = images.read("./jpg/森林-右翅.jpg");
if (new Date().getHours() >= 18 || new Date().getHours() <= 6) {
    PIC_WAIT_1 = images.read("./jpg/森林-00.01-y.jpg");
    PIC_L = images.read("./jpg/森林-左翅-y.jpg");
    PIC_R = images.read("./jpg/森林-右翅-y.jpg");
}
const cut_line = "==============================================================";

start();
PIC_ENERGY.recycle();
PIC_FREE.recycle();
PIC_HELP.recycle();
PIC_WAIT_1.recycle();
PIC_WAIT_2.recycle();
PIC_JOB.recycle();
PIC_L.recycle();
PIC_R.recycle();
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
    for (var j = 0; j < 2; j += 1) {
        switch_account(account_list[j]);
        collect_myEnergy(1);
    }
    if ((new Date().getDate() % 4) == 0) {
        for (var j = 2; j < 8; j += 1) {
            if (j == 5) {
                switch_account(account_list[0]);
                cancel_up();
                remove_app("支付宝");
                switch_another_alipay();
            }
            switch_account(account_list[j]);
            collect_myEnergy(1);
        }
    } else switch_account(account_list[0]);
    remove_app("支付宝");
    toast_log("🐱🐱🐱Done, 美滋滋~🐱🐱🐱");
    toast_log(cut_line, 2);
    home();
    close_screen();
}

//😏😏收集能量~😏😏
function collect_myEnergy(typ, num, tim) {
    if (!num) num = 1;
    if (!tim) tim = 0;
    sleep(1000);
    text("蚂蚁森林").depth(dep).findOne(3000).parent().parent().click();
    toast_log("🐱🐱进入蚂蚁森林🐱🐱");
    sleep(3000);
    click_close();
    toast_log("🐱🐱收能量🐱🐱");
    chk = images.matchTemplate(captureScreen(), PIC_L, { region: [150, 500, 780, 350] });
    if (chk.best()) {
        click(chk.best().point.x + 80, chk.best().point.y + 70);
    } else {
        chk = images.matchTemplate(captureScreen(), PIC_R, { region: [150, 500, 780, 350] });
        if (chk.best()) click(chk.best().point.x - 40, chk.best().point.y + 70);
    }
    sleep(1000);
    if (text("立即收取").exists()) {
        click("立即收取");
        sleep(1000);
    }
    log('aa');
    if (typ) click_energy("去保护", num, tim);
    if (typ) click_free_energy();
    chk = images.matchTemplate(captureScreen(), PIC_JOB, { region: [300, 1450, 150, 200] });
    if (chk.best()) {
        click(chk.best().point.x + 20, chk.best().point.y + 20);
        sleep(1500);
        click("立即领取");
        swipe(540, 2000, 540, 1000, 500);
        sleep(1000);
        click("立即领取");
        click("去看看");
        sleep(1000);
    }
    toast_log("🐱🐱能量已收完🐱🐱");
    backto("生活", "扫一扫");
}

//😏😏点击能量😏😏
function click_energy(mess, num, tim) {
    if (!num) num = 1;
    if (!tim) tim = 0;
    var sscore = 0;
    var escore = 0;
    check_elements(mess, 1);
    nid = textContains("的蚂蚁森林").findOne(2000);
    if (nid) {
        nid = nid.getText().split("的蚂蚁森林")[0];
    } else nid = "蚂蚁森林";
    if (textContains("去保护").exists()) {
        tmp = textMatches("\\d+g").untilFind();
        sscore = parseInt(tmp[0].getText());
    } else {
        tmp = textContains("你收取TA").untilFind()[0].getText();
        sscore = parseInt(tmp.split(' ')[1].replace('g', ''));
    }
    click_energy_energy(0, 0, num, 0);
    if (tim) { //是否持续收能量
        tim_now = new Date().getTime(); //开始时刻
        if (chk_close = id("J_pop_treedialog_close").findOne(2000)) chk_close.click();
        img = captureScreen();
        click_energy_energy(img, PIC_ENERGY);
        chk_wait = click_energy_best(img);
        click_energy_energy();
        if (chk_wait && (chk_wait.best().similarity > 0.85)) {
            if (new Date().getTime() < startTime) sleep(startTime - new Date().getTime());
            var getEng = threads.start(function() {
                while (true) {
                    img = captureScreen();
                    fin = findColorInRegion(img, PIC_ENERGY_COL, 150, 550, 800, 275);
                    if (fin) {
                        for (var n = 0; n < 3; n++) click(fin.x, fin.y);
                        click_energy_energy();
                        toast_log("Got U~", 1);
                        return true;
                    }
                }
            })
            sleep(tim * 1000);
            toast_log("停止所有进程", 1);
            getEng.interrupt();
        } else {
            if (!chk_wait) chk_wait = images.matchTemplate(PIC_CHK, PIC_WAIT_1, { region: [150, 580, 780, 250], threshold: 0.5, max: 10 });
            for (j = 0; j < 233; j++) {
                for (k = 0; k < 30; k++) {
                    for (l = 0; l < chk_wait.matches.length; l++) {
                        click(chk_wait.matches[l].point.x + 30, chk_wait.matches[l].point.y - 10);
                    }
                }
                chk_wait = click_energy_best(captureScreen());
                if ((new Date().getTime() - tim_now) > (tim * 1000)) return true;
                if (!chk_wait) return true;
            }
        }
    }
    if (textContains("去保护").exists()) {
        tmp = textMatches("\\d+g").untilFind();
        escore = parseInt(tmp[0].getText());
    } else {
        tmp = tmp = textContains("你收取TA").untilFind()[0].getText();
        escore = parseInt(tmp.split(' ')[1].replace('g', ''));
    }
    if (escore != sscore) toast_log("🙈🙈" + nid + "：" + escore + "，" + sscore + "，" + (escore - sscore) + "🙈🙈");
}

//😏😏点击所有可收获能量😏😏
function click_energy_energy(img, im, tim, sml) {
    if (!img) img = captureScreen();
    if (!im) im = PIC_ENERGY;
    if (!tim) tim = 1;
    if (!sml) sml = 0.95;
    eng_col = "#ffdeff00";
    eng_col_1 = '#ffbdd800';
    chk = findColorEquals(img, eng_col, 150, 580, 780, 250);
    if (!chk && new Date().getHours() > 6) {
        return 0;
    }
    chk = images.matchTemplate(img, im, { region: [150, 580, 780, 250], threshold: sml, max: 10 });
    if (!chk.best()) chk = images.matchTemplate(img, im, { region: [150, 580, 780, 250], threshold: (sml - 0.15), max: 10 });
    if (chk.best()) {
        for (i = 0; i < tim; i++) {
            for (j = 0; j < chk.matches.length; j++) {
                click(chk.matches[j].point.x + 30, chk.matches[j].point.y - 15);
                sleep(100);
            }
            sleep(600);
        }
    } else return 0;
}

//😏😏匹配返回较为相似的能量球位置😏😏
function click_energy_best(img) {
    if (!img) img = captureScreen();
    chk_wait_1 = images.matchTemplate(img, PIC_WAIT_1, { region: [150, 580, 780, 250], threshold: 0.75 });
    chk_wait_2 = images.matchTemplate(img, PIC_WAIT_2, { region: [150, 580, 780, 250], threshold: 0.75 });
    chk_eng = images.matchTemplate(img, PIC_ENERGY, { region: [150, 580, 780, 250], threshold: 0.6 })
    if (chk_wait_1.best()) {
        chk_1_s = chk_wait_1.best().similarity;
        toast_log(chk_wait_1.best().similarity, 1);
    } else chk_1_s = 0;
    if (chk_wait_2.best()) {
        chk_2_s = chk_wait_2.best().similarity;
        toast_log(chk_wait_2.best().similarity, 1);
    } else chk_2_s = 0;
    if (chk_1_s || chk_2_s) {
        if (chk_1_s > chk_2_s) {
            toast_log("chk_wait_1 更为相似");
            return chk_wait_1;
        } else {
            toast_log("chk_wait_2 更为相似");
            return chk_wait_2;
        }
    } else {
        if (chk_eng.best()) {
            toast_log("chk_eng 更为相似");
            toast_log(chk_eng.best().similarity, 1);
            return chk_eng;
        }
        toast_log("无匹配项");
        images.save(captureScreen(), "./jpg/log/err_" + get_time().replace(new RegExp(":", "g"), "-").trim() + ".jpg", "jpg", 60);
        return 0;
    }
}

//😏😏点击浇水的能量😏😏
function click_free_energy() {
    var b = 0;
    for (var j = 0; j < 15; j++) {
        chk = images.matchTemplate(captureScreen(), PIC_FREE, { region: [180, 400, 320, 200], threshold: 0.5 });
        if (chk.best()) {
            for (var i = 0; i < 5; i += 1) {
                click(chk.matches[0].point.x + 30, chk.matches[0].point.y + 30);
                sleep(500);
            }
        } else {
            b++;
            if (b > 5) return 0;
        }
        sleep(500);
    }
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
function thread_protect() {
    threads.start(function() {
        setInterval(() => {
            toast_log("♨♨♨运行超30分钟，退出脚本♨♨♨");
            exit();
        }, 35 * 60 * 1000);
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
function goback(num) {
    for (var i = 0; i < num; i += 1) {
        back();
        sleep(1500);
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