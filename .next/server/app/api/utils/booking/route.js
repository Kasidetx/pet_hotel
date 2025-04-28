/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/utils/booking/route";
exports.ids = ["app/api/utils/booking/route"];
exports.modules = {

/***/ "(rsc)/./app/api/utils/booking/route.js":
/*!****************************************!*\
  !*** ./app/api/utils/booking/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n\n\nasync function POST(request) {\n    try {\n        const bookingData = await request.json();\n        if (!bookingData.userId || !bookingData.roomId || !bookingData.checkIn || !bookingData.checkOut) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'กรุณากรอกข้อมูลให้ครบถ้วน'\n            }, {\n                status: 400\n            });\n        }\n        const checkInDate = new Date(bookingData.checkIn);\n        const checkOutDate = new Date(bookingData.checkOut);\n        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));\n        const connection = (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.getConnection)();\n        // Insert booking data\n        const [result] = await connection.execute(`\n            INSERT INTO bookings (\n                user_id, \n                room_id, \n                title, \n                price_per_night, \n                check_in_date, \n                check_out_date, \n                nights, \n                total_price, \n                tax, \n                grand_total, \n                status, \n                created_at\n            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())\n        `, [\n            bookingData.userId,\n            bookingData.roomId,\n            bookingData.title,\n            bookingData.price,\n            bookingData.checkIn,\n            bookingData.checkOut,\n            nights,\n            bookingData.price * nights,\n            bookingData.price * nights * 0.07,\n            bookingData.price * nights * 1.07,\n            'confirmed'\n        ]);\n        const bookingId = result.insertId;\n        const bookingReference = `BK${String(bookingId).padStart(6, '0')}`;\n        await connection.execute(`\n            UPDATE bookings \n            SET booking_reference = ? \n            WHERE id = ?\n        `, [\n            bookingReference,\n            bookingId\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            bookingId: bookingId,\n            bookingReference: bookingReference\n        });\n    } catch (error) {\n        console.error('Error creating booking:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลการจอง',\n            details: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3V0aWxzL2Jvb2tpbmcvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBQ0Y7QUFFbEMsZUFBZUUsS0FBS0MsT0FBTztJQUM5QixJQUFJO1FBQ0EsTUFBTUMsY0FBYyxNQUFNRCxRQUFRRSxJQUFJO1FBRXRDLElBQUksQ0FBQ0QsWUFBWUUsTUFBTSxJQUFJLENBQUNGLFlBQVlHLE1BQU0sSUFBSSxDQUFDSCxZQUFZSSxPQUFPLElBQUksQ0FBQ0osWUFBWUssUUFBUSxFQUFFO1lBQzdGLE9BQU9ULHFEQUFZQSxDQUFDSyxJQUFJLENBQ3BCO2dCQUFFSyxPQUFPO1lBQTRCLEdBQ3JDO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7UUFFQSxNQUFNQyxjQUFjLElBQUlDLEtBQUtULFlBQVlJLE9BQU87UUFDaEQsTUFBTU0sZUFBZSxJQUFJRCxLQUFLVCxZQUFZSyxRQUFRO1FBQ2xELE1BQU1NLFNBQVNDLEtBQUtDLElBQUksQ0FBQyxDQUFDSCxlQUFlRixXQUFVLElBQU0sUUFBTyxLQUFLLEtBQUssRUFBQztRQUUzRSxNQUFNTSxhQUFhakIsc0RBQWFBO1FBRWhDLHNCQUFzQjtRQUN0QixNQUFNLENBQUNrQixPQUFPLEdBQUcsTUFBTUQsV0FBV0UsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztRQWUzQyxDQUFDLEVBQUU7WUFDQ2hCLFlBQVlFLE1BQU07WUFDbEJGLFlBQVlHLE1BQU07WUFDbEJILFlBQVlpQixLQUFLO1lBQ2pCakIsWUFBWWtCLEtBQUs7WUFDakJsQixZQUFZSSxPQUFPO1lBQ25CSixZQUFZSyxRQUFRO1lBQ3BCTTtZQUNBWCxZQUFZa0IsS0FBSyxHQUFHUDtZQUNwQlgsWUFBWWtCLEtBQUssR0FBR1AsU0FBUztZQUM3QlgsWUFBWWtCLEtBQUssR0FBR1AsU0FBUztZQUM3QjtTQUNIO1FBRUQsTUFBTVEsWUFBWUosT0FBT0ssUUFBUTtRQUNqQyxNQUFNQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUVDLE9BQU9ILFdBQVdJLFFBQVEsQ0FBQyxHQUFHLE1BQU07UUFFbEUsTUFBTVQsV0FBV0UsT0FBTyxDQUFDLENBQUM7Ozs7UUFJMUIsQ0FBQyxFQUFFO1lBQUNLO1lBQWtCRjtTQUFVO1FBRWhDLE9BQU92QixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO1lBQ3JCdUIsU0FBUztZQUNUTCxXQUFXQTtZQUNYRSxrQkFBa0JBO1FBQ3RCO0lBRUosRUFBRSxPQUFPZixPQUFPO1FBQ1ptQixRQUFRbkIsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT1YscURBQVlBLENBQUNLLElBQUksQ0FDcEI7WUFBRUssT0FBTztZQUF5Q29CLFNBQVNwQixNQUFNcUIsT0FBTztRQUFDLEdBQ3pFO1lBQUVwQixRQUFRO1FBQUk7SUFFdEI7QUFDSiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxvcGVuelxcRG93bmxvYWRzXFxwcm9qZWN0XzQ1MVxccGV0X2hvdGVsXFxwZXRfaG90ZWxcXGFwcFxcYXBpXFx1dGlsc1xcYm9va2luZ1xccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBnZXRDb25uZWN0aW9uIH0gZnJvbSAnQC9saWIvZGInO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoIWJvb2tpbmdEYXRhLnVzZXJJZCB8fCAhYm9va2luZ0RhdGEucm9vbUlkIHx8ICFib29raW5nRGF0YS5jaGVja0luIHx8ICFib29raW5nRGF0YS5jaGVja091dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgICAgICB7IGVycm9yOiAn4LiB4Lij4Li44LiT4Liy4LiB4Lij4Lit4LiB4LiC4LmJ4Lit4Lih4Li54Lil4LmD4Lir4LmJ4LiE4Lij4Lia4LiW4LmJ4Lin4LiZJyB9LFxyXG4gICAgICAgICAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjaGVja0luRGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRhLmNoZWNrSW4pO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrT3V0RGF0ZSA9IG5ldyBEYXRlKGJvb2tpbmdEYXRhLmNoZWNrT3V0KTtcclxuICAgICAgICBjb25zdCBuaWdodHMgPSBNYXRoLmNlaWwoKGNoZWNrT3V0RGF0ZSAtIGNoZWNrSW5EYXRlKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBnZXRDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW5zZXJ0IGJvb2tpbmcgZGF0YVxyXG4gICAgICAgIGNvbnN0IFtyZXN1bHRdID0gYXdhaXQgY29ubmVjdGlvbi5leGVjdXRlKGBcclxuICAgICAgICAgICAgSU5TRVJUIElOVE8gYm9va2luZ3MgKFxyXG4gICAgICAgICAgICAgICAgdXNlcl9pZCwgXHJcbiAgICAgICAgICAgICAgICByb29tX2lkLCBcclxuICAgICAgICAgICAgICAgIHRpdGxlLCBcclxuICAgICAgICAgICAgICAgIHByaWNlX3Blcl9uaWdodCwgXHJcbiAgICAgICAgICAgICAgICBjaGVja19pbl9kYXRlLCBcclxuICAgICAgICAgICAgICAgIGNoZWNrX291dF9kYXRlLCBcclxuICAgICAgICAgICAgICAgIG5pZ2h0cywgXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9wcmljZSwgXHJcbiAgICAgICAgICAgICAgICB0YXgsIFxyXG4gICAgICAgICAgICAgICAgZ3JhbmRfdG90YWwsIFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXRcclxuICAgICAgICAgICAgKSBWQUxVRVMgKD8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sIE5PVygpKVxyXG4gICAgICAgIGAsIFtcclxuICAgICAgICAgICAgYm9va2luZ0RhdGEudXNlcklkLFxyXG4gICAgICAgICAgICBib29raW5nRGF0YS5yb29tSWQsXHJcbiAgICAgICAgICAgIGJvb2tpbmdEYXRhLnRpdGxlLFxyXG4gICAgICAgICAgICBib29raW5nRGF0YS5wcmljZSxcclxuICAgICAgICAgICAgYm9va2luZ0RhdGEuY2hlY2tJbixcclxuICAgICAgICAgICAgYm9va2luZ0RhdGEuY2hlY2tPdXQsXHJcbiAgICAgICAgICAgIG5pZ2h0cyxcclxuICAgICAgICAgICAgYm9va2luZ0RhdGEucHJpY2UgKiBuaWdodHMsXHJcbiAgICAgICAgICAgIGJvb2tpbmdEYXRhLnByaWNlICogbmlnaHRzICogMC4wNyxcclxuICAgICAgICAgICAgYm9va2luZ0RhdGEucHJpY2UgKiBuaWdodHMgKiAxLjA3LFxyXG4gICAgICAgICAgICAnY29uZmlybWVkJ1xyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBjb25zdCBib29raW5nSWQgPSByZXN1bHQuaW5zZXJ0SWQ7XHJcbiAgICAgICAgY29uc3QgYm9va2luZ1JlZmVyZW5jZSA9IGBCSyR7U3RyaW5nKGJvb2tpbmdJZCkucGFkU3RhcnQoNiwgJzAnKX1gO1xyXG5cclxuICAgICAgICBhd2FpdCBjb25uZWN0aW9uLmV4ZWN1dGUoYFxyXG4gICAgICAgICAgICBVUERBVEUgYm9va2luZ3MgXHJcbiAgICAgICAgICAgIFNFVCBib29raW5nX3JlZmVyZW5jZSA9ID8gXHJcbiAgICAgICAgICAgIFdIRVJFIGlkID0gP1xyXG4gICAgICAgIGAsIFtib29raW5nUmVmZXJlbmNlLCBib29raW5nSWRdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgYm9va2luZ0lkOiBib29raW5nSWQsXHJcbiAgICAgICAgICAgIGJvb2tpbmdSZWZlcmVuY2U6IGJvb2tpbmdSZWZlcmVuY2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIGJvb2tpbmc6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICAgICAgeyBlcnJvcjogJ+C5gOC4geC4tOC4lOC4guC5ieC4reC4nOC4tOC4lOC4nuC4peC4suC4lOC5g+C4meC4geC4suC4o+C4muC4seC4meC4l+C4tuC4geC4guC5ieC4reC4oeC4ueC4peC4geC4suC4o+C4iOC4reC4hycsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSxcclxuICAgICAgICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRDb25uZWN0aW9uIiwiUE9TVCIsInJlcXVlc3QiLCJib29raW5nRGF0YSIsImpzb24iLCJ1c2VySWQiLCJyb29tSWQiLCJjaGVja0luIiwiY2hlY2tPdXQiLCJlcnJvciIsInN0YXR1cyIsImNoZWNrSW5EYXRlIiwiRGF0ZSIsImNoZWNrT3V0RGF0ZSIsIm5pZ2h0cyIsIk1hdGgiLCJjZWlsIiwiY29ubmVjdGlvbiIsInJlc3VsdCIsImV4ZWN1dGUiLCJ0aXRsZSIsInByaWNlIiwiYm9va2luZ0lkIiwiaW5zZXJ0SWQiLCJib29raW5nUmVmZXJlbmNlIiwiU3RyaW5nIiwicGFkU3RhcnQiLCJzdWNjZXNzIiwiY29uc29sZSIsImRldGFpbHMiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/utils/booking/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getConnection: () => (/* binding */ getConnection)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n\nlet connection;\nfunction getConnection() {\n    if (!connection) {\n        connection = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool(process.env.DATABASE_URL);\n    }\n    return connection;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBbUM7QUFFbkMsSUFBSUM7QUFFRyxTQUFTQztJQUNaLElBQUksQ0FBQ0QsWUFBWTtRQUNiQSxhQUFhRCxzREFBZ0IsQ0FBQ0ksUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0lBQzFEO0lBQ0EsT0FBT0w7QUFDWCIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxvcGVuelxcRG93bmxvYWRzXFxwcm9qZWN0XzQ1MVxccGV0X2hvdGVsXFxwZXRfaG90ZWxcXGxpYlxcZGIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG15c3FsIGZyb20gJ215c3FsMi9wcm9taXNlJztcblxubGV0IGNvbm5lY3Rpb247XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25uZWN0aW9uKCkge1xuICAgIGlmICghY29ubmVjdGlvbikge1xuICAgICAgICBjb25uZWN0aW9uID0gbXlzcWwuY3JlYXRlUG9vbChwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwpO1xuICAgIH1cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcbn0iXSwibmFtZXMiOlsibXlzcWwiLCJjb25uZWN0aW9uIiwiZ2V0Q29ubmVjdGlvbiIsImNyZWF0ZVBvb2wiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fbooking%2Froute&page=%2Fapi%2Futils%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fbooking%2Froute&page=%2Fapi%2Futils%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_openz_Downloads_project_451_pet_hotel_pet_hotel_app_api_utils_booking_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/utils/booking/route.js */ \"(rsc)/./app/api/utils/booking/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/utils/booking/route\",\n        pathname: \"/api/utils/booking\",\n        filename: \"route\",\n        bundlePath: \"app/api/utils/booking/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\openz\\\\Downloads\\\\project_451\\\\pet_hotel\\\\pet_hotel\\\\app\\\\api\\\\utils\\\\booking\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_openz_Downloads_project_451_pet_hotel_pet_hotel_app_api_utils_booking_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1dGlscyUyRmJvb2tpbmclMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnV0aWxzJTJGYm9va2luZyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnV0aWxzJTJGYm9va2luZyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNvcGVueiU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RfNDUxJTVDcGV0X2hvdGVsJTVDcGV0X2hvdGVsJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNvcGVueiU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RfNDUxJTVDcGV0X2hvdGVsJTVDcGV0X2hvdGVsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrRDtBQUMvSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcb3BlbnpcXFxcRG93bmxvYWRzXFxcXHByb2plY3RfNDUxXFxcXHBldF9ob3RlbFxcXFxwZXRfaG90ZWxcXFxcYXBwXFxcXGFwaVxcXFx1dGlsc1xcXFxib29raW5nXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91dGlscy9ib29raW5nL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXRpbHMvYm9va2luZ1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXRpbHMvYm9va2luZy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG9wZW56XFxcXERvd25sb2Fkc1xcXFxwcm9qZWN0XzQ1MVxcXFxwZXRfaG90ZWxcXFxccGV0X2hvdGVsXFxcXGFwcFxcXFxhcGlcXFxcdXRpbHNcXFxcYm9va2luZ1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fbooking%2Froute&page=%2Fapi%2Futils%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fbooking%2Froute&page=%2Fapi%2Futils%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();