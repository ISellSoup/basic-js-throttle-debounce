// Module created by ISellSoup on GitHub
export class CallTimer {
    #debounceCount = 0;
    #throttleLimit = 0;
    #throttleCount = 0;

    constructor({ throttle = 0, debounce = 0, throttleLimit = 1 } = {}) {
        this.throttle = throttle;
        this.debounce = debounce;
        this.#throttleLimit = throttleLimit;
        this.#throttleCount = 0;
        this.queue = [];
    }

    set throttleCount(value) {
        this.#throttleCount = Math.max(value,0) || 0;
        this.forceScheduled(this.#throttleLimit - this.#throttleCount);
    }

    set throttleLimit(value) {
        this.#throttleLimit = Math.max(value,0) || 1;
        this.forceScheduled(this.#throttleLimit - this.#throttleCount);
    }

    get throttleCount() {
        return this.#throttleCount;
    }

    get throttleLimit() {
        return this.#throttleLimit;
    }

    limitReached() {
        return this.throttleCount >= this.throttleLimit && this.throttle;
    }

    do(beforeDebounce = ()=>{}, debounce = ()=>{}) {
        if (!this.limitReached()) this.force(beforeDebounce, debounce);
        else return false;
        return true;
    }

    force(beforeDebounce = ()=>{}, debounce = ()=>{}) {
        if (this.throttle) {
            if (!this.throttleCount) {
                setTimeout(() => { this.throttleCount = 0; }, this.throttle);
            }
            this.throttleCount++;
        }

        if (beforeDebounce) beforeDebounce();

        if (this.debounce) this.registerDebounce(debounce);
        else debounce();
    }

    registerDebounce(callback = ()=>{}) {
        if (this.#debounceCount >= Number.MAX_SAFE_INTEGER) this.#debounceCount = Number.MIN_SAFE_INTEGER;
        else this.#debounceCount++;

        const targetCount = this.#debounceCount;

        setTimeout(()=>{
            if (this.#debounceCount === targetCount) {
                callback();
            }
        },this.debounce);
    }

    schedule(priority, beforeDebounce = ()=>{}, debounce = ()=>{}) {
        if (this.limitReached()) {
            const object = {"beforeDebounce": beforeDebounce, "debounce": debounce};

            if (priority) this.queue.unshift(object);
            else this.queue.push(object);
        
        } else this.do(beforeDebounce, debounce);
    }

    forceScheduled(count = Infinity) {
        count = Math.min(Math.max(0, count), this.queue.length);
        this.queue.slice(0, count).forEach((value) => { this.force(value.beforeDebounce, value.debounce) });
        this.queue = this.queue.slice(count);
    }
}
