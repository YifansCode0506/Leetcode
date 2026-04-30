/**
 * @param {number[]} arrivals
 * @param {number} w
 * @param {number} m
 * @return {number}
 */
var minArrivalsToDiscard = function(arrivals, w, m) {
    const basket = new Map();
    let discardCounter = 0;

    for (let right = 0; right < arrivals.length; right++) {
        // slide-in
        // 对于item的抛出逻辑，优先抛出右边的item，这样可以使重复item之间的距离更大，不容易被window框住
        const rightItem = arrivals[right];
        if (basket.get(rightItem) === m) { // 如果发现要超出m，就不计入当前item（等同于抛出）
            // update
            arrivals[right] = -1; // 将当前item修改，这样之后在这里滑出左窗口不会重复计算
            discardCounter++; 
        } else { // 不超过m，正常计入
            basket.set(rightItem, (basket.get(rightItem) ?? 0) + 1);
        }

        // check window
        const left = right - w + 1;
        if (left < 0) continue;

        // slide-out
        // 哪怕当前window抛出过也要记得正常更新window左端
        const leftItem = arrivals[left];
        basket.set(leftItem, basket.get(leftItem) - 1);
    }

    return discardCounter;
};
