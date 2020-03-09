import {
	LitElement, html, css, property, PropertyValues, customElement,
} from 'lit-element';
// import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
// PWA 관련 라이브러리들 - 각 기능들은 한번 정리한 적이 있음
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// 스토어
import { store, RootState } from '../store';

// 액션 불러오기
import {
	navigate,
	updateOffline,
	updateDrawerState,
} from '../actions/app';

// 레이아웃 엘리먼트 불러오기, 이런 식으로 MVC 나눠서 컴포넌트로 불러오네
// import { AppDrawerElement } from '@polymer/app-layout/app-drawer/app-drawer.js';

// 각 하위 엘리먼트 불러오기
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons';
import './snack-bar';

@customElement('my-app')
export class MyApp extends connect(store)(LitElement) {
  // 지금보니 무조건 prop을 붙이네, private로 밖에 안드러는 걸로 처리하는건가?
  @property({ type: String })
  appTitle = '';

  @property({ type: String })
  private _page = '';

  @property({ type: Boolean })
  private _drawerOpened = false;

  @property({ type: Boolean })
  private _snackbarOpened = false;

  @property({ type: Boolean })
  private _offline = false;

  static get styles() {
  	return [
  		css`
        /* 이런 식으로 css 변수를 선언 */
        :host {
          display: block;

          --app-drawer-width: 256px;

          --app-primary-color: #e91e63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909c;
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Pacifico';
          text-transform: lowercase;
          font-size: 30px;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }

        .toolbar-list {
          display: none;
        }

        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }

        .toolbar-list > a[selected] {
          color: var(--app-header-selected-color);
          border-bottom: 4px solid var(--app-header-selected-color);
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 64px;
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }

         /* 각 화면 width에 따라, px를 정하는 방법도 고려해보자 */
        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }

          .menu-btn {
            display: none;
          }

          .main-content {
            padding-top: 107px;
          }

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `,
  	];
  }

  protected render() {
  	// Anything that's related to rendering should be done in here.
  	return html`
      <!-- 이런 식으로 각 파트부분을 명시하는구나 -->
      <!-- Header -->
      <app-header condenses reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
          <div main-title>${this.appTitle}</div>
        </app-toolbar>

        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
          <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
          <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
        </nav>
      </app-header>

      <!-- Drawer content -->
      <app-drawer
          .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list">
          <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
          <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
          <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
        </nav>
      </app-drawer>

      <!-- Main content -->
      <main role="main" class="main-content">
        <my-view1 class="page" ?active="${this._page === 'view1'}"></my-view1>
        <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
        <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
        <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
      </main>

      <footer>
        <p>Made with &hearts; by the Polymer team.</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `;
  }

  constructor() {
  	super();
  	// To force all event listeners for gestures to be passive.
  	// See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
  	// setPassiveTouchGestures(true);
  }

  // firstupdated는 protected로 했네?
  protected firstUpdated() {
  	installRouter(location => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  	installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
  	installMediaQueryWatcher('(min-width: 460px)',
  		() => store.dispatch(updateDrawerState(false)));
  }

  // 이것도 배워갑니다
  protected updated(changedProps: PropertyValues) {
  	if (changedProps.has('_page')) {
  		const pageTitle = `${this.appTitle} - ${this._page}`;
  		updateMetadata({
  			title: pageTitle,
  			description: pageTitle,
  			// This object also takes an image property, that points to an img src.
  		});
  	}
  }

  private _menuButtonClicked() {
  	store.dispatch(updateDrawerState(true));
  }

  private _drawerOpenedChanged(e: Event) {
  	store.dispatch(updateDrawerState(e.target as AppDrawerElement.opened));
  }

  stateChanged(state: RootState) {
  	this._page = state.app!.page;
  	this._offline = state.app!.offline;
  	this._snackbarOpened = state.app!.snackbarOpened;
  	this._drawerOpened = state.app!.drawerOpened;
  }
}
