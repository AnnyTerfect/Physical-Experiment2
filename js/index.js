    "use strict";

    var i;
    function out()
    {
        $("#menu_cont").css({left:-$("#menu_cont").width()});
        $("#mask").fadeOut();
    }
    function huigui(x,y,n,q)
    {
        var i,xb=0,yb=0,fz=0,fm=0,k,a;
        for(i=0;i<n;i++)
        {
            xb+=x[i];
            yb+=y[i];
        }
        xb/=n;
        yb/=n;
        for(i=0;i<n;i++)
        {
            fz+=(x[i]-xb)*(y[i]-yb);
            fm+=(x[i]-xb)*(x[i]-xb);
        }
        k=fz/(fm*1.0);
        a=yb-k*xb;
        k=k.toFixed(q);
        a=a.toFixed(q);
        return k+','+a;
    }
    function pf(a)
    {
        return parseFloat(a);
    }
    function getT(a)
    {
        if(!document.getElementById(a).value)
            return document.getElementById(a).innerText;
        return document.getElementById(a).value;
    }
    $(window).on("load",function()
    {
        var i;
        $("#exp1").css({display:"block"});
    });
    $("#banner_left").on("click",function()
    {
        $("#menu_cont").css({left:"0px"});
        $("#mask").fadeIn();
    });
    $("#mask").on("click",function()
    {
        out();
    });
    var menuLi=$("#menu_ul li");
    for(i=0;i<8;i++)
    {
        let _i=i;
        $(menuLi[i]).on("click",function()
        {
            for(i=0;i<8;i++)
                $("#exp"+(i+1)).css("display","none");
            $("#exp"+(_i+1)).css("display","block");
            out();
        });
    }
    function e1Run1()
    {
        var arr=vueExp1Swiper1.slides;
        var x=new Array();
        var y=new Array();
        for(i=0;i<arr.length;i++)
        {
            var yi=Math.pow(1/2/Math.PI/pf(arr[i].row1),2);
            y[i]=yi;
            var xi=i*5;
            x[i]=xi;
            arr[i].row2=(yi*10000000).toString().slice(0,10);
        }
        var ans=huigui(x,y,arr.length,13).split(",");
        $("#exp1_result1").text("回归方程 "+"(1/2πf)^2="+ans[0]+"mx+"+ans[1]);
        $("#exp1_result2").text("k="+1/pf(ans[0]));
        $("#exp1_result3").text("mk="+pf(ans[1])/pf(ans[0])+"g");
    }
    function e2Run1()
    {
        var arr=vueExp2Swiper1.slides;
        var l=arr.length;
        var fub=0,fb=0,ub=0,f2b=0,u2b=0;
        for(i=0;i<l;i++)
        {
            var f=pf(arr[i].row1)/1000*pf(document.getElementById("exp2_g").value);
            arr[i].row4=((pf(arr[i].row2)+pf(arr[i].row3))/2).toFixed(2);
            var u=pf(arr[i].row4);
            fb+=f;
            fub+=f*u;
            ub+=u;
            f2b+=f*f;
            u2b+=u*u;
        }
        fub/=l;
        fb/=l;
        ub/=l;
        f2b/=l;
        u2b/=l;
        $("#exp2_result1").html('<span class="ba">FU</span>='+String(fub).slice(0,12));
        $("#exp2_result2").html('<span class="ba">F</span>='+String(fb).slice(0,12));
        $("#exp2_result3").html('<span class="ba">U</span>='+String(ub).slice(0,12));
        $("#exp2_result4").html('<span class="ba">F^2</span>='+String(f2b).slice(0,12));
        $("#exp2_result5").text("k="+String((fub*8-8*ub*fb)/(8*f2b-8*fb*fb)/1000).slice(0,12)+"V/m");
        $("#exp2_result6").text("r="+String((fub-fb*ub)/(Math.sqrt((f2b-fb*fb)*(u2b-ub*ub)))).slice(0,12));
    }
    function e2Run2()
    {
        var arr=vueExp2Swiper2.slides;
        var ub=0;
        for(i=0;i<arr.length;i++)
        {
            var u=Math.abs(pf(arr[i].row1)-pf(arr[i].row2));
            arr[i].row3=u;
            ub+=u;
        }
        ub/=arr.length;
        var sigma=ub/Math.PI/100/(pf(getT("exp2_d1"))+pf(getT("exp2_d2")))/pf(getT("exp2_k"));
        sigma*=10000;
        $("#exp2_result_du").html('<span class="ba">U1-U2</span>='+ub+"mV");
        $("#exp2_result_6").text("σ="+String(sigma).slice(0,9)+"mV/m");
        $("#exp2_result_ur").html('U<span class="half">r</span>='+String(100*Math.abs(sigma-pf(getT("exp2_6")))/pf(getT("exp2_6"))).slice(0,11)+"%");
    }
    function e2Run3()
    {
        var arr1=vueExp2Swiper3.slides,arr2=vueExp2Swiper4.slides;
        var hb=0,db=0;
        for(i=0;i<arr1.length;i++)
        {
            var h=Math.abs(pf(arr1[i].row1)-pf(arr1[i].row2))
                ,d=Math.abs(pf(arr2[i].row1)-pf(arr2[i].row2));;
            arr1[i].row3=String(h).slice(0,6);
            arr2[i].row3=String(d).slice(0,6);
            hb+=h;
            db+=d;
        }
        hb/=arr1.length;
        db/=arr1.length;
        console.log(pf(getT("exp2_rou")));
        $("#exp2_result_hba").html('<span class="ba">h</span>='+hb/1000);
        $("#exp2_result_dba").html('<span class="ba">d</span>='+db);
        var sigma=0.25*pf(getT("exp2_rou"))*pf(getT("exp2_gg"))*db*(hb+0.25*db);
        $("#exp2_result_66").html("σ="+sigma/1000+"N/m");
        $("#exp2_result_urur").html("Ur="+Math.abs(sigma-pf(getT("exp2_66")))/sigma);
    }
    function e3Run1()
    {
        var arr=vueExp3Swiper1.slides
        var x=new Array(),yl=new Array(),yr=new Array();
        for(i=0;i<arr.length;i++)
        {
            x[i]=Math.pow(Math.cos((9-i)*10/180*Math.PI),2);
            yl[i]=pf(arr[i].row1);
            yr[i]=pf(arr[i].row2);
        }
        var k=huigui(x,yl,arr.length,8).split(",")[0],a=huigui(x,yl,arr.length,8).split(",")[1];
        $("#exp3_result1").text("I左="+k.slice(0,15)+"(cos^2(θ))+"+a.slice(0,15));
        console.log(k,a);
        k=huigui(x,yr,arr.length,8).split(",")[0],a=huigui(x,yr,arr.length,8).split(",")[1];
        $("#exp3_result2").text("I右="+k.slice(0,15)+"(cos^2(θ))+"+a.slice(0,15));
    }
