auto();
// setScreenMetrics(1080, 2340);
// Author: AMII
// UpdateTime: 2023-01-20
// UpdateDesc: 每记录xx位好友写入临时文件，获取前获取临时文件数据，避免重复记录
// Description: 记录好友信息，包括昵称、微信号、共同群、个性签名等
var hig = 2340;
var num = 20;
var sleep_t = random(0, 30);
var logfile = "./log/log_mi_" + new Date().toLocaleDateString() + ".txt";
var tempfile = "./log/log_mi_weChatCon_temp.txt";
const cut_line = "==============================================================";
var nowscript = engines.myEngine().getSource();


start();
exit();

//🏝🏝开始程序🏝🏝
function start() {
    stop_other_engines();
    wake();
    thread_protect(80);
    request_Screen();
    screen_resolution();
    main();
}

//主程序
function main() {
    create_log(logfile);
    create_log("./log/log_mi_weChatCon.txt");
    let tod = new Date().getDate();
    if (tod % 1 == 0) {
        toast_log("😎😎😎记录微信好友信息😎😎😎");
        weChatCon();
        toast_log("😎😎😎Done, 美滋滋~😎😎😎");
        home();
    }
    files.remove(tempfile);
    close_screen();
}

//😎😎微信联系人记录
function weChatCon() {
    let allData = {};
    let myself = "HQY-98326";
    let allName = [];
    // allData[0] = new Date().toLocaleDateString();
    if (files.exists(tempfile)) {
        allData = JSON.parse(files.read(tempfile, encoding = "utf-8"));
        for (let i in allData) {
            allName.push(allData[i][0]);
        }
    }
    launchApp("微信");
    sleep(1000);
    remove_app("微信");
    sleep(1000);
    launchApp("微信");
    id("hg4").className("android.view.View").text("哈").waitFor();
    sleep(2000);
    swipe(600, 800, 500, 800, 80);
    sleep(1000);
    let ot = 0;
    while (true) {
        if (ot) break;
        top = id("js").findOne();
        all = top.find(id("bqy"));
        for (let i = 0; i < all.length; i++) {
            allName = []
            for (let i in allData) {
                allName.push(allData[i][0]);
            }
            let name = all[i].findOne(id("hg4")).text();
            // toast_log(name, 1);
            if (allName.indexOf(name) != -1) {
                toast_log("skip " + name, 1);
                continue;
            }
            all[i].parent().parent().click();
            if (!id("bq1").findOne(1000)) {
                if (id("bo9").exists()) {
                    goback(1, 1000);
                    continue;
                } else id("bq1").waitFor();
            }
            name = id("bq1").findOne().text();
            let nick = id("bq0").findOne(500);
            if (nick) {
                nick = nick.text().slice(5);
            } else nick = name;
            let wid = id("bq9").findOne(500);
            if (wid) {
                wid = wid.text().slice(6);
            } else wid = "NULL";
            if (id("bq8").exists()) wid += "_" + name;
            let addr = id("bpz").findOne(500);
            if (addr) {
                addr = addr.text().slice(5);
            } else addr = "NULL";
            sleep(200);
            if (wid == "filehelper") {
                goback(1, 1000);
                continue;
            }
            id("android:id/title").text("更多信息").findOne().parent().parent().parent().parent().parent().parent().click();
            let comNum = 0;
            // log(wid);
            if (wid == myself) {
                if (!id("jle").findOne(1000)) {
                    toast_log(name + "点击更多信息失败", 1);
                    recents();
                    sleep(1000);
                    goback(1, 1000);
                    id("android:id/title").text("更多信息").findOne().parent().parent().parent().parent().parent().parent().click();
                }
                id("jle").waitFor();
            } else {
                if (!id("bkd").findOne(1000)) {
                    toast_log(name + "点击更多信息失败", 1);
                    recents();
                    sleep(1000);
                    goback(1, 1000);
                    id("android:id/title").text("更多信息").findOne().parent().parent().parent().parent().parent().parent().click();
                }
                id("bkd").waitFor();
                comNum = parseInt(id("bkd").findOne().findOne(id("bpi")).text().slice(0, -1));
            }
            let com = [];
            com[0] = comNum;
            let sign = id("jle").findOne(500);
            if (sign) {
                sign = sign.findOne(id("bpi")).text();
            } else sign = "NULL";
            let way = id("efn").findOne(500);
            if (way) {
                way = way.findOne(id("bpi")).text();
            } else way = "NULL";
            if (comNum) {
                id("bkd").findOne().click();
                if (!id("kpm").findOne(1000)) {
                    recents();
                    sleep(1000);
                    goback(1, 1000);
                    id("bkd").findOne().click();
                }
                id("kpm").waitFor();
                let g = id("j9m").findOne().find(id("kpm"));
                let flag = 0;
                for (let i = 0; i < g.length; i++) com.push(g[i].text());
                while (com.length <= comNum) {
                    if (flag > 10) {
                        toast_log("疑似有同名群聊", 1);
                        break;
                    };
                    gesture(400, [540, 1920], [540, 1000], [300, 1000], [800, 1000]);
                    sleep(1000);
                    g = id("j9m").findOne().find(id("kpm"));
                    for (let i = 0; i < g.length; i++) {
                        if (com.indexOf(g[i].text()) == -1) com.push(g[i].text());
                    };
                };
                goback(1, 200);
            };
            toast_log([name, wid, com[0]], 1);
            goback(2, 200);
            allData[wid] = [name, nick, addr, com, sign, way];
            if (i % num == 0) {
                files.write(tempfile, JSON.stringify(allData));
            }
            if (id("bmm").findOne(500)) ot = 1;
        }
        gesture(400, [540, 2020], [540, 200], [300, 200], [800, 200]);
    }
    toast_log(JSON.stringify(allData), 1, "./log/log_mi_weChatCon.txt");
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

//打开支付宝某功能
function open_func(num) {
    var func = [20000085, 60000002, 66666674, 66666782, 20000869, 20000166]
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=" + func[num]
    });
}

//⛔⛔停止其他脚本
function stop_other_engines() {
    let num = engines.all().length;
    let engines_list = engines.all();
    for (var x = 0; x < num; x += 1) {
        if (engines_list[x] != engines.myEngine()) engines_list[x].forceStop();
    }
}