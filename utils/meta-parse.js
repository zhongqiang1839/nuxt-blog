// ua解析
export const UAParse = e => {
  let r = [];
  let outputer = '';
  if (r = e.match(/MSIE\s([^\s|]+)/gi)) {
    outputer = `<span class="ua_ie"><i class="iconfont icon-ie"></i>`
  } else if (r = e.match(/FireFox\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_firefox"><i class="iconfont icon-firefox"></i>`
  } else if (r = e.match(/UC([\d]*)\/([^\s]+)/ig)) {
    outputer = '<span class="ua_maxthon"><i class="iconfont icon-aoyou"></i>'
  } else if (r = e.match(/UBrowser([\d]*)\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_ucweb"><i class="iconfont icon-uc"></i>`
  } else if (r = e.match(/MetaSr/ig)) {
    outputer = '<span class="ua_sougou"><i class="iconfont icon-sougou"></i>'
  } else if (r = e.match(/2345Explorer/ig)) {
    outputer = '<span class="ua_2345explorer"><i class="iconfont icon-wangluo-"></i>'
  } else if (r = e.match(/2345chrome/ig)) {
    outputer = '<span class="ua_2345chrome"><i class="iconfont icon-wangluo-"></i>'
  } else if (r = e.match(/LBBROWSER/ig)) {
    outputer = '<span class="ua_lbbrowser"><i class="iconfont icon-liebao"></i>'
  } else if (r = e.match(/MicroMessenger\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_qq"><i class="iconfont icon-wechat-fill"></i>`
  } else if (r = e.match(/QQBrowser\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_qq"><i class="iconfont icon-qqie"></i>`
  } else if (r = e.match(/QQ\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_qq"><i class="iconfont icon-qqie"></i>`
  } else if (r = e.match(/MiuiBrowser\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_mi"><i class="iconfont icon-tubiaozhizuomoban"></i>`
  } else if (r = e.match(/Chrome([\d]*)\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_chrome"><i class="iconfont icon-chrome-fill"></i>`
  } else if (r = e.match(/safari\/([^\s]+)/ig)) {
    const r1 = r[0].split('/');
    outputer = `<span class="ua_apple"><i class="iconfont icon-safari"></i>`
  } else if (r = e.match(/Opera[\s|/]([^\s]+)/ig)) {
    outputer = `<span class="ua_opera"><i class="iconfont icon-opera"></i>`
  } else if (r = e.match(/Trident\/7.0/gi)) {
    outputer = `<span class="ua_ie"><i class="iconfont icon-ie11"></i>`
  } else {
    outputer = '<span class="ua_other"><i class="iconfont icon-wangluo-"></i>'
  }
  return `${outputer}</span>`
};

// os解析
export const OSParse = e => {
  let os = '';
  if (e.match(/win/ig)) {
    if (e.match(/nt 5.1/ig)) {
      os = '<span class="os_xp"><i class="iconfont icon-windows"></i>'
    } else if (e.match(/nt 6.1/ig)) {
      os = '<span class="os_7"><i class="iconfont icon-windows"></i>'
    } else if (e.match(/nt 6.2/ig)) {
      os = '<span class="os_8"><i class="iconfont icon-windows"></i>'
    } else if (e.match(/nt 6.3/ig)) {
      os = '<span class="os_8_1"><i class="iconfont icon-windows"></i>'
    } else if (e.match(/nt 10.0/ig)) {
      os = '<span class="os_10"><i class="iconfont icon-windows"></i>'
    } else if (e.match(/nt 6.0/ig)) {
      os = '<span class="os_vista"><i class="iconfont icon-windows"></i>'
    } else if (e.match(/nt 5/ig)) {
      os = '<span class="os_2000"><i class="iconfont icon-windows"></i>'
    } else {
      os = '<span class="os_windows"><i class="iconfont icon-windows"></i>'
    }
  } else if (e.match(/android/ig)) {
    os = '<span class="os_android"><i class="iconfont icon-android"></i>'
  } else if (e.match(/ubuntu/ig)) {
    os = '<span class="os_ubuntu">Ubuntu'
  } else if (e.match(/linux/ig)) {
    os = '<span class="os_linux"><i class="iconfont icon-unix"></i>'
  } else if (e.match(/iphone/ig)) {
    os = '<span class="os_mac"><i class="iconfont icon-apple-fill"></i>'
  } else if (e.match(/mac/ig)) {
    os = '<span class="os_mac"><i class="iconfont icon-apple-fill"></i>'
  } else if (e.match(/unix/ig)) {
    os = '<span class="os_unix"><i class="iconfont icon-unix"></i>'
  } else {
    os = '<span class="os_other"><i class="iconfont icon-iphone"></i>'
  }
  return `${os}</span>`
};
