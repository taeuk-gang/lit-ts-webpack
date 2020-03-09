import {
	LitElement, html, css, property, customElement,
} from 'lit-element';

// 이런 식으로 아이콘을 불러다 쓰는군 (나랑 비슷하게 했네)
import { plusIcon, minusIcon } from './my-icons';

// 스타일 시트 js 불러오기
import { ButtonSharedStyles } from './button-shared-styles';

// 재사용 컴포넌트 라는 것을 항상 명심하고 코딩하기
@customElement('counter-element')
export class CounterElement extends LitElement {
  // 이런 식의 표기법이 훨씬 깔끔하네, 구글은 prop type를 사용하네
  @property({ type: Number })
  clicks = 0;

  @property({ type: Number })
  value = 0;

  static get styles() {
  	return [
  		ButtonSharedStyles,
  		css`
        span {
          width: 20px;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
      `,
  	];
  }

  protected render() {
  	return html`
      <div>
        <p>
          Clicked: <span>${this.clicks}</span> times.
          Value is <span>${this.value}</span>.
          <!-- 따옴표를 붙이네 -->
          <button @click="${this._onIncrement}" title="Add 1">${plusIcon}</button>
          <button @click="${this._onDecrement}" title="Minus 1">${minusIcon}</button>
        </p>
      </div>
    `;
  }

  // private는 _ 명시
  private _onIncrement() {
  	this.value++;
  	this.clicks++;
  	this.dispatchEvent(new CustomEvent('counter-incremented'));
  }

  private _onDecrement() {
  	this.value--;
  	this.clicks++;
  	this.dispatchEvent(new CustomEvent('counter-decremented'));
  }
}
