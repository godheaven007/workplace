(function() {
    /*
     * container: 存放选项卡的容器
     * tabNum: 选项卡个数
     * tabIndex: 选项卡活动索引
    */
    function Tab(container, tabNum, tabIndex) {
      this.container = container;
      this.tabNum = tabNum || 3;
      this.tabIndex = tabIndex || 0;
      this.buindUI();
      this.eventHandle();
    }
    
    Tab.prototype = {
      // dom渲染
      buindUI: function() {
        
        var tab = '<ul class="ui-tab-head">', 
            content = '<ul class="ui-tab-body">';
        
        for(var i = 1; i <= this.tabNum; i++) {
          if(this.tabIndex == i) {
            tab += '<li class="ui-tab-item active" data-tabIndex="'+ (i-1) +'">tab'+ i +'</li>';
            content += '<li class="ui-tab-content active">content'+ i +'</li>';
          } else {
            tab += '<li class="ui-tab-item" data-tabIndex="'+ (i-1) +'">tab'+ i +'</li>';
            content += '<li class="ui-tab-content">content'+ i +'</li>';
          }
        }
        tab += '</ul>';
        content += '</ul>';
        
        var wrapper = document.createElement("div");
        wrapper.classList.add("ui-tab-wrapper");
        wrapper.innerHTML = tab + content;
        
        this.container.appendChild(wrapper);
      },
      // 事件绑定
      eventHandle: function() {
        var wrap = this.container.querySelector(".ui-tab-wrapper");
        var tab = wrap.querySelectorAll(".ui-tab-item");
        var content = wrap.querySelectorAll(".ui-tab-content");
        
        wrap.addEventListener("click", function(e) {
          if(e.target.classList.contains("ui-tab-content")) return;
          if(e.target.classList.contains("active")) return;
          
          var currIndex = e.target.dataset.tabindex;
          for(var i = 0; i < tab.length; i++) {
            tab[i].classList.remove("active");
            content[i].classList.remove("active");
          }
          tab[currIndex].classList.add("active");
          content[currIndex].classList.add("active");
        });
      },
      // 用户参数合法性判断
      paramCheck: function() {
        
      }
    };
    
    window.Tab = Tab;
  })();
  
  function $(selector) {
    return document.querySelector(selector);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var tab1 = new Tab($(".test"), 4, 2);
    
    var tab2 = new Tab($(".test2"), 5, 3);
  });
  
  
  
  
  
  
  
  
  
  