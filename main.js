init = () => {
  const keys = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
  ];

  let websites = {
    'q': 'www.qq.com',
    'b': 'www.bilibili.com',
    'w': 'www.weibo.com'
  };
  if (localStorage.getItem("websites") !== null) {
    websites = JSON.parse(localStorage.getItem("websites"))
  }

  return {
    'keys': keys,
    'websites': websites
  };
};


generateKeyboard = () => {
  keys.forEach(row => {
    let div = $("<div>");
    row.forEach(key => {
      let kbd = $("<kbd>");
      let button = $("<button class='edit'>Edit</button>").attr("id", key);

      let img = $("<img class='ico'>");
      if (websites[key] != undefined) {
        img.attr('src', 'https://' +websites[key] + "/favicon.ico");
      } else {
        img.attr('src', './img/default-ico.svg');
      }
      img.on('error', (event) => {
        event.preventDefault();
        $(event.target).attr('src', './img/default-ico.svg');
      });

      let span = $("<span>" + key + "</span>");

      kbd.append(button);
      kbd.append(img);
      kbd.append(span);
      div.append(kbd);
    });
    $('#keyboard').append(div);
  });
};

bindEvents = () => {
  bindJump();
  bindEdit();
};

bindJump = () => {
  $(document).on('keydown', (event) => {
    const key = event.key;
    const website = websites[key];
    if (website != undefined) {
      window.open('https://' + website, '_blank')
    }
  });
};

bindEdit = () => {
  $("#keyboard").on('click', 'button', (event) => {
    const key = $(event.target).attr('id');
    const inputUrl = prompt("请输入网址！", "www.baidu.com");
    if (inputUrl === null) return;
    websites[key] = inputUrl;
    $(event.target).siblings('img.ico').attr('src', 'https://' +inputUrl + "/favicon.ico");
    localStorage.setItem("websites", JSON.stringify(websites));
  });
};


const initRes = init();
const keys = initRes.keys;
const websites = initRes.websites;
generateKeyboard();
bindEvents();
