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
exports.id = "app/api/utils/history/route";
exports.ids = ["app/api/utils/history/route"];
exports.modules = {

/***/ "(rsc)/./app/api/utils/history/route.js":
/*!****************************************!*\
  !*** ./app/api/utils/history/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(request) {\n    try {\n        const authHeader = request.headers.get('authorization');\n        if (!authHeader || !authHeader.startsWith('Bearer ')) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'กรุณาล็อกอินก่อนใช้งาน'\n            }, {\n                status: 401\n            });\n        }\n        const token = authHeader.split(' ')[1];\n        // Verify JWT token\n        let Token;\n        try {\n            Token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n        } catch (error) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'โทเค็นไม่ถูกต้องหรือหมดอายุ กรุณาล็อกอินใหม่'\n            }, {\n                status: 401\n            });\n        }\n        const userId = Token.userId;\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'โทเค็นไม่ถูกต้อง กรุณาล็อกอินใหม่'\n            }, {\n                status: 401\n            });\n        }\n        const connection = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.getConnection)();\n        const query = `\n      SELECT \n        b.id,\n        b.booking_reference,\n        r.title,\n        b.check_in_date,\n        b.check_out_date,\n        b.status,\n        b.price_per_night,\n        b.grand_total,\n        DATEDIFF(b.check_out_date, b.check_in_date) AS nights,\n        b.created_at\n      FROM \n        bookings b\n      JOIN \n        rooms r ON b.room_id = r.id\n      WHERE \n        b.user_id = ?\n      ORDER BY \n        b.created_at DESC\n    `;\n        const [bookings] = await connection.query(query, [\n            userId\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            bookings\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Error fetching booking history:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการจอง'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3V0aWxzL2hpc3Rvcnkvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDRjtBQUNWO0FBRXhCLGVBQWVHLElBQUlDLE9BQU87SUFDN0IsSUFBSTtRQUNBLE1BQU1DLGFBQWFELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO1FBQ3ZDLElBQUksQ0FBQ0YsY0FBYyxDQUFDQSxXQUFXRyxVQUFVLENBQUMsWUFBWTtZQUNsRCxPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXlCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNoRjtRQUVBLE1BQU1DLFFBQVFQLFdBQVdRLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUV0QyxtQkFBbUI7UUFDbkIsSUFBSUM7UUFDSixJQUFJO1lBQ0ZBLFFBQVFaLDBEQUFVLENBQUNVLE9BQU9JLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtRQUNsRCxFQUFFLE9BQU9SLE9BQU87WUFDWixPQUFPVixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQStDLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN0RztRQUVBLE1BQU1RLFNBQVNMLE1BQU1LLE1BQU07UUFDM0IsSUFBSSxDQUFDQSxRQUFRO1lBQ1QsT0FBT25CLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBb0MsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzNGO1FBRUEsTUFBTVMsYUFBYSxNQUFNbkIsc0RBQWFBO1FBRXRDLE1BQU1vQixRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0JuQixDQUFDO1FBRUcsTUFBTSxDQUFDQyxTQUFTLEdBQUcsTUFBTUYsV0FBV0MsS0FBSyxDQUFDQSxPQUFPO1lBQUNGO1NBQU87UUFFekQsT0FBT25CLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRWE7UUFBUyxHQUFHO1lBQUVYLFFBQVE7UUFBSTtJQUN6RCxFQUFFLE9BQU9ELE9BQU87UUFDWmEsUUFBUWIsS0FBSyxDQUFDLG1DQUFtQ0E7UUFDakQsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQTRDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25HO0FBQ0oiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcb3BlbnpcXERvd25sb2Fkc1xccHJvamVjdF80NTFcXHBldF9ob3RlbFxccGV0X2hvdGVsXFxhcHBcXGFwaVxcdXRpbHNcXGhpc3RvcnlcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvbiB9IGZyb20gJ0AvbGliL2RiJztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdhdXRob3JpemF0aW9uJyk7XHJcbiAgICAgICAgaWYgKCFhdXRoSGVhZGVyIHx8ICFhdXRoSGVhZGVyLnN0YXJ0c1dpdGgoJ0JlYXJlciAnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ+C4geC4o+C4uOC4k+C4suC4peC5h+C4reC4geC4reC4tOC4meC4geC5iOC4reC4meC5g+C4iuC5ieC4h+C4suC4mScgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlci5zcGxpdCgnICcpWzFdO1xyXG5cclxuICAgICAgICAvLyBWZXJpZnkgSldUIHRva2VuXHJcbiAgICAgICAgbGV0IFRva2VuO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBUb2tlbiA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn4LmC4LiX4LmA4LiE4LmH4LiZ4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiH4Lir4Lij4Li34Lit4Lir4Lih4LiU4Lit4Liy4Lii4Li4IOC4geC4o+C4uOC4k+C4suC4peC5h+C4reC4geC4reC4tOC4meC5g+C4q+C4oeC5iCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IFRva2VuLnVzZXJJZDtcclxuICAgICAgICBpZiAoIXVzZXJJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ+C5guC4l+C5gOC4hOC5h+C4meC5hOC4oeC5iOC4luC4ueC4geC4leC5ieC4reC4hyDguIHguKPguLjguJPguLLguKXguYfguK3guIHguK3guLTguJnguYPguKvguKHguYgnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgZ2V0Q29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICBjb25zdCBxdWVyeSA9IGBcclxuICAgICAgU0VMRUNUIFxyXG4gICAgICAgIGIuaWQsXHJcbiAgICAgICAgYi5ib29raW5nX3JlZmVyZW5jZSxcclxuICAgICAgICByLnRpdGxlLFxyXG4gICAgICAgIGIuY2hlY2tfaW5fZGF0ZSxcclxuICAgICAgICBiLmNoZWNrX291dF9kYXRlLFxyXG4gICAgICAgIGIuc3RhdHVzLFxyXG4gICAgICAgIGIucHJpY2VfcGVyX25pZ2h0LFxyXG4gICAgICAgIGIuZ3JhbmRfdG90YWwsXHJcbiAgICAgICAgREFURURJRkYoYi5jaGVja19vdXRfZGF0ZSwgYi5jaGVja19pbl9kYXRlKSBBUyBuaWdodHMsXHJcbiAgICAgICAgYi5jcmVhdGVkX2F0XHJcbiAgICAgIEZST00gXHJcbiAgICAgICAgYm9va2luZ3MgYlxyXG4gICAgICBKT0lOIFxyXG4gICAgICAgIHJvb21zIHIgT04gYi5yb29tX2lkID0gci5pZFxyXG4gICAgICBXSEVSRSBcclxuICAgICAgICBiLnVzZXJfaWQgPSA/XHJcbiAgICAgIE9SREVSIEJZIFxyXG4gICAgICAgIGIuY3JlYXRlZF9hdCBERVNDXHJcbiAgICBgO1xyXG5cclxuICAgICAgICBjb25zdCBbYm9va2luZ3NdID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShxdWVyeSwgW3VzZXJJZF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBib29raW5ncyB9LCB7IHN0YXR1czogMjAwIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBib29raW5nIGhpc3Rvcnk6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn4LmA4LiB4Li04LiU4LiC4LmJ4Lit4Lic4Li04LiU4Lie4Lil4Liy4LiU4LmD4LiZ4LiB4Liy4Lij4LiU4Li24LiH4LiC4LmJ4Lit4Lih4Li54Lil4Lib4Lij4Liw4Lin4Lix4LiV4Li04LiB4Liy4Lij4LiI4Lit4LiHJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldENvbm5lY3Rpb24iLCJqd3QiLCJHRVQiLCJyZXF1ZXN0IiwiYXV0aEhlYWRlciIsImhlYWRlcnMiLCJnZXQiLCJzdGFydHNXaXRoIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidG9rZW4iLCJzcGxpdCIsIlRva2VuIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJ1c2VySWQiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJib29raW5ncyIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/utils/history/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fhistory%2Froute&page=%2Fapi%2Futils%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fhistory%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fhistory%2Froute&page=%2Fapi%2Futils%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fhistory%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_openz_Downloads_project_451_pet_hotel_pet_hotel_app_api_utils_history_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/utils/history/route.js */ \"(rsc)/./app/api/utils/history/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/utils/history/route\",\n        pathname: \"/api/utils/history\",\n        filename: \"route\",\n        bundlePath: \"app/api/utils/history/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\openz\\\\Downloads\\\\project_451\\\\pet_hotel\\\\pet_hotel\\\\app\\\\api\\\\utils\\\\history\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_openz_Downloads_project_451_pet_hotel_pet_hotel_app_api_utils_history_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1dGlscyUyRmhpc3RvcnklMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnV0aWxzJTJGaGlzdG9yeSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnV0aWxzJTJGaGlzdG9yeSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNvcGVueiU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RfNDUxJTVDcGV0X2hvdGVsJTVDcGV0X2hvdGVsJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNvcGVueiU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RfNDUxJTVDcGV0X2hvdGVsJTVDcGV0X2hvdGVsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrRDtBQUMvSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcb3BlbnpcXFxcRG93bmxvYWRzXFxcXHByb2plY3RfNDUxXFxcXHBldF9ob3RlbFxcXFxwZXRfaG90ZWxcXFxcYXBwXFxcXGFwaVxcXFx1dGlsc1xcXFxoaXN0b3J5XFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91dGlscy9oaXN0b3J5L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXRpbHMvaGlzdG9yeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXRpbHMvaGlzdG9yeS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG9wZW56XFxcXERvd25sb2Fkc1xcXFxwcm9qZWN0XzQ1MVxcXFxwZXRfaG90ZWxcXFxccGV0X2hvdGVsXFxcXGFwcFxcXFxhcGlcXFxcdXRpbHNcXFxcaGlzdG9yeVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fhistory%2Froute&page=%2Fapi%2Futils%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fhistory%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fhistory%2Froute&page=%2Fapi%2Futils%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fhistory%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();