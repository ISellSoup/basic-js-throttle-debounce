export default class {
    #throttleCount = 0;
    #debounceCount = 0;
    #debounceGen = 0;

    constructor({ throttle = 0, throttleLimit = 1, debounce = 0 } = {}) {
        this.throttle = throttle;
        this.throttleLimit = throttleLimit;
        this.debounce = debounce;
    }

    call(callback) {
        if (!this.throttle || this.#throttleCount < this.throttleLimit) {
            if (this.throttle) {
                if (this.#throttleCount === 0) {
                    setTimeout(() => { this.#throttleCount = 0; }, this.throttle);
                }
                this.#throttleCount++;
            }

            if (this.debounce) {
                this.#debounceCount++;
                const targetCount = this.#debounceCount;
                const targetGen = this.#debounceGen;

                setTimeout(()=>{
                    if (this.#debounceCount === targetCount && this.#debounceGen === targetGen) {
                        this.#debounceCount = 0;
                        this.#debounceGen++;
                        callback();
                    }
                },this.debounce);
                return true;
            }
            callback();
            return true;
        } else {
            return false;
        }
    }
}
