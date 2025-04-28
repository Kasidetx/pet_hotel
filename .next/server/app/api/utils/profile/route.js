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
exports.id = "app/api/utils/profile/route";
exports.ids = ["app/api/utils/profile/route"];
exports.modules = {

/***/ "(rsc)/./app/api/utils/profile/route.js":
/*!****************************************!*\
  !*** ./app/api/utils/profile/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/db */ \"(rsc)/./lib/db.js\");\n\n\n\nasync function PUT(request) {\n    const token = request.headers.get('Authorization')?.split(' ')[1];\n    if (!token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            authenticated: false\n        }, {\n            status: 200\n        });\n    }\n    let userId;\n    try {\n        userId = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, process.env.JWT_SECRET).userId;\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            authenticated: false\n        }, {\n            status: 200\n        });\n    }\n    const { firstName, lastName } = await request.json();\n    if (!firstName || !lastName) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'ข้อมูลไม่ครบ'\n        }, {\n            status: 400\n        });\n    }\n    const connection = (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__.getConnection)();\n    await connection.execute('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?', [\n        firstName,\n        lastName,\n        userId\n    ]);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\nasync function POST(request) {\n    const token = request.headers.get('Authorization')?.split(' ')[1];\n    if (!token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            authenticated: false\n        }, {\n            status: 200\n        });\n    }\n    let userId;\n    try {\n        userId = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, process.env.JWT_SECRET).userId;\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'เกิดข้อผิดพลาด'\n        }, {\n            status: 401\n        });\n    }\n    const { newPassword } = await request.json();\n    if (!newPassword) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'ห้ามเว้นว่าง'\n        }, {\n            status: 400\n        });\n    }\n    const connection = (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__.getConnection)();\n    await connection.execute('UPDATE users SET password = ? WHERE id = ?', [\n        newPassword,\n        userId\n    ]);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3V0aWxzL3Byb2ZpbGUvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTBDO0FBQ1o7QUFDb0I7QUFFM0MsZUFBZUcsSUFBSUMsT0FBTztJQUM3QixNQUFNQyxRQUFRRCxRQUFRRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0JDLE1BQU0sSUFBSSxDQUFDLEVBQUU7SUFDakUsSUFBSSxDQUFDSCxPQUFPO1FBQ1IsT0FBT0wscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxlQUFlO1FBQU0sR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDckU7SUFFQSxJQUFJQztJQUNKLElBQUk7UUFDQUEsU0FBU1gsMERBQVUsQ0FBQ0ksT0FBT1MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLEVBQUVKLE1BQU07SUFDN0QsRUFBRSxPQUFPSyxLQUFLO1FBQ1YsT0FBT2pCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsZUFBZTtRQUFNLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0lBRUEsTUFBTSxFQUFFTyxTQUFTLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1mLFFBQVFLLElBQUk7SUFDbEQsSUFBSSxDQUFDUyxhQUFhLENBQUNDLFVBQVU7UUFDekIsT0FBT25CLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRVcsT0FBTztRQUFlLEdBQUc7WUFBRVQsUUFBUTtRQUFJO0lBQ3RFO0lBRUEsTUFBTVUsYUFBYW5CLHNEQUFhQTtJQUNoQyxNQUFNbUIsV0FBV0MsT0FBTyxDQUNwQiwrREFDQTtRQUFDSjtRQUFXQztRQUFVUDtLQUFPO0lBRWpDLE9BQU9aLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRWMsU0FBUztJQUFLO0FBQzdDO0FBRU8sZUFBZUMsS0FBS3BCLE9BQU87SUFDOUIsTUFBTUMsUUFBUUQsUUFBUUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCQyxNQUFNLElBQUksQ0FBQyxFQUFFO0lBQ2pFLElBQUksQ0FBQ0gsT0FBTztRQUNSLE9BQU9MLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsZUFBZTtRQUFNLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0lBRUEsSUFBSUM7SUFDSixJQUFJO1FBQ0FBLFNBQVNYLDBEQUFVLENBQUNJLE9BQU9TLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVSxFQUFFSixNQUFNO0lBQzdELEVBQUUsT0FBT0ssS0FBSztRQUVWLE9BQU9qQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVXLE9BQU87UUFBaUIsR0FBRztZQUFFVCxRQUFRO1FBQUk7SUFDeEU7SUFFQSxNQUFNLEVBQUVjLFdBQVcsRUFBRSxHQUFHLE1BQU1yQixRQUFRSyxJQUFJO0lBQzFDLElBQUksQ0FBQ2dCLGFBQWE7UUFDZCxPQUFPekIscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFVyxPQUFPO1FBQWUsR0FBRztZQUFFVCxRQUFRO1FBQUk7SUFDdEU7SUFFQSxNQUFNVSxhQUFhbkIsc0RBQWFBO0lBQ2hDLE1BQU1tQixXQUFXQyxPQUFPLENBQ3BCLDhDQUNBO1FBQUNHO1FBQWFiO0tBQU87SUFFekIsT0FBT1oscURBQVlBLENBQUNTLElBQUksQ0FBQztRQUFFYyxTQUFTO0lBQUs7QUFDN0MiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcb3BlbnpcXERvd25sb2Fkc1xccHJvamVjdF80NTFcXHBldF9ob3RlbFxccGV0X2hvdGVsXFxhcHBcXGFwaVxcdXRpbHNcXHByb2ZpbGVcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nXG5pbXBvcnQgeyBnZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vbGliL2RiJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcXVlc3QpIHtcbiAgICBjb25zdCB0b2tlbiA9IHJlcXVlc3QuaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKT8uc3BsaXQoJyAnKVsxXTtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlIH0sIHsgc3RhdHVzOiAyMDAgfSlcbiAgICB9XG5cbiAgICBsZXQgdXNlcklkXG4gICAgdHJ5IHtcbiAgICAgICAgdXNlcklkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCkudXNlcklkXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlIH0sIHsgc3RhdHVzOiAyMDAgfSlcbiAgICB9XG5cbiAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgaWYgKCFmaXJzdE5hbWUgfHwgIWxhc3ROYW1lKSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn4LiC4LmJ4Lit4Lih4Li54Lil4LmE4Lih4LmI4LiE4Lij4LiaJyB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IGdldENvbm5lY3Rpb24oKVxuICAgIGF3YWl0IGNvbm5lY3Rpb24uZXhlY3V0ZShcbiAgICAgICAgJ1VQREFURSB1c2VycyBTRVQgZmlyc3RfbmFtZSA9ID8sIGxhc3RfbmFtZSA9ID8gV0hFUkUgaWQgPSA/JyxcbiAgICAgICAgW2ZpcnN0TmFtZSwgbGFzdE5hbWUsIHVzZXJJZF1cbiAgICApXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XG4gICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJyk/LnNwbGl0KCcgJylbMV07XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBhdXRoZW50aWNhdGVkOiBmYWxzZSB9LCB7IHN0YXR1czogMjAwIH0pXG4gICAgfVxuXG4gICAgbGV0IHVzZXJJZFxuICAgIHRyeSB7XG4gICAgICAgIHVzZXJJZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpLnVzZXJJZFxuICAgIH0gY2F0Y2ggKGVycikge1xuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn4LmA4LiB4Li04LiU4LiC4LmJ4Lit4Lic4Li04LiU4Lie4Lil4Liy4LiUJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbmV3UGFzc3dvcmQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgaWYgKCFuZXdQYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ+C4q+C5ieC4suC4oeC5gOC4p+C5ieC4meC4p+C5iOC4suC4hycgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBnZXRDb25uZWN0aW9uKClcbiAgICBhd2FpdCBjb25uZWN0aW9uLmV4ZWN1dGUoXG4gICAgICAgICdVUERBVEUgdXNlcnMgU0VUIHBhc3N3b3JkID0gPyBXSEVSRSBpZCA9ID8nLFxuICAgICAgICBbbmV3UGFzc3dvcmQsIHVzZXJJZF1cbiAgICApXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJqd3QiLCJnZXRDb25uZWN0aW9uIiwiUFVUIiwicmVxdWVzdCIsInRva2VuIiwiaGVhZGVycyIsImdldCIsInNwbGl0IiwianNvbiIsImF1dGhlbnRpY2F0ZWQiLCJzdGF0dXMiLCJ1c2VySWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImVyciIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZXJyb3IiLCJjb25uZWN0aW9uIiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJQT1NUIiwibmV3UGFzc3dvcmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/utils/profile/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fprofile%2Froute&page=%2Fapi%2Futils%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fprofile%2Froute&page=%2Fapi%2Futils%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_openz_Downloads_project_451_pet_hotel_pet_hotel_app_api_utils_profile_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/utils/profile/route.js */ \"(rsc)/./app/api/utils/profile/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/utils/profile/route\",\n        pathname: \"/api/utils/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/utils/profile/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\openz\\\\Downloads\\\\project_451\\\\pet_hotel\\\\pet_hotel\\\\app\\\\api\\\\utils\\\\profile\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_openz_Downloads_project_451_pet_hotel_pet_hotel_app_api_utils_profile_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1dGlscyUyRnByb2ZpbGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnV0aWxzJTJGcHJvZmlsZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnV0aWxzJTJGcHJvZmlsZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNvcGVueiU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RfNDUxJTVDcGV0X2hvdGVsJTVDcGV0X2hvdGVsJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNvcGVueiU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RfNDUxJTVDcGV0X2hvdGVsJTVDcGV0X2hvdGVsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrRDtBQUMvSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcb3BlbnpcXFxcRG93bmxvYWRzXFxcXHByb2plY3RfNDUxXFxcXHBldF9ob3RlbFxcXFxwZXRfaG90ZWxcXFxcYXBwXFxcXGFwaVxcXFx1dGlsc1xcXFxwcm9maWxlXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91dGlscy9wcm9maWxlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXRpbHMvcHJvZmlsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXRpbHMvcHJvZmlsZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG9wZW56XFxcXERvd25sb2Fkc1xcXFxwcm9qZWN0XzQ1MVxcXFxwZXRfaG90ZWxcXFxccGV0X2hvdGVsXFxcXGFwcFxcXFxhcGlcXFxcdXRpbHNcXFxccHJvZmlsZVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fprofile%2Froute&page=%2Fapi%2Futils%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Futils%2Fprofile%2Froute&page=%2Fapi%2Futils%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Futils%2Fprofile%2Froute.js&appDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Copenz%5CDownloads%5Cproject_451%5Cpet_hotel%5Cpet_hotel&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();