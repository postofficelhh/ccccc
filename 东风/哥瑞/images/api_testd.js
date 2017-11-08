$(function(){
	var _province_id = "cti-drive-provinces";
	var _city_id = "cti-drive-city";
	var _dealer_id = "cti-drive-dealers";

	//获取ajax数据
	function getAjaxData(){

		var _href = "http://www.dongfeng-honda-greiz.com/scripts/";
		var _city_json = {};
		var _this_dealer = {};

		this.init = function(callback)
		{
			$.ajax({ 
				async:false,
				type:'get',      
				url:_href+'api_list.php?op=city',  
				data: {},
				dataType:'json',  
				success:function(data){ 
					_city_json = data;
					callback();
				},
				beforeSend:function(){
					
				},
				complete:function(){
				
				},
				
			 });
		}
		this.getProvince = function(callback){
		   callback(_city_json);
		}

		this.getCity = function(province,callback){
				var city;
				for(i=0;i<_city_json.length;i++)
				{
					if(_city_json[i].pid==province)
					{
						city = _city_json[i].item;
						break;
					}
				}
				callback(city);
		}

		this.getDealer = function(city,callback){
			$.ajax({ 
				async:false,
				type:'get',      
			   url:_href+'api_list.php?op=dealer&city_id='+city, 
				data: {},
				dataType:'json',  
				success:function(data){
					_this_dealer = data;
					callback(data);
				},
				beforeSend:function(){
					
				},
				complete:function(){
				
				},
			 });
		}

		this.getDealerInfo = function(id,callback){
			var deinfo = _this_dealer[parseInt(id)];
			callback(deinfo);
		}
	}
	var GAD = new getAjaxData();

	GAD.init(function(){
		GAD.getProvince(function(data){
			$("#"+_province_id+" option").remove();
			$("#"+_province_id+"").append("<option value=''>请选择省份</option>");

			for(i=0;i<data.length;i++)
			{
				var sed = "";
				if(remote_ip_info.province==data[i].pname)
				{
					sed = "selected";
				}
				$("#"+_province_id+"").append("<option value='"+data[i].pid+"' "+sed+">"+data[i].pname+"</option>");
			}
			
		});

		$("#"+_province_id+"").change(function(){
			var selectvalue = $(this).children('option:selected').val();
			if(selectvalue!="")
			{
				GAD.getCity(selectvalue,function(data){
					$("#"+_city_id+" option").remove();
					$("#"+_city_id+"").append("<option value=''>请选择城市</option>");
					for(i=0;i<data.length;i++)
					{
						var sed = "";
						if(remote_ip_info.city==data[i].cname)
						{
							sed = "selected";
						}

						$("#"+_city_id+"").append("<option value='"+data[i].cid+"' "+sed+">"+data[i].cname+"</option>");
					}

					$("#"+_city_id+"").change();
				});
			}
		});



		$("#"+_city_id+"").change(function(){
			var selectvalue = $(this).children('option:selected').val();
			$("#"+_dealer_id+" option").remove();
			$("#"+_dealer_id+"").append("<option value=''>请选择经销商</option>");
			if(selectvalue!="")
			{
				GAD.getDealer(selectvalue,function(data){
					for(i=0;i<data.length;i++)
					{
						$("#"+_dealer_id+"").append("<option value='"+data[i].id+"'>"+data[i].name+"</option>");
					}
				});
			}
		});

		$("#"+_province_id+"").change();
	});
});