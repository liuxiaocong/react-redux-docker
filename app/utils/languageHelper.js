export function getBrowserDefaultLanguage() {
  let lang = window.navigator.userLanguage || window.navigator.language;
  if (!lang) return null;

  lang = lang.toLowerCase();

  if (lang === 'en' || lang.startsWith('en-')) {
    return 'en_GB';
  }
  return 'zh_CN';
}

export default { getBrowserDefaultLanguage };
