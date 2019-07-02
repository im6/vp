import React from 'react';

const localStorageKey = 'colorpk1_lang';
const translation = {
  eng: {
    language: 'Language',
    popular: 'Popular',
    latest: 'Latest',
    more: 'More',
    about: 'About',
    newColor: 'New Color',
    fbLogin: 'Facebook Login',
    reportIssue: 'Report an issue',
    download: 'Download',
    submit: 'Submit',
    reset: 'Reset',
    return: 'Return',
    profile: 'Profile',
    like: 'Like',
    admin: 'Admin',
    logOut: 'Log Out',
  },
  zh: {
    language: '多语言',
    popular: '最热',
    latest: '最新',
    more: '更多',
    about: '关于',
    newColor: '创建新颜色',
    fbLogin: '脸书账号登陆',
    reportIssue: '报告错误',
    download: '下载',
    submit: '添加',
    reset: '重置',
    return: '返回',
    profile: '我的颜色',
    like: '我的收藏',
    admin: '管理员',
    logOut: '注销',
  },
  jpn: {
    language: '言語',
    popular: '人気のある',
    latest: '最新',
    more: 'もっと',
    about: '約',
    newColor: '色をつくる',
    fbLogin: 'Facebookでログイン',
    reportIssue: '問題を報告する',
    download: 'ダウンロード',
    submit: '提出する',
    reset: 'リセット',
    return: '戻る',
    profile: 'プロフィール',
    like: '好む',
    admin: '管理者',
    logOut: 'サインアウト',
  },
  kor: {
    language: '언어',
    popular: '인기 있는',
    latest: '최근',
    more: '더',
    about: '약',
    newColor: '몹시 떠들어 대다',
    fbLogin: '페이스 북 로그인',
    reportIssue: '보고 문제',
    download: '다운로드',
    submit: '제출하다',
    reset: '다시 놓기',
    return: '반환',
    profile: '윤곽',
    like: '인기 있는 말',
    admin: '관리자',
    logOut: '로그 아웃하다',
  },
  spa: {
    language: 'idioma',
    popular: 'popular',
    latest: 'más reciente',
    more: 'Más',
    about: 'acerca de',
    newColor: 'crear nuevo',
    fbLogin: 'cuenta de Facebook',
    reportIssue: 'informe de problema',
    download: 'descargar',
    submit: 'enviar',
    reset: 'Reiniciar',
    return: 'regreso',
    profile: 'perfil',
    like: 'favorita',
    admin: 'administración',
    logOut: 'cerrar sesión',
  },
  rus: {
    language: 'Переводы',
    popular: 'популярный',
    latest: 'недавно',
    more: 'Больше',
    about: 'около',
    newColor: 'Создайте',
    fbLogin: 'Логин в фейсбук',
    reportIssue: 'сообщить о проблемах',
    download: 'скачать',
    submit: 'Отправить',
    reset: 'сброс',
    return: 'вернуть',
    profile: 'профиль',
    like: 'любимый',
    admin: 'админ',
    logOut: 'выйти',
  },
};

export const LanguageContext = React.createContext();
export class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.changeLang = this.changeLang.bind(this);
    const localValue =
      window.localStorage && window.localStorage.getItem(localStorageKey);
    const defaultLang = localValue in translation ? localValue : 'eng';
    this.state = {
      language: translation[defaultLang],
      changeLang: this.changeLang,
    };
  }
  changeLang(lang) {
    this.setState({
      language: translation[lang],
    });
    try {
      window.localStorage.setItem(localStorageKey, lang);
    } catch (error) {
      // not support
    }
  }
  render() {
    return (
      <LanguageContext.Provider value={this.state}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
