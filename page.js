	// 分页效果
    //sum 总条数
    //length 每页显示条数
    //url ajax地址
    //div_name ajax替换div名称
    //page_shownumber 显示页码最大个数
    //page_parent_div_name page模块父集div_class
function page(page_parent_div_name,sum,length,url,div_name,page_shownumber){
    page_shownumber=page_shownumber?page_shownumber:5;
    var count=Math.ceil(sum/length);   //总页数
    var current=1;                     //当前页 

    $(document).off('click','.page');
    $(document).off('click','.pagedown');
    $(document).off('click','.pageup');
    $(document).on('click','.'+page_parent_div_name+' .page',function(){
         page_click(this); 
    })
    $(document).on('click','.'+page_parent_div_name+' .pagedown',function(){
         pagedown(); 
    })
    $(document).on('click','.'+page_parent_div_name+' .pageup',function(){
         pageup();
    })

   
    $('.'+page_parent_div_name).find('.pagebox').append('<div class="active pageup" onselectstart="return false;" style="width:65px">上一页</div><div class="symbol fsym" onselectstart="return false;">...</div>')
    for(var j=1;j<=count;j++){
        $('.'+page_parent_div_name).find('.pagebox').append('<div class="page" onselectstart="return false;" page="'+j+'">'+j+'</div>')
    };
   
    for(var i=page_shownumber;i<count;i++){
        var aa=i+1;
        $('.'+page_parent_div_name).find(".pagebox>.page[page='"+aa+"']").hide();
    }
   $('.'+page_parent_div_name).find('.pagebox').append('<div class="symbol lsym" onselectstart="return false;">...</div><div class="active pagedown" onselectstart="return false;" style="width:65px">下一页</div>');

   $('.'+page_parent_div_name).find(".pagebox>.page[page='1']").addClass('current');
   $('.'+page_parent_div_name).find(".pageup").hide();
   $('.'+page_parent_div_name).find(".fsym").hide();
   if(count<2){                     //一页
        $('.'+page_parent_div_name).find(".pages").hide();
    }else if(count<page_shownumber+1){                 //5页以内
        $('.'+page_parent_div_name).find(".active").hide();
        $('.'+page_parent_div_name).find(".symbol").hide();
    }else{
        $('.'+page_parent_div_name).find(".pages").show();
    }
    function page_click(obj){
        var hh=$(obj).html();
        $('.'+page_parent_div_name).find(".pagebox>.page[page='"+hh+"']").addClass('current').siblings().removeClass("current");
       
        current=parseInt($(obj).html());
        $('.'+page_parent_div_name).find(".active").hide();
        $('.'+page_parent_div_name).find(".symbol").hide();
        $('.'+page_parent_div_name).find(".page").hide();
        if(count<page_shownumber+1){
        for(var i=0;i<count;i++){
			 var aa=i+1;
            $('.'+page_parent_div_name).find(".pagebox>.page[page='"+aa+"']").show();
            }
        }else{
        if(current<4){
             for(var i=0;i<page_shownumber;i++){
                    var aa=i+1;
                    $('.'+page_parent_div_name).find(".pagebox>.page[page='"+aa+"']").show()
                };
                $('.'+page_parent_div_name).find(".pagedown").show();
                $('.'+page_parent_div_name).find(".lsym").show(); 
        }else if(current>count-3){
            for(var i=count-5;i<count;i++){
                var aa=i+1;
                $('.'+page_parent_div_name).find(".pagebox>.page[page='"+aa+"']").show()
            };
            $('.'+page_parent_div_name).find(".pageup").show();
            $('.'+page_parent_div_name).find(".fsym").show(); 
        }else{
            for(var i=current-3;i<current+2;i++){
                var aa=i+1;
                $('.'+page_parent_div_name).find(".page[page='"+aa+"']").show()
            };
            $('.'+page_parent_div_name).find(".active").show();
            $('.'+page_parent_div_name).find(".symbol").show();
        }
        }
        $.ajax({
            type: "POST",
            url: url,
			data:{page:current},
            async: false,
            success: function(msg){
                $('.'+div_name).html(msg);
            }   
        });
    }

    function pagedown(){
        current++;
       $('.'+page_parent_div_name).find(".page").eq(current-1).click();
    }

    function pageup(){
        current--;
       $('.'+page_parent_div_name).find(".page").eq(current-1).click();
    }
}

