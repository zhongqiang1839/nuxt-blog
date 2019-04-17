import Vue from "vue";
import { FN_MESSAGE } from '~/utils/constant.js'

if (process.client) {
  window.live2d_settings = Array();
  // 后端接口
  live2d_settings["modelAPI"] = "//live2d.fghrsh.net/api/"; // 自建 API 修改这里
  live2d_settings["hitokotoAPI"] = "lwl12.com"; // 一言 API，可选 'lwl12.com', 'hitokoto.cn', 'jinrishici.com'(古诗词)
  // 默认模型
  live2d_settings["modelId"] = "5-0"; // 默认模型 ID，可在 F12 控制台找到
  live2d_settings["modelTexturesId"] = 53; // 默认材质 ID，可在 F12 控制台找到
  // 工具栏设置
  live2d_settings["showToolMenu"] = true; // 显示 工具栏          ，可选 true(真), false(假)
  live2d_settings["canCloseLive2d"] = true; // 显示 关闭看板娘  按钮，可选 true(真), false(假)
  live2d_settings["canSwitchModel"] = false; // 显示 模型切换    按钮，可选 true(真), false(假)
  live2d_settings["canSwitchTextures"] = false; // 显示 材质切换    按钮，可选 true(真), false(假)
  live2d_settings["canSwitchHitokoto"] = false; // 显示 一言切换    按钮，可选 true(真), false(假)
  live2d_settings["canTakeScreenshot"] = false; // 显示 看板娘截图  按钮，可选 true(真), false(假)
  live2d_settings["canTurnToHomePage"] = false; // 显示 返回首页    按钮，可选 true(真), false(假)
  live2d_settings["canTurnToAboutPage"] = false; // 显示 跳转关于页  按钮，可选 true(真), false(假)
  // 模型切换模式
  live2d_settings["modelStorage"] = true; // 记录 ID (刷新后恢复)，可选 true(真), false(假)
  live2d_settings["modelRandMode"] = "switch"; // 模型切换，可选 'rand'(随机), 'switch'(顺序)
  live2d_settings["modelTexturesRandMode"] = "rand"; // 材质切换，可选 'rand'(随机), 'switch'(顺序)
  // 提示消息选项
  live2d_settings["showHitokoto"] = true; // 显示一言
  live2d_settings["showF12Status"] = false; // 显示加载状态
  live2d_settings["showF12Message"] = false; // 显示看板娘消息
  live2d_settings["showF12OpenMsg"] = false; // 显示控制台打开提示
  live2d_settings["showCopyMessage"] = true; // 显示 复制内容 提示
  live2d_settings["showWelcomeMessage"] = true; // 显示进入面页欢迎词
  //看板娘样式设置
  live2d_settings["waifuSize"] = "200x220"; // 看板娘大小，例如 '280x250', '600x535'
  live2d_settings["waifuTipsSize"] = "160x30"; // 提示框大小，例如 '250x70', '570x150'
  live2d_settings["waifuFontSize"] = "12px"; // 提示框字体，例如 '12px', '30px'
  live2d_settings["waifuToolFont"] = "14px"; // 工具栏字体，例如 '14px', '36px'
  live2d_settings["waifuToolLine"] = "20px"; // 工具栏行高，例如 '20px', '36px'
  live2d_settings["waifuToolTop"] = "-10px"; // 工具栏顶部边距，例如 '0px', '-60px'
  live2d_settings["waifuMinWidth"] = "disable"; // 面页小于 指定宽度 隐藏看板娘，例如 'disable'(禁用), '768px'
  live2d_settings["waifuEdgeSide"] = "left: 0"; // 看板娘贴边方向，例如 'left:0'(靠左 0px), 'right:30'(靠右 30px)
  live2d_settings["waifuDraggable"] = "disable"; // 拖拽样式，例如 'disable'(禁用), 'axis-x'(只能水平拖拽), 'unlimited'(自由拖拽)
  live2d_settings["waifuDraggableRevert"] = true; // 松开鼠标还原拖拽位置，可选 true(真), false(假)

  // 其他杂项设置
  live2d_settings["l2dVersion"] = "1.4.2"; // 当前版本
  live2d_settings["l2dVerDate"] = "2018.11.12"; // 版本更新日期
  live2d_settings["homePageUrl"] = "auto"; // 主页地址，可选 'auto'(自动), '{URL 网址}'
  live2d_settings["aboutPageUrl"] = "https://www.fghrsh.net/post/123.html"; // 关于页地址, '{URL 网址}'
  live2d_settings["screenshotCaptureName"] = "live2d.png"; // 看板娘截图文件名，例如 'live2d.png'

  /****************************************************************************************************/

  String.prototype.render = function(context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function(word, slash1, token, slash2) {
      if (slash1 || slash2) {
        return word.replace("\\", "");
      }

      var variables = token.replace(/\s/g, "").split(".");
      var currentObject = context;
      var i, length, variable;

      for (i = 0, length = variables.length; i < length; ++i) {
        variable = variables[i];
        currentObject = currentObject[variable];
        if (currentObject === undefined || currentObject === null) return "";
      }
      return currentObject;
    });
  };

  var re = /x/;

  const empty = obj => typeof obj == "undefined" || obj == null || obj == "" ? true : false;

  const getRandText = text => Array.isArray(text)
    ? text[Math.floor(Math.random() * text.length + 1) - 1]
    : text;

  const showMessage = (text, timeout, flag) => {
    if (
      flag ||
      sessionStorage.getItem("waifu-text") === "" ||
      sessionStorage.getItem("waifu-text") === null
    ) {
      if (Array.isArray(text))
        text = text[Math.floor(Math.random() * text.length + 1) - 1];
      if (live2d_settings.showF12Message)
        console.log("[Message]", text.replace(/<[^<>]+>/g, ""));

      if (flag) sessionStorage.setItem("waifu-text", text);

      $(".waifu-tips").stop();
      $(".waifu-tips")
        .html(text)
        .fadeTo(200, 1);
      if (timeout === undefined) timeout = 5000;
      hideMessage(timeout);
    }
  };

  const hideMessage = timeout => {
    $(".waifu-tips")
      .stop()
      .css("opacity", 1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function() {
      sessionStorage.removeItem("waifu-text");
    }, timeout);
    $(".waifu-tips")
      .delay(timeout)
      .fadeTo(200, 0);
  };

  window.loadModel = (modelId, modelTexturesId = 0) => {
    if (live2d_settings.modelStorage) {
      localStorage.setItem("modelId", modelId);
      localStorage.setItem("modelTexturesId", modelTexturesId);
    } else {
      sessionStorage.setItem("modelId", modelId);
      sessionStorage.setItem("modelTexturesId", modelTexturesId);
    }
    loadlive2d(
      "live2d",
      live2d_settings.modelAPI + "get/?id=" + modelId + "-" + modelTexturesId,
      live2d_settings.showF12Status
        ? console.log()
        : null
    );
  }

  window.loadTipsMessage = (result) => {
    window.waifu_tips = result;

    $.each(result.mouseover, function(index, tips) {
      $(document).on("mouseover", tips.selector, function() {
        var text = getRandText(tips.text);
        text = text.render({ text: $(this).text() });
        showMessage(text, 3000);
      });
    });
    $.each(result.click, function(index, tips) {
      $(document).on("click", tips.selector, function() {
        var text = getRandText(tips.text);
        text = text.render({ text: $(this).text() });
        showMessage(text, 3000, true);
      });
    });
    $.each(result.seasons, function(index, tips) {
      var now = new Date();
      var after = tips.date.split("-")[0];
      var before = tips.date.split("-")[1] || after;
      if (
        after.split("/")[0] <= now.getMonth() + 1 &&
        now.getMonth() + 1 <= before.split("/")[0] &&
        (after.split("/")[1] <= now.getDate() &&
          now.getDate() <= before.split("/")[1])
      ) {
        var text = getRandText(tips.text);
        text = text.render({ year: now.getFullYear() });
        showMessage(text, 6000, true);
      }
    });

    if (live2d_settings.showF12OpenMsg) {
      re.toString = function() {
        showMessage(getRandText(result.waifu.console_open_msg), 5000, true);
        return "";
      };
    }

    if (live2d_settings.showCopyMessage) {
      $(document).on("copy", function() {
        showMessage(getRandText(result.waifu.copy_message), 5000, true);
      });
    }

    $(".waifu-tool .fui-photo").click(function() {
      showMessage(getRandText(result.waifu.screenshot_message), 5000, true);
      window.Live2D.captureName = live2d_settings.screenshotCaptureName;
      window.Live2D.captureFrame = true;
    });

    $(".waifu-tool .fui-cross").click(function() {
      sessionStorage.setItem("waifu-dsiplay", "none");
      showMessage(getRandText(result.waifu.hidden_message), 1300, true);
      window.setTimeout(function() {
        $(".waifu").hide();
      }, 1300);
    });

    window.showWelcomeMessage = function(result) {
      var text;
      if (window.location.href == live2d_settings.homePageUrl) {
        var now = new Date().getHours();
        if (now > 23 || now <= 5)
          text = getRandText(result.waifu.hour_tips.t23 - 5);
        else if (now > 5 && now <= 7)
          text = getRandText(result.waifu.hour_tips.t5 - 7);
        else if (now > 7 && now <= 11)
          text = getRandText(result.waifu.hour_tips.t7 - 11);
        else if (now > 11 && now <= 14)
          text = getRandText(result.waifu.hour_tips.t11 - 14);
        else if (now > 14 && now <= 17)
          text = getRandText(result.waifu.hour_tips.t14 - 17);
        else if (now > 17 && now <= 19)
          text = getRandText(result.waifu.hour_tips.t17 - 19);
        else if (now > 19 && now <= 21)
          text = getRandText(result.waifu.hour_tips.t19 - 21);
        else if (now > 21 && now <= 23)
          text = getRandText(result.waifu.hour_tips.t21 - 23);
        else text = getRandText(result.waifu.hour_tips.default);
      } else {
        var referrer_message = result.waifu.referrer_message;
        if (document.referrer !== "") {
          var referrer = document.createElement("a");
          referrer.href = document.referrer;
          var domain = referrer.hostname.split(".")[1];
          if (window.location.hostname == referrer.hostname)
            text =
              referrer_message.localhost[0] +
              document.title.split(referrer_message.localhost[2])[0] +
              referrer_message.localhost[1];
          else if (domain == "baidu")
            text =
              referrer_message.baidu[0] +
              referrer.search.split("&wd=")[1].split("&")[0] +
              referrer_message.baidu[1];
          else if (domain == "so")
            text =
              referrer_message.so[0] +
              referrer.search.split("&q=")[1].split("&")[0] +
              referrer_message.so[1];
          else if (domain == "google")
            text =
              referrer_message.google[0] +
              document.title.split(referrer_message.google[2])[0] +
              referrer_message.google[1];
          else {
            $.each(result.waifu.referrer_hostname, function(i, val) {
              if (i == referrer.hostname) referrer.hostname = getRandText(val);
            });
            text =
              referrer_message.default[0] +
              referrer.hostname +
              referrer_message.default[1];
          }
        } else
          text =
            referrer_message.none[0] +
            document.title.split(referrer_message.none[2])[0] +
            referrer_message.none[1];
      }
      showMessage(text, 6000);
    };
    if (live2d_settings.showWelcomeMessage) showWelcomeMessage(result);

    var waifu_tips = result.waifu;

    function loadOtherModel() {
      var modelId = modelStorageGetItem("modelId");
      var modelRandMode = live2d_settings.modelRandMode;

      $.ajax({
        cache: modelRandMode == "switch" ? true : false,
        url: live2d_settings.modelAPI + modelRandMode + "/?id=" + modelId,
        dataType: "json",
        success: function(result) {
          loadModel(result.model["id"]);
          var message = result.model["message"];
          $.each(waifu_tips.model_message, function(i, val) {
            if (i == result.model["id"]) message = getRandText(val);
          });
          showMessage(message, 3000, true);
        }
      });
    }

    function loadRandTextures() {
      var modelId = modelStorageGetItem("modelId");
      var modelTexturesId = modelStorageGetItem("modelTexturesId");
      var modelTexturesRandMode = live2d_settings.modelTexturesRandMode;

      $.ajax({
        cache: modelTexturesRandMode == "switch" ? true : false,
        url:
          live2d_settings.modelAPI +
          modelTexturesRandMode +
          "_textures/?id=" +
          modelId +
          "-" +
          modelTexturesId,
        dataType: "json",
        success: function(result) {
          if (
            result.textures["id"] == 1 &&
            (modelTexturesId == 1 || modelTexturesId == 0)
          )
            showMessage(waifu_tips.load_rand_textures[0], 3000, true);
          else showMessage(waifu_tips.load_rand_textures[1], 3000, true);
          loadModel(modelId, result.textures["id"]);
        }
      });
    }

    function modelStorageGetItem(key) {
      return live2d_settings.modelStorage
        ? localStorage.getItem(key)
        : sessionStorage.getItem(key);
    }

    /* 检测用户活动状态，并在空闲时显示一言 */
    if (live2d_settings.showHitokoto) {
      window.getActed = false;
      window.hitokotoTimer = 0;
      window.hitokotoInterval = false;
      $(document)
        .mousemove(function(e) {
          getActed = true;
        })
        .keydown(function() {
          getActed = true;
        });
      setInterval(function() {
        if (!getActed) ifActed();
        else elseActed();
      }, 1000);
    }

    function ifActed() {
      if (!hitokotoInterval) {
        hitokotoInterval = true;
        hitokotoTimer = window.setInterval(showHitokotoActed, 30000);
      }
    }

    function elseActed() {
      getActed = hitokotoInterval = false;
      window.clearInterval(hitokotoTimer);
    }

    function showHitokotoActed() {
      if ($(document)[0].visibilityState == "visible") showHitokoto();
    }

    function showHitokoto() {
      switch (live2d_settings.hitokotoAPI) {
        case "lwl12.com":
          $.getJSON(
            "https://api.lwl12.com/hitokoto/v1?encode=realjson",
            function(result) {
              if (!empty(result.source)) {
                var text = waifu_tips.hitokoto_api_message["lwl12.com"][0];
                if (!empty(result.author))
                  text += waifu_tips.hitokoto_api_message["lwl12.com"][1];
                text = text.render({
                  source: result.source,
                  creator: result.author
                });
                window.setTimeout(function() {
                  showMessage(
                    text + waifu_tips.hitokoto_api_message["lwl12.com"][2],
                    3000,
                    true
                  );
                }, 5000);
              }
              showMessage(result.text, 5000, true);
            }
          );
          break;
        case "fghrsh.net":
          $.getJSON(
            "https://api.fghrsh.net/hitokoto/rand/?encode=jsc&uid=3335",
            function(result) {
              if (!empty(result.source)) {
                var text = waifu_tips.hitokoto_api_message["fghrsh.net"][0];
                text = text.render({
                  source: result.source,
                  date: result.date
                });
                window.setTimeout(function() {
                  showMessage(text, 3000, true);
                }, 5000);
                showMessage(result.hitokoto, 5000, true);
              }
            }
          );
          break;
        case "jinrishici.com":
          $.ajax({
            url: "https://v2.jinrishici.com/one.json",
            xhrFields: { withCredentials: true },
            success: function(result, status) {
              if (!empty(result.data.origin.title)) {
                var text = waifu_tips.hitokoto_api_message["jinrishici.com"][0];
                text = text.render({
                  title: result.data.origin.title,
                  dynasty: result.data.origin.dynasty,
                  author: result.data.origin.author
                });
                window.setTimeout(function() {
                  showMessage(text, 3000, true);
                }, 5000);
              }
              showMessage(result.data.content, 5000, true);
            }
          });
          break;
        default:
          $.getJSON("https://v1.hitokoto.cn", function(result) {
            if (!empty(result.from)) {
              var text = waifu_tips.hitokoto_api_message["hitokoto.cn"][0];
              text = text.render({
                source: result.from,
                creator: result.creator
              });
              window.setTimeout(function() {
                showMessage(text, 3000, true);
              }, 5000);
            }
            showMessage(result.hitokoto, 5000, true);
          });
      }
    }

    $(".waifu-tool .fui-eye").click(function() {
      loadOtherModel();
    });
    $(".waifu-tool .fui-user").click(function() {
      loadRandTextures();
    });
    $(".waifu-tool .fui-chat").click(function() {
      showHitokoto();
    });
  }
  window.initModel = (waifuPath, type) => {
    /* 加载看板娘样式 */
    live2d_settings.waifuSize = live2d_settings.waifuSize.split("x");
    live2d_settings.waifuTipsSize = live2d_settings.waifuTipsSize.split("x");
    live2d_settings.waifuEdgeSide = live2d_settings.waifuEdgeSide.split(":");

    $("#live2d").attr("width", live2d_settings.waifuSize[0]);
    $("#live2d").attr("height", live2d_settings.waifuSize[1]);
    $(".waifu-tips").width(live2d_settings.waifuTipsSize[0]);
    $(".waifu-tips").css("top", live2d_settings.waifuToolTop);
    $(".waifu-tips").css("font-size", live2d_settings.waifuFontSize);
    $(".waifu-tool").css("font-size", live2d_settings.waifuToolFont);
    $(".waifu-tool span").css("line-height", live2d_settings.waifuToolLine);

    if (live2d_settings.waifuEdgeSide[0] == "left")
      $(".waifu").css("left", live2d_settings.waifuEdgeSide[1] + "px");
    else if (live2d_settings.waifuEdgeSide[0] == "right")
      $(".waifu").css("right", live2d_settings.waifuEdgeSide[1] + "px");

    window.waifuResize = function() {
      $(window).width() <=
      Number(live2d_settings.waifuMinWidth.replace("px", ""))
          ? $(".waifu").hide()
          : $(".waifu").show();
    };
    if (live2d_settings.waifuMinWidth != "disable") {
      waifuResize();
      $(window).resize(function() {
        waifuResize();
      });
    }

    try {
      if (live2d_settings.waifuDraggable == "axis-x")
        $(".waifu").draggable({
          axis: "x",
          revert: live2d_settings.waifuDraggableRevert
        });
      else if (live2d_settings.waifuDraggable == "unlimited")
        $(".waifu").draggable({ revert: live2d_settings.waifuDraggableRevert });
      else $(".waifu").css("transition", "all .3s ease-in-out");
    } catch (err) {
      console.log("[Error] JQuery UI is not defined.");
    }

    live2d_settings.homePageUrl == "auto"
        ? window.location.protocol + "//" + window.location.hostname + "/"
        : live2d_settings.homePageUrl;
    if (
        window.location.protocol == "file:" &&
        live2d_settings.modelAPI.substr(0, 2) == "//"
    )
      live2d_settings.modelAPI = "http:" + live2d_settings.modelAPI;

    $(".waifu-tool .fui-home").click(function() {
      //window.location = 'https://www.fghrsh.net/';
      window.location = live2d_settings.homePageUrl;
    });

    $(".waifu-tool .fui-info-circle").click(function() {
      //window.open('https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02');
      window.open(live2d_settings.aboutPageUrl);
    });

    window.loadTipsMessage(FN_MESSAGE);

    if (!live2d_settings.showToolMenu) $(".waifu-tool").hide();
    if (!live2d_settings.canCloseLive2d) $(".waifu-tool .fui-cross").hide();
    if (!live2d_settings.canSwitchModel) $(".waifu-tool .fui-eye").hide();
    if (!live2d_settings.canSwitchTextures) $(".waifu-tool .fui-user").hide();
    if (!live2d_settings.canSwitchHitokoto) $(".waifu-tool .fui-chat").hide();
    if (!live2d_settings.canTakeScreenshot) $(".waifu-tool .fui-photo").hide();
    if (!live2d_settings.canTurnToHomePage) $(".waifu-tool .fui-home").hide();
    if (!live2d_settings.canTurnToAboutPage)
      $(".waifu-tool .fui-info-circle").hide();

    if (waifuPath === undefined) waifuPath = "";
    var modelId = localStorage.getItem("modelId");
    var modelTexturesId = localStorage.getItem("modelTexturesId");

    if (!live2d_settings.modelStorage || modelId == null) {
      var modelId = live2d_settings.modelId;
      var modelTexturesId = live2d_settings.modelTexturesId;
    }
    loadModel(modelId, modelTexturesId);
  };
}

