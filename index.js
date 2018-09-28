/*
* @Author: lenovo
* @Date:   2018-09-27 00:09:15
* @Last Modified by:   lenovo
* @Last Modified time: 2018-09-27 17:34:37
*/
// 1.获取默认城市的天气信息
// 2.获取所有城市的信息
// 3.点击每个城市可以获取当前城市的天气信息
// 4.在搜索框内输入要搜索的城市，点击搜索按钮可以进行搜索


 
// 1.获取当前城市的天气信息
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
			console.log(tianqi);
			updata(tianqi);
		}
	})

	// 获取天气数据的函数
	function updata(tianqi){
		// 获取当前的城市
		$(".city").html(tianqi.city);
		// 获取当前城市的天气状况
		$(".kongqi_boxb").html(tianqi.weather.quality_level);
		// 获取当前的温度
		$(".tem span").html(tianqi.weather.current_temperature+"°");
		// 获取当前的天气状况
		$(".tianqi").html(tianqi.weather.current_condition);
		// 获取当前风向
		$(".shidu_left").html(tianqi.weather.wind_direction);
		// 获取当前风力
		$(".shidu_right").html(tianqi.weather.wind_level+"级");

		// 今天的天气
		$(".mainboxleft_topr span:first").html(tianqi.weather.dat_high_temperature);
		$(".mainboxleft_topr span:last").html(tianqi.weather.dat_low_temperature+"°");
		$(".mainboxleft_bottoml").html(tianqi.weather.dat_condition);
		$(".mainboxleft_bottomr").css({"background":"url(img/"+tianqi.weather.dat_weather_icon_id+".png) no-repeat cover"});

		// 明天的天气
		$(".tomorrow_high_temperature").html(tianqi.weather.tomorrow_high_temperature);
		$(".tomorrow_low_temperature").html(tianqi.weather.tomorrow_low_temperature+"°");
		$(".mainboxright_bottoml").html(tianqi.weather.tomorrow_condition);
		$(".mainboxright_bottomr").css({"background":"url(img/"+tianqi.weather.tomorrow_weather_icon_id+".png) no-repeat cover"})

		// 未来24小时天气
		let hweather=tianqi.weather.hourly_forecast;
		console.log(hweather);
		hweather.forEach(function(v,i){
			let str=`
				<li>
					<span class="list_top">${v.hour}:00</span>
					<span class="list_middle" style="background-image:url(img/${v.weather_icon_id}.png)" ></span>
					<span class="list_bottom">${v.temperature}°</span>
				</li>
			`;
			$(".timelist").append(str);
		})
	}

	// 点击城市，出现城市页面
	$(".city").click(function(){
		$(".Location").css({"display":"block"});
		$("footer").css({"display":"none"});
		$(".ydandfs").css({"display":"none"});
		$(".recommend").css({"display":"none"});
	})

	// 点击取消，消失
	$(".searchbox_right").click(function(){
		$(".Location").css({"display":"none"});
		$("footer").css({"display":"block"});
		$(".ydandfs").css({"display":"block"});
		$(".recommend").css({"display":"block"});
	})

	// 获取城市信息
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			updataCity(city);
		}
	})
	// 获取每个城市信息
	function updataCity(city){
		for(let i in city){
			console.log(city[i]);
			let str=`<div class="hotscenic_text">${i}</div>
			<ul class="hotscenic1"></ul>
			`;
			$(".hotscenic").append(str);
			for(let j in city[i]){
				console.log(j);
				// let str1=`
				// <li>${j}</li>`;
				// $(".hotscenic1").append(str1);
				// let li=document.createElement("li");
				// $("ul.hotscenic1").append(li);
				// $(".hotscenic1 li").html(j);
			}
		}
	}
	window.onload=function(){
	// 点击每个城市，获取当前城市的天气信息
		$("li").click(function(){
			$(".Location").css({"display":"none"});
			$("footer").css({"display":"block"});
			$(".ydandfs").css({"display":"block"});
			$(".recommend").css({"display":"block"});
			let con=$(this).html();
			// console.log(con);
			ajaxs(con);
		})

		// 获取某个城市的天气信息
		function ajaxs(str){
			let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
			$.ajax({
				type:"get",
				url:url1,
				dataType:"jsonp",
				success:function(obj){
					let tianqi2=obj.data;
					updata(tianqi2); 
				}
			})
		}
		// 在搜索框内输入内容，可以搜索当前城市的天气情况
		$("input").focus(function(){
			$(".searchbox_right").html("搜索");
		})
		// 当点击搜索时，获取input中的内容进行搜索
		$(".searchbox_right").click(function(){
			$(".Location").css({"display":"none"});
			$("footer").css({"display":"block"});
			$(".ydandfs").css({"display":"block"});
			$(".recommend").css({"display":"block"});
			let text=$("input").val();
			// console.log(text);
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						ajaxs(text);
					}
				}
			}
			alert("该城市不存在");
		})
	}


