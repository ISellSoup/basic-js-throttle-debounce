// Module created by ISellSoup on GitHub
export default class {
    #debounceCount = 0;

    constructor({ throttle = 0, throttleLimit = 1, debounce = 0 } = {}) {
        this.throttle = throttle;
        this.throttleLimit = throttleLimit;
        this.debounce = debounce;
        this.throttleCount = 0;
    }

    call(callback = ()=>{},beforeDebounce = ()=>{}) {
        if (!this.throttle || this.throttleCount < this.throttleLimit) {
            if (this.throttle) {
                if (this.throttleCount === 0) {
                    setTimeout(() => { this.throttleCount = 0; }, this.throttle);
                }
                this.throttleCount++;
            }

            if (this.debounce) {
                if (this.#debounceCount >= Number.MAX_SAFE_INTEGER) this.#debounceCount = Number.MIN_SAFE_INTEGER;
                else this.#debounceCount++;

                const targetCount = this.#debounceCount;

                setTimeout(()=>{
                    if (this.#debounceCount === targetCount) {
                        this.#debounceCount = 0;
                        callback();
                    }
                },this.debounce);
            } else callback();

            if (beforeDebounce) beforeDebounce();
            return true;
        } else {
            return false;
        }
    }
}
