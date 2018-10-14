// 搜索栏组件
$.fn.uiSearch = function () {
	var i = 1;
	$(".search-selected").on('click', function () {
		$(".search-list").show();
		i = i + 1;
		if (i % 2 == 1) {
			$('.search-list').hide();
		}
		return false;
	});
	$('.search-list a').on('click', function () {
		$(".search-selected").text($(this).text());
		i = 1;
	});
	$('body').on('click', function () {
		$('.search-list').hide();
	});
}
// 轮播图组件  无缝切换未实现
// 优化下方进度条，使鼠标悬停切换图片
$.fn.uiSlide = function () {
	let slide = $(".slide-pic");
	let al = $("#arrowLeft");
	let ar = $("#arrowRight");
	let len = $(".slide-pic a").index();
	let pro = $(".slide-process-item");
	const width = $(".slide").width();
	let current = 1;
	// 初始化定时器方法si
	si = setInterval(function () {
		pro.eq((current) % 3).addClass("process-focus").siblings().removeClass("process-focus");
		let picpos = current % 3;
		slide.css("left", -width * picpos);
		current += 1;
	}, 2000);
	resetInterval = function () {
		// 检测是否存在定时器		
		if (si == null) {
			si = setInterval(function () {
				pro.eq((current) % 3).addClass("process-focus").siblings().removeClass("process-focus");
				let picpos = current % 3;
				slide.css("left", -width * picpos);
				current += 1;
			}, 2000);
		} else {
			clearInterval(si)
			si = null //如果已有定时器
		}
	}
	// 操作
	slide.hover(function () {
				resetInterval();
			},
			function () {
				resetInterval();
			}
		)
		.on("preMove", function () {
			current = current - 1;
			index = -(Math.ceil((parseInt(slide.css("left")) / width)));
			if (index == 0) {
				slide.css("left", -width * (index + 2));
			} else {
				slide.css("left", -width * (index - 1))
			}
		})
		.on("nexMove", function () {
			current = current + 1
			index = -(Math.ceil((parseInt(slide.css("left")) / width)));
			if (index >= 2) {
				slide.css("left", -width * (index - 2));
			} else {
				slide.css("left", -width * (index + 1))
			}
		})
	// 事件
	al.on("click", function () {
			slide.triggerHandler("preMove");
			let index = -(Math.ceil((parseInt(slide.css("left")) / width)));
			if (index == 0) {
				pro.eq(2).addClass("process-focus").siblings().removeClass("process-focus");
			} else {
				pro.eq(index - 1).addClass("process-focus").siblings().removeClass("process-focus")
			}
		})
		.hover(function () {
				resetInterval();
			},
			function () {
				resetInterval();
			}
		);
	ar.on("click", function () {
			slide.triggerHandler("nexMove");
			let index = -(Math.ceil((parseInt(slide.css("left")) / width)));
			if (index == 2) {
				pro.eq(0).addClass("process-focus").siblings().removeClass("process-focus");
			} else {
				pro.eq(index + 1).addClass("process-focus").siblings().removeClass("process-focus")
			}

		})
		.hover(function () {
				resetInterval();
			},
			function () {
				resetInterval();
			}
		);
	pro.hover(function () {
		resetInterval();
		let item = $(this).index();
		pro.eq(item).addClass("process-focus").siblings().removeClass("process-focus");
		slide.css("left", -width * (item));
		current = item + 1
	}, function () {
		resetInterval();
	});
};
//快速预约组件
$.fn.uiOrder = function () {
	//医院地区ajax请求
	function setAjax(arg, arg1) {
		var xhr = new XMLHttpRequest;
		var jsobj;
		xhr.open("GET", "info.json", true);
		xhr.send();
		//根据不同的上级选项调用ajax返回不同的下级菜单
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (arg == 1) {
					jsobj = JSON.parse(xhr.responseText);
					var areaArr = jsobj.area;
					for (var i = 0; i < areaArr.length; i++) {
						$(".area").append("<option  value='" + i + "'>" + areaArr[i] + "</option>");
					}
				} else if (arg == 2) {
					if (arg1 == 1) {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.area1;
						for (var i = 0; i < areaArr.length; i++) {
							$(".level").append("<option  class='temporary1' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					} else {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.area2;
						for (var i = 0; i < areaArr.length; i++) {
							$(".level").append("<option  class='temporary1' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					}
				} else if (arg == 3) {
					if (arg1 == 1) {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.level11;
						for (var i = 0; i < areaArr.length; i++) {
							$(".name").append("<option class='temporary2' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					} else if (arg1 == 2) {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.level12;
						for (var i = 0; i < areaArr.length; i++) {
							$(".name").append("<option class='temporary2' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					} else if (arg1 == 3) {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.level21;
						for (var i = 0; i < areaArr.length; i++) {
							$(".name").append("<option class='temporary2' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					} else {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.level22;
						for (var i = 0; i < areaArr.length; i++) {
							$(".name").append("<option class='temporary2' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					}
				} else {
					if (arg1 == 1) {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.a1;
						for (var i = 0; i < areaArr.length; i++) {
							$(".category").append("<option  class='temporary3' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					} else {
						jsobj = JSON.parse(xhr.responseText);
						var areaArr = jsobj.a2;
						for (var i = 0; i < areaArr.length; i++) {
							$(".category").append("<option  class='temporary3' value='" + i + "'>" + areaArr[i] + "</option>");
						}
					}
				}
			}
		}
	}
	setAjax(1);
	//医院地区选项被更改
	var area = $(".area");
	var level = $(".level");
	area.on("change", function () {
		var count = this.value;
		$(".temporary2").remove();
		$(".temporary3").remove();
		if (count == 0) {
			$(".temporary1").remove();
			setAjax(2, 1);
		} else if (count == 1) {
			$(".temporary1").remove();
			setAjax(2, 2);
		} else {
			$(".temporary1").remove();
			$(".temporary2").remove();
			$(".temporary3").remove();
		}
	});
	//医院等级选项被更改
	level.on("change", function () {
		$(".temporary3").remove();
		var count = this.value;
		var value = area.val()
		if (value == 0) {
			if (count == 0) {
				$(".temporary2").remove();
				setAjax(3, 1);
			} else if (count == 1) {
				$(".temporary2").remove();
				setAjax(3, 2);
			}
		} else {
			if (count == 0) {
				$(".temporary2").remove();
				setAjax(3, 3);
			} else
			if (count == 1) {
				$(".temporary2").remove();
				setAjax(3, 4);
			} else {
				$(".temporary2").remove();
				$(".temporary3").remove();
			}
		}
	});
	// 医院名称被改变
	var name = $(".name")
	name.on("change", function () {
		var count = this.value;
		if (count % 2 == 0) {
			$(".temporary3").remove();
			setAjax(4, 1);
		} else {
			$(".temporary3").remove();
			setAjax(4, 2);
		}
	})
}
//医院科室选项卡切换
$.fn.uiTab = function () {
	var selectTop = $(".tab-header-item") //顶部选项卡
	var hsselect = $(".tab-hospital-selected"); //次级选项卡
	var dpselect = $(".tab-department-selected");
	var hscontent = $(".tab_hscontent");
	var dpcontent = $(".tab_dpcontent");
	// 顶部切换
	selectTop.on("click", function () {
		var index = $(this).index();
		if (index == 0) {
			$(".tab-department").hide();
			$(".tab-hospital").show();
		} else {
			$(".tab-department").show();
			$(".tab-hospital").hide();
		}
		$(this).addClass("onselected").siblings().removeClass("onselected")
	})
	//次级选项卡切换
	hsselect.on("click", function () {
		var index = $(this).index();
		$(this).addClass('list-onselected').siblings().removeClass('list-onselected')
		hscontent.eq(index).addClass("show").siblings().removeClass('show')
	})
	//科室选项卡
	dpselect.on("click", function () {
		var index = $(this).index();
		$(this).addClass('list-onselected').siblings().removeClass('list-onselected')
		dpcontent.eq(index).addClass("show").siblings().removeClass('show')
	})
}
$.fn.uiBacktop = function () {
	var back = $(".backtop");
	window.onscroll = function () {
		var height = document.documentElement.scrollTop || document.body.scrollTop;
		if (height > 100) {
			back.show();
		} else {
			back.hide();
		}
	}
	back.on("click", function () {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	})
}
// 页面加载完成组件绑定
$(function () {
	$(".search-selected").uiSearch();
	$(".slidepic").uiSlide();
	$(".fastOrder").uiOrder();
	$(".tab").uiTab();
	$(".backtop").uiBacktop();
})
