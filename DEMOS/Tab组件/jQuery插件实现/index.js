;(function($) {
    function Tab(el, options) {
      this.$element = el;
      this.defaults = {
        tabNum: 3,        // 选项卡个数
        tabIndex: 1       // 选项卡活动索引
      };
      this.options = $.extend({}, this.defaults, options);
    }
    
    Tab.prototype = {
      init: function() {
        this.buildUI();
        this.eventHandle();
      },
      buildUI: function() {
        var _html = '<div class="ui-tab-wrapper">';
        var tab = '<ul class="ui-tab-head">', 
            content = '<ul class="ui-tab-body">';
        
        for(var i = 1; i <= this.options.tabNum; i++) {
          if(this.options.tabIndex == i) {
            tab += '<li class="ui-tab-item active">tab'+ i +'</li>';
            content += '<li class="ui-tab-content active">content'+ i +'</li>';
          } else {
            tab += '<li class="ui-tab-item">tab'+ i +'</li>';
            content += '<li class="ui-tab-content">content'+ i +'</li>';
          }
        }
        tab += '</ul>';
        content += '</ul>';
        _html += tab + content + '</div>';
        this.$element.html(_html);
      },
      
      eventHandle: function() {
        var $tabs = this.$element.find('.ui-tab-item'),
            $contents = this.$element.find('.ui-tab-content');
        
        $tabs.on('click', function() {
          var index = $(this).index();
          $tabs.removeClass('active');
          $contents.removeClass('active');
          
          $tabs.eq(index).addClass('active');
          $contents.eq(index).addClass('active');
        });
      }
    };
    
    $.fn.tab = function(options) {
      var tab = new Tab(this, options);
      tab.init();
      return this;
    };
    
  })(jQuery);
  
  
  $(function() {
    // 链式调用
    $(".test1").tab().css('background', '#0ff');
    $(".test2").tab({
      tabNum: 5,
      tabIndex: 3
    });
  });