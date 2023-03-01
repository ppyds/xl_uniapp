export default async (options) => {
	const startTime = Date.now()
	if (!options.header) {
		options.header = {
			Accept: "application/json",
			// Accept: "application/x-www-form-urlencoded",
			"token": uni.getStorageSync('token')
		}
	}
	if (!options.method) {
		options.method = "GET"
	}
	if (!options.timeout) {
		options.timeout = 6000
	}
	if (!options.dataType) {
		options.dataType = "json"
	}
	if (!options.withCredentials) {
		options.withCredentials = false
	}
	if(options.method ==="GET"){
		options.data = {
			...options.data,
			" ":Date.now() + Math.random()
		}
	}else{
		options.url = options.url + "?"+Date.now() + Math.random()
	}
	console.log()
	if(uni.getStorageSync("ADDRESS")?.location){
		options.data = {
			...options.data,
			...uni.getStorageSync("ADDRESS")?.location
		}
	}
	
	return new Promise((res, reg) => {
		uni.request({
			...options,
			success(data) {

				// #ifndef APP
				console.table({
					"请求地址": options.url,
					"请求方式": options.method,
					"请求参数": JSON.stringify(options.data, null, 2),
					"响应数据": JSON.stringify(data.data, null, 3),
					"请求耗时": Date.now() - startTime
				})
				// #endif
				// #ifdef APP
				console.log("+++++++++++++++++++++++++++++++++++")
				console.log("+++++++++++++++++++++++++++++++++++")
				console.log("请求地址:", options.url)
				console.log("请求方式:", options.method)
				console.log("请求参数:", JSON.stringify(options.data, null, 0))
				console.log("响应数据:", JSON.stringify(data.data, null, 0))
				console.log("请求耗时:", Date.now() - startTime)
				console.log("+++++++++++++++++++++++++++++++++++")
				console.log("+++++++++++++++++++++++++++++++++++")
				// #endif

				if (data.data.code !== 200) {
					uni.showToast({
						title: data.data.msg,
						icon: "none"
					})
					res([data.data, 0])
				} else
					res([0, data.data])
			},
			fail(err) {
				console.table({
					"请求失败": "",
					"请求地址": options.url,
					"请求方式": options.method,
					"请求参数": options.data,
					"响应数据": err
				})
				res([err, 0])
			}
		})
	})
}
