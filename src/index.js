import Component from '@bythepixel/component-loader';
import runInView from '@bythepixel/run-in-view';

class InViewSrcSet extends Component {
  static selector = 'img[data-srcset]'

  #attrs = ['srcset', 'sizes', 'type']

  constructor(el) {
    super(el);
    this.sourceEl = this.$container.parentNode.querySelector('source[data-srcset]');
    this.boundCleanup = () => this.cleanup();
    runInView(this.$container, () => this.init());
  }

  init() {
    this.$container.addEventListener('load', this.boundCleanup);
    requestAnimationFrame(() => {
      this.#attrs.forEach(attr => {
        if (this.$container.dataset[attr]) this.$container.setAttribute(attr, this.$container.dataset[attr]);
        if (this.sourceEl.dataset[attr]) this.sourceEl.setAttribute(attr, this.sourceEl.dataset[attr]);
      });
    });
  }

  cleanup() {
    this.$container.removeEventListener('load', this.boundCleanup);
    requestAnimationFrame(() => {
      this.#attrs.forEach(attr => {
        this.$container.removeAttribute(`data-${attr}`);
        this.sourceEl.removeAttribute(`data-${attr}`);
      });
    });
  }
}

export default InViewSrc;
