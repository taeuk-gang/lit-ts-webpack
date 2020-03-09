module.exports = {
	// {root: true} 를 설정하면 상위경로 설정을 물려받지 않음
	root: true,

	// Map 과 같이 es6 에 추가된 전역변수를 쓴다면 es6: true
	// require("...") 와 같이 node 전역변수를 쓴다면 node: true
	// location.href 와 같이 브라우저 전역변수를 쓴다면 browser: true
	env: {
		node: true,
		es6: true,
		browser: true
  },

  rules: {
    // 호이스팅 안되는 class, const, let만 금지
		"@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": true, "variables": false }],
		"@typescript-eslint/no-explicit-any": [0, { "ignoreRestArgs": true }],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-non-null-assertion": "off",

		'@typescript-eslint/no-this-alias': [
			'error',
			{
				allowDestructuring: true,
				allowedNames: ['self', 'root'],
			},
		],

		// 이미 알고있는 interface(ex. Element)는 무시
		"@typescript-eslint/no-empty-interface": [
			"error",
			{
				"allowSingleExtends": true
			}
		],

		// webpack은 require 필요함
		"@typescript-eslint/no-var-requires": 0,

		"quotes": ["error", "single", { "allowTemplateLiterals": true }],
		// console문은 디버깅 이후 제거할 것
		'no-console': [1, { allow: ["info", "warn", "error"] }],
		'vue/no-use-v-if-with-v-for': 'off',

		// 적절치 못한 조건문
		"no-constant-condition": 2,
		// 적절치 못한 정규표현식
		"no-control-regex": 1,
		// 패키징시는 디버거 제거
		"no-debugger": 1,
		// 중복되는 파라미터 불가
		"no-dupe-args": 2,
		// 중복되는 객체값 불가
		"no-dupe-keys": 1,
		// 중복되는 조건문 제거
		"no-duplicate-case": 1,
		// 빈줄 없애기
		"no-empty": 1,
		// 빈 클래스 없애기
		"no-empty-character-class": 1,
		// catch - error는 재할당 불가
		"no-ex-assign": 2,
		// 불필요한 이중부호 불가
		"no-extra-boolean-cast": 1,
		// 불필요한 괄호 불가
		"no-extra-parens": 1,
		// 불필요한 세미콜론 불가
		"no-extra-semi": 1,
		"no-alert": 1,
		// eval() 보안상 사용 금지
		"no-eval": 1,
		"no-unused-vars": [1, {
			"vars": `all`,
			"args": `after-used`,
			"argsIgnorePattern": `^__`
		}],
		"comma-dangle": [1, "always-multiline"],
		"indent": [1, "tab"],
		"max-len": [1, {
			"code": 160,
			"ignoreComments": true,
			"ignoreUrls": true,
			"ignoreStrings": true,
			"ignoreTemplateLiterals": true,
			"ignoreRegExpLiterals": true
		}],			
		// var 대신 const, let을 사용
		"no-var": 1,
		// 코드 편의성을 위해서 아래의 설정을 끔
		"no-tabs": 0,
		"no-param-reassign": 0,
		"class-methods-use-this": 0,
		"prefer-destructuring": 0,
		// autoFix 안되는 버그가 있어 설정 끔
		"no-mixed-spaces-and-tabs": [0, "smart-tabs"],
		// this 값을 바라봐야하는 함수들이 존재하여 끔
		"func-names": 0,
		// _ 앞에 붙이는 관례가 안좋은 영향을 주지는 않아 끔
		"no-underscore-dangle": 0,
		"arrow-parens": [1, `as-needed`],
		"linebreak-style": 0,
		"import/newline-after-import": 0,
		"lines-between-class-members": 0,
		"import/extensions": 0,

		// injectGlobal 전역 CSS 설정을 위해 allow
		"no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
		"dot-notation": 0,
  },
  
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
};