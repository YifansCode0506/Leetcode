/**
 * @param {number[]} nums
 * @return {number}
 */
var specialTriplets = function(nums) {
    const MOD = 1000000007;
    // suf 为右翼账本：用于统计当前中间点右侧 (j+1 到 n-1) 每个数字出现的频次
    const suf = new Map();
    
    // 1. 预处理右翼静态账本：先将整个数组所有数字的频次全部录入 suf 中
    for (const x of nums) {
        suf.set(x, (suf.get(x) ?? 0) + 1);
    }

    let ans = 0;
    // pre 为左翼账本：用于动态统计当前中间点左侧 (0 到 j-1) 每个数字出现的频次
    const pre = new Map();

    // 2. 线性单趟遍历数组，当前踩到的数字 x 扮演【中间轴心人 nums[j]】
    for (const x of nums) {
        // 【关键撤销步】：因为中间点 j 踩到了 x，x 就不再属于“右侧未来”了
        // 所以必须把 x 从右翼账本 suf 中扣除 1 次
        const sufCount = suf.get(x) ?? 0;
        if (sufCount === 1) {
            suf.delete(x); // 计数归零则直接拔减 key
        } else {
            suf.set(x, sufCount - 1);
        }

        // 现在时空完美隔离：
        // pre 账本存的是 [0, j-1] 的历史，suf 账本存的是 [j+1, n-1] 的未来
        // 根据题目要求，左侧 i 应该等于 x * 2，右侧 k 应该等于 x * 2
        const leftTargetCount = pre.get(x * 2) ?? 0;
        const rightTargetCount = suf.get(x * 2) ?? 0;

        // 利用乘法原理，左侧的任意一个满足条件的同伴，都能与右侧任意一个满足条件的同伴
        // 配合当前的中间人 x 结成一个特殊三元组，带来 (左数 * 右数) 个新组合
        ans = (ans + leftTargetCount * rightTargetCount) % MOD;

        // 【关键登记步】：中间点 j 移走前，将当前的 x 登记到左翼账本 pre 中，供未来的 j 使用
        pre.set(x, (pre.get(x) ?? 0) + 1);
    }

    return ans;
};
// 先通过map设立两个账本分别为 右边的 suf 和左边的 pre。
// 右边 suf 记录了数组中哪些数出现了多少次，
// 左边 pre 记录了当当前x走到的数字的左边有哪些。

// 以 nums = [8,4,2,8,4] 为例
// 先记录 suf 为 Map { 8 => 2, 4 => 2, 2 => 1 }

// 第一轮: 
// x = 8; suf撤销一个右边变为 Map { 8 => 1, 4 => 2, 2 => 1 } (因为后续要将这个8设置为pre)
// pre中 16 => 0，suf 中 16 => 0;
// ans = 0; pre = Map { 8 => 1 };

// 第二轮:
// x = 4; suf 变为 Map { 8 => 1, 4 => 1, 2 => 1 }
// pre 中 pre.get(8) => 1 也就是nums[0];
// suf 中 suf.get(8) => 1 也就是nums[3];
// ans = 1; pre = Map { 8 => 1, 4 => 1 };

// 第三轮:
// x = 2; suf 变为 Map { 8 => 1, 4 => 1 };
// pre 中 pre.get(4) => 1 也就是nums[1];
// suf 中 suf.get(4) => 1 也就是nums[4];
// ans = 2; pre = Map { 8 => 1, 4 => 1, 2 => 1 };
// .
// .
// .
// 返回最终结果 ans = 2

