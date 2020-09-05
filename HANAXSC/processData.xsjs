try {
	var content = $.request.body.asString();	
	var data = JSON.parse(content);	
	var result = ""; 
	var DATE;
	var COUNTRY_CODE;
	var COMPANY_CODE;
	var TYPE;
	var VALUE_DATE;
	var AMOUNT;
	var CURRENCY;
	var COMMENTS;
	var LOCK_FLAG;	 
	
	var conn = $.hdb.getConnection({ "xssqlcc": "anonuser"}); 
	var procedureCall = conn.loadProcedure("YOURSCHEMA", "insertData");
	
	for(var i = 0; i <data.length; i++) {
		DATE = data[i].DATE;
		COUNTRY_CODE = data[i].COUNTRY_CODE;
		COMPANY_CODE = data[i].COMPANY_CODE;
		TYPE = data[i].TYPE;
		VALUE_DATE = data[i].VALUE_DATE;
		AMOUNT = data[i].AMOUNT;
		CURRENCY = data[i].CURRENCY;
		COMMENTS = data[i].COMMENTS;
		LOCK_FLAG = data[i].LOCK_FLAG;
		
		procedureCall(DATE, COUNTRY_CODE, COMPANY_CODE, TYPE, VALUE_DATE, AMOUNT, CURRENCY, COMMENTS, LOCK_FLAG);		
	}
	
	conn.commit();
	conn.close();
	
	$.response.headers.set("Access-Control-Allow-Origin", "*");
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(data));
	$.response.returnCode = 200;	
} catch (err) {
	$.response.headers.set("Access-Control-Allow-Origin", "*");
	$.response.contentType = "application/json";
    $.response.setBody(JSON.stringify(err.message));
    $.response.returnCode = 200;
}
