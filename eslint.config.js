// eslint.config.js
import js from "@eslint/js"; // Базовый JS-конфиг ESLint (flat API)
import globals from "globals"; // Чтобы подключить глобальные переменные браузера
import reactHooks from "eslint-plugin-react-hooks"; // Плагин для правил React-хуков
import reactPlugin from "eslint-plugin-react"; // Плагин для React (JSX, компоненты)
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"; // Плагин для правил доступности (a11y)
import importPlugin from "eslint-plugin-import"; // Плагин для проверки импортов (циклы, extensions и т.п.)
import reactRefresh from "eslint-plugin-react-refresh"; // (опционально) плагин для Fast Refresh-совместимых правил
import tsParser from "@typescript-eslint/parser"; // Парсер, понимающий TS/TSX
import tsPlugin from "@typescript-eslint/eslint-plugin"; // Плагин с набором правил для TypeScript

export default [
  // 1) Игнорируем папку сборки, node_modules и прочее
  {
    ignores: [
      "dist/", // Ваша папка сборки (если сборка идёт в dist/)
      "node_modules/", // node_modules не проверяем
      ".next/", // (если Next.js) или другая папка фреймворка
    ],
  },

  // 2) Базовые правила для чистого JS (eslintrc-style) — например, рекомендованные правила от ESLint
  {
    ...js.configs.recommended, // Здесь уже заложены базовые «no-unused-vars», «no-undef» и т.д.
    rules: {
      // Если вы хотите «override» какие-то чисто JS-правила, можно сделать это здесь.
      // Например, отключим core-правило indent, чтобы не конфликтовало с TS-версией:
      indent: "off",
      "no-tabs": "off",
    },
  },

  // 3) Правила, которые применяются только к TS/TSX файлам
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser, // Парсер TypeScript
      parserOptions: {
        ecmaVersion: 2020, // Поддерживаем ES2020
        sourceType: "module", // Используем ES-модули
        ecmaFeatures: {
          jsx: true, // Чтобы понимать JSX
        },
      },
      globals: {
        ...globals.browser, // Браузерные глобальные переменные (window, document и т.п.)
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Включаем все правила @typescript-eslint
      react: reactPlugin, // Правила React (JSX, компоненты и т.п.)
      "jsx-a11y": jsxA11yPlugin, // Правила доступности (ARIA-атрибуты, <label> и т.п.)
      import: importPlugin, // Правила для проверки импортов
      "react-hooks": reactHooks, // Правила для React-хуков (useEffect, useState и т.д.)
      "react-refresh": reactRefresh, // (Опционально) Fast Refresh-правила для React
    },
    settings: {
      // Настройки для eslint-plugin-import, чтобы он знал, как резолвить модули
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"],
          paths: ["./"], // Если используете абсолютные импорты из “src/”
        },
        alias: {
          map: [
            ["src", "./src"],
            ["pages", "./pages"],
            ["public", "./public"],
            ["utils", "./src/utils"],
            ["types", "./src/types"],
            ["hooks", "./src/hooks"],
            ["constants", "./src/constants"],
            ["components", "./src/components"],
          ],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"],
        },
      },
      react: {
        version: "detect", // ESLint-плагин React сам найдёт вашу версию React из package.json
      },
    },
    rules: {
      /* ========================= ОТСТУПЫ ========================= */
      // Отключили core-правило (ts-версия возьмёт на себя проверку)
      indent: "off",
      // Разрешаем табы (можно использовать табы вместо пробелов)
      "no-tabs": "off",
      // Принудительно табы для TS кода (TypeScript-aware)
      "@typescript-eslint/indent": ["error", "tab"],
      // Принудительно табы для JSX-разметки
      "react/jsx-indent": ["error", "tab"],
      // Принудительно табы для пропсов в JSX
      "react/jsx-indent-props": ["error", "tab"],

      /* ========================= SHADOWING ========================= */
      // Отключаем core-версию «no-shadow», чтобы не было дублирования
      "no-shadow": "off",
      // Включаем TS-версию «no-shadow» (чтобы правильно отслеживались enum, namespace, типовые параметры)
      "@typescript-eslint/no-shadow": ["error"],

      /* ========================= ДЛИНА СТРОКИ ========================= */
      // Ограничиваем длину строки 130 символами, таб считается за 4 пробела
      "max-len": ["error", 130, 4],

      /* ========================= IMPORT ========================= */
      // Не навязываем default-export, если файл экспортирует только одну сущность
      "import/prefer-default-export": "off",
      // Не требуем указывать расширения при импортах (типичный TS-/React-проект)
      "import/extensions": "off",
      // Предупреждаем, если хочешь импортировать именованный экспорт как default
      "import/no-named-as-default": "warn",
      // Предупреждаем о циклических зависимостях
      "import/no-cycle": "warn",
      // Импорты devDependencies разрешаем только в тестах (*.spec.ts, *.spec.tsx)
      "import/no-extraneous-dependencies": [
        "error",
        { devDependencies: ["**/*.spec.ts", "**/*.spec.tsx"] },
      ],

      /* ========================= REACT (JSX, КОМПОНЕНТЫ) ========================= */
      // Если компонент не использует состояние, советуем делать его функцией
      "react/prefer-stateless-function": "warn",
      // Не навязываем «function-component-definition» (стрелочная или обычная функция)
      "react/function-component-definition": "off",
      // Отключаем требование defaultProps (мы используем TS для типов)
      "react/require-default-props": "off",
      // Не запрещаем object/any в PropTypes (PropTypes обычно не нужны, т.к. TS)
      "react/forbid-prop-types": "off",
      // Не заставляем указывать displayName вручную
      "react/display-name": "off",
      // Предупреждаем, если используете индекс массива в key (может приводить к багам при рендере)
      "react/no-array-index-key": "warn",
      // Если в JSX пытаемся использовать неопределённый идентификатор — выдаём ошибку
      "react/jsx-no-undef": ["error", { allowGlobals: true }],
      // Разрешаем бессмысленные фрагменты (даже если только один дочерний элемент)
      "react/jsx-no-useless-fragment": "off",
      // Не запрещаем объявлять компоненты внутри других (может влиять на perf, но пусть сама команда решает)
      "react/no-unstable-nested-components": "off",
      // Не запрещаем стрелки или .bind() в JSX (может приводить к созданию новой функции каждый раз, но решаем сами)
      "react/jsx-no-bind": "off",
      // Не требуем указывать type для <button>
      "react/button-has-type": "off",
      // Не требуем PropTypes (мы используем TS)
      "react/prop-types": "off",

      /* ========================= JSX-A11Y (ДОСТУПНОСТЬ) ========================= */
      // Предупреждаем при использовании autoFocus (небезопасно с точки зрения a11y)
      "jsx-a11y/no-autofocus": "warn",
      // Если вешаем onClick на нефокусируемый элемент, требуем onKeyDown/onKeyPress
      "jsx-a11y/click-events-have-key-events": "warn",
      // Если элемент с role="button" и т.п., должен быть фокусируемым
      "jsx-a11y/interactive-supports-focus": "warn",
      // <label> должен быть связан с контролом через htmlFor или вложенность
      "jsx-a11y/label-has-associated-control": "warn",
      // Не позволяем вешать события (onClick и т.п.) на нефокусируемые элементы без role/tabindex
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      // Проверяем <a> без валидного href, учитываем кастомный Link (Next.js/React Router)
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"], // Например, Next.js <Link>
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      /* ========================= ОБЩИЕ JS/TS-ПРАВИЛА ========================= */
      // Не требуем, чтобы функция либо во всех ветках возвращало значение, либо ни в одной
      "consistent-return": "off",
      // Предупреждаем, если переназначаем параметр функции (рекомендуется не мутировать параметр)
      "no-param-reassign": "warn",
      // Ошибка, если объявлена, но не используется переменная/функция/импорт
      "@typescript-eslint/no-unused-vars": "error",
      // Разрешаем короткие булевые выражения (e.g. a && a.doSomething())
      "no-unused-expressions": "off",
      // Запрещаем пустые блоки кода, но catch { } разрешаем
      "no-empty": ["error", { allowEmptyCatch: true }],
      // Запрещаем идентификаторы с подчёркиванием (кроме this._private)
      "no-underscore-dangle": ["error", { allowAfterThis: true }],
      // Предупреждаем о лишних точках с запятой (;;)
      "no-extra-semi": "warn",
      // Не навязываем особые правила по переносу скобок/фигурных скобок (Prettier или IDE сделают своё)
      "object-curly-newline": "off",
      "arrow-parens": "off",
      "function-paren-newline": "off",
      "lines-between-class-members": "off",
      "default-param-last": "off",
      "no-unsafe-optional-chaining": "off",
      "no-nested-ternary": "warn",
      "consistent-return": "off",
      // Всегда ставим точки с запятой
      semi: ["error", "always"],

      /* ========================= TS-СПЕЦИФИКА ========================= */
      // Не требуем везде прописывать явно возвращаемый тип (TS сам умеет его выводить)
      "@typescript-eslint/explicit-function-return-type": "off",
      // Не требуем указывать public/private/readonly у членов класса явно
      "@typescript-eslint/explicit-member-accessibility": "off",
      // Не требуем указывать типы аргументов/возврата у экспортируемых функций
      "@typescript-eslint/explicit-module-boundary-types": "off",

      /* ========================= REACT-HOOKS И FAST REFRESH ========================= */
      // Подтянем все «рекомендованные» правила из eslint-plugin-react-hooks
      ...reactHooks.configs.recommended.rules,
      // Если вы используете React Refresh (Fast Refresh), включаем дополнительное правило
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];