var specialTriplets = function(nums) {
    const MOD = 1000000007;
    // cnt1 账本：统计单个数字 nums[i] 出现的次数
    const cnt1 = new Map();
    // cnt12 账本：统计满足 nums[i] == nums[j] * 2 的有效【二元组对 (i, j)】的出现次数
    // Key: nums[j] 的值, Value: 对应的历史合法 (i, j) 组合对数
    const cnt12 = new Map();
    
    // 初始化满足条件的特殊三元组总对数
    let cnt123 = 0;

    // 线性单趟遍历数组。任何一个当前数 x 都可以同时尝试扮演 3 种角色：
    for (const x of nums) {
        
        // 角色角色 A：把当前的 x 当作最右侧的【第三人 nums[k]】
        // 根据题目，若 x 能当第三人，它需要的二元组中间人 nums[j] 必须满足 x == nums[j] * 2，即 nums[j] = x / 2
        // 首先它自己必须是偶数，才能有整数的一半
        if (x % 2 === 0) {
            // 直接去二元组账本 cnt12 里查：历史上已经组合好了多少对以 (x/2) 为中间人的有效对？
            const validPairsCount = cnt12.get(x / 2) ?? 0;
            // 每一个配好的历史对，都能与当前的 x 结成一个完美三元组
            cnt123 = (cnt123 + validPairsCount) % MOD;
        }

        // 角色角色 B：把当前的 x 当作中间的【第二人 nums[j]】
        // 根据题目，它需要的历史第一人 nums[i] 必须满足 nums[i] == x * 2
        // 去单人账本 cnt1 中查找满足要求的历史数字 (x * 2) 出现了几次
        const validLeftCount = cnt1.get(x * 2) ?? 0;
        if (validLeftCount > 0) {
            // 发现了新连线！当前的 x 作为第二人，可以与这 validLeftCount 个历史数字分别结成新的二元组
            // 将这些新诞生、以 x 为结尾的二元组对数，累加升级存入 cnt12 账本中
            cnt12.set(x, (cnt12.get(x) ?? 0) + validLeftCount);
        }

        // 角色角色 C：把当前的 x 当作最左侧的【第一人 nums[i]】
        // 纯粹的自我登记，将 x 的单人出现频次加 1 写入 cnt1，供未来的第二人匹配
        cnt1.set(x, (cnt1.get(x) ?? 0) + 1);
    }

    return cnt123;
};


// 如果将题目改写为改写为输出所有满足条件的具体下标三元组 [i, j, k]（或对应的数值三元组）

/**
 * @param {number[]} nums
 * @return {number[][]} 返回所有满足条件的三元组下标数组 [[i1, j1, k1], [i2, j2, k2], ...]
 */
var specialTripletsIndices = function(nums) {
    const n = nums.length;
    // suf 为右翼账本：Map<数字x, [属于右翼的下标数组]>
    const suf = new Map();

    // 1. 预处理右翼静态账本：将每个数字的所有出现下标登记到对应数组中
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        if (!suf.has(x)) {
            suf.set(x, []);
        }
        suf.get(x).push(i); // 记录真实下标 i
    }

    const ans = []; // 存储最终找到的所有三元组 [i, j, k]
    // pre 为左翼账本：Map<数字x, [属于左翼的历史下标数组]>
    const pre = new Map();

    // 2. 带有索引 j 的线性单趟遍历，当前 j 扮演【中间轴心人 nums[j]】
    for (let j = 0; j < n; j++) {
        const x = nums[j];

        // 【关键撤销步】：当前 j 踩到了 x，x 就不再属于右翼未来了
        // 从 suf[x] 数组头部移除当前下标 j
        const rightList = suf.get(x);
        rightList.shift(); 
        if (rightList.length === 0) {
            suf.delete(x); // 数组空了就从 Map 删除
        }

        // 查找两翼需要的目标值 (x * 2)
        const target = x * 2;
        const leftIndices = pre.get(target) ?? [];   // 获取左翼所有历史下标 i
        const rightIndices = suf.get(target) ?? [];  // 获取右翼所有未来下标 k

        // 【连线输出】：两两组合左翼下标 i、当前中间下标 j、右翼下标 k
        for (const i of leftIndices) {
            for (const k of rightIndices) {
                ans.push([i, j, k]); // 如果想输出数值，改写为 ans.push([nums[i], nums[j], nums[k]]);
            }
        }

        // 【关键登记步】：中间点 j 移走前，将当前下标 j 记录到左翼账本 pre 中
        if (!pre.has(x)) {
            pre.set(x, []);
        }
        pre.get(x).push(j);
    }

    return ans;
};