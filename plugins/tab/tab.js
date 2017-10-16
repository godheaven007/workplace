;(function($){
    var Tab = function(element, options){
        this.$ele = element;
        this.defaults = {
            triggerType: "click",
            invoke: 1
        };

        this.settings = $.fn.extend({}, this.defaults, options);
        this.init();
    };

    Tab.prototype = {
        // tab初始化操作
        init: function(){
            var index = this.settings.invoke;
            this.$ele.find("#tabIndex li").eq(index).addClass("active");
            this.$ele.find(".tabContItem").eq(index).addClass("active");
        },

        // 切换tab
        shift: function(){
            var _this = this;
            return this.$ele.each(function(i){
                var $tabItems = $(this).find("#tabIndex li"),
                    $tabContItems = $(this).find(".tabContItem");
                _this.eventHandle($tabItems, $tabContItems);    
            })
        },

        // 事件绑定
        eventHandle: function($tabItems, $tabContItems){
                
            $tabItems.on(this.settings.triggerType, function(){
                var index = $(this).index();
                $tabItems.removeClass("active");
                $tabContItems.removeClass("active");
                $(this).addClass("active");
                $tabContItems.eq(index).addClass("active");
            });
            
        }
    };

    $.fn.tab = function(options){
        var tab = new Tab(this, options);
        return tab.shift();
    }
})(jQuery);